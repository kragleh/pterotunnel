import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import fs from 'fs'
import { exec } from 'child_process'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const apikey = cookies().get('apikey')?.value
  const headers = request.headers
  const host = headers.get('host')
  const port = headers.get('port')
  const domain = headers.get('domain')

  if (!apikey || !host || !port || !domain) {
    return new NextResponse(JSON.stringify({ error: 'No variables found!' }), { status: 404 })
  }

  try {
    const res = await axios.get(`${process.env.panel}/api/client/servers/${id}`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    })

    const server = res.data.attributes

    const fileName = `/etc/nginx/sites-enabled/${id}.conf`

    if (fs.existsSync(fileName)) {
      await fs.promises.unlink(fileName)

      await fs.promises.copyFile('./templates/proxy.conf', fileName)

      var content = await fs.promises.readFile(fileName, { encoding: 'utf-8' })
      const edited = content.replace('%domain%', domain).replace('%host%', host).replace('%port%', port)
      
      await fs.promises.writeFile(fileName, edited)
      
      await exec('systemctl restart nginx')

      return new NextResponse(JSON.stringify({ message: 'Server is proxied!' }), { status: 200 })
    } else {
      return new NextResponse(JSON.stringify({ message: 'Server is not proxied!' }), { status: 400 })
    }

  } catch (err) {
    console.error(err)
    return new NextResponse(JSON.stringify({ error: 'Something went wrong!' }), { status: 500 })
  }
}