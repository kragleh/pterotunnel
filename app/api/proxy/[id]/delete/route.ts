import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import fs from 'fs'
import { exec } from 'child_process'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const apikey = cookies().get('apikey')?.value

  if (!apikey) {
    return new NextResponse(JSON.stringify({ error: 'No api key found!' }), { status: 404 })
  }

  try {
    await axios.get(`${process.env.PANEL}/api/client/servers/${id}`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    })

    const fileName = `/etc/nginx/sites-enabled/${id}.conf`

    await fs.promises.unlink(fileName)

    await exec('systemctl restart nginx')

    return new NextResponse(JSON.stringify({ message: 'Proxy deleted and Nginx restarted!' }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'Something went wrong!' }), { status: 500 })
  }
}