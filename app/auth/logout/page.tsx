"use client"
import { deleteCookie } from 'cookies-next'
import React from 'react'

const LogOutPage = () => {

  const onLogin = () => {
    deleteCookie('apikey')
    window.location.replace('/auth/login')
  }

  return (
    <>
      <h1 className='text-gray-300 text-3xl font-semibold'>Are You Sure?</h1>
      <div className='bg-white p-4 flex flex-col gap-4 rounded-xl w-96'>
        <button onClick={ onLogin } className='text-sm text-white text-center bg-blue-500 hover:bg-blue-600 border-blue-700 border rounded p-4 uppercase duration-200'>
          LogOut
        </button>
      </div>
      <p className='text-gray-500 text-xs'>©️ 2023 <a href='https://kragleh.com'>kragleh.com</a></p>
    </>
  )
}

export default LogOutPage