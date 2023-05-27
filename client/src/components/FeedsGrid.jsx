import React from 'react'

const FeedsGrid = ({ posts }) => {
  return (
    <div className='grid grid-cols-3 gap-1 w-full'>
        {
            posts && posts.map((posts, i) => (
                <div className='overflow-hidden bg-slate-500 h-44 sm:h-56 lg:h-64 xl:h-80' key={i}>
                    <img className=' object-cover w-full h-full' src={posts.picture_url} alt="" />
                </div>
            ))
        }
    </div>
  )
}

export default FeedsGrid