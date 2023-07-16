import React, { useEffect, useRef, useState } from 'react'
import { BsImage } from 'react-icons/bs';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css"
import "../avatarCropper.css"

import Profile from "../../../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg";
import { Modal } from '../../../components';

const UserImageCropper = ({ user }) => {
    const [hoverPicture, setHoverPicture] = useState(false);
    const [isImageExist, setImageExist] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [slide, setSlide] = useState(1)

    const cropperRef = useRef(null)
  
    useEffect(() => {
      if(!isImageExist) {
          setPreviewImage(undefined);
          return
      }
  
      const imageUrl = URL.createObjectURL(isImageExist);
  
      setPreviewImage(imageUrl);
  
      return () => URL.revokeObjectURL(imageUrl);
    }, [isImageExist])
  
  
    const handleImageSelect = (e) => {
      const file = e.target.files[0]
      if(!file) return;
      setImageExist(file)
      setSlide(2)
      e.target.value = ""
    }

    const handleCancel = () => {
      URL.revokeObjectURL(previewImage)
      setImageExist(null);
      setPreviewImage(null)
      setSlide(1);
    }

    const handleApply = async () => {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        const canvas = cropperRef.current?.cropper.getCroppedCanvas();

        const croppedImage = await new Promise((resolve) => {
          canvas.toBlob(blob => resolve(blob))
        })

        console.log(croppedImage)
      }
    }
  
    return (
      <>
        <div 
          onMouseEnter={() => !hoverPicture && setHoverPicture(true)} 
          onMouseLeave={() => hoverPicture && setHoverPicture(false)} 
          onClick={() => window.change_avatar.showModal()}
          className='relative overflow-hidden w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full ' >
          <img className=' absolute' src={user?.photoPath ? user.photoPath : Profile } alt="" />
          { hoverPicture && (
            <div className='flex justify-center items-center absolute w-full h-full bg-primary bg-opacity-25 cursor-pointer'>
            <span className=' text-sm text-center text-white font-bold uppercase'>Change avatar</span>
            </div>
            )
          }
        </div>
        <Modal idModal="change_avatar" onClose={() => handleCancel()}>
          <div method='dialog' className="modal-box w-96 max-w-5xl">
            {
              slide === 1 && (
                <div className=' flex flex-col gap-2 items-center'>
                  <h1 className=' text-2xl'>Select your image</h1>
                  <label htmlFor="newAvatar" className='flex flex-col justify-center items-center gap-1 h-40 w-40 rounded-full bg-primary cursor-pointer text-white hover:bg-primary-light hover:text-black '>
                    <BsImage size={30} />
                    Select image
                  </label>
                  <input type="file" name="newAvatar" id="newAvatar" style={{ display: "none"  }} accept='image/png, image/jpeg' onChange={handleImageSelect} />
                </div>
              )
            }
            {
              slide === 2 && (
                <div className='flex flex-col justify-start gap-2'>
                  {
                    previewImage && (
                      <div className='w-full h-full rouded-full overflow-hidden relative'>
                        <Cropper
                          style={{ width: "100%", height: "20rem" }}
                          className='rounded-cropper'
                          src={previewImage}
                          ref={cropperRef}
                          aspectRatio={1}
                          cropBoxMovable={false}
                          cropBoxResizable={false}
                          autoCropArea={0.8}
                          dragMode={"move"}
                          guides={false}
                          viewMode={1}
                          autoCrop={true}
                          background={false}
                          responsive={true}
                          checkOrientation={false}
                        />
                      </div>
                    )
                  }
                <div className=' join w-full'>
                  <button className='btn btn-error btn-sm join-item w-1/2' onClick={handleCancel}>cancel</button>
                  <button className='btn btn-primary btn-sm join-item w-1/2' onClick={handleApply}>apply</button>
                </div>
              </div>
              )
            }
          </div>
        </Modal>
      </>
    )
}


export default UserImageCropper