import React from 'react'
import People from "../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { BsDot } from "react-icons/bs"

const SugestionFollower = () => {
  return (
    <div className='w-[320px] mx-auto mt-[16px] p-[16px]'>

                <div className='flex flex-row justify-start gap-3 p-2'>
                  <div className='w-[63px] h-[63px] rounded-[50%] aspect-square overflow-hidden'>
                    <img src={People} alt="" className='object-cover w-full h-full '/>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-sm font-semibold'>ChanChan</h2>
                    <h4 className='text-sm'>@Chandra</h4>
                  </div>
                </div>

                <div className='flex flex-col'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-md text-gray-500'>Sugestion for you</h2>
                    <button type='button' className='text-sm font-bold'>See all</button>
                  </div>

                  <div className='flex flex-row justify-start items-center gap-3 p-2'>
                    <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                      <img src={People} alt="" className='object-cover w-full h-full '/>
                    </div>

                    <div className='flex flex-col w-44'>
                      <h2 className='text-sm font-semibold'>ChanChan</h2>
                      <p className='text-xs'>@Chandra</p>
                    </div>

                    <div>
                      <button type='button' className='text-xs text-blue-600 font-medium'>Follow</button>
                    </div>
                  </div>
                  <div className='flex flex-row justify-start items-center gap-3 p-2'>
                    <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                      <img src={People} alt="" className='object-cover w-full h-full '/>
                    </div>

                    <div className='flex flex-col w-44'>
                      <h2 className='text-sm font-semibold'>ChanChan</h2>
                      <p className='text-xs'>@Chandra</p>
                    </div>

                    <div>
                      <button type='button' className='text-xs text-blue-600 font-medium'>Follow</button>
                    </div>
                  </div>
                  <div className='flex flex-row justify-start items-center gap-3 p-2'>
                    <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                      <img src={People} alt="" className='object-cover w-full h-full '/>
                    </div>

                    <div className='flex flex-col w-44'>
                      <h2 className='text-sm font-semibold'>ChanChan</h2>
                      <p className='text-xs'>@Chandra</p>
                    </div>

                    <div>
                      <button type='button' className='text-xs text-blue-600 font-medium'>Follow</button>
                    </div>
                  </div>

                </div>

                <div className='flex flex-col gap-3 mt-5'>
                  <div className='flex flex-row flex-wrap gap-[0.5px] justify-start items-center text-xs text-gray-500'>
                    <a href="">About me</a><BsDot/>
                    <a href="">Source</a><BsDot/>
                    <a href="">Github</a><BsDot/>
                    <a href="">Linked In</a><BsDot/>
                    <a href="">Instagram</a>
                  </div>
                  <span>
                    © 2023 Chandra Wijaya Kusuma
                  </span>
                </div>
            </div>
  )
}

export default SugestionFollower