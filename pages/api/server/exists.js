import fs from 'fs'

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid method used!' })
  }

  const headers = req.headers
  const id = headers.id

  if (id === null || typeof id === 'undefined') {
    return res.status(400).json({ message: 'Id is undefined!' })
  }

  const fileName = `/etc/nginx/sites-enabled/${id}.conf`

  if (fs.existsSync(fileName)) {
    return res.status(200).json({ message: 'Server is being proxied.' })
  } else {
    return res.status(500).json({ error: 'Server isnt being proxied!' })
  }

}