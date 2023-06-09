import React from 'react'
import { RegisterForm } from "../features/auth"



const Register = ({ isRegister }) => {
  

  return (
  <div className='px-7 py-10 bg-white bg-opacity-40 drop-shadow-2xl shadow-2xl rounded-2xl'>
    <RegisterForm />
  </div>
  )
}

export default Register