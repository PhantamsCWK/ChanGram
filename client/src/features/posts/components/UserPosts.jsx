import React, { useEffect } from 'react'
import { BsCollectionPlay, BsGrid3X3, BsPersonVideo } from 'react-icons/bs'
import { FeedsGrid } from '../../../components'
import { useGetUserPostsQuery } from '../postsApiSlice'

const UserPosts = ({ username, setPostsCount }) => {
  const { data: posts, error, isLoading } = useGetUserPostsQuery(username);

  useEffect(() => {
    if(posts){
      setPostsCount(posts.length)
    }
  }, [posts])

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