import React from 'react';
import { useParams } from 'react-router-dom';

import { BsDot, BsEmojiSmile, BsSend } from 'react-icons/bs';
import { BiBookmark, BiDotsHorizontal, BiPaperPlane } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { PropagateLoader } from 'react-spinners';

import { useGetPostQuery, useLikeAndDislikeMutation } from '../postsApiSlice';
import People from "../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";

const PostCard = () => {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useGetPostQuery(postId);
  const [likeAndDislike ] = useLikeAndDislikeMutation();

  const handleLikeAndDislike = async (postId) => {
    await likeAndDislike(postId).unwrap();
    return
  }

  if (error) {
    return (
        <div className='flex flex-col justify-center items-center gap-5 py-3 h-[75vh]'>
            <h1 className='text-3xl text-[#570DF8] capitalize'>{error.data.message}</h1>
        </div>
    )
  }

  if (isLoading) {
    return (
        <div className='flex flex-col justify-start items-center gap-5 py-3 h-96'>
            <PropagateLoader className='mt-36' size={30} color='#570DF8' />
        </div>
    )
  }

  return (
    <div className='container grid grid-cols-12 w-[900px] h-[650px] border border-gray-300'>
        <div className='col-span-7'>
            <div className='w-full h-full border-r border-gray-300 p-2 '>
                <div className=' flex justify-center items-center w-full h-[575px]'>
                    <img src={ post.pictureUrl } alt='' className='object-cover max-h-full max-w-full' />
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
                            <span className=' flex flex-row justify-start items-center text-sm'>{post.author.username}<BsDot /> <button className='text-blue-600'>Follow</button></span>
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
                                <img src={post.author.picturePath ? post.author.picturePath : People} alt="" className='object-cover w-full h-full '/>
                            </div>

                            <div className='flex flex-wrap w-[85%]'>
                                <p>
                                    <span className=' font-semibold'>{post.author.username}</span>&nbsp;
                                    {post.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='h-[15%] border-t border-gray-300'>
                    <div className='flex flex-col justify-center w-full h-full p-4 gap-1'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row justify-start items-center gap-2'>
                                <button type='button' onClick={() => handleLikeAndDislike(post.id)}>
                                {
                                    post.likes.hasOwnProperty("CWKChan") 
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
                            <span className='inline'>{Object.keys(post.likes).length}</span>
                            &nbsp;
                            <h4 className=' inline'>like</h4>
                            <br />
                            <span className='text-gray-400'>{post.createdAt}</span>
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