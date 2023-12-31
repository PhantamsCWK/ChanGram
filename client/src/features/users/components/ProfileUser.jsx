import React from 'react'
import { BsGearWide } from 'react-icons/bs';

import { useAuth, useMediaQuery } from '../../../hooks';
import People from '../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg';
import { useAddRemoveFollowMutation } from '../usersApiSlice';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const ProfileUser = ({ user }) => {
  const [ followUser, {isLoading, error} ] = useAddRemoveFollowMutation();

  const isMobile = useMediaQuery("(max-width: 750px)");
  const { username: userAuthName, id } = useAuth();

  const isFollowed = user.follower.includes(id)

  const handleFollow = () => {
    followUser(user.username)
  }

  return (
    <header className='flex flex-col gap-5 w-full p-3 md:gap-10'>
    <div className='flex flex-row justify-between items-center gap-10'>
      <div className='avatar'>
        <div className='w-[80px] rounded-full ring ring-purple-700 ring-offset-2 sm:w-32 md:w-40'>
          <img src={user.picturePath ? user.picturePath : People} alt={user.username} />
        </div>
      </div>

      <div className='flex flex-col gap-5 w-full h-fit'>
        <div className="text-xl sm:text-2xl">{user.username}</div>
        <div className='flex flex-row gap-5'>
          {
            user.username === userAuthName 
            ? (
              <>
                <Link to="/account/edit" className="btn btn-ghost btn-sm bg-gray-200">Edit Profile</Link>
                <button className="btn btn-ghost btn-sm"><BsGearWide size={20} color='' /></button>
              </>

            )
            : (
              <>
                <button onClick={handleFollow} className={`btn btn-sm ${ isFollowed ? "btn-primary" : "btn-ghost bg-gray-200" }`}>
                  {
                    isLoading
                    ? <ClipLoader size={20} />
                    : isFollowed ? "Unfollow" : "Follow"
                  }
                </button>
                <button className="btn btn-ghost btn-sm bg-gray-200">Send Message</button>
              </>
            )
          }
        </div>
        {
          !isMobile && (
            <div className=''>
              {user.bio}
            </div>
          )
        }
      </div>
    </div>

    {/* Bio */}
    {
      isMobile && (
        <div className='w-full'>
          {user.bio}
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