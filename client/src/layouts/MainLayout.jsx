import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
import { CreatePost } from '../features/posts';
import { SearchModal } from '../features/users';
import { NavigationBar } from '../features/users';
import { useMediaQuery } from '../hooks';

const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return (
    <>
      <NavigationBar />
      <div className='md:ml-[90px] lg:ml-[220px] h-full'>
        <Outlet />
        <Footer />
      </div>
      <CreatePost />
      {
        !isMobile && (
          <SearchModal />
        )
      }
    </>
  )
}

export default MainLayout;