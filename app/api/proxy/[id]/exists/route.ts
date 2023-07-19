import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import fs from 'fs'

export async function GET(request: Request, { params }: { params: { id: string } }) {
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

    if (fs.existsSync(fileName)) {
      return new NextResponse(JSON.stringify({ message: 'Server is proxied!' }), { status: 200 })
    } else {
      return new NextResponse(JSON.stringify({ message: 'Server is not proxied!' }), { status: 400 })
    }

  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'Something went wrong!' }), { status: 500 })
  }
}