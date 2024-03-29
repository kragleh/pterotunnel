import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import Copyright from '../components/Copyright'
import Header from '../components/header/Header'
import ServerList from '../components/home/ServerList'
import { User } from '../lib/User'

const HomePage = async () => {
  const cookieStore = cookies()
  const apikey = cookieStore.get('apikey')?.value

  try {
    const res = await axios.get(`${ process.env.panel }/api/client/account`, { 
      headers: { 
        'Authorization': `Bearer ` + apikey
      } 
    })

    const user: User = res.data.attributes

    return (
      <>
        <Header user={ user } />
        <main className='max-w-[1200px] mx-auto w-full p-4 flex flex-col gap-4'>
          <ServerList />
        </main>
        <Copyright />
      </>
    )
  } catch (err) {
    redirect('/auth/login')
  }
}

export default HomePage