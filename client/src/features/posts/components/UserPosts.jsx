import React from 'react'
import { BsCollectionPlay, BsGrid3X3, BsPersonVideo } from 'react-icons/bs'
import { FeedsGrid } from '../../../components'
import { useGetUserPostsQuery } from '../postsApiSlice'
import { useParams } from 'react-router-dom'

const UserPosts = () => {
  const { username } = useParams();

  const { data: posts, error, isLoading } = useGetUserPostsQuery(username);

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
        <div className="flex flex-row justify-evenly items-center w-full">
          <button className="btn btn-ghost"><BsGrid3X3 size={24} /></button>
          <button className="btn btn-ghost"><BsCollectionPlay size={24} /></button>
          <button className="btn btn-ghost"><BsPersonVideo size={24} /></button>
        </div>

        <FeedsGrid posts={posts} />
    </>
  )
}

export default UserPosts