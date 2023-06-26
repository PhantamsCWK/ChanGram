import React, { useState } from 'react';
import { useMediaQuery } from "../hooks";
import { ExploreFeed } from '../features/posts';
import { SearchExplore } from '../features/users';

const Explore = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section className='flex flex-col justify-center items-center w-full'>
      <main className='flex flex-col gap-4 w-full sm:w-[99%] xl:w-[963px] my-5'>
        {
          isMobile && (
            <SearchExplore />
          )
        }

        <ExploreFeed />


      </main>
    </section>
  )
}

export default Explore