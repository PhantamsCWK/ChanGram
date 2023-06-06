import React, { useEffect, useState } from 'react'
import { Modal, UserListBar } from "../../../components"
import { useGetFollowerUserQuery, useGetFollowingUserQuery } from '../usersApiSlice';

const FollowModal = ({ username, followModalType, setFollowModalType }) => {
  const { 
    data: follower, 
    isLoading: isFollowerLoading, 
    isError: isFollowerError } = useGetFollowerUserQuery(username);
  const { 
    data: following, 
    isLoading: isFollowingLoading, 
    isError: isFollowingError } = useGetFollowingUserQuery(username);

  return (
    <Modal idModal="follow_modal" width="">
      <div className="modal-box w-[375px]">
        <section className='w-full'>

          <div className='flex flex-row justify-center items-center h-full border-b border-gray-300'>
            <button className={`btn btn-${followModalType === "follower" ? "primary" : "ghost" } rounded-none w-1/2 h-full outline-none`} onClick={() => setFollowModalType("follower")}>Follower</button>
            <button className={`btn btn-${followModalType === "following" ? "primary" : "ghost" } rounded-none w-1/2 h-full outline-none`} onClick={() => setFollowModalType("following")}>Following</button>
          </div>

          <div className='flex flex-col justify-start items-center w-full gap-3 py-2 h-[350px] overflow-y-auto'>
            <UserListBar 
              users={ followModalType === "follower" ? follower : following } 
              isLoading={isFollowerLoading || isFollowingLoading} 
              isError={isFollowerError || isFollowingError}
              isButton 
            />
          </div>

        </section>
      </div>
    </Modal>
  )
}

export default FollowModal