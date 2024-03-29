"use client"
import axios from 'axios'
import React from 'react'
import { Server } from '../../lib/Server'

const SecureProxySettings = ({ server }: { server: Server }) => {

  const onProxy = () => {
    const portElement = document.getElementById('port') as HTMLSelectElement
    const domainElement = document.getElementById('userdomain') as HTMLInputElement
    const certElement = document.getElementById('cert') as HTMLTextAreaElement
    const certKeyElement = document.getElementById('certKey') as HTMLTextAreaElement
    const select = portElement.value.split(';')
    const host = select[0]
    const port = select[1]
    const domain = domainElement.value
    const cert = certElement.value
    const certKey = certKeyElement.value

    const formData = new FormData()
    formData.append('userdomain', domain)
    formData.append('cert', cert)
    formData.append('certKey', certKey)

    axios.post(`${process.env.tunnel}/api/proxy/${server.identifier}/secure/update`, formData, {
      headers: {
        'containerhost': host,
        'containerport': port,
        'Content-Type': 'multipart/form-data',
      }
    }).then(() => {
      alert('Secure proxy updated!')
    }).catch((err) => {
      alert(err)
    })
  }

  const onDelete = () => {
    axios.delete(`${process.env.tunnel}/api/proxy/${server.identifier}/delete`).then(() => {
      alert('Secure proxy deleted!')
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <section className='bg-gray-600 rounded'>
      <h1 className='bg-gray-800 rounded text-white uppercase p-3 text-sm'>SECURE PROXY SETTINGS</h1>
      <div className='p-3 flex flex-col gap-2'>
        <label htmlFor="port" className='text-xs text-white'>PORT</label>
        <select name="port" id="port" className='bg-gray-500 p-3 text-gray-300 text-sm rounded border-2 border-gray-400/50 hover:border-gray-400 duration-200'>
          {
            server.relationships.allocations.data.map((obj) => {
              return (
                <option key={ obj.attributes.id } value={ obj.attributes.ip + ';' + obj.attributes.port }>
                  { obj.attributes.port }
                </option>
              )
            })
          }
        </select>
        <label htmlFor="userdomain" className='text-xs text-white'>DOMAIN</label>
        <input type="text" name="userdomain" id="userdomain" className='bg-gray-500 p-3 text-gray-300 text-sm rounded border-2 border-gray-400/50 hover:border-gray-400 duration-200' />
        <label htmlFor="cert" className='text-xs text-white'>SSL CERTIFICATE</label>
        <textarea name="cert" id="cert" className='bg-gray-500 p-3 text-gray-300 text-sm rounded border-2 border-gray-400/50 hover:border-gray-400 duration-200'></textarea>
        <label htmlFor="certKey" className='text-xs text-white'>SSL KEY</label>
        <textarea name="certKey" id="certKey" className='bg-gray-500 p-3 text-gray-300 text-sm rounded border-2 border-gray-400/50 hover:border-gray-400 duration-200'></textarea>
        <div className='grid grid-cols-2 gap-2'>
          <button onClick={ onProxy } className='text-sm text-white text-center bg-blue-500 hover:bg-blue-600 border-blue-700 border rounded p-3 uppercase duration-200'>
            SECURE PROXY
          </button>
          <button onClick={ onDelete } className='text-sm text-white text-center bg-red-500 hover:bg-red-600 border-red-700 border rounded p-3 uppercase duration-200'>
            DELETE
          </button>
        </div>
      </div>  
    </section>
  )
}

export default SecureProxySettings