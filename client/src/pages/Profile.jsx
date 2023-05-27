import React, { useState } from 'react'
import { BsChevronLeft } from "react-icons/bs";
import { FollowBar, ProfileUser } from '../features/users';
import { UserPosts } from '../features/posts';
import { useParams } from 'react-router-dom';
import FollowModal from '../features/users/components/FollowModal';

const Profile = () => {
  const { username } = useParams();
  const [ postsCount, setPostsCount ] = useState(0);
  const [ followerCount, setFollowerCount ] = useState(0);
  const [ followingCount, setFollowingCount ] = useState(0);
  
  return (
    <>

      <section className='flex flex-col-reverse'>
        <main className='flex flex-col align items-center mt-10 md:px-7 md:mx-16'>

          {/* Profile User */}
          <ProfileUser />

          {/* Follower */}
          <FollowBar postsCount={postsCount} followerCount={ followerCount } followingCount={ followingCount } />

          {/* User Post */}
          <UserPosts username={username} setPostsCount={setPostsCount} />

        </main>

        <div className='flex flex-row justify-start items-center p-2 border-b border-gray-300'>
          <BsChevronLeft size={30} />
          <span className='w-full text-center'>{username}</span>
        </div>
      </section>
      <FollowModal username={username} setFollowerCount={setFollowerCount} setFollowingCount={setFollowingCount} />
    </>
  )
}

export default Profile