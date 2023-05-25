import React from 'react'
import { FeedsGrid } from '../../../components'
import { useGetAllPostQuery } from '../postsApiSlice';

const ExploreFeed = () => {
  const { data: posts, error, isLoading } = useGetAllPostQuery();

  if (error) {
    return (
      <h1>
        Error
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