import axios from 'axios'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'

const SecureProxySettings = ({ id, server }) => {

  const apikey = getCookie('apikey')
  const [results, setResults] = useState()
  const [isProxied, setIsProxied] = useState(false)
  const [custom, setCustom] = useState(false)
  const error = null
  const message = null

  useEffect(() => {
    axios.get(`${process.env.URL}/api/server/status`, {
      headers: {
        "id": id,
        "apikey": apikey
      }
    }).then((result) => {
      setResults(result)
      setIsProxied(true)
    }).catch((err) => {
      setIsProxied(false)
    })
  }, [])

  function handleUpdate() {

  }

  function handleCustom() {
    setCustom(!custom)
  }

  return (
    <div className='bg-gray-600 rounded mb-auto'>
      <h1 className='bg-gray-800 rounded-t p-4 text-white text-base'>Secure Proxy Settings</h1>
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
        <div className='flex gap-3 text-white'>
          <label htmlFor="custom">Custom Certificate</label>
          <input onClick={handleCustom} type="checkbox" name="custom" id="custom" />
        </div>
        { custom && 
          <div className='flex flex-col gap-4'>
            <textarea name="private" id="private" className="w-full p-2 rounded bg-gray-500 border border-gray-400 focus:outline-gray-400 text-white" placeholder="Private Key"/>
            <textarea name="public" id="public" className="w-full p-2 rounded bg-gray-500 border border-gray-400 focus:outline-gray-400 text-white" placeholder="Public Key"/>
          </div> 
        }
        <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white py-2 px-auto rounded duration-200">Enable</button>
      </form>
    </div>
  )

}

export default SecureProxySettings