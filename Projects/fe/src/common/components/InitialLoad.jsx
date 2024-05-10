import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "@/common/reducers/darkmodeSlice";

const InitialLoad = () => {

    const dispatch = useDispatch();
    useEffect(() => {
    
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          // setIsDarkModeOn(true);
        dispatch(toggle());
    
        }
        else {
          document.documentElement.classList.remove('dark');
          // setIsDarkModeOn(false);
          dispatch(toggle());
        }
      }, []);

  return (
    <Outlet />

     
  );

}
export default InitialLoad;