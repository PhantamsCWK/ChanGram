import React from 'react'

import { useAuth, useMediaQuery } from '../../../hooks';
import Bottombar from './BottomBar';
import SideBar from './SideBar';
import { useGetUserQuery } from '../usersApiSlice';

const NavigationBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { id, username } = useAuth();
  const { data: user, isLoading, isError } = useGetUserQuery(username);

  if(isLoading){
    return
  }

  if(isError){
    console.log("error")
    return
  }

  return (
    <div>
        {
            isMobile 
            ? <Bottombar user={user && user} />
            : <SideBar user={user && user} />
        }
    </div>
  )
}

export default NavigationBar