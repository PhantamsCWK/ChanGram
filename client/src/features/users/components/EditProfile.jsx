import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { useEditUserMutation, useGetUserQuery } from '../usersApiSlice';
import { useAuth } from '../../../hooks';
import UserImageCropper from './UserImageCropper';

const schema = zod.object({
  name: zod.string().nonempty(),
  bio: zod.string(),
  gender: zod.enum(["men", "women", "pikachu", ""])
});



const EditForm = ({ user }) => {
  const oldData = {
    name: user.name,
    bio: user.bio,
    gender: user.gender,
  }
  const [ editUser, { isLoading, isSuccess, reset } ] = useEditUserMutation();
  const { register, handleSubmit, watch, formState: { defaultValues, errors }, reset: formReset }  = useForm({
    defaultValues: oldData,
    resolver: zodResolver(schema)
  });


  const isAnyStateChange = watch([ "name", "bio", "gender" ]).some((val, i) => 
    val !== Object.values(defaultValues)[i]
  )

  const sleep = async (ms) => {
    await new Promise((resolve, reject) => setTimeout(resolve, ms))
}
  
  const onSubmit = async (data) => {
    if(JSON.stringify(oldData) !== JSON.stringify(data)){
      editUser({ 
        username: user.username, 
        data: {...data }
      })
      await sleep(3000);
      reset();
    }
  }

  return (
        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col justify-start gap-5'>
        {/* NAME */}
          <div className='flex justify-start flex-col md:flex-row md:gap-8'>
            <div className=' w-16 md:text-right'>
              <span>Name</span>
            </div>

            <div className='flex flex-col w-60 sm:w-96 md:w-60 lg:w-96'>
              <input
                type='text'
                {...register("name")}
                className='input input-primary input-bordered input-sm w-full px-1' 
              />
              {errors.name && (<span className='italic text-red-500 text-sm'>*{errors.name.message}</span>)}
            </div>
          </div>


        {/* BIO */}
          <div className='flex justify-start flex-col md:flex-row md:gap-8'>
            <div className=' w-16 md:text-right'>
              <span>Bio</span>
            </div>

            <div className='flex flex-col w-60 sm:w-96 md:w-60 lg:w-96'>
              <textarea
                {...register("bio")}
                className='textarea textarea-primary textarea-bordered textarea-md w-full p-1' />
              {errors.bio && (<span className='italic text-red-500 text-sm'>*{errors.bio.message}</span>)}
            </div>
          </div>
            

        {/* GENDER */}
          <div className='flex justify-start flex-col md:flex-row md:gap-8'>
            <div className=' w-16 md:text-right'>
              <span>Gender</span>
            </div>

            <div className='flex flex-col w-60 sm:w-96 md:w-60 lg:w-96'>
              <select
                {...register("gender")} 
                className="select select-primary select-bordered select-sm w-full px-1">
                <option value="">Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="pikachu">Pikachu</option>
              </select>
              {errors.gender && (<span className='italic text-red-500 text-sm'>*{errors.gender.message}</span>)}
            </div>
          </div>
          <div className=''>
          { isAnyStateChange && <button className='btn btn-md btn-primary text-white'>save</button> }
          { isLoading && <button className='btn btn-md btn-primary text-white'>loading</button>}
          { isSuccess && <button className='btn btn-md btn-success text-white'>Success</button>}
          </div>
        </form>
  )
}

const EditProfile = () => {
  const { username } = useAuth();

  const { data: user, isFetching, error } = useGetUserQuery(username);

  return user && (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-3 border border-gray-300 p-5 rounded-xl'>

        <div className='flex justify-start items-center gap-5 md:gap-12'>
          <UserImageCropper user={user} />
          
          <div className='flex flex-col justify-start gap-2'>
            <span className=' text-2xl sm:text-4xl font-semibold'>{user?.username}</span>
            <span className=' text-md sm:text-lg'>{user?.name}</span>
          </div>
        </div>

        <div className=' -top-10 bg-gray-300 h-[1px] w-full'/>

        <EditForm user={user} />
      </div>
    
    </div>
  )
}

export default EditProfile