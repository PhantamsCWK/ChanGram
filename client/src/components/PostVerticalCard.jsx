import React, { useState } from 'react';
import { BiBookmark, BiDotsHorizontalRounded, BiPaperPlane } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import { BsDot, BsEmojiSmile, BsSend } from "react-icons/bs"

import People from "../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { Link } from 'react-router-dom';

const PostVerticalCard = ({ post, authUserId, handleLikeAndDislike, setSettingId }) => {
    const [expandDescription, setExpand] = useState(false)
    const [comment, setComment] = useState("");

    const handlePostSetting = (postId, authorId) => {
        setSettingId(() => ({postId, authorId}))
        window.post_setting_modal.showModal();
    }

  return (
    <article className=' flex flex-col gap-3 w-[470px]'>
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
            <button type='button' onClick={() => handlePostSetting(post.id, post.author._id)}>
                <BiDotsHorizontalRounded size="25px"/>
            </button>
        </div>

        <div className='flex justify-center items-center w-full'>
            <img src={post.pictureUrl} alt="" className='object-cover max-h-full max-w-full rounded-md' />
        </div>

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

        <div className='px-1 text-sm'>
            <span>Like {post.likesCount}</span>
        </div>

        <div className='px-1 text-sm'>
            {
            post.description.length <= 120
            ? (<p> {post.description} </p>)
            : (
            <p>
                {
                    expandDescription ? post.description
                    : (
                        <>
                            {post.description.substring(0,125)}
                            ...
                            <button type='button' className='text-gray-400' onClick={() => setExpand(true)}>more</button>
                        </>
                    )
                }
            </p> 
            )
            }
        </div>

        <div className='flex flex-row justify-start items-center w-full h-full text-sm'>
            <input type="text" placeholder='Comment' className=' w-10/12 focus:outline-none' value={comment} onChange={(e) => setComment(e.target.value) } />
            <span className=' w-1/12 text-blue-700'>
            {
                comment && <BsSend size="20px"/>
            }
            </span>
            <span className='w-1/12'>
                <BsEmojiSmile size="20px" />
            </span>
        </div>

        <span className=' bg-gray-300 w-full h-[1px]'></span>
    </article>
  )
}

export default PostVerticalCard