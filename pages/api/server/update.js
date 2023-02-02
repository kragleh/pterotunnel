import fs from 'fs'

export default function handler(req, res) {

  if (req.method === 'POST') {

    const headersList = req.headers
    const id = headersList.id
    const host = headersList.containerhost
    const domain = headersList.domain
    const port = headersList.port

    if (id === null || typeof id === 'undefined') {
      return res.status(401).json({ error: 'Id is undefined!' })
    }
    
    if (host === null || typeof host === 'undefined') {
      return res.status(402).json({ error: 'Host is undefined!' })
    }

    if (port === null || typeof port === 'undefined') {
      return res.status(403).json({ error: 'Port is undefined!' })
    }

    if (domain === null || typeof domain === 'undefined') {
      return res.status(404).json({ error: 'Domain is undefined!' })
    }

    var fileName = `/etc/nginx/sites-available/${id}.conf`

    if (fs.existsSync(fileName)) {
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'File not found!' })
        }

        var edited = data.replace('%domain%', domain).replace('%host%', host).replace('%port%', port)
      
        fs.writeFile(fileName, edited, 'utf8', function (err) {
          if (err) {
            return res.status(500).json({ error: 'Unable to edit file!' })
          } else {
            return res.status(200).json({ message: 'File created!' })
          }
        })
      })
    } else {
      fs.mkdir('/etc/nginx/sites-available/', { recursive: true }, (err) => {

        if (err) {
          return res.status(500).json({ error: 'Unable to create path!' })
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
                return res.status(200).json({ message: 'File created!' })
              }
            });
          })
        })
      })
    }

  } else {
    res.status(400).json({ error: 'Invalid method used!' })
  }
}