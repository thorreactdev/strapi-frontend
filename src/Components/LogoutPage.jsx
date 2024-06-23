// import React, { useContext, useEffect } from 'react'
// import { Context } from '../utils/context'
import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const LogoutPage = () => {
    // const { handleLogout } = useContext(Context);
    // useEffect(()=>{
    //     handleLogout();
    // },[handleLogout])
  return (
    <Navigate to="/login"/>
  )
}

export default LogoutPage