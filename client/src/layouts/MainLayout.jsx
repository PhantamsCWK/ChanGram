import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '../hooks';
import { BottomBar, SideBar, Footer } from '../components';
import CreatePost from '../features/posts/components/CreatePost';
import SearchUser from '../features/users/components/SearchUser';



const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {
        isMobile 
        ? <BottomBar />
        : <SideBar />
      }
      <div className='md:ml-[90px] lg:ml-[220px] h-full'>
        <Outlet />
        <Footer />
      </div>
      <CreatePost />
      <SearchUser />
    </>
  )
}

export default MainLayout;