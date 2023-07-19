"use client"
import { setCookie } from 'cookies-next'
import Link from 'next/link'
import React from 'react'
import Copyright from '../../../components/Copyright'

const LoginPage = () => {

  const onLogin = () => {
    const apikeyElement = document.getElementById('apikey') as HTMLInputElement
    const apikey = apikeyElement.value

    if (!apikey) {
      return
    }

    setCookie('apikey', apikey)
    window.location.replace('/')
  }

  return (
    <>
      <h1 className='text-gray-300 text-3xl font-semibold'>Login To Continue</h1>
      <div className='bg-white p-4 flex flex-col gap-4 rounded-xl w-96'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="apikey" className='text-black text-xs uppercase'>User Key</label>
          <input type="text" name="apikey" id="apikey" className='p-3 text-sm bg-blue-100 border-2 border-gray-300 rounded' />
        </div>
        <button onClick={ onLogin } className='text-sm text-white text-center bg-blue-500 hover:bg-blue-600 border-blue-700 border rounded p-4 uppercase duration-200'>
          LogIn
        </button>
        <Link href={'#'} className='uppercase text-center text-gray-500 text-sm'>
          How to login?
        </Link>
      </div>
      <Copyright />
    </>
  )
}

export default LoginPage