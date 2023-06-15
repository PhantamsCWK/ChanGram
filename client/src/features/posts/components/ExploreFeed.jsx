import React from 'react'
import { FeedsGrid } from '../../../components'
import { useGetAllPostQuery } from '../postsApiSlice';
import { BounceLoader } from 'react-spinners';

const ExploreFeed = () => {
  const { data: posts, isError, isLoading } = useGetAllPostQuery();

  if (isError) {
    return (
      <div className='flex flex-col justify-start items-center h-[78vh]'>
        <h1>Please Try again</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col justify-start items-center h-[78vh]'>
        <BounceLoader className='mt-36' size={100} color='#570DF8' />
      </div>
    )
  }

  return (
    <>
        <FeedsGrid posts={posts} />
    </>
  )
}

export default ExploreFeed