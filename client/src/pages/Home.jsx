import React from 'react'
import Aurora from "../assets/aurora-borealis-moon-night-ce-3840x2400.jpg";
import People from "../assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { BiBookmark, BiDotsHorizontalRounded, BiPaperPlane } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import { bio } from '../utils';

const arr = [1,2,3,4,5,6,7];


const Home = () => {
  return (
    <section className='pt-[4px] mx-1 lg:mx-[46px]'>
      <main className='grid grid-cols-5 pt-4'>

      {/* Home page */}
        <div className='col-span-5 w-full xl:col-span-3 xl:mr-[64px] xl:max-w-[630px]'>

          {/* Stories bar */}
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

          {/* Posts Section */}
          <div className='flex flex-col justify-start items-center gap-5 py-3'>
            <article className=' flex flex-col gap-3 w-[470px]'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row justify-start items-center gap-2 px-2 text-sm '>
                  <div className='avatar'>
                      <div className='w-[30px] rounded-full ring-[1.5px] ring-primary ring-offset-base-100 ring-offset-2'>
                        <img src={People} alt="" className=''/>
                      </div>
                  </div>
                  <h1>Chandra wijaya Kusuma</h1>
                  <BsDot/>
                  <h5>5 hari</h5>
                </div>
                <button type='button' onClick={() => alert("report")}><BiDotsHorizontalRounded size="25px"/></button>
              </div>

              <div><img src={Aurora} alt="" className='rounded-md' /></div>

              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row justify-start items-center gap-2'>
                  <button type='button' onClick={() => alert("report")}><AiOutlineHeart size="28px"/></button>
                  <button type='button' onClick={() => alert("report")}><AiOutlineMessage size="28px"/></button>
                  <button type='button' onClick={() => alert("report")}><BiPaperPlane size="28px"/></button>
                </div>
                <button type='button' onClick={() => alert("report")}><BiBookmark size="28px"/></button>
              </div>

              <div className='px-1 text-sm'>
                <h4>like</h4>
              </div>

              <div className='px-1 text-sm'>
                  {
                    bio.length <= 120
                    ? (<p> {bio} </p>)
                    : (
                    <p>
                      {bio.substring(0,125)}
                      ...
                      <button type='button' className='text-gray-400'>more</button>
                    </p> 
                    )
                  }
              </div>

              <span className=' bg-gray-300 w-full h-[1px]'></span>

            </article>
          </div>

        </div>

      {/* Sugestion Follower */}
        <div className='col-span-2 hidden xl:block'>
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
        </div>

      </main>
    </section>
  )
}

export default Home