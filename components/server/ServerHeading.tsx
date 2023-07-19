import React, { ReactNode } from 'react'
import { Server } from '../../lib/Server'
import ServerCard from '../home/ServerCard'

const ServerHeading = ({ server }: { server: Server }) => {
  return (
    <section className='max-w-[1200px] mx-auto flex justify-between items-center my-8'>
      <ServerCard server={ server } />
    </section>
  )
}

export default ServerHeading