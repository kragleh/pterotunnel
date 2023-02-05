
import axios from 'axios'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'

const ProxySettings = ({ id, server }) => {

  const apikey = getCookie('apikey')
  const [isProxied, setIsProxied] = useState(false)
  const [error, setError] = useState()
  const [message, setMessage] = useState()

  useEffect(() => {
    axios.get(`${process.env.URL}/api/proxy/exists`, {
      headers: {
        "id": id,
        "apikey": apikey
      }
    }).then((result) => {
      setIsProxied(true)
    }).catch((err) => {
      setIsProxied(false)
    })
  }, [])

  function handleUpdate() {
    event.preventDefault()

    const host = server.data.attributes.sftp_details.ip
    const domain = document.getElementById('domain').value
    const port = document.getElementById('port').value

    axios.post(`${process.env.URL}/api/proxy/update`, null, {
      headers: {
        "id": id,
        "containerhost": host,
        "domain": domain,
        "port": port,
        "apikey": apikey
      }
    }).then(result => {
      console.log(result)
      setMessage(result.response.data.message)
    }).catch(err => { console.log(err); setError(err.response.data.message)})
  }

  if (isProxied) {
    return (
      <div className='bg-gray-600 rounded'>
        <h1 className='bg-gray-800 rounded-t p-4 text-white text-base'>Proxy Settings</h1>
        <form className='p-4 flex flex-col gap-4'>
          { message && <h1 className="w-full p-2 rounded bg-green-500 border border-green-400 text-white">{ message }</h1> }
          { error && <h1 className="w-full p-2 rounded bg-red-500 border border-red-400 text-white">{ error }</h1> }
          <input type="text" name="domain" id="domain" className="w-full p-2 rounded bg-gray-500 border border-gray-400 focus:outline-gray-400 text-white" placeholder="example.com"/>
          <select name="port" id="port" className='w-full p-2 rounded bg-gray-500 border border-gray-400 focus:outline-gray-400 text-white'>
            {
              server.data.attributes.relationships.allocations.data.map((port) => {
                return (
                  <option key={ server.data.attributes.relationships.allocations.data.indexOf(port) } className='text-white'>{ port.attributes.port }</option>
                )
              })
            }
          </select>
          <div className='flex gap-4 w-full'>
            <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white py-2 w-full rounded duration-200">Update</button>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 w-full rounded duration-200">Disable</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className='bg-gray-600 rounded'>
        <h1 className='bg-gray-800 rounded-t p-4 text-white text-base'>Proxy Settings</h1>
        <form className='p-4 flex flex-col gap-4'>
          { message && <h1 className="w-full p-2 rounded bg-green-500 border border-green-400 text-white">{ message }</h1> }
          { error && <h1 className="w-full p-2 rounded bg-red-500 border border-red-400 text-white">{ error }</h1> }
          <input type="text" name="domain" id="domain" className="w-full p-2 rounded bg-gray-500 border border-gray-400 focus:outline-gray-400 text-white" placeholder="example.com"/>
          <select name="port" id="port" className='w-full p-2 rounded bg-gray-500 border border-gray-400 focus:outline-gray-400 text-white'>
            {
              server.data.attributes.relationships.allocations.data.map((port) => {
                return (
                  <option key={ server.data.attributes.relationships.allocations.data.indexOf(port) } className='text-white'>{ port.attributes.port }</option>
                )
              })
            }
          </select>
          <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white py-2 px-auto rounded duration-200">Enable</button>
        </form>
      </div>
    )
  }

  /**if (results) {
    if (isProxied) {
      return (
        <div className='relative w-full flex flex-col gap-4 bg-gray-600 rounded'>
          <h1 className="bg-gray-800 text-gray-300 p-4 rounded text-lg">Reverse Proxy Settings</h1>
          { error && <h1 className='mx-4 bg-red-500 text-white p-2 rounded border border-red-700'>{error}</h1> }
          { message && <h1 className='mx-4 bg-green-500 text-white p-2 rounded border border-green-700'>{message}</h1> }
          <form className="flex flex-col md:flex-row items-center gap-4 m-4 mt-0">
            <input type="text" name="domain" id="domain" className="w-full p-2 rounded text-black" placeholder="example.com" required/>
            <select name="port" id="port" className='w-full p-2 rounded text-black' required>
              {
                results.data.attributes.relationships.allocations.data.map((port) => {
                  return (
                    <option key={ results.data.attributes.relationships.allocations.data.indexOf(port) } className='text-black'>{ port.attributes.port }</option>
                  )
                })
              }
            </select>
            <button onClick={handleUpdate} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
          </form>
        </div>
      )
    } else {
      return (
        <div className='relative w-full flex flex-col gap-4 bg-gray-600 rounded'>
          <h1 className="bg-gray-800 text-gray-300 p-4 rounded text-lg">Enable Reverse Proxy</h1>
          { error && <h1 className='mx-4 bg-red-500 text-white p-2 rounded border border-red-700'>{error}</h1> }
          { message && <h1 className='mx-4 bg-green-500 text-white p-2 rounded border border-green-700'>{message}</h1> }
          <form className="flex flex-col md:flex-row items-center gap-4 m-4 mt-0">
            <input type="text" name="domain" id="domain" className="w-full p-2 rounded text-black" placeholder="example.com" required/>
            <select name="port" id="port" className='w-full p-2 rounded text-black' required>
              {
                results.data.attributes.relationships.allocations.data.map((port) => {
                  return (
                    <option key={ results.data.attributes.relationships.allocations.data.indexOf(port) } className='text-black'>{ port.attributes.port }</option>
                  )
                })
              }
            </select>
            <button onClick={handleUpdate} type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Enable</button>
          </form>
        </div>
      )
    }
  }**/

}

export default ProxySettings