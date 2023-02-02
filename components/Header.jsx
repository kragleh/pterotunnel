import Link from 'next/link'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { FaHome } from 'react-icons/fa'

const Header = () => {
  return (
    <section className='h-14 w-full px-8 bg-gray-800 text-gray-300 flex justify-between items-center'>
      <Link href={'/'} className='font-semibold text-xl'>PteroTunnel</Link>
      <div className='flex items-center gap-2 h-14'>
        <Link href={process.env.PANEL} className='p-4 group'><FaHome size={18} className='text-gray-300 group-hover:text-green-500 duration-300' /></Link>
        <Link href={'/auth/logout'} className='p-4 group'><FiLogOut size={18} className='text-gray-300 group-hover:text-red-500 duration-300' /></Link>
      </div>
    </section>
  )
}

export default Header