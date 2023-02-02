import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'

const ServerList = () => {

  const apikey = getCookie('apikey')
  const router = useRouter()
  const [results, setResults] = useState(null)

  useEffect(() => {
    axios.get(`${process.env.PANEL}/api/client`, {
      headers: {
        "Authorization": `Bearer ${apikey}`
      }
    }).then(result => {
      setResults(result)
    }).catch(err => router.push('/auth/login'))
  }, [])

  if (results) {

    return (
      <section className='w-full min-h-screen bg-gray-700'>
        <div className='max-w-5xl mx-auto p-4 flex flex-col gap-2'>
          {
            results.data.data.map((server) => {
              return (
                <Link href={ `/server/${server.attributes.identifier}` } key={results.data.data.indexOf(server)} className='relative h-20 w-full flex justify-between items-center bg-gray-600 hover:border border-gray-500 rounded overflow-hidden'>
                  <div className='flex flex-col m-4'>
                    <div className='text-lg text-gray-300'>{ server.attributes.name }</div>
                    <div className='text-gray-300'>{ server.attributes.description }</div>
                  </div>
                  <div className='bg-gray-600 absolute right-0'><div className='bg-red-400 p-1 h-16 m-2 rounded-2xl'></div></div>
                </Link>
              )
            })
          }
          
        </div>
      </section>
    )

  }

  return (
    <section className='w-full h-screen bg-gray-700'>
      <div className='max-w-5xl mx-auto p-4 flex flex-col gap-2'>
        <div className='relative h-20 w-full flex justify-between items-center bg-gray-600 rounded overflow-hidden'>
          <div className='flex flex-col gap-2 m-4'>
            <div className='bg-gray-500 animate-pulse p-2 px-16 rounded-2xl'></div>
            <div className='bg-gray-500 animate-pulse p-2 px-12 w-fit rounded-2xl'></div>
          </div>
          <div className='bg-gray-600 absolute right-0'><div className='bg-green-400 p-1 h-16 m-2 rounded-2xl'></div></div>
        </div>
        <div className='relative h-20 w-full flex justify-between items-center bg-gray-600 rounded overflow-hidden'>
          <div className='flex flex-col gap-2 m-4'>
            <div className='bg-gray-500 animate-pulse p-2 px-24 rounded-2xl'></div>
            <div className='bg-gray-500 animate-pulse p-2 px-9 w-fit rounded-2xl'></div>
          </div>
          <div className='bg-gray-600 absolute right-0'><div className='bg-yellow-400 p-1 h-16 m-2 rounded-2xl'></div></div>
        </div>
        <div className='relative h-20 w-full flex justify-between items-center bg-gray-600 rounded overflow-hidden'>
          <div className='flex flex-col gap-2 m-4'>
            <div className='bg-gray-500 animate-pulse p-2 px-8 w-fit rounded-2xl'></div>
            <div className='bg-gray-500 animate-pulse p-2 px-16 w-fit rounded-2xl'></div>
          </div>
          <div className='bg-gray-600 absolute right-0'><div className='bg-red-400 p-1 h-16 m-2 rounded-2xl'></div></div>
        </div>
      </div>
    </section>
  )
}

export default ServerList