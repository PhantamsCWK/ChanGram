import React from 'react'
import { SettingBar } from '../features/users'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '../hooks'

const Setting = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className='flex flex-col justify-start items-center pt-[4px] mx-2'>
      <h1 className='w-full text-left text-2xl font-semibold py-3'>
        Setting
      </h1>
      <div className=' flex flex-row pt-4 shadow-xl transition-shadow w-full sm:w-11/12'>
      {
        isMobile ? (
          <></>
        ) : (
          <SettingBar />
        )
      }

        <div className='p-5 sm:pr-16 w-full'>
            <Outlet />
        </div>

      </div>
    </section>
  )
}

export default Setting