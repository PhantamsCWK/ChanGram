import React from 'react'

import { useAuth, useMediaQuery } from '../../../hooks';
import Bottombar from './BottomBar';
import SideBar from './SideBar';
import { useGetUserQuery } from '../usersApiSlice';

const NavigationBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { username } = useAuth();
  const { data: user } = useGetUserQuery(username);

  return (
    <div>
        {
            isMobile 
            ? <Bottombar userPhoto={user ? user.photoPath : null} username={username} />
            : <SideBar userPhoto={user ? user.photoPath : null} username={username} />
        }
    </div>
  )
}

export default NavigationBar