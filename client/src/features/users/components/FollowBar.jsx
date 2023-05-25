import React from 'react'

const FollowBar = () => {
  return (
    <div className="flex flex-row justify-evenly items-center w-full border-t border-b border-gray-300">
        <div className="flex flex-col items-center justify-center p-2 w-20">
            <span className='text-sm font-semibold'>102</span>
            <span className='text-sm capitalize text-gray-600'>Post</span> 
        </div>
        <button className="flex flex-col items-center justify-center p-2 w-20">
            <span className='text-sm font-semibold'>102</span>
            <span className='text-sm capitalize text-gray-600'>Follower</span> 
        </button>
        <button className="flex flex-col items-center justify-center p-2 w-20">
            <span className='text-sm font-semibold'>102</span>
            <span className='text-sm capitalize text-gray-600'>Following</span> 
        </button>
    </div>
  )
}

export default FollowBar