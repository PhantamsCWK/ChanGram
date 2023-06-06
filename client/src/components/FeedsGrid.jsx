import React, { useState } from 'react'
import { BsChatDotsFill, BsHeartFill } from 'react-icons/bs'
import { PostModal } from '../features/posts'

const CardFeed = ({ post, setPostId }) => {
  const [isHover, setIsHover] = useState(false)

  const handleClick = async (id) => {
    window.post_modal.showModal();
    setPostId(id)
    window.history.pushState({}, undefined, `/p/${id}`);
  }

  return(
    <div 
      onMouseEnter={() => setIsHover(true)} 
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleClick(post.id)}
      className=' relative overflow-hidden bg-slate-500 h-44 sm:h-56 lg:h-64 xl:h-80' 
    >
      <img className='absolute object-cover w-full h-full' src={post.pictureUrl} alt="" />
      {
        isHover && (
            <div className='absolute flex justify-center items-center z-10 w-full h-full bg-gradient-to-bl from-primary'>
                <ul className='flex flex-col gap-5 mx-auto w-fit'>
                  <li className='flex items-center justify-between gap-7'>
                    <BsHeartFill size={50} />
                    <span className='text-xl font-black'>10</span>
                  </li>
                  <li className='flex items-center justify-between gap-7'>
                    <BsChatDotsFill size={50} />
                    <span className='text-xl font-black'>20</span>
                  </li>
                </ul>
            </div>
        )
      }
    </div>
  )
}


const FeedsGrid = ({ posts }) => {
  const [postId, setPostId] = useState('');

  return (
    <>
      <div className='grid grid-cols-3 gap-1 w-full'>
          {
            posts && posts.map((post, i) => (
              <CardFeed post={post} setPostId={setPostId} key={i} />
              ))
            }
      </div>
      <PostModal postId={postId} />
    </>
  )
}

export default FeedsGrid