import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from "react-icons/bs"

const Account = () => {
  const [isSignIn, setSignIn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false)

  return (
    <section className='flex justify-center items-center w-[100%] h-[100vh]'>
      <div className='border border-gray-300 rounded-lg w-96 p-10'>
        <form className='form-control gap-5' onSubmit={() => alert("submit")}>
          <input type="email" placeholder="Email" className="input input-bordered input-primary w-full text-purple-800" />
          {
            isSignIn && (
              <input type="text" placeholder="Username" className="input input-bordered input-primary w-full text-purple-800" />
            )
          }
          
          <div className='input-group'>
            <input type={isPasswordVisible ? "text" : "password"} placeholder="Confirm Password" className="input input-bordered input-primary w-full text-purple-800" />
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
                <input type={isPasswordConfirmVisible ? "text" : "password"} placeholder="Confirm Password" className="input input-bordered input-primary w-full text-purple-800" />
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

          <button type='submit' className="btn btn-outline btn-primary">Button</button>
          <span className=' text-gray-500'>
            {
              isSignIn ? "Already have " : "Doesnt have an "
            }
            <span onClick={() => setSignIn((prev) => !prev )} className='text-purple-800 font-semibold hover:cursor-pointer'>
              account ?
            </span>
          </span>
        </form>
      </div>
    </section>
  )
}

export default Account