import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { Account, Explore, Home, Error, Profile, Post } from "./pages";
import MainLayout from './layouts/MainLayout';
import { useSelector } from 'react-redux';

const App = () => {

  const accessToken = useSelector(state => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='account' element={ accessToken ? <Navigate to="/" /> : <Account /> }/>
        <Route path='/' element={ accessToken ? <MainLayout /> : <Navigate to="/account" /> }>
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