import React from 'react'
import People from "../assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { BsChevronLeft, BsCollectionPlay, BsGrid3X3, BsPersonVideo } from "react-icons/bs";
import { useMediaQuery } from '../hooks';

const Profile = () => {
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <section className='flex flex-col-reverse'>
      <main className='flex flex-col align items-center mt-10 md:px-7 md:mx-16'>

        <header className='flex flex-col gap-5 w-full p-3 md:gap-10'>
          <div className='flex flex-row justify-between items-center gap-10'>
            <div className='avatar'>
              <div className='w-[80px] rounded-full ring ring-purple-700 ring-offset-2 sm:w-32 md:w-40'>
                <img src={People} alt="" />
              </div>
            </div>

            <div className='flex flex-col gap-2 w-full h-fit'>
              <div className="text-2xl">Chandra Wijaya Kusuma</div>
              <div className='flex flex-row gap-5'>
                <button className="btn btn-ghost btn-sm bg-gray-200">Follow</button>
                <button className="btn btn-ghost btn-sm bg-gray-200">Send Message</button>
              </div>
              {
                !isMobile && (
                  <div className=''>
                    <h1>Chandra wijaya kusuma</h1>
                    <h3>Programmer</h3>
                    <p>Cycling, fitness</p>
                  </div>
                )
              }
            </div>
          </div>

          {/* Bio */}
          {
            isMobile && (
              <div className='w-full'>
                <h1>Chandra wijaya kusuma</h1>
                <h3>Programmer</h3>
                <p>Cycling, fitness</p>
              </div>
            )
          }

          {/* Stories */}
          <div className='w-[470px] lg:w-[630px]'>
            <ul className='flex gap-4 overflow-x-auto p-2'>
                <li className='avatar'>
                    <div className='w-[60px] rounded-full md:w-20'>
                      <img src={People} alt="" className=''/>
                    </div>
                </li>
            </ul>
          </div>
        </header>

        {/* Follower */}
        <div className="flex flex-row justify-evenly items-center w-full border-t border-b border-gray-300">
          <div className="flex flex-col items-center justify-center p-2 w-20">
            <span className='text-sm font-semibold'>102</span>
            <span className='text-sm capitalize text-gray-600'>Post</span> 
          </div>
          <button className="flex flex-col items-center justify-center p-2 w-20">
            <span className='text-sm font-semibold'>102</span>
            <span className='text-sm capitalize text-gray-600'>Follower</span> 
          </button>
          <button className="flex flex-col items-center justify-center p-2 w-20">
            <span className='text-sm font-semibold'>102</span>
            <span className='text-sm capitalize text-gray-600'>Following</span> 
          </button>
          
        </div>

        {/* User Post Bar */}
        <div className="flex flex-row justify-evenly items-center w-full">
          <button className="btn btn-ghost"><BsGrid3X3 size={24} /></button>
          <button className="btn btn-ghost"><BsCollectionPlay size={24} /></button>
          <button className="btn btn-ghost"><BsPersonVideo size={24} /></button>
        </div>

        {/* User Posts */}
        <div className='grid grid-cols-3 gap-1 w-full'>
          <div className='overflow-hidden h-44 sm:h-56 md:h-52 lg:h-64 xl:h-72'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-52 lg:h-64 xl:h-72'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-52 lg:h-64 xl:h-72'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-52 lg:h-64 xl:h-72'>
            <img src={People} alt="" />
          </div>
        </div>
      </main>

      <div className='flex flex-row justify-start items-center p-2 border-b border-gray-300'>
        <BsChevronLeft size={30} />
        <span className='w-full text-center'>Chandra WIjaya Kusuma</span>
      </div>
    </section>
  )
}

export default Profile