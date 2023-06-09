import React, { useState } from 'react';
import { redirect, Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';

import { useRegisterMutation } from '../authApiSlice';

const registerSchema = z.object({
  username: z.string().trim().min(3),
  email: z.string().trim().email(5),
  password: z.string().min(8),
  confirm: z.string().nonempty()
})
.refine((data) => data.password === data.confirm, {
  message: "confirm password doens`t match",
  path: ["confirm"]
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: ""
    },
      resolver: zodResolver(registerSchema)
    });
    const [ signIn, { isLoading } ] = useRegisterMutation();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);

    const onSubmit = async (data) => {
      try {
        await signIn({ email: data.email, username: data.username, password: data.password }).unwrap()
        navigate("/login")
        reset()
      } catch (error) {
        if(error.status === 400){
          error.data?.errors.forEach((element, i) => {
            setError(element.param, { type: "manual", message: element.msg })
          });
        }
      }
    }

    return (
        <form className='form-control gap-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='join join-vertical'>
            <input type="email" placeholder="Email" { ...register("email") } className={`input input-bordered ${errors.email || errors.root ? " border-red-500 text-red-500 focus:outline-red-500" : "input-primary text-[#570DF8]" } w-full text-sm font-medium`} required />

            {errors.email && (<span className='italic text-red-500 text-sm'>*{errors.email.message}</span>)}
          </div>

          <div className='join join-vertical'>
            <input type="text" placeholder="Username" { ...register("username") } className={`input input-bordered ${errors.username || errors.root ? " border-red-500 text-red-500 focus:outline-red-500" : "input-primary text-[#570DF8]" } w-full text-sm font-medium`} required/>

            {errors.username && (<span className='italic text-red-500 text-sm'>*{errors.username.message}</span>)}
          </div>
            
          <div className='flex flex-col justify-start'>
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
                className={`join-item border flex justify-center items-center  ${errors.password || errors.root ? "border-red-500 text-red-500" : "border-[#570DF8] text-[#570DF8]"} bg-white hover:cursor-pointer w-12`}
                        
              >
              {
                isPasswordVisible 
                ? <BsEyeSlash size={20} color='#570DF8' />
                : <BsEye size={20} color='#570DF8' />
              }
              </span>
            </div>

            {errors.password && (<span className='italic text-red-500 text-sm'>*{errors.password.message}</span>)}
          </div>

          <div className='flex flex-col justify-start'>
            <div className='join'>
              <input 
                type={isPasswordConfirmVisible ? "text" : "password"} 
                placeholder="Password" { ...register("confirm") } 
                className={`join-item input input-bordered ${errors.confirm || errors.root ? " border-red-500 text-red-500 focus:outline-red-600" : "input-primary text-[#570DF8]" } text-sm font-medium`} 
                onChange={() => clearErrors(["confirm"])}
                required 
              />
              <span 
                onClick={() => setIsPasswordConfirmVisible(prev => !prev)} 
                className={`join-item border flex justify-center items-center  ${errors.confirm || errors.root ? "border-red-500 text-red-500" : "border-[#570DF8] text-[#570DF8]"} bg-white hover:cursor-pointer w-12`}
                        
              >
              {
                isPasswordConfirmVisible
                ? <BsEyeSlash size={20} />
                : <BsEye size={20} />
              }
              </span>
            </div>

            {errors.confirm && (<span className='italic text-red-500 text-sm'>*{errors.confirm.message}</span>)}
          </div>

            <button type='submit' className="btn btn-outline btn-primary"> { isLoading ? <BeatLoader /> : "Submit" }</button>
            <span className=' text-gray-700'>
                Already have&nbsp;
                <Link to="/login" className='text-[#570DF8] font-semibold'>
                account ?
                </Link>
            </span>
        </form>
    )
}

export default RegisterForm