import React from 'react'
import { Link } from 'react-router-dom'

const SettingBar = () => {
  return (
    <aside className=' col-span-2'>
        <nav className='flex flex-col justify-start items-start w-full h-[530px]'>
            <Link to="/account/edit" className=' pl-8 w-11/12 py-2 hover:bg-[#e7d8ff] rounded-e-full'>
              Profile
            </Link>
            <Link to="/account/security" className=' pl-8 w-11/12 py-2 hover:bg-[#e7d8ff]  rounded-e-full'>
              Security
            </Link>
            <div className=' pl-8 w-11/12 py-2 hover:bg-[#e7d8ff]  rounded-e-full'>
              Email Notification
            </div>
            <div className=' pl-8 w-11/12 py-2 hover:bg-[#e7d8ff]  rounded-e-full'>
              Languages
            </div>
            <div className=' pl-8 w-11/12 py-2 hover:bg-[#e7d8ff]  rounded-e-full'>
              System
            </div>
            <div className='w-full h-[1px] bg-gray-300 my-1' />
            <div className=' pl-8 w-11/12 py-2 hover:bg-[#e7d8ff]  rounded-e-full'>
              Help
            </div>
            <div className=' pl-8 w-11/12 py-2 hover:bg-[#e7d8ff]  rounded-e-full'>
              About
            </div>
        </nav>
    </aside>
  )
}

export default SettingBar