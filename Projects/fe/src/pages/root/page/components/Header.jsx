import FriendsLogo from "@/common/components/FriendsLogo";
import { Switch } from "@/common/components/ui/switch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isDarkModeOff, setIsDarkModeOff] = useState(false);

  const handleChangeTheme = () => {
    setIsDarkModeOff(!isDarkModeOff);
    if (isDarkModeOff === false) {
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
      setIsDarkModeOff(false);
    }
    else {
      document.documentElement.classList.remove('dark');
      setIsDarkModeOff(true);
    }
  }, []);

  return (<>
    <div className="fixed w-screen flex flex-row h-[70px] items-center bg-white 
    shadow-lg px-5 dark:bg-slate-700  dark:drop-shadow-xl">
      <FriendsLogo />
      <Link>Button 1</Link>
      <Link>Button 2</Link>
      <Link>Button 3</Link>
      <Switch
        checked={isDarkModeOff}
        onCheckedChange={handleChangeTheme}
      />
    </div>

    <div className="h-[70px]"></div>

  </>
  )
}

export default Header;