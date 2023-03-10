import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import Header from '@/components/Header'
import { getCookie } from 'cookies-next'
import { AiFillUnlock, AiFillLock } from 'react-icons/ai' 
import ProxySettings from '@/components/ProxySettings'
import { MdLink, MdLinkOff } from 'react-icons/md'
import SecureProxySettings from '@/components/SecureProxySettings'
import Footer from '@/components/Footer'

export default function ServerByID() {

  const router = useRouter()
  const { id } = router.query
  const apikey = getCookie('apikey')
  const [server, setServer] = useState()
  const [secure, setSecure] = useState(false)
  const [isProxied, setIsProxied] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.PANEL}/api/client/servers/${id}`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    }).then(result => {
      setServer(result)
    }).catch(err => {
      router.push('/')
    })

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

  if (server) {
    return (
      <main>
        <Header />
        <section className='w-full bg-gray-700 min-h-[calc(100vh_-_56px)]'>
            <div className='max-w-5xl mx-auto h-full'>
            <div className='flex justify-between items-center p-8'>
              <div className='flex flex-col justify-center'>
                <div className='text-xl text-gray-300'>{ server.data.attributes.name }</div>
                <div className='text-gray-300'>{ server.data.attributes.description }</div>
              </div>
              <div className='flex gap-4'>
                { secure && <div className='rounded-full bg-blue-400 p-2 my-auto'><AiFillLock size={24} className='text-white' /></div> }
                { !secure && <div className='rounded-full bg-gray-500 p-2 my-auto'><AiFillUnlock size={24} className='text-white' /></div> }
                { isProxied && <div className='bg-green-400 p-2 my-auto rounded-full'><MdLink size={24} className='text-white' /></div> }
                { !isProxied && <div className='bg-red-400 p-2 my-auto rounded-full'><MdLinkOff size={24} className='text-white' /></div> }
              </div>
            </div>
            <div className='grid grid-cols-2 px-8 gap-4'>
              <ProxySettings id={id} server={server} />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

}

/**export default function ServerByID() {

  const apikey = getCookie('apikey')
  const router = useRouter()
  const { id } = router.query
  const [results, setResults] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [exists, setExists] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.PANEL}/api/client/servers/${id}`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    }).then(result => {
      console.log(result)
      setResults(result)
    }).catch(err => router.push('/'))

    axios.get(`${process.env.URL}/api/server/exists`, {
      headers: {
        "id": id,
        "apikey": apikey
      }
    }).then((result) => {
      setExists(true)
    }).catch((err) => {
      setExists(false)
    })
  }, [])

  function handleUpdate() {
    event.preventDefault()

    const host = results.data.attributes.sftp_details.ip
    const domain = document.getElementById('domain').value
    const port = document.getElementById('port').value

    axios.post(`${process.env.URL}/api/server/update`, null, {
      headers: {
        "id": results.data.attributes.identifier,
        "containerhost": host,
        "domain": domain,
        "port": port,
        "apikey": apikey
      }
    }).then(result => {
      console.log(result)
      setMessage(result.message)
    }).catch(err => setError(err.message))

  }

  if (results) {

    return (
      <main>
        <Header />
        <section className='w-full h-screen bg-gray-700'>
          <div className='max-w-5xl mx-auto p-4 flex flex-col gap-2'>
            <div className="my-4 flex justify-between">
              <div>
                <h1 className="text-xl text-white font-semibold">{ results.data.attributes.name }</h1>
                <span className="text-lg text-gray-300">{ results.data.attributes.description }</span>
              </div>
              <div className='flex'>
                <div className='rounded-full bg-gray-500 p-2 my-auto'><AiFillUnlock size={25} className='text-white' /></div>
                { exists && <div className='bg-green-400 p-1 h-12 m-2 rounded-2xl'></div> }
                { !exists && <div className='bg-red-400 p-1 h-12 m-2 rounded-2xl'></div> }
              </div>
            </div>
            <ProxySettings id={id} />
          </div>
        </section>
      </main>
    )

    return (
      <main>
        <Header />
        <section className='w-full h-screen bg-gray-700'>
          <div className='max-w-5xl mx-auto p-4 flex flex-col gap-2'>
            <div className="my-4 flex justify-between">
              <div>
                <h1 className="text-xl text-white font-semibold">{ results.data.attributes.name }</h1>
                <span className="text-lg text-gray-300">{ results.data.attributes.description }</span>
              </div>
              <div className='flex'>
                <div className='rounded-full bg-gray-500 p-2 my-auto'><AiFillUnlock size={25} className='text-white' /></div>
                { exists && <div className='bg-green-400 p-1 h-12 m-2 rounded-2xl'></div> }
                { !exists && <div className='bg-red-400 p-1 h-12 m-2 rounded-2xl'></div> }
              </div>
            </div>
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
            <h1 className="text-xl font-semibold text-white">Loading ...</h1>
          </div>
        </div>
      </section>
    </main>
  )

}**/

export async function getServerSideProps() {
  return {
    props: {}
  }
}