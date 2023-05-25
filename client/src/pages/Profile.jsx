import React from 'react'
import { BsChevronLeft } from "react-icons/bs";
import { FollowBar, ProfileUser } from '../features/users';
import { UserPosts } from '../features/posts';

const Profile = () => {

  return (
    <section className='flex flex-col-reverse'>
      <main className='flex flex-col align items-center mt-10 md:px-7 md:mx-16'>

        {/* Profile User */}
        <ProfileUser />

        {/* Follower */}
        <FollowBar />

        {/* User Post */}
        <UserPosts />

      </main>

      <div className='flex flex-row justify-start items-center p-2 border-b border-gray-300'>
        <BsChevronLeft size={30} />
        <span className='w-full text-center'>Chandra WIjaya Kusuma</span>
      </div>
    </section>
  )
}

export default Profile