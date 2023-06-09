import React, { useState } from 'react'
import { LoginForm } from '../features/auth'
import Alert from '../components/Alert'

const Login = () => {
  const [alertMessage, setAlertMessage] = useState("")

  const deleteMessage = () => {
    setAlertMessage("")
  };


  return (
    <div className='flex flex-col justify-center items-center gap-5 max-w-6xl'>
      {
        alertMessage && <Alert message={alertMessage} type='error' onClose={deleteMessage} />
      }
      <div className='px-7 py-10 bg-white bg-opacity-40 drop-shadow-2xl shadow-2xl rounded-2xl max-w-xs'>
        <LoginForm setAlertMessage={setAlertMessage} />
      </div>
    </div>
  )
}

export default Login