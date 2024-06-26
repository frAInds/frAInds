import FriendsLogo from "@/common/components/FriendsLogo";
import { Switch } from "@/common/components/ui/switch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toggle } from "@/common/reducers/darkmodeSlice";
// import DropdownContent from "./DropDownContent";
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import {BroadcastIcon} from './BroadcastIcon';
import { ChatBotIcon } from "./ChatbotIcon";



//Chat.jsx에서 Header 쓸건데 로그인 버튼은 안써도 될듯해서 props로 처리함
export const Header = () => {
  //다크모드, 라이트모드
  const isDarkModeOn = useSelector((state) => state.darkmode.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //로그인 여부 가져오기
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  //누구의 로그인 여부인지
  const user = useSelector((state) => state.auth.user);

  //테마변경
  const handleChangeTheme = () => {
    // setIsDarkModeOn(!isDarkModeOn);

    dispatch(toggle());
    if (isDarkModeOn === true) {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark');
      
    }
    else {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark');
    }
  }

  const location = useLocation();

  const isBroadcastSubpage = () => {
    // /broadcast로 시작하면서 /broadcast/ 이후에 문자열이 있는 경우
    return location.pathname.startsWith('/broadcast/') && location.pathname.length > '/broadcast/'.length;
  }

  return (
  <>
    <div className="fixed w-screen flex flex-row h-[70px] items-center z-10 shadow-lg px-8
      justify-between
    dark:bg-test1A1918 bg-white  dark:drop-shadow-xl">
      <div className="flex flex-row items-center ">
        <Link to = '/' className="mr-10"><FriendsLogo className="mb-1 "/></Link>

        <div className="mt-2">
          {isBroadcastSubpage() && (
            <>
              <Button as={Link} to="/broadcast" startContent={<ChatBotIcon className="mt-3"  />} variant="solid" color="danger" className=" text-white shadow-lg ml-6">
                방송 중지
              </Button>
            </>
          )}
        </div>
      </div>
      
      
      <div className="flex items-center  gap-5 text-indigo-400 font-bold text-xl">
        
        {/* //로그인 여부에 따라 다른 화면 보임 */}
        <div className="flex">
          { isAuthenticated && 
          <>
            <Avatar size="md" radius="full" color="default" name={user.username} className=""/>
          </>}
        </div>
        {/* 이용안내 dropdown menu */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" color="secondary">이용 안내</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="intro" href="/intro">소개</DropdownItem>
            <DropdownItem key="help" href="/help">고객센터</DropdownItem>
          </DropdownMenu>
        </Dropdown>


        {isDarkModeOn ?
          <svg className="dark:fill-indigo-400 flex-shrink-0 h-10" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" /></svg>
          : <svg className="fill-indigo-400 flex-shrink-0 h-10" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" /></svg>
        }
        <Switch
          checked={isDarkModeOn}
          onCheckedChange={handleChangeTheme}
          className="bg-indigo-300"
        />
      </div>
    </div>

    {/* 헤더와 본문 사이 여백 */}
    <div className="h-[70px] w-full"></div>

  </>
  )
}

export default Header;