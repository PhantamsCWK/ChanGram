import React, { useState } from 'react';
import { redirect, Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';

import { useRegisterMutation } from '../authApiSlice';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset , formState: { errors } } = useForm();
    const [ signIn, { isLoading, isError } ] = useRegisterMutation();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);

    const onSubmit = async (data) => {
      if (data.password !== data.confirm) {
        console.log("error")
        return false
      }

      try {
        await signIn({ email: data.email, username: data.username, password: data.password })
        redirect("/login")
      } catch (error) {
        console.log(error)
      }
      return reset()
    }

    if (isError) {
        return (
            <div className=''>
                Internal server error
            </div>
        )
    }

    return (
        <form className='form-control gap-5' onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="Email" { ...register("email") } className="input input-bordered input-primary w-full text-purple-800" required />
            
            <input type="text" placeholder="Username" { ...register("username") } className="input input-bordered input-primary w-full text-purple-800" required/>
            
            <div className='input-group'>
                <input type={isPasswordVisible ? "text" : "password"} placeholder="Password" { ...register("password") } className="input input-bordered input-primary w-full text-purple-800" required />
                <span onClick={() => setIsPasswordVisible(prev => !prev)} className='border-t border-b border-r border-purple-800 bg-white hover:cursor-pointer'>
                {
                isPasswordVisible 
                ? <BsEyeSlash size={20} color='#570DF8' />
                : <BsEye size={20} color='#570DF8' />
                }
                </span>
            </div>

            <div className='input-group'>
              <input type={isPasswordConfirmVisible ? "text" : "password"} placeholder="Confirm Password" { ...register("confirm") } className="input input-bordered input-primary w-full text-purple-800" required />
              <span onClick={() => setIsPasswordConfirmVisible(prev => !prev)} className='border-t border-b border-r border-purple-800 bg-white hover:cursor-pointer'>
              {
                isPasswordConfirmVisible 
                ? <BsEyeSlash size={20} color='#570DF8' />
                  : <BsEye size={20} color='#570DF8' />
              }
              </span>
            </div>

            <button type='submit' className="btn btn-outline btn-primary"> { isLoading ? <BeatLoader /> : "Submit" }</button>
            <span className=' text-gray-700'>
                Already have&nbsp;
                <Link to="/login" className='text-purple-800 font-semibold'>
                account ?
                </Link>
            </span>
        </form>
    )
}

export default RegisterForm