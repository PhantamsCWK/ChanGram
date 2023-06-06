import React, { useState } from 'react';
import { Link, redirect } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';

import { useLoginMutation } from '../authApiSlice';
import { setCredentials } from '../authSlice';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset , formState: { errors } } = useForm();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [ login, { isLoading, isError } ] = useLoginMutation();

    const onSubmit = async (data) => {
        try {
            const { accessToken } = await login({ email: data.email, password: data.password }).unwrap();
            dispatch(setCredentials(accessToken));
            redirect("/")
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

            <button type='submit' className="btn btn-outline btn-primary"> { isLoading ? <BeatLoader /> : "Submit" }</button>
            <span className=' text-gray-700'>
                Doesnt have an&nbsp;
                <Link to="/register" className='text-purple-800 font-semibold'>
                account ?
                </Link>
            </span>
        </form>
    )
}

export default LoginForm