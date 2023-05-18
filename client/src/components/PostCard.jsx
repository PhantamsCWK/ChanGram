import React from 'react';
import Aurora from "../assets/aurora-borealis-moon-night-ce-3840x2400.jpg";
import People from "../assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { BsDot, BsEmojiSmile, BsSend } from 'react-icons/bs';
import { BiBookmark, BiDotsHorizontal, BiPaperPlane } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';

const PostCard = () => {
  return (
    <div className='container grid grid-cols-12 w-[900px] h-[650px] border border-gray-300'>
        <div className='col-span-7'>
            <div className='w-full h-full border-r border-gray-300 p-2 '>
                <div className=' flex justify-center items-centerw-full h-[575px]'>
                    <img src={ People } alt='' className='object-cover max-h-full max-w-full' />
                </div>
            </div>
        </div>
        <div className='col-span-5'>
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row justify-between items-center px-5 h-[9%] border-b border-gray-300'>
                    <div className='flex justify-start items-center gap-3'>

                        <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                            <img src={People} alt="" className='object-cover w-full h-full '/>
                        </div>

                        <div className=''>
                            <span className=' flex flex-row justify-start items-center text-sm'>ChandraWIjayaKusuma <BsDot /> <button className='text-blue-600'>Ikuti</button></span>
                            <span className='text-xs'>Jakarta</span>
                        </div>
                    </div>
                    <button>
                        <BiDotsHorizontal />
                    </button>
                </div>

                <div className='h-[68%]'>
                    <div className='flex flex-col gap-5 h-[415px] overflow-auto p-5'>
                        <div className='flex flex-row justify-between text-sm'>

                            <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                                <img src={People} alt="" className='object-cover w-full h-full '/>
                            </div>

                            <div className='flex flex-wrap w-[85%]'>
                                <p>
                                    <span className=' font-semibold'>ChandraWijayaKusuma</span>&nbsp;
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere eos vero, eius praesentium dolorem architecto consequatur natus ipsum? Ipsam culpa corporis, repudiandae quae ratione totam ipsa odit deleniti dolor modi?
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='h-[15%] border-t border-gray-300'>
                    <div className='flex flex-col justify-center w-full h-full p-4 gap-1'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row justify-start items-center gap-2'>
                            <button type='button' onClick={() => alert("report")}><AiOutlineHeart size="28px"/></button>
                            <button type='button' onClick={() => alert("report")}><AiOutlineMessage size="28px"/></button>
                            <button type='button' onClick={() => alert("report")}><BiPaperPlane size="28px"/></button>
                            </div>
                            <button type='button' onClick={() => alert("report")}><BiBookmark size="28px"/></button>
                        </div>

                        <div className='p-1 text-sm font-semibold'>
                            <span className='inline'>177</span>
                            &nbsp;
                            <h4 className=' inline'>like</h4>
                            <br />
                            <span className='text-gray-400'>7 days ago</span>
                        </div>


                    </div>
                </div>
                <div className='h-[8%] border-t border-gray-300'>
                    <div className='flex flex-row justify-between items-center w-full h-full px-5'>
                        <BsEmojiSmile size="25px" />
                        <input type="text" placeholder='Comment' className=' w-60 focus:outline-none' />
                        <BsSend size="25px" />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default PostCard