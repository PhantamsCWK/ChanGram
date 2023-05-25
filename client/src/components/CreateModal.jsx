import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateModal = () => {
  const [isImageExist, setImageExist] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const { register, handleSubmit } = useForm({
    defaultValues: { 
      files: "",
      bio: ""
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

  const onSubmit = (data) => console.log(data);

  return (
    <>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="create-modal" className="modal-toggle" />
        <label htmlFor="create-modal" className="modal flex-col justify-normal pt-32 cursor-pointer">
          <label className="modal-box w-11/12 max-w-5xl relative sm:w-9/12 lg:w-7/12" htmlFor="">
            
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full '>

              <input type="file" {...register("file")} onChange={onSelectImage} accept='image/png, image/jpeg' className="file-input file-input-bordered file-input-primary file-input-sm w-full" />

                {
                  isImageExist &&(
                    <div className='grid grid-cols-3 gap-5'>
                      <div className=' col-span-2'>
                        <img src={previewImage} alt="" />
                      </div>
                      <div className=''>
                        <textarea {...register("bio")} className="textarea textarea-primary textarea-bordered textarea-lg p-1 h-72 w-full text-sm" ></textarea>
                        <button type='submit' className="btn btn-outline btn-primary">Button</button>
                      </div>
                    </div>
                  )
                }
            </form>
          </label>
        </label>
    </>
  )
}

export default CreateModal