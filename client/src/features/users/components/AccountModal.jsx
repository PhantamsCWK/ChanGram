import React from 'react';
import { Modal } from '../../../components';
import { useForm } from 'react-hook-form';
import * as zod from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const usernameSchema = zod.object({
    name: zod.string().min(2),
    password: zod.string().nonempty()
});

const UsernameModal = ({ user }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ 
        defaultValues: {
            name: user.username,
            password: ""
        },
        resolver: zodResolver(usernameSchema)
    });
    const onSubmit = ( data) => {
        console.log(data);
    }

    return (
      <Modal idModal="username_change_modal">
          <div method='dialog' className="modal-box w-96 max-w-5xl">
          <div className=' flex flex-col gap-2 items-center'>
            <h1 className=' text-2xl'>Change your username</h1>
            <h5 className='text-sm'>Enter you new username and you existing password </h5>
            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col justify-start gap-3 w-full mt-3'>
                <div className='flex justify-start flex-col w-full'>
                    <div className='text-sm font-semibold lowercase'>
                        <span>Name</span>
                    </div>
        
                    <div className='flex flex-col w-full'>
                        <input
                        type='text'
                        {...register("name")}
                        className=' outline-none bg-[#e7d8ff] p-1' 
                        />
                        {errors.name && (<span className='italic text-red-500 text-sm'>*{errors.name.message}</span>)}
                    </div>
                </div>
                <div className='flex justify-start flex-col w-full'>
                    <div className='text-sm font-semibold lowercase'>
                        <span>Current Password</span>
                    </div>
        
                    <div className='flex flex-col w-full'>
                        <input
                        type='password'
                        {...register("password")}
                        className=' outline-none bg-[#e7d8ff] p-1' 
                        />
                        {errors.name && (<span className='italic text-red-500 text-sm'>*{errors.name.message}</span>)}
                    </div>
                </div>
            </form>
          </div>
          </div>
      </Modal>
    )
}
const EmailModal = ({ user }) => {
    return (
      <Modal idModal="email_change_modal">
          <div method='dialog' className="modal-box w-96 max-w-5xl">
            <div className=' flex flex-col justify-start items-center text-center w-full gap-4'>
                <h1 className='text-2xl'>Verify email address</h1>
                <h5 className='text-sm'>we need verify you current email <span className='font-semibold'>{user.email}</span> in order to change it </h5>
                <button className=' btn btn-primary btn-sm'>send verifycation code</button>
            </div>
          </div>
      </Modal>
    )
}
const PhoneModal = ({ user }) => {
    return (
      <Modal idModal="phone_change_modal">
          <div method='dialog' className="modal-box w-96 max-w-5xl">
            <div className=' flex flex-col justify-start items-center text-center w-full gap-4'>
                <h1 className='text-2xl'>Enter phone number</h1>
                <h5 className='text-sm'> you will receive sms with verifycation code </h5>
                <form className=" w-full flex justify-between bg-[#e7d8ff] p-1">
                    <input type="text" className=' w-full outline-none bg-transparent' />
                    <button className='btn btn-sm btn-primary'>send</button>
                </form>
            </div>
          </div>
      </Modal>
    )
}
const AccountModal = ({ user }) => {
  return (
    <>
        <UsernameModal user={user} />
        <EmailModal user={user} />
        <PhoneModal user={user} />
    </>
  )
}

export default AccountModal