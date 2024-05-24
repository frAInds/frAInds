import { Outlet } from 'react-router-dom';
import Header from "@/pages/root/page/components/Header";
import { useSelector } from 'react-redux';
import React from 'react';

const Chat = () => {

    const user = useSelector((state) => state.auth.user);
    React.useEffect(
        () => {
            if(user){
                console.log(user.username + 'logged in');
            }else{
                console.log('not logged in');
            }
        },[user]);

    return (
        <>
            <div>
                {/* 채팅 화면에서는 로그인 안보여줌 */}
                <Header showLoginLink={false} />

                {/* 자식컴포넌트(유태민 etc.) 배치할 위치*/}
                <div className='bg-gray-200'>
                    <Outlet />
                </div>
                
            </div> 
        </>
    );
};

export default Chat;
