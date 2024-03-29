"use client"
import axios from 'axios'
import React from 'react'
import { Server } from '../../lib/Server'

const ProxySettings = ({ server }: { server: Server }) => {

  const onProxy = () => {
    const portElement = document.getElementById('port') as HTMLSelectElement
    const domainElement = document.getElementById('domain') as HTMLInputElement
    const select = portElement.value.split(';')
    const host = select[0]
    const port = select[1]
    const domain = domainElement.value

    axios.post(`${process.env.tunnel}/api/proxy/${server.identifier}/update`, null, {
      headers: {
        'containerhost': host,
        'containerport': port,
        'userdomain': domain
      }
    }).then(() => {
      alert('Proxy updated!')
    }).catch((err) => {
      alert(err)
    })

  }

  const onDelete = () => {
    axios.delete(`${process.env.tunnel}/api/proxy/${server.identifier}/delete`).then(() => {
      alert('Proxy deleted!')
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <section className='bg-gray-600 rounded mb-auto'>
      <h1 className='bg-gray-800 rounded text-white uppercase p-3 text-sm'>PROXY SETTINGS</h1>
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
        <label htmlFor="domain" className='text-xs text-white'>DOMAIN</label>
        <input type="text" name="domain" id="domain" className='bg-gray-500 p-3 text-gray-300 text-sm rounded border-2 border-gray-400/50 hover:border-gray-400 duration-200' />
        <div className='grid grid-cols-2 gap-2'>
          <button onClick={ onProxy } className='text-sm text-white text-center bg-blue-500 hover:bg-blue-600 border-blue-700 border rounded p-3 uppercase duration-200'>
            PROXY
          </button>
          <button onClick={ onDelete } className='text-sm text-white text-center bg-red-500 hover:bg-red-600 border-red-700 border rounded p-3 uppercase duration-200'>
            DELETE
          </button>
        </div>
      </div>  
    </section>
  )
}

export default ProxySettings