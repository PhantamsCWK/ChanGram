import React from 'react'
import People from "../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";

const arr = [1,2,3,4,5,6,7]

const StoryBar = () => {
  return (
    <div className='flex flex-col items-center justify-start'>
      <div className='w-[483px] mt-[16px] py-[16px] lg:w-[630px] xl:w-[630px]'>
        <ul className='flex gap-4 overflow-x-auto p-2'>
          {
            arr.map(val =>(
              <li key={val} className='avatar'>
                <div className='w-[60px] rounded-full ring-[2px] ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src={People} alt="" className=''/>
                </div>
              </li>
            )) 
          }
          </ul>
        </div>
      </div>
  )
}

export default StoryBar