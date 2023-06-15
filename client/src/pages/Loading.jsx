import React from 'react'
import { BounceLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-full'>
        <BounceLoader color='#570DF8' size={100} />
    </div>
  )
}

export default Loading