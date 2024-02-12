import FriendsLogo from "@/common/components/FriendsLogo";
import { Switch } from "@/common/components/ui/switch";
import SignIn from "@/pages/account/sign-in/page";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  //로그인 여부 가져오기
  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  const handleChangeTheme = () => {
    setIsDarkModeOn(!isDarkModeOn);
    if (isDarkModeOn === true) {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark');
    }
    else {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark');
    }
  }

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkModeOn(true);
    }
    else {
      document.documentElement.classList.remove('dark');
      setIsDarkModeOn(false);
    }
  }, []);

  return (<>
    <div className="fixed w-screen flex flex-row h-[70px] items-center z-10 shadow-lg px-8
      justify-between
     dark:bg-slate-950 bg-white  dark:drop-shadow-xl">
      <FriendsLogo className="mb-1"/>
      <div className="flex gap-5 text-indigo-400 font-bold text-xl">

        {/* //로그인 여부에 따라 다른 화면 보임 */}
        { isAuthenticated && <p>welcome user</p>}
        <Link to={ "/account/sign-in" }>로그인</Link>
        <Link className="mr-10">사용방법</Link>
        {isDarkModeOn ?
          <svg className="dark:fill-indigo-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" /></svg>
          : <svg className="fill-indigo-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" /></svg>
        }
        <Switch
          checked={isDarkModeOn}
          onCheckedChange={handleChangeTheme}
          className="bg-indigo-300"
        />
      </div>
    </div>

    <div className="h-[70px] w-full"></div>
  </>
  )
}

export default Header;