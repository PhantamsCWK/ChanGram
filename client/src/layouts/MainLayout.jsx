import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
import CreatePost from '../features/posts/components/CreatePost';
import SearchUser from '../features/users/components/SearchUser';
import { NavigationBar } from '../features/users';

const MainLayout = () => {
  return (
    <>
      <NavigationBar />
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