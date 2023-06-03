import React from 'react'

import { BiBookmark, BiDotsHorizontalRounded, BiPaperPlane } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import { PropagateLoader } from 'react-spinners';

import { useGetAllPostQuery, useLikeAndDislikeMutation } from '../postsApiSlice';
import { useAuth } from '../../../hooks';
import People from "../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { Link } from 'react-router-dom';

const PostsSection = () => {
  const { data: posts, error, isLoading } = useGetAllPostQuery();
  const [likeAndDislike ] = useLikeAndDislikeMutation();
  const { id: authId } = useAuth();

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
    <div className='flex flex-col justify-start items-center gap-5 py-3'>
      {
        posts.map((post, i) => (
          <article className=' flex flex-col gap-3 w-[470px]' key={i}>
            <div className='flex flex-row justify-between items-center'>
              <Link to={`/${post.author.username}`} className='flex flex-row justify-start items-center gap-2 px-2 text-sm '>
                <div className='avatar'>
                  <div className='w-[30px] rounded-full ring-[1.5px] ring-primary ring-offset-base-100 ring-offset-2'>
                    <img src={People} alt="" className=''/>
                  </div>
                </div>
                <h1>{post.author.username}</h1>
                <BsDot/>
                <h5>{post.createdAt}</h5>
              </Link>
              <button type='button' onClick={() => alert("report")}><BiDotsHorizontalRounded size="25px"/></button>
            </div>

            <div className='flex justify-center items-center w-full'>
              <img src={post.pictureUrl} alt="" className='object-cover max-h-full max-w-full rounded-md' />
            </div>

            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row justify-start items-center gap-2'>
                <button type='button' onClick={() => handleLikeAndDislike(post.id)}>
                  {
                    post.likes.hasOwnProperty(authId) 
                    ? <AiFillHeart size="28px" color='red' />
                    : <AiOutlineHeart size="28px" />
                  }
                </button>
                <button type='button' onClick={() => alert("report")}><AiOutlineMessage size="28px"/></button>
                <button type='button' onClick={() => alert("report")}><BiPaperPlane size="28px"/></button>
              </div>
              <button type='button' onClick={() => alert("report")}><BiBookmark size="28px"/></button>
            </div>

            <div className='px-1 text-sm'>
              <span>Like {Object.keys(post.likes).length}</span>
            </div>

            <div className='px-1 text-sm'>
                {
                  post.description.length <= 120
                  ? (<p> {post.description} </p>)
                  : (
                  <p>
                    {post.description.substring(0,125)}
                    ...
                    <button type='button' className='text-gray-400'>more</button>
                  </p> 
                  )
                }
            </div>

            <span className=' bg-gray-300 w-full h-[1px]'></span>
          </article>
        ))
      }
    </div>
  )
}

export default PostsSection