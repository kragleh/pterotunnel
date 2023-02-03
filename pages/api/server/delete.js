import fs from 'fs'
import { spawn } from 'child_process'

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method used!' })
  }

  const headers = req.headers
  const id = headers.id
  const apikey = headers.apikey

  if (id === null || typeof id === 'undefined') {
    return res.status(400).json({ message: 'Id is undefined!' })
  }

  try {
    const authed = await axios.get(`${process.env.PANEL}/api/client`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    })

    var validServer = false

    authed.data.data.array.forEach(server => {
      if (server.identifier === id) {
        validServer = true
      }
    })

    if (!validServer) {
      return res.status(400).json({ message: 'Server doesnt exist!' })
    }

  } catch (err) {
    return res.status(400).json({ message: 'Not authentificated!' })
  }

  const fileName = `/etc/nginx/sites-enabled/${id}.conf`

  fs.unlink(fileName, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to delete the file!' })
    }

    spawn('systemctl', ['restart', 'nginx'])
    return res.status(200).json({ message: 'Proxy deleted.' })
  })

}