import React from 'react'
import { Modal } from '../../../components'

const PostSettingModal = () => {
  return (
    <Modal idModal="post_setting_modal" width="">
      <div className="modal-box w-[375px]">
        <div className='flex flex-col justify-start items-center w-full'>
            
            <div className='m-auto  w-full'>
                Delete
            </div>
            <div className='m-auto  w-full'>
                Update
            </div>
            <div className='m-auto  w-full'>
                Create
            </div>
            <div className='m-auto  w-full'>
                Read
            </div>

        </div>
      </div>
    </Modal>
  )
}

export default PostSettingModal