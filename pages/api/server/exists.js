import fs from 'fs'

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid method used!' })
  }

  const headers = req.headers
  const id = headers.id
  const apikey = headers.apikey

  if (id === null || typeof id === 'undefined') {
    return res.status(400).json({ message: 'Id is undefined!' })
  }

  if (apikey === null || typeof apikey === 'undefined') {
    return res.status(400).json({ message: 'Unauthorized' })
  }

  try {

    const authed = await axios.get(`${process.env.PANEL}/api/client`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    })

    var validServer = false

    authed.data.data.map(server => {
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

  if (fs.existsSync(fileName)) {
    return res.status(200).json({ message: 'Server is being proxied.' })
  } else {
    return res.status(500).json({ error: 'Server isnt being proxied!' })
  }

}