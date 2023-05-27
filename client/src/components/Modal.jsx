import React from 'react'

const Modal = ({ children, idModal}) => {
  return (
    <>
      <input type="checkbox" id={idModal} className="modal-toggle" />
      <label htmlFor={idModal} className="modal flex-col justify-normal pt-32 cursor-pointer">
        { children }
      </label>
    </>
  )
}

export default Modal