import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import Header from '@/components/Header'
import { getCookie } from 'cookies-next'

export default function ServerByID() {

  const apikey = getCookie('apikey')
  const router = useRouter()
  const { id } = router.query
  const [results, setResults] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    axios.get(`${process.env.PANEL}/api/client/servers/${id}`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    }).then(result => {
      console.log(result)
      setResults(result)
    }).catch(err => router.push('/'))
  }, [])

  function handleUpdate() {
    event.preventDefault()
    const host = results.data.attributes.sftp_details.ip
    const domain = document.getElementById('domain').value
    const port = document.getElementById('port').value
    axios.post('http://localhost:3000/api/server/update', null, {
      headers: {
        "id": results.data.attributes.identifier,
        "containerhost": host,
        "domain": domain,
        "port": port
      }
    }).then(result => {
      console.log('Result: ' + result)
      setResults(result)
    }).catch(err => setMessage('Error occured!'))
  }

  if (results) {
    return (
      <main>
        <Header />
        <section className='w-full h-screen bg-gray-700'>
          <div className='max-w-5xl mx-auto p-4 flex flex-col gap-2'>
            <div className="my-4">
              <h1 className="text-xl text-white font-semibold">{ results.data.attributes.name }</h1>
              <span className="text-lg text-gray-300">{ results.data.attributes.description }</span>
            </div>
            <div className='relative w-full flex flex-col gap-4 bg-gray-600 rounded'>
              <h1 className="bg-gray-800 text-gray-300 p-4 rounded text-lg">Proxy Pass Settings</h1>
              { message && <h1 className='mx-4 bg-red-500 text-white p-2 rounded border border-red-700'>{message}</h1> }
              <form className="flex items-center gap-4 m-4 mt-0">
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
                <button id='updateBtn' onClick={handleUpdate} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <Header />
      <section className='w-full h-screen bg-gray-700'>
        <div className='max-w-5xl mx-auto p-4 flex flex-col gap-2'>
          <div className="my-4">
            <h1 className="text-xl font-semibold">Loading ...</h1>
          </div>
        </div>
      </section>
    </main>
  )

}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}