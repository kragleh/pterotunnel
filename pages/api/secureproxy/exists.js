import axios from "axios"
import fs from 'fs'

export default function (req, res) {

  if (req.method !== 'GET') {
    return res.status(500).json({ message: 'Invalid method used!' })
  }

  const headers = req.headers
  const id = headers.id
  const apikey = headers.apikey

  if (id === null || typeof id === 'undefined') {
    return res.status(400).json({ message: 'Id is undefined!' })
  }

  if (apikey === null || typeof apikey === 'undefined') {
    return res.status(400).json({ message: 'Unauthorized ...' })
  }

  axios.get(`${process.env.PANEL}/api/client/servers/${id}`, {
    headers: {
      "Authorization": `Bearer ${apikey}`
    }
  }).then(result => {
    
    const fileName = `/etc/nginx/sites-enabled/${id}.conf`

    fs.readFile(fileName, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Something went wrong while reading the file!' })
      }

      if (data.includes('ssl_certificate /etc/letsencrypt/live')) {
        return res.status(200).json({ message: 'Server is being proxied securely.' })
      } else {
        return res.status(400).json({ message: 'Server isnt being proxied securely!' })
      }
    })

  }).catch(err => {
    console.error(err)
    return res.status(500).json({ message: 'Something went wrong ...' })
  })

}