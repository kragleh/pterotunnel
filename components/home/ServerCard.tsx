import Link from 'next/link'
import React from 'react'
import { Server } from '../../lib/Server'
import { AiFillUnlock } from 'react-icons/ai'
import axios from 'axios'

const ServerCard = async ({ server }: { server: Server }) => {
  var exists = false
  try {
    var res = await axios.get(`${process.env.TUNNEL}/api/proxy/${server.identifier}/exists`)
  
    if (res.status === 200) {
      exists = true
    }
  } catch (ignored) {}

  return (
    <Link href={ `/server/${ server.identifier }` } className='w-full'>
      <div className='bg-gray-600 rounded flex justify-between items-center hover:outline-gray-500 outline outline-1 outline-transparent duration-200'>
        <div className='flex gap-4 ml-4'>
          <div className='rounded-full bg-gray-500 p-2 my-auto'><AiFillUnlock size={24} className='text-gray-300' /></div>
          <div className='flex flex-col justify-center'>
            <div className='text-lg text-gray-300'>{ server.name }</div>
            <div className='text-gray-300'>{ server.description }</div>
          </div>
        </div>
        { exists && <div className='bg-green-500/50 p-1 h-16 m-1 rounded-2xl'></div> }
        { !exists && <div className='bg-red-500/50 p-1 h-16 m-1 rounded-2xl'></div> }
      </div>
    </Link>
  )
}

export default ServerCard