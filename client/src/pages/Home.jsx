import React from 'react'
import { SugestionFollower } from '../features/users';
import { PostsSection, StoryBar } from '../features/posts';

const Home = () => {
  return (
    <section className='pt-[4px] mx-1 lg:mx-[46px]'>
      <main className='grid grid-cols-5 pt-4'>
      {/* Home page */}
        <div className='col-span-5 w-full xl:col-span-3 xl:mr-[64px] xl:max-w-[630px]'>

          {/* Stories bar */}
          <StoryBar />

          {/* Posts Section */}
          <PostsSection />
        </div>

      {/* Sugestion Follower */}
        <div className='col-span-2 hidden xl:block'>
            <SugestionFollower />
        </div>

      </main>
    </section>
  )
}

export default Home