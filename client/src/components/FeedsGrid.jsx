import React from 'react'

const FeedsGrid = ({ posts }) => {
  return (
    <div className='grid grid-cols-3 gap-1 w-full'>
        {
            posts && posts.map((posts, i) => (
                <div className='overflow-hidden h-44 sm:h-56 md:h-72 xl:h-80' key={i}>
                    <img src={posts.picture_url} alt="" />
                </div>
            ))
        }
    </div>
  )
}

export default FeedsGrid