import React, { useEffect } from 'react'
import { Modal } from '../../../components'
import { useDeletePostMutation, useLazyGetPostQuery } from '../postsApiSlice';
import { useAuth } from '../../../hooks';
import { BounceLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { clearPostId } from '../postModalSlice';

const PostSettingModal = ({ settingId, setSettingId }) => {
  const { id: userAuthId } = useAuth();
  const dispatch = useDispatch();
  const isAuthor = settingId.authorId === userAuthId

  const [ deletePost, { isLoading: isDeleteLoading } ] = useDeletePostMutation();

  const handleDeletePost = async () => {
    await deletePost(settingId.postId).unwrap();
    setSettingId({ postId: "", authorId: "" });
    dispatch(clearPostId(null))
    window.post_setting_modal.close();
  }

  return (
    <Modal idModal="post_setting_modal" onClose={() => setSettingId({ postId: "", authorId: "" })} width="">
      <div className='modal-box bg-transparent shadow-none w-fit h-fit'>
      {
        settingId && (
              <div className="bg-white w-[260px] p-0 rounded-xl">
                <div className='flex flex-col items-center w-full text-[#570DF8] font-semibold'>
                  {
                    isAuthor && (
                      <div
                        onClick={handleDeletePost}
                        className='flex justify-center items-center border-b border-b-[#570DF8] w-full h-14  hover:bg-[#570DF8] hover:text-white hover:cursor-pointer first:rounded-t-xl last:rouded-b-xl only:rouded-xl'
                        >
                        {
                          isDeleteLoading
                          ? ( <BounceLoader color='#570DF8' size={50} /> )
                          : "Delete post"
                        }
                        
                    </div>
                    )
                  }
                    <div 
                      onClick={() => alert(JSON.stringify(settingId))} 
                      className='flex justify-center items-center border-b border-b-[#570DF8] w-full h-14  hover:bg-[#570DF8] hover:text-white hover:cursor-pointer first:rounded-t-xl last:rouded-b-xl only:rouded-xl'
                      >
                        Report
                    </div>
                    <div 
                      onClick={() => {
                        setSettingId({ postId: "", authorId: "" })
                        window.post_setting_modal.close()
                      }} 
                      className='flex justify-center items-center w-full h-14  hover:bg-[#570DF8] hover:text-white hover:cursor-pointer first:rounded-t-xl last:rounded-b-xl only:rounded-xl'
                      >
                        Back
                    </div>

                </div>
              </div>
        )
      }
      </div>
    </Modal>
  )
}

export default PostSettingModal