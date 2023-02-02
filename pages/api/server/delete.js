import fs from 'fs'
import { spawn } from 'child_process'

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method used!' })
  }

  const headers = req.headers
  const id = headers.id

  if (id === null || typeof id === 'undefined') {
    return res.status(400).json({ message: 'Id is undefined!' })
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