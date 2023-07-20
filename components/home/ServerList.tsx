import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { Server } from '../../lib/Server'
import ServerCard from './ServerCard'

const ServerList = async () => {
  const cookieStore = cookies()
  const apikey = cookieStore.get('apikey')?.value

  try {
    const res = await axios.get(`${ process.env.panel }/api/client`, { 
      headers: { 
        'Authorization': `Bearer ` + apikey
      } 
    })

    const servers: Server[] = []

    res.data.data.forEach((server) => {
      servers.push(server.attributes)
    })

    return (
      <section className='my-[3.5rem] flex flex-col gap-2'>
        {
          servers.map((server) => {
            return (
              <ServerCard key={ server.identifier } server={ server } />
            )
          })
        }
      </section>
    )
  } catch (err) {
    redirect('/auth/login')
  }
}

export default ServerList