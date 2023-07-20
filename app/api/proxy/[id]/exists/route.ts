import { NextResponse } from "next/server"
import fs from 'fs'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const fileName = `/etc/nginx/sites-enabled/${id}.conf`

    if (fs.existsSync(fileName)) {
      return new NextResponse(JSON.stringify({ message: 'Server is proxied!' }), { status: 200 })
    } else {
      return new NextResponse(JSON.stringify({ message: 'Server is not proxied!' }), { status: 400 })
    }
  } catch (err) {
    console.error(err)
    return new NextResponse(JSON.stringify({ error: 'Something went wrong!' }), { status: 500 })
  }
}