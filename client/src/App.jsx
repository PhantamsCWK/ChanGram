import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link} from "react-router-dom"
import { Account, Explore, Home, Direct, Error, Profile } from "./pages";
import { BiCompass, BiHomeAlt2, BiListUl, BiPaperPlane, BiPlusCircle, BiSearchAlt2, BiUser } from 'react-icons/bi';
const MainTemplate = () => (
  <>
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
        <Outlet />
      </div> 
      <div className="drawer-side w-[220px] border-r border-gray-300">
        <ul className="menu p-4 bg-base-100 text-base-content">
          <li className='h-[100px]'><Link to="/" className=' text-3xl'>socmed</Link></li>
          <li className='py-[0.4rem]'><Link to="/"><BiHomeAlt2 size={25} />Menu</Link></li>
          <li className='py-[0.4rem]'><Link to="search"><BiSearchAlt2 size={25} />Search</Link></li>
          <li className='py-[0.4rem]'><Link to="explore"><BiCompass size={25} />Explore</Link></li>
          <li className='py-[0.4rem]'><Link to="direct"><BiPaperPlane size={25} />Direct</Link></li>
          <li className='py-[0.4rem]'><Link to="create"><BiPlusCircle size={25} />Create</Link></li>
          <li className='py-[0.4rem]'><Link to="chandra wijaya kusuma"><BiUser size={25} /> Profile</Link></li>
          <li className='pt-[60px]'><Link to="others"><BiListUl size={25} /> Others</Link></li>
        </ul>
      </div>
    </div>
  </>

)


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='account' element={<Account />}/>
        <Route path='/' element={<MainTemplate />}>
          <Route path='' element={<Home />} />
          <Route path='explore' element={<Explore />}/>
          <Route path='direct' element={<Direct />}/>
          <Route path=':username' element={<Profile />}/>
          <Route path='*' element={<Error />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App