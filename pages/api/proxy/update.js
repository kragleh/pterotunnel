import axios from "axios"
import fs from 'fs'

export default function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Invalid method used!' })
  }

  const headers = req.headers
  const apikey = headers.apikey
  const id = headers.id
  const host = headers.containerhost
  var domain = headers.domain
  const port = headers.port

  if (id === null || typeof id === 'undefined') {
    return res.status(400).json({ message: 'Id is undefined!' })
  }

  if (apikey === null || typeof apikey === 'undefined') {
    return res.status(400).json({ message: 'Unauthorized' })
  }

  axios.get(`${process.env.PANEL}/api/client/servers/${id}`, {
    headers: {
      "Authorization": `Bearer ${apikey}`
    }
  }).then(result => {

    if (host === null || typeof host === 'undefined') {
      return res.status(400).json({ message: 'Host is undefined!' })
    }
  
    if (port === null || typeof port === 'undefined') {
      return res.status(400).json({ message: 'Port is undefined!' })
    }
  
    if (domain === null || typeof domain === 'undefined') {
      return res.status(400).json({ message: 'Domain is undefined!' })
    }

    if (port > 65535) {
      return res.status(400).json({ message: 'Invalid port!' })
    }
  
    if (domain.length > 255) {
      return res.status(400).json({ message: 'Domain is too long!' })
    }
  
    if (domain.length < 5) {
      return res.status(400).json({ message: 'Domain is too short!' })
    }
  
    domain = domain.replace('https://', '').replace('http://', '')
  
    const fileName = `/etc/nginx/sites-enabled/${id}.conf`
  
    if (fs.existsSync(fileName)) {
      fs.unlink(fileName, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Unable to delete the file!' })
        }
  
        fs.copyFile('./templates/proxy.conf', fileName, (err) => {
          fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
              return res.status(500).json({ message: 'File not copied!' })
            }
  
            var edited = data.replace('%domain%', domain).replace('%host%', host).replace('%port%', port)
          
            fs.writeFile(fileName, edited, 'utf8', function (err) {
              if (err) {
                return res.status(500).json({ message: 'Unable to edit file!' })
              } else {
                spawn('systemctl', ['restart', 'nginx'])
                return res.status(200).json({ message: 'File created!' })
              }
            })
          })
        })
      })
    } else {
      fs.copyFile('./templates/proxy.conf', fileName, (err) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) {
            return res.status(500).json({ message: 'File not copied!' })
          }
  
          var edited = data.replace('%domain%', domain).replace('%host%', host).replace('%port%', port)
        
          fs.writeFile(fileName, edited, 'utf8', function (err) {
            if (err) {
              return res.status(500).json({ message: 'Unable to edit file!' })
            } else {
              spawn('systemctl', ['restart', 'nginx'])
              return res.status(200).json({ message: 'File created!' })
            }
          })
        })
      })
    }

  }).catch(err => {
    console.error(err)
    return res.status(500).json({ message: 'Something went wrong ...' })
  })

}