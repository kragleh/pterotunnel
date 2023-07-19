import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaHome, FaSignOutAlt, FaLayerGroup } from 'react-icons/fa'
import { User } from '../../lib/User'
import HeaderButton from './HeaderButton'
import MD5 from 'crypto-js/md5'

const Header = ({ user }: { user: User }) => {
  return (
    <section className='w-full bg-gray-800'>
      <div className='max-w-[1200px] mx-auto flex justify-between items-center text-gray-300'>
        <Link href={'/'} className='text-2xl font-semibold hover:text-white duration-200 px-4'>
          PteroTunnel
        </Link>
        <div className='flex items-center h-14'>
          <HeaderButton href={ process.env.PANEL ? process.env.PANEL : '/' } icon={ <FaHome size={16} /> } />
          <HeaderButton href={ '/' } icon={ <FaLayerGroup size={16} /> } />
          <HeaderButton href={ process.env.PANEL ? process.env.PANEL + '/account' : '/' } icon={ 
            <Image alt='PFP' src={ `https://www.gravatar.com/avatar/` + MD5(user.email) } height={20} width={20} className='rounded-full' /> 
          } />
          <HeaderButton href={ '/auth/logout' } icon={ <FaSignOutAlt size={16} /> } />
        </div>
      </div>
    </section>
  )
}

export default Header