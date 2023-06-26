import React from 'react'
import { SettingBar } from '../features/users'
import { Outlet } from 'react-router-dom'

const Setting = () => {

  return (
    <section className='pt-[4px] mx-1 lg:mx-[46px]'>
      <h1 className=' text-2xl font-semibold py-3'>
        Setting
      </h1>
      <div className='grid grid-cols-8 pt-4 shadow-xl transition-shadow hover:shadow-primary hover:shadow-xl '>

        <SettingBar />

        <div className='col-span-6 p-5 border border-red-500'>
            <Outlet />
        </div>

      </div>
    </section>
  )
}

export default Setting