import Link from 'next/link'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
  return (
    <Link href='/' className='h-14 w-full bg-gray-800 text-gray-300 flex justify-between items-center font-semibold text-xl px-4'>
      PteroTunnel
      <FiLogOut size={16} className='text-gray-300 hover:text-red-500 duration-200' />
    </Link>
  )
}

export default Header