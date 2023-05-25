import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../../components/Modal';
import { useCreatePostMutation } from '../postsApiSlice';

const CreatePost = () => {
    const [isImageExist, setImageExist] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [createPost, { isLoading, error } ] = useCreatePostMutation()
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { 
            file: "",
            description: ""
        }
    });

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
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("description", data.description);
        formData.append("picture", data.file[0])
 
        try {
            await createPost(formData).unwrap();
        } catch (error) {
            console.log(error)
        }

        reset();
    };

    return (
    <Modal idModal="create-post">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full '>

            <input type="file" {...register("file")} onChange={onSelectImage} accept='image/png, image/jpeg' className="file-input file-input-bordered file-input-primary file-input-sm w-full" />

            {
                isImageExist && (
                    <div className='grid grid-cols-3 gap-5'>
                        <div className=' col-span-2'>
                            <img src={previewImage} alt="" />
                        </div>
                        <div className=''>
                            <textarea {...register("description")} className="textarea textarea-primary textarea-bordered textarea-lg p-1 h-72 w-full text-sm" ></textarea>
                            <button type='submit' className="btn btn-outline btn-primary">Button</button>
                        </div>
                    </div>
                )
            }
        </form>
    </Modal>
  )
}

export default CreatePost