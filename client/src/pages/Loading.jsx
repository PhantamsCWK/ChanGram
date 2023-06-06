import React from 'react'
import { PropagateLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-full'>
        <PropagateLoader color='#570DF8' size={30} />
    </div>
  )
}

export default Loading