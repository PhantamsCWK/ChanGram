import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BounceLoader } from "react-spinners"

import { Modal } from '../../../components';
import { useCreatePostMutation } from '../postsApiSlice';
import { BsImage } from 'react-icons/bs';
import { Cropper } from 'react-cropper';
import { current } from '@reduxjs/toolkit';

const CreatePost = () => {
    const [slide, setSlide] = useState(1);
    const [isImageExist, setImageExist] = useState(null);
    const [previewImage, setPreviewImage] = useState();
    const cropperRef = useRef(null)

    const [createPost, { isLoading, error, isSuccess, reset: resetCreate } ] = useCreatePostMutation()
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { 
            file: "",
            description: ""
        }
    });

    const sleep = async (ms) => {
        await new Promise((resolve, reject) => setTimeout(resolve, ms))
    }

    useEffect(() => {
        if(!isImageExist) {
            setPreviewImage(undefined);
            return
        }
    
        const imageUrl = URL.createObjectURL(isImageExist);

        setPreviewImage(imageUrl);

        return () => URL.revokeObjectURL(imageUrl);
    }, [isImageExist])

    const onSelectImage = (e) => {
        setImageExist(e.target.files[0]);
        e.target.value = ""
        setSlide(2)
    }

    const handleCancel = () => {
        URL.revokeObjectURL(previewImage)
        setImageExist(null)
        setPreviewImage(null)
        setSlide(1)
    }

    const onSubmit = async (data) => {
        if (typeof cropperRef.current?.cropper === "undefined") {
            return
        }

        const canvas = cropperRef.current?.cropper.getCroppedCanvas();
        const formData = new FormData();

        const blob = await new Promise((resolve) => {
            canvas.toBlob((blob) => {
              resolve(blob);
            }, 'image/png');
        });

        if(!blob) return

        formData.append("picture", blob)
        formData.append("description", data.description)

        try {
            await createPost(formData).unwrap();
            await sleep(4000);
            resetCreate()
            await sleep(100);
            window.create_post.close();
        } catch (error) {
            console.log(error)
        } finally {
            setImageExist(false);
            setPreviewImage(null);
            setSlide(1)
            reset();
        }

        
    };

    const handleCropEnd = () => {
        const cropperInstance = cropperRef.current.cropper;
        const cropBoxData = cropperInstance.getCropBoxData();
        const canvasData = cropperInstance.getCanvasData();

        const fixedCropBoxData = {
        ...cropBoxData,
        width: Math.min(cropBoxData.width, canvasData.width),
        height: Math.min(cropBoxData.height, canvasData.height),
        };

        cropperInstance.setCropBoxData(fixedCropBoxData);
    };

    return (
        <Modal idModal="create_post" onClose={() => handleCancel()}>
        <div className="modal-box w-fit max-w-5xl">
        {
            error ? (
                <div className='flex flex-col justify-center items-center h-96 w-full text-2xl font-bold text-[#570DF8]'>
                    something error please try again later
                </div>
            ) : isLoading ? (
                <div className='flex flex-col justify-center items-center h-96 w-full'>
                    <BounceLoader color='#570DF8' size={50} />
                </div>
            )
            : isSuccess ? (
                <div className='flex flex-col justify-center items-center h-96 w-full text-5xl font-bold text-[#570DF8]'>
                    Success
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-5 w-96 '>
                    <input type="file" {...register("file")} onChange={onSelectImage} accept='image/png, image/jpeg' style={{ display: "none" }} id='inputFile'/>
                    {
                        slide === 1 && (
                            <label htmlFor="inputFile" className='flex flex-col justify-center items-center gap-1 h-40 w-40 rounded-full bg-primary cursor-pointer text-white hover:bg-primary-light hover:text-black '>
                                <BsImage size={30} />
                                Select image
                            </label>
                        ) 
                    }
                    {
                        slide === 2 && (
                            <>
                                <Cropper 
                                    src={previewImage}
                                    style={{ width: "100%", height:'20rem' }}
                                    ref={cropperRef}
                                    aspectRatio={1}
                                    cropBoxMovable={false}
                                    cropBoxResizable={false}
                                    dragMode={"move"}
                                    viewMode={1}
                                    autoCropArea={1}
                                    toggleDragModeOnDblclick={false}
                                    background={false}
                                    cropend={handleCropEnd}
                                    responsive={true}
                                    checkOrientation={false}
                                />
                                <div className='join w-full'>
                                    <span onClick={handleCancel} className='btn btn-error btn-sm join-item w-1/2'>cancel</span>
                                    <span onClick={() => setSlide(3)} className='btn btn-primary btn-sm join-item w-1/2'>next</span>
                                </div>
                            </>
                        )
                }
                {
                    slide === 3 && (
                        <div className='w-full'>
                            <textarea {...register("description")} className="textarea textarea-primary textarea-bordered textarea-lg p-1 h-72 w-full text-sm" ></textarea>
                            <div className='join w-full'>
                                <span onClick={() => setSlide(2)} className='btn btn-error btn-sm join-item w-1/2'>back</span>
                                <button className='btn btn-primary btn-sm join-item w-1/2'>submit</button>
                            </div>
                        </div>
                    )
                }

                </form>
            )
            
        }
        </div>
        
    </Modal>
  )
}

export default CreatePost