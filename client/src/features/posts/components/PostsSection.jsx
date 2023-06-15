import React, { useState } from 'react'

import { PropagateLoader } from 'react-spinners';

import { useGetAllPostQuery, useLikeAndDislikeMutation } from '../postsApiSlice';
import { PostVerticalCard } from '../../../components';
import { useAuth } from '../../../hooks';
import PostSettingModal from './PostSettingModal';

const PostsSection = () => {
  const [settingId, setSettingId] = useState({
    postId: "",
    authorId: "",
  });
  const { data: posts, error, isLoading } = useGetAllPostQuery();
  const [likeAndDislike ] = useLikeAndDislikeMutation();
  const { id: authUserId } = useAuth();

  const handleLikeAndDislike = async (postId) => {
    await likeAndDislike(postId).unwrap();
    return
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center gap-5 py-3 h-[75vh]'>
        <h1 className='text-3xl text-[#570DF8] capitalize'>{error.data.message}</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col justify-start items-center gap-5 py-3 h-96'>
        <PropagateLoader className='mt-36' size={30} color='#570DF8' />
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col justify-start items-center gap-5 py-3'>
        {
          posts.map((post, i) => (
            <PostVerticalCard post={post} authUserId={authUserId} handleLikeAndDislike={handleLikeAndDislike} setSettingId={setSettingId} key={i} />
            ))
          }
      </div>
      <PostSettingModal settingId={settingId} setSettingId={setSettingId} />
    </>
  )
}

export default PostsSection