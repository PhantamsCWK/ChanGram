import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

import { BsChevronLeft } from "react-icons/bs";
import { PropagateLoader } from 'react-spinners';

import { useGetUserQuery } from '../features/users/usersApiSlice';
import { FollowBar, ProfileUser, FollowModal } from '../features/users';
import { UserPosts } from '../features/posts';

const Profile = () => {
  const [ followModalType, setFollowModalType ] = useState("follower");

  const { username } = useParams();
  const { data: user, isLoading, error } = useGetUserQuery(username);

  if (error) {
    return (
        <div className='flex flex-col justify-center items-center gap-5 py-3 h-[75vh]'>
            <h1 className='text-3xl text-[#570DF8] capitalize'>Page not found</h1>
        </div>
    )
  }

  if (isLoading) {
    return (
        <div className='flex flex-col justify-center items-center gap-5 py-3 h-[75vh]'>
            <PropagateLoader className='mt-36' size={30} color='#570DF8' />
        </div>
    )
  }
  
  return (
    <>
      <section className='flex flex-col-reverse'>
        <main className='flex flex-col align items-center mt-10 md:px-7 md:mx-16'>

          {/* Profile User */}
          <ProfileUser user={user} />

          {/* Follower */}
          <FollowBar setFollowModalType={setFollowModalType} postsCount={user.postsCount} followingCount={user.followingCount} followerCount={user.followerCount} />

          {/* User Post */}
          <UserPosts username={username} />

        </main>

        <div className='flex flex-row justify-start items-center p-2 border-b border-gray-300'>
          <BsChevronLeft size={30} />
          <span className='w-full text-center'>{username}</span>
        </div>
      </section>
      <FollowModal username={username} followModalType={followModalType} setFollowModalType={setFollowModalType} />
    </>
  )
}

export default Profile