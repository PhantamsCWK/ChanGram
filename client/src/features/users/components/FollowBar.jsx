import React from 'react'

const FollowBar = ({ postsCount, followingCount, followerCount }) => {
  return (
    <div className="flex flex-row justify-evenly items-center w-full border-t border-b border-gray-300">
        <div className="flex flex-col items-center justify-center p-2 w-20">
            <span className='text-sm font-semibold'>{postsCount}</span>
            <span className='text-sm capitalize text-gray-600'>Post</span> 
        </div>
        <label htmlFor='follow-modal' className="flex flex-col items-center justify-center p-2 w-20 hover:cursor-pointer">
            <span className='text-sm font-semibold'>{followerCount}</span>
            <span className='text-sm capitalize text-gray-600'>Follower</span> 
        </label>
        <label htmlFor='follow-modal' className="flex flex-col items-center justify-center p-2 w-20 hover:cursor-pointer">
            <span className='text-sm font-semibold'>{followingCount}</span>
            <span className='text-sm capitalize text-gray-600'>Following</span> 
        </label>
    </div>
  )
}

export default FollowBar