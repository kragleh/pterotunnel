import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const ServerCard = ({ id, name, description }) => {

  const [exists, setExists] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.URL}/api/server/exists`, {
      headers: {
        "id": id
      }
    }).then((result) => {
      setExists(true)
    }).catch((err) => {
      setExists(false)
    })
  })

  return (
    <Link href={ `/server/${id}` } className='relative h-20 w-full flex justify-between items-center bg-gray-600 hover:border border-gray-500 rounded overflow-hidden'>
      <div className='flex flex-col m-4'>
        <div className='text-lg text-gray-300'>{ name }</div>
        <div className='text-gray-300'>{ description }</div>
      </div>
      { exists && <div className='bg-gray-600 absolute right-0'><div className='bg-green-400 p-1 h-16 m-2 rounded-2xl'></div></div> }
      { !exists && <div className='bg-gray-600 absolute right-0'><div className='bg-red-400 p-1 h-16 m-2 rounded-2xl'></div></div> }
    </Link>
  )
}

export default ServerCard