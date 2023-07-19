"use client"
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

const HeaderButton = ({ href, icon }: { href: string, icon: ReactNode }) => {
  const path = usePathname()

  if (path === href) {
    return (
      <Link href={ href } className='group h-full px-6 flex flex-col justify-center text-white hover:bg-gray-900 border-b-2 border-cyan-500'>
        { icon }
      </Link>
    )
  }

  return (
    <Link href={ href } className='group h-full px-6 flex flex-col justify-center text-gray-400 hover:bg-gray-900 hover:text-white hover:border-b-2 border-cyan-500'>
      <div className='group-hover:mt-[1px]'>
        { icon }
      </div>
    </Link>
  )
}

export default HeaderButton