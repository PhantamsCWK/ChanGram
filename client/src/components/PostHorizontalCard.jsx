import React, { useState } from 'react'
import { BiBookmark, BiDotsHorizontal, BiPaperPlane } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import { BsDot, BsEmojiSmile, BsSend } from "react-icons/bs"

import People from "../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { PostSettingModal } from '../features/posts';

const PostHorizontalCard = ({ post, authUserId, handleLikeAndDislike }) => {
    const [settingId, setSettingId] = useState({
        postId: "",
        authorId: ""
    });

    const handlePostSetting = (postId, authorId) => {
        setSettingId({postId, authorId})
        window.post_setting_modal.showModal();
    }
  return (
    <>
        <div className='grid grid-cols-12 w-full'>
            <div className='col-span-6 lg:col-span-7'>
                <div className='w-full h-full border-r border-gray-300 p-2 '>
                    <div className=' flex justify-center items-center w-full h-[565px]'>
                        <img src={ post.pictureUrl } alt='' className='object-cover max-h-full max-w-full' />
                    </div>
                </div>
            </div>
            <div className='col-span-6 lg:col-span-5'>
                <div className='flex flex-col justify-start w-full h-full'>
                    <div className='flex flex-row justify-between items-center px-5 h-[65px] border-b border-gray-300'>
                        <div className='flex justify-start items-center gap-3'>

                            <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                                <img src={People} alt="" className='object-cover w-full h-full '/>
                            </div>

                            <div className=''>
                                <span className=' flex flex-row justify-start items-center text-sm'>{post.author.username}<BsDot /> <button className='text-blue-600'>Follow</button></span>
                                <span className='text-xs'>Jakarta</span>
                            </div>
                        </div>
                        <span onClick={() => handlePostSetting(post.id, post.author._id)} className='hover:cursor-pointer hover:bg-gray-300 rounded-xl p-1'>
                            <BiDotsHorizontal />
                        </span>
                    </div>

                    <div className='h-[365px]'>
                        <div className='flex flex-col gap-5 h-[415px] overflow-auto p-5'>
                            <div className='flex flex-row justify-between text-sm'>

                                <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                                    <img src={post.author.picturePath ? post.author.picturePath : People} alt="" className='object-cover w-full h-full '/>
                                </div>

                                <div className='flex flex-wrap w-[85%]'>
                                    <p>
                                        <span className=' font-semibold'>{post.author.username}</span>&nbsp;
                                        <span className=' text-slate-700'>
                                            {post.description}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='h-[100px] border-t border-gray-300'>
                        <div className='flex flex-col justify-center w-full h-full p-4 gap-1'>
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row justify-start items-center gap-2'>
                                    <button type='button' onClick={() => handleLikeAndDislike(post.id)}>
                                    {
                                        post.likes.hasOwnProperty(authUserId) 
                                        ? <AiFillHeart size="28px" color='red' />
                                        : <AiOutlineHeart size="28px" />
                                    }
                                    </button>
                                    <button type='button' onClick={() => alert("report")}><AiOutlineMessage size="28px"/></button>
                                    <button type='button' onClick={() => alert("report")}><BiPaperPlane size="28px"/></button>
                                </div>
                                <button type='button' onClick={() => alert("report")}><BiBookmark size="28px"/></button>
                            </div>

                            <div className='p-1 text-sm font-semibold'>
                                <span className='inline'>{post.likesCount}</span>
                                &nbsp;
                                <h4 className=' inline'>like</h4>
                                <br />
                                <span className='text-gray-400'>{post.createdAt}</span>
                            </div>


                        </div>
                    </div>
                    <div className='h-[50px] border-t border-gray-300'>
                        <div className='flex flex-row justify-between items-center w-full h-full px-5'>
                            <BsEmojiSmile size="20px" />
                            <input type="text" placeholder='Comment' className=' w-60 focus:outline-none' />
                            <BsSend size="20px" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <PostSettingModal settingId={settingId} setSettingId={setSettingId} />
    </>
  )
}

export default PostHorizontalCard