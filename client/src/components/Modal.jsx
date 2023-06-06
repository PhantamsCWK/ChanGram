import React from 'react'

const Modal = ({ children, idModal, onClose }) => {

  const handleCLose = () => {
    if(onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* <input type="checkbox" id={idModal} className="modal-toggle" />
      <label htmlFor={idModal} onClick={handleCLose} className="modal flex-col justify-normal pt-32 cursor-pointer">
        { children }
      </label> */}
      <dialog id={idModal} className="modal">

        {children}

        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCLose}>close</button>
        </form>
      </dialog>
    </>
  )
}

export default Modal