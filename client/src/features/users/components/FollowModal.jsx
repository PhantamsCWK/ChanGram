import React, { useEffect, useState } from 'react'
import { Modal, UserListBar } from "../../../components"
import { useGetFollowerUserQuery, useGetFollowingUserQuery } from '../usersApiSlice';

const FollowModal = ({ username, setFollowingCount, setFollowerCount }) => {
  const [follow, setFollow] = useState("follower");
  const { 
    data: follower, 
    isLoading: isFollowerLoading, 
    isError: isFollowerError } = useGetFollowerUserQuery(username);
  const { 
    data: following, 
    isLoading: isFollowingLoading, 
    isError: isFollowingError } = useGetFollowingUserQuery(username);

  useEffect(() => {
    if(follower && following) {
      setFollowerCount(follower.length);
      setFollowingCount(follower.length);
    }

  }, [follower, following])
  
  return (
    <Modal idModal="follow-modal" width="">
      <label className="modal-box w-[375px]" htmlFor="">
        <section className='w-full'>

          <div className='flex flex-row justify-center items-center h-full border-b border-gray-300'>
            <button className={`btn btn-${follow === "follower" ? "primary" : "ghost" } rounded-none w-1/2 h-full`} onClick={() => setFollow("follower")}>Follower</button>
            <button className={`btn btn-${follow === "following" ? "primary" : "ghost" } rounded-none w-1/2 h-full`} onClick={() => setFollow("following")}>Following</button>
          </div>

          <div className='flex flex-col justify-start items-center w-full gap-3 py-2 h-[350px] overflow-y-auto'>
            <UserListBar 
              users={ follow === "follower" ? follower : following } 
              isLoading={isFollowerLoading || isFollowingLoading} 
              isError={isFollowerError || isFollowingError}
              isButton 
            />
          </div>

        </section>
      </label>
    </Modal>
  )
}

export default FollowModal