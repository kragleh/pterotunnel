import fs from 'fs'
import { spawn } from 'child_process'

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method used!' })
  }

  const headers = req.headers
  const id = headers.id
  const host = headers.containerhost
  const domain = headers.domain
  const port = headers.port

  if (id === null || typeof id === 'undefined') {
    return res.status(400).json({ message: 'Id is undefined!' })
  }
  
  if (host === null || typeof host === 'undefined') {
    return res.status(400).json({ message: 'Host is undefined!' })
  }

  if (port === null || typeof port === 'undefined') {
    return res.status(400).json({ message: 'Port is undefined!' })
  }

  if (domain === null || typeof domain === 'undefined') {
    return res.status(400).json({ message: 'Domain is undefined!' })
  }

  const fileName = `/etc/nginx/sites-enabled/${id}.conf`

  if (fs.exists(fileName)) {
    fs.unlink(fileName, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to delete the file!' })
      }

      fs.copyFile('./templates/proxy.conf', fileName, (err) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) {
            return res.status(500).json({ error: 'File not copied!' })
          }

          var edited = data.replace('%domain%', domain).replace('%host%', host).replace('%port%', port)
        
          fs.writeFile(fileName, edited, 'utf8', function (err) {
            if (err) {
              return res.status(500).json({ error: 'Unable to edit file!' })
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
          return res.status(500).json({ error: 'File not copied!' })
        }

        var edited = data.replace('%domain%', domain).replace('%host%', host).replace('%port%', port)
      
        fs.writeFile(fileName, edited, 'utf8', function (err) {
          if (err) {
            return res.status(500).json({ error: 'Unable to edit file!' })
          } else {
            spawn('systemctl', ['restart', 'nginx'])
            return res.status(200).json({ message: 'File created!' })
          }
        })
      })
    })
  }

}