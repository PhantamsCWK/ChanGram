import React from 'react'
import { RegisterForm, LoginForm } from "../features/auth"

const Account = ({ isRegister }) => {
  return (
    <div className=' flex justify-center items-center h-[100vh] bg-gradient-to-tr from-[#570DF8] to-white'>
      <div className=' py-10 px-8 rounded-xl bg-white bg-opacity-40'>
        {
          isRegister
          ? <RegisterForm />
          : <LoginForm />
        }
      </div>
    </div>
  )
}

export default Account