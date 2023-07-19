import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center gap-4 bg-gray-800'>
      { children }
    </main>
  )
}

export default layout