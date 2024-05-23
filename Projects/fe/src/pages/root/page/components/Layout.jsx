import { Outlet } from "react-router-dom";
import Header from "@/pages/root/page/components/Header";
// import { useEffect } from "react";
import React from 'react';

export const Layout = () => {


  return (
    <div>
      <Header />
      
      <Outlet />
    </div>
  )
}

const MemoizedLayout = React.memo(Layout);
export default MemoizedLayout;