import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className=' flex justify-center items-center h-[100vh] bg-gradient-to-tr from-[#570DF8] to-white'>
      <Outlet />
    </div>
  )
}

export default AuthLayout