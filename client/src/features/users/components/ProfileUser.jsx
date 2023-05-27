import React from 'react'
import People from '../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg';
import { useAuth, useMediaQuery } from '../../../hooks';
import { useGetUserQuery } from '../usersApiSlice';
import { useParams } from 'react-router-dom';
import { BsGearWide } from 'react-icons/bs';

const ProfileUser = () => {
  const isMobile = useMediaQuery("(max-width: 750px)");
  const { username } = useParams();

  const { data: post, isLoading, error } = useGetUserQuery(username);
  const { username: userAuthName } = useAuth();
  
  if (isLoading) {
    return (
      <h1>
        ....isLoading
      </h1>
    )
  }

  if (error) {
    return (
      <h1>
        Error
      </h1>
    )
  }

  return (
    <header className='flex flex-col gap-5 w-full p-3 md:gap-10'>
    <div className='flex flex-row justify-between items-center gap-10'>
      <div className='avatar'>
        <div className='w-[80px] rounded-full ring ring-purple-700 ring-offset-2 sm:w-32 md:w-40'>
          <img src={post.picturePath ? post.picturePath : People} alt={post.username} />
        </div>
      </div>

      <div className='flex flex-col gap-5 w-full h-fit'>
        <div className="text-xl sm:text-2xl">{post.username}</div>
        <div className='flex flex-row gap-5'>
          {
            username === userAuthName 
            ? (
              <>
                <button className="btn btn-ghost btn-sm bg-gray-200">Edit Profile</button>
                <button className="btn btn-ghost btn-sm"><BsGearWide size={20} color='' /></button>
              </>

            )
            : (
              <>
                <button className="btn btn-ghost btn-sm bg-gray-200">Follow</button>
                <button className="btn btn-ghost btn-sm bg-gray-200">Send Message</button>
              </>
            )
          }
        </div>
        {
          !isMobile && (
            <div className=''>
              {post.bio}
            </div>
          )
        }
      </div>
    </div>

    {/* Bio */}
    {
      isMobile && (
        <div className='w-full'>
          {post.bio}
        </div>
      )
    }

    {/* Stories */}
    <div className='w-[470px] lg:w-[630px]'>
      <ul className='flex gap-4 overflow-x-auto p-2'>
          <li className='avatar'>
              <div className='w-[60px] rounded-full md:w-20'>
                <img src={People} alt="" className=''/>
              </div>
          </li>
      </ul>
    </div>
  </header>
  )
}

export default ProfileUser