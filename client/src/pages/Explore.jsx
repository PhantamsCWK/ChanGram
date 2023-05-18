import React from 'react'
import People from '../assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg'
import { useMediaQuery } from "../hooks"
import { BiSearchAlt2 } from 'react-icons/bi';

const Explore = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section className='flex flex-col justify-center items-center w-full'>
      <main className='flex flex-col gap-4 w-full sm:w-[99%] xl:w-[963px] my-5'>
        {
          isMobile && (
            <div class="input-group p-1">
              <input type="text" placeholder="Search…" class="input input-primary input-bordered w-full" />
              <button class="btn btn-primary btn-outline">
                <BiSearchAlt2 size={33} />
              </button>
            </div>
          )
        } 

        <div className='grid grid-cols-3 gap-1 w-full'>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
          <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80'>
            <img src={People} alt="" />
          </div>
        </div>
      </main>
    </section>
  )
}

export default Explore