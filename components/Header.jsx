import Link from 'next/link'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { FaHome } from 'react-icons/fa'

const Header = () => {
  return (
    <section className='h-14 w-full px-4 bg-gray-800 text-gray-300'>
      <div className='mx-auto max-w-5xl flex justify-between items-center'>
        <Link href={'/'} className='text-2xl font-semibold'>PteroTunnel</Link>
        <div className='flex items-center gap-2 h-14'>
          <Link href={process.env.PANEL} className='py-[18px] px-5 group hover:bg-gray-900 hover:border-b-2 border-b-cyan-500'><FaHome size={18} className='text-gray-300 group-hover:text-green-500 duration-300' /></Link>
          <Link href={'/auth/logout'} className='py-[18px] px-5 group hover:bg-gray-900 hover:border-b-2 border-b-cyan-500'><FiLogOut size={18} className='text-gray-300 group-hover:text-red-500 duration-300' /></Link>
        </div>
      </div>
    </section>
  )
}

export default Header