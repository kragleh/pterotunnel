import axios from 'axios'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'

const SSLSettings = ({ id }) => {

  const apikey = getCookie('apikey')
  const [results, setResults] = useState()
  const [isProxied, setIsProxied] = useState(false)
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

  return (
    <div className='bg-gray-600 rounded mb-auto'>
      <h1 className='bg-gray-800 rounded-t p-4 text-white text-base'>SSL Settings</h1>
      <form className='p-4 flex flex-col gap-4'>
        <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-auto rounded duration-200">Update</button>
      </form>
    </div>
  )

}

export default SSLSettings