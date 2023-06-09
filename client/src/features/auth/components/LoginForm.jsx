import React, { useState } from 'react';
import { Link, redirect, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';

import { useLoginMutation } from '../authApiSlice';
import { setCredentials } from '../authSlice';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const LoginForm = ({ setAlertMessage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    });

    const [ login, { isLoading } ] = useLoginMutation();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit = async (data) => {
        try {
            const { accessToken } = await login({ email: data.email, password: data.password }).unwrap();
            dispatch(setCredentials(accessToken));
            navigate("/")
            reset()
        } catch (error) {
            if(error.status === 400){ 
                setError("email", { type: "manual", message: "email or password wrong" }, { shouldFocus: true })
                setError("password", { type: "manual", message: "email or password wrong" }, {})
                return
            } else if(error.status === 429){
                setError("root", { type: "manual", message: error.data.message })
                setAlertMessage(error.data.message)
            }
        }
    }

    return (
        <>
            <form className='form-control gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='join join-vertical'>
                    <input 
                        type="text" 
                        placeholder="Email" { ...register("email") } 
                        className={`input input-bordered ${errors.email || errors.root ? " border-red-500 text-red-500 focus:outline-red-500" : "input-primary text-[#570DF8]" } w-full text-sm font-medium`} 
                        onChange={() => clearErrors(["email"])}
                        required 
                    />
                    {errors.email && (<span className='italic text-red-500 text-sm'>*{errors.email.message}</span>)}
                </div>
                
                <div className='join'>
                    <input 
                        type={isPasswordVisible ? "text" : "password"} 
                        placeholder="Password" { ...register("password") } 
                        className={`join-item input input-bordered ${errors.password || errors.root ? " border-red-500 text-red-500 focus:outline-red-600" : "input-primary text-[#570DF8]" } text-sm font-medium`} 
                        onChange={() => clearErrors(["password"])}
                        required 
                    />
                    <span 
                        onClick={() => setIsPasswordVisible(prev => !prev)} 
                        className={`join-item border flex justify-center items-center  ${errors.password || errors.root ? "border-red-500" : "border-[#570DF8]"} bg-white hover:cursor-pointer w-12`}
                        
                        >
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
                    <Link to="/register" className='text-[#570DF8] font-semibold'>
                    account ?
                    </Link>
                </span>
            </form>
        </>
    )
}

export default LoginForm