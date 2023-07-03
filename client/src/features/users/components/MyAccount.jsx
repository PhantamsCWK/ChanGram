import React from 'react'


import { useAuth } from '../../../hooks'
import { useGetUserQuery } from '../usersApiSlice';
import Profile from "../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { Link } from 'react-router-dom';
import AccountModal from './AccountModal';


const MyAccount = () => {

  const { id, username } = useAuth();

  const { data: user, isFetching, error } = useGetUserQuery(username);

  if(error) {
    console.log(error);
    return;
  }

  return user && (
    <>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-3 border border-gray-300 p-5 rounded-xl'>
          <div className='flex justify-start gap-5 md:gap-12'>
                <div className='overflow-hidden w-20 h-20 object-cover rounded-full ' >
                  <img src={user?.photoPath ? user.photoPath : Profile } alt="" />
                </div>

                <div className='w-38'>
                  <span>{user?.username}</span>
                  <br/>
                  <Link to="/account/edit" className=' text-primary border-none font-semibold'> Change Photo Profile </Link>
                </div>
          </div>
          <div className=' -top-10 bg-gray-300 h-[1px] w-full'/>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
                <h1 className=' font-bold'>Username</h1>
                <span>{user.username}</span>
            </div>
            <button onClick={() => window.username_change_modal.showModal()} className='btn btn-primary btn-sm'>
              Edit
            </button>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
                <h1 className=' font-bold'>Email</h1>
                <span className='align-middle'>{user.email.substring(0, 4) + "*".repeat(user.email.length - 4)}</span>
            </div>
            <button onClick={() => window.email_change_modal.showModal()} className='btn btn-primary btn-sm'>
              Edit
            </button>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
                <h1 className='font-bold'>Phone</h1>
                <span>{user.phone ? user.phone.substr(0, 4) + "*".repeat(10) : "null"}</span>
            </div>
            <button onClick={() => window.phone_change_modal.showModal()} className='btn btn-primary btn-sm'>
              Edit
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-3 border border-gray-300 p-5 rounded-xl'>
          <div className='flex flex-col'>
            <h1 className=' font-bold'>Name</h1>
            <span>{user.name}</span>
          </div>
          <div className='flex flex-col'>
            <h1 className=' font-bold'>Gender</h1>
            <span>{user.gender}</span>
          </div>
          <div className='flex flex-col'>
            <h1 className=' font-bold'>Bio</h1>
            <span>{user.bio}</span>
          </div>
          <Link to="/account/edit" className='btn btn-primary btn-sm w-14'>
            Edit
          </Link>
        </div>

        <div className='flex flex-col gap-3 border border-gray-300 p-5 rounded-xl'>
          <h4 className=' text-md font-bold'>Password and Authetication</h4>
          <button className='btn btn-error w-52'>Change Password</button>
        </div>
      </div>
      <AccountModal user={user} />
    </>
  )
}
export default MyAccount