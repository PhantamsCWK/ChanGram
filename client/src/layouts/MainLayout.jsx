import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '../hooks';
import { BottomBar, SideBar, Footer, CreateModal, SearchModal } from '../components';



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
      <CreateModal />
      <SearchModal />
    </>
  )
}

export default MainLayout;