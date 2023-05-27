import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';

import { useLoginMutation, useRegisterMutation } from '../authApiSlice';
import { setCredentials } from '../authSlice';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset , formState: { errors } } = useForm();

    const [isSignIn, setSignIn] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);

    const [ login, { isLoading, isError } ] = useLoginMutation();
    const [ signin ] = useRegisterMutation();

    const changeForm = () => {
        setSignIn(prev => !prev)
        reset();
        return true;
    }

    const onSubmit = (data) => {
        if(isSignIn) {
            handleSignin(data)
        } else {
            handelLogin(data)
        }
        return reset()
    }

    const handelLogin = async (data) => {
        try {
            const { accessToken } = await login({ email: data.email, password: data.password }).unwrap();
            dispatch(setCredentials(accessToken));
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignin = async (data) => {
        if (data.password !== data.confirm) {
            console.log("error")
            return false
        }
        console.log("register")
        try {
            await signin({ email: data.email, username: data.username, password: data.password })
            setSignIn(false)
        } catch (error) {
            console.log(error)
        }
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
            {
                isSignIn && (
                <input type="text" placeholder="Username" { ...register("username") } className="input input-bordered input-primary w-full text-purple-800" required/>
                )
            }
            
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

            {
                isSignIn && (
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
                )
            }

            <button type='submit' className="btn btn-outline btn-primary"> { isLoading ? <BeatLoader /> : "Submit" }</button>
            <span className=' text-gray-500'>
                {
                isSignIn ? "Already have " : "Doesnt have an "
                }
                <span onClick={changeForm} className='text-purple-800 font-semibold hover:cursor-pointer'>
                account ?
                </span>
            </span>
        </form>
    )
}

export default LoginForm