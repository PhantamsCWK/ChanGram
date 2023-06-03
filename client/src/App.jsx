import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux';

import { Account, Explore, Home, Error, Profile, Post } from "./pages";
import MainLayout from './layouts/MainLayout';
import BaseLayout from './layouts/BaseLayout';

const App = () => {

  const accessToken = useSelector(state => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={ accessToken ? <Navigate to="/home" /> : <Account /> } />
          <Route path='account' element={ accessToken ? <Navigate to="/home" /> : <Account /> }/>

          <Route element={ accessToken ? <MainLayout /> : <Navigate to="account"/> } >
            <Route path='home' element={<Home />} />
            <Route path='explore' element={<Explore />}/>
            {/* <Route path='direct' element={<Direct />}/> */}
            <Route path="p/:postId" element={<Post />} />
            <Route path=':username' element={<Profile />}/>
            <Route path='*' element={<Error />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App