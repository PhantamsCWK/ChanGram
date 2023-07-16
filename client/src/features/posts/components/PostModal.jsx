import React, { useEffect, useState } from 'react'
import { Modal, PostHorizontalCard } from '../../../components'
import { useLazyGetPostQuery, useLikeAndDislikeMutation } from '../postsApiSlice'

import { useAuth, useMediaQuery } from '../../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { clearPostId } from '../postModalSlice'
import PostSettingModal from './PostSettingModal'
import { BounceLoader } from 'react-spinners'

const PostModal = () => {
    const { id: authUserId } = useAuth();
    const dispatch = useDispatch();
    const postId = useSelector(state => state.postModal.id)
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [ getPost, { data: post, isLoading, isFetching ,isError } ] = useLazyGetPostQuery();
    const [likeAndDislike ] = useLikeAndDislikeMutation();


  const handleLikeAndDislike = async (postId) => {
    await likeAndDislike(postId).unwrap();
    return
  }

  const closeModal = () => {
    window.history.back()
    dispatch(clearPostId(null));
  }

  useEffect(() => {
    if(postId) {
      getPost(postId);
    } else {
      window.post_modal.close();
    }
  }, [postId])

  return (
    <Modal idModal="post_modal" onClose={closeModal}>
      {
        isLoading && isFetching ? (
          <div className='modal-box flex justify-center w-[260px] bg-white bg-opacity-5'>
            <BounceLoader color='#570DF8' size={100} />
          </div>
        ) : 
          post && post.id === postId && (
            <div className="modal-box max-w-full h-fit w-[400px] md:w-10/12 lg:w-9/12  p-0">
              <PostHorizontalCard post={post} authUserId={authUserId} handleLikeAndDislike={handleLikeAndDislike} />
            </div>
        )
      }
    </Modal>
  )
}

export default PostModal