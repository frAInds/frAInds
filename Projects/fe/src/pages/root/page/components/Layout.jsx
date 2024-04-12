import { Outlet } from "react-router-dom";
import Header from "@/pages/root/page/components/Header";
import { useEffect } from "react";
import React from 'react';

export const Layout = () => {

  
  useEffect(() => {
    
    console.log('1111111111111111111111111111')
    
  }, []);

  
  return (
    <div>
      <Header />
      
      <Outlet />
    </div>
  )
}

export default React.memo(Layout);