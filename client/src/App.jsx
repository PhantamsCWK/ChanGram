import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux';

import Loading from './pages/Loading';

const AuthLayout = lazy(() => import('./layouts/AuthLayout'))
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
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
          <Route element={accessToken ? <Navigate to="/" /> : <AuthLayout />}>
            <Route path='login' element={ <Login /> }/>
            <Route path='register' element={ <Register /> }/>
          </Route>

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