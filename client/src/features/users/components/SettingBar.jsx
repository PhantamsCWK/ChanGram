import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SettingBar = () => {
  const location = useLocation();

  return (
    <aside className='min-w-[176px]'>
        <nav className='flex flex-col justify-start items-start w-full h-[530px]'>
            <Link to="/account/my" className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/my" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full`}>
              My Account
            </Link>
            <Link to="/account/edit" className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/edit" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full`}>
              Profile
            </Link>
            <div to="/account/security" className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/security" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full cursor-not-allowed`}>
              Security
            </div>
            <div className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/email" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full cursor-not-allowed`}>
              Email Notification
            </div>
            <div className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/language" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full cursor-not-allowed`}>
              Languages
            </div>
            <div className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/system" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full cursor-not-allowed`}>
              System
            </div>
            <div className='w-full h-[1px] bg-gray-300 my-1' />
            <div className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/help" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full cursor-not-allowed`}>
              Help
            </div>
            <div className={`pl-8 w-11/12 py-2 ${location.pathname === "/account/about" ? "bg-primary text-white" : "hover:bg-[#e7d8ff]"} rounded-e-full cursor-not-allowed`}>
              About
            </div>
        </nav>
    </aside>
  )
}

export default SettingBar