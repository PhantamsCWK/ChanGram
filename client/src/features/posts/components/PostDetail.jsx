import React from 'react';
import { useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import { useGetPostQuery, useLikeAndDislikeMutation } from '../postsApiSlice';
import { useAuth, useMediaQuery } from '../../../hooks';
import { PostHorizontalCard } from '../../../components';

const PostDetail = () => {
  const { postId } = useParams();
  const { id: authUserId } = useAuth();
  const { data: post, isLoading, error } = useGetPostQuery(postId);

  const [likeAndDislike ] = useLikeAndDislikeMutation();
  
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
        <BounceLoader className='mt-36' size={30} color='#570DF8' />
      </div>
    )
}

  return (
    <section className='h-[590px] md:border md:border-gray-300 md:mx-5 lg:mx-10'>
        <PostHorizontalCard post={post} authUserId={authUserId} handleLikeAndDislike={handleLikeAndDislike} />
    </section>
  )
}

export default PostDetail