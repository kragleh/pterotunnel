import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import ServerCard from './ServerCard'

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
                <ServerCard key={results.data.data.indexOf(server)} id={server.attributes.identifier} name={server.attributes.name} description={server.attributes.description} />
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
          <div className='bg-gray-600 absolute right-0'><div className='bg-red-400 p-1 h-16 m-2 rounded-2xl'></div></div>
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