import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Account, Explore, Home, Error, Profile, Post } from "./pages";
import MainLayout from './layouts/MainLayout';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='account' element={<Account />}/>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='explore' element={<Explore />}/>
          {/* <Route path='direct' element={<Direct />}/> */}
          <Route path="p/:postId" element={<Post />} />
          <Route path=':username' element={<Profile />}/>
          <Route path='*' element={<Error />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App