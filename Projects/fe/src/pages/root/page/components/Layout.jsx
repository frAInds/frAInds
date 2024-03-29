import { Outlet } from "react-router-dom";
import Header from "@/pages/root/page/components/Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      
      <Outlet />
    </div>
  )
}

export default Layout;