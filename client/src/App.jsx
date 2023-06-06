import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux';

import Loading from './pages/Loading';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Home = lazy(() => import("./pages/Home"));
const Account = lazy(() => import("./pages/Account"));
const Error = lazy(() => import("./pages/Error"));
const Explore = lazy(() => import("./pages/Explore"));
const Post = lazy(() => import("./pages/Post"));
const Profile = lazy(() => import("./pages/Profile"));


const App = () => {

  const accessToken = useSelector(state => state.auth.token);

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
            <Route path='login' element={ accessToken ? <Navigate to="/home" /> : <Account /> }/>
            <Route path='register' element={ accessToken ? <Navigate to="/home" /> : <Account isRegister /> }/>

            <Route element={ accessToken ? <MainLayout /> : <Navigate to="login"/> } >
              <Route path='/' element={<Home />} />
              <Route path='explore' element={<Explore />}/>
              <Route path="p/:postId" element={<Post />} />
              <Route path=':username' element={<Profile />}/>
              <Route path='*' element={<Error />}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App