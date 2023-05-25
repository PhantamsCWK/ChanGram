import React from 'react'

const Modal = ({ children, idModal}) => {
  return (
    <>
      <input type="checkbox" id={idModal} className="modal-toggle" />
      <label htmlFor={idModal} className="modal flex-col justify-normal pt-32 cursor-pointer">
        <label className="modal-box w-11/12 max-w-5xl relative sm:w-9/12 lg:w-7/12" htmlFor="">
          { children }
        </label>
      </label>
    </>
  )
}

export default Modal