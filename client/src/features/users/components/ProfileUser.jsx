import React from 'react'
import People from '../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg';
import { useMediaQuery } from '../../../hooks';

const ProfileUser = () => {
  const isMobile = useMediaQuery("(max-width: 750px)");


  return (
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
  )
}

export default ProfileUser