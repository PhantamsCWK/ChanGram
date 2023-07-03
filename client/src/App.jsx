import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux';

import Loading from './pages/Loading';

const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const SettingLayout = lazy(() => import("./layouts/SettingLayout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Error = lazy(() => import("./pages/Error"));
const Explore = lazy(() => import("./pages/Explore"));
const Post = lazy(() => import("./pages/Post"));
const Profile = lazy(() => import("./pages/Profile"));
const SettingAccount = lazy(() => import("./pages/SettingAccount"));
const SettingProfile = lazy(() => import("./pages/SettingProfile"));
const SettingSecurity = lazy(() => import("./pages/SettingSecurity"));


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
            <Route path='account' element={ <SettingLayout /> }>
              <Route path='my' element={<SettingAccount />} />
              <Route path='edit' element={<SettingProfile />} />
              <Route path='security' element={<SettingSecurity />} />
            </Route>
            <Route path='*' element={<Error />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App