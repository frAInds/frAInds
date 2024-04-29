// import Messenger from '@/pages/chat/page/components/Messenger';
// import exImg from '@/pages/test/page/images/1701826553654.jpg';
import { Outlet } from 'react-router-dom';
import Header from "@/pages/root/page/components/Header";

const Chat = () => {
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
