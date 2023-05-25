import React from 'react'
import People from '../app/assets/giovanni-ilardi-p4CmBgJ7QcA-unsplash.jpg'
import { useMediaQuery } from "../hooks"
import { BiSearchAlt2 } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { ExploreFeed } from '../features/posts';

const Explore = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section className='flex flex-col justify-center items-center w-full'>
      <main className='flex flex-col gap-4 w-full sm:w-[99%] xl:w-[963px] my-5'>
        {
          isMobile && (
            <div className="input-group p-1">
              <input type="text" placeholder="Search…" className="input input-primary input-bordered w-full" />
              <button className="btn btn-primary btn-outline">
                <BiSearchAlt2 size={33} />
              </button>
            </div>
          )
        }

        <ExploreFeed />


      </main>
    </section>
  )
}

export default Explore