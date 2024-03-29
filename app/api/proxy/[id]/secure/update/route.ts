import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import fs from 'fs'
import { exec } from 'child_process'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const apikey = cookies().get('apikey')?.value
  const headers = request.headers
  const host = headers.get('containerhost')
  const port = headers.get('containerport')
  const formData = await request.formData()
  const domain = formData.get('userdomain')?.toString()
  const cert = formData.get('cert')?.toString()
  const key = formData.get('certKey')?.toString()
  console.log(apikey)
  console.log(host)
  console.log(port)
  console.log(domain)
  console.log(cert)
  console.log(key)

  if (!apikey || !host || !port || !domain || !cert || !key) {
    return new NextResponse(JSON.stringify({ error: 'No variables found!' }), { status: 404 })
  }

  try {
    await axios.get(`${process.env.panel}/api/client/servers/${id}`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    })

    const proxyName = `/etc/nginx/sites-enabled/${id}.conf`
    const certName = `/var/www/pterotunnel/ssl/${id}/proxy.crt`
    const keyName = `/var/www/pterotunnel/ssl/${id}/proxy.key`
    const sslName = `/var/www/pterotunnel/ssl`
    const dirName = `/var/www/pterotunnel/ssl/${id}`

    if (!fs.existsSync(sslName)) {
      await fs.promises.mkdir(sslName)
    }

    if (!fs.existsSync(dirName)) {
      await fs.promises.mkdir(dirName)
    }

    await fs.promises.writeFile(certName, cert)
    await fs.promises.writeFile(keyName, key)

    if (fs.existsSync(proxyName)) {
      await fs.promises.unlink(proxyName)

      await fs.promises.copyFile('./templates/secure.conf', proxyName)

      var content = await fs.promises.readFile(proxyName, { encoding: 'utf-8' })
      const edited = content.replaceAll('%domain%', domain).replaceAll('%host%', host).replaceAll('%port%', port).replaceAll('%id%', id)
      
      await fs.promises.writeFile(proxyName, edited)
      
      await exec('systemctl restart nginx')

      return new NextResponse(JSON.stringify({ message: 'Server is securely proxied!' }), { status: 200 })
    } else {
      await fs.promises.copyFile('./templates/secure.conf', proxyName)

      var content = await fs.promises.readFile(proxyName, { encoding: 'utf-8' })
      const edited = content.replaceAll('%domain%', domain).replaceAll('%host%', host).replaceAll('%port%', port).replaceAll('%id%', id)
      
      await fs.promises.writeFile(proxyName, edited)
      
      await exec('systemctl restart nginx')

      return new NextResponse(JSON.stringify({ message: 'Server is securely proxied!' }), { status: 200 })
    }

  } catch (err) {
    console.error(err)
    return new NextResponse(JSON.stringify({ error: 'Something went wrong!' }), { status: 500 })
  }
}