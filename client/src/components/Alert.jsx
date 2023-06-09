import React, { useEffect, useState } from 'react'
import { BiCircle, BiX } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Alert = ({ message, type="error", onClose }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => {
      setShow(false)
      onClose()
    }

  return (

    <>
    {
      show && (
        <div className={`alert alert-${type} drop-shadow-2xl shadow-lg`}>
          <BiCircle />
          <span className='text-sm'>
            { message }
          </span>
          <button className='btn btn-sm btn-error'>
            <BiX onClick={handleClose} size={25} className=' hover:cursor-pointer' />
          </button>
        </div>
      )
    }

    </>
  )
}

export default Alert