import React from 'react'
import { FeedsGrid } from '../../../components'
import { useGetAllPostQuery } from '../postsApiSlice';
import PostSettingModal from './PostSettingModal';

const ExploreFeed = () => {
  const { data: posts, isError, isLoading } = useGetAllPostQuery();

  if (isError) {
    return (
      <h1>
        Error Fetching
      </h1>
    )
  }

  if (isLoading) {
    return (
      <h1>
        ....isLoading
      </h1>
    )
  }

  return (
    <>
        <FeedsGrid posts={posts} />
    </>
  )
}

export default ExploreFeed