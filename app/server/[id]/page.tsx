import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import Copyright from '../../../components/Copyright'
import Header from '../../../components/header/Header'
import ServerCard from '../../../components/home/ServerCard'
import ProxySettings from '../../../components/server/ProxySettings'
import SecureProxySettings from '../../../components/server/SecureProxySettings'
import { Server } from '../../../lib/Server'
import { User } from '../../../lib/User'

const ServerPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const apikey = cookies().get('apikey')?.value

  try {
    const res = await axios.get(`${ process.env.panel }/api/client/account`, { 
      headers: { 
        'Authorization': `Bearer ` + apikey
      } 
    })

    const res2 = await axios.get(`${ process.env.panel }/api/client/servers/${ id }`, { 
      headers: { 
        'Authorization': `Bearer ` + apikey
      } 
    })

    const user: User = res.data.attributes
    const server: Server = res2.data.attributes

    return (
      <>
        <Header user={ user } />
        <main className='max-w-[1200px] w-full mx-auto p-4 flex flex-col gap-4'>
          <div className='my-8'>
            <ServerCard server={ server } />
          </div>
          <div className='grid grid-cols-2 gap-8'>
            <ProxySettings server={ server } />
            <SecureProxySettings server={ server } />
          </div>
          <Copyright />
        </main>
      </>
    )
  } catch (err) {
    console.error(err)
    redirect('/auth/login')
  }
}

export default ServerPage