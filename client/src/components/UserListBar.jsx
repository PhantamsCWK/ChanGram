import React from 'react'
import People from "../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg"
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'


const UserListBar = ({ isButton=false, isNoneFollow=false, users=[], isLoading=false, isError=false}) => {

    const navigate = useNavigate();

    if(isLoading || isError){
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader size={50} color='#570DF8'/>
            </div>
        )
    };

    if(users.length === 0) {
        return <></>
    };
    
    return (
        <>
        {
            users.map((user, i) => (
                <div className={`flex flex-row justify-start items-center gap-3`} key={i}>

                    <div onClick={() => navigate(user.username)} className='flex flex-row justify-start items-center gap-3 w-full hover:cursor-pointer hover:bg-gray-300 rounded-xl px-2 py-1'>
                        <div className=' min-w-[35px] h-[35px] rounded-[50%] aspect-square overflow-hidden'>
                            <img src={People} alt="" className='object-cover w-full h-full '/>
                        </div>
                        
                        <div className='flex flex-col w-full'>
                            <h2 className='text font-semibold'>{user.username}</h2>
                        </div>
                    </div>


                        {
                            !isNoneFollow && (
                                isButton
                                ? <button type='button' className='btn btn-primary btn-xs capitalize'>Follow</button>
                                : <button type='button' className='text-xs text-blue-600 font-medium'>Follow</button>
                            )
                        }
                </div>
            ))
        }
        </>
    )
}

export default UserListBar