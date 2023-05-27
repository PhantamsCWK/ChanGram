import React from 'react'
import People from "../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg"
import { ClipLoader } from 'react-spinners'


const UserListBar = ({ isButton=false, users=[], isLoading=false, isError=false }) => {

    if(isLoading || isError){
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader size={50} color='#570DF8'/>
            </div>
        )
    }

    if(users.length === 0) {
        return <h1>no context</h1>
    }
    
    return (
        <>
        {
            users.map((user, i) => (
                <div className='flex flex-row justify-start items-center gap-3 p-2' key={i}>
                    <div className='w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                        <img src={People} alt="" className='object-cover w-full h-full '/>
                    </div>

                    <div className='flex flex-col w-48'>
                        <h2 className='text font-semibold'>{user.username}</h2>
                    </div>

                    <div>
                        {
                            isButton
                            ? <button type='button' className='btn btn-primary btn-xs capitalize'>Follow</button>
                            : <button type='button' className='text-xs text-blue-600 font-medium'>Follow</button>
                        }
                    </div>
                </div>
            ))
        }
        </>
    )
}

export default UserListBar