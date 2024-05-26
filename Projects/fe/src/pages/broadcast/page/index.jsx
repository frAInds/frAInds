import { Outlet } from 'react-router-dom';
import Header from "@/pages/root/page/components/Header";
//방송용 화면 구현하기. 화면에는 
const Broadcast = () => {
    return (
        <>
            <div>
                {/* 채팅 화면에서는 로그인 안보여줌 */}
                <Header />
                {/* 자식컴포넌트(유태민 etc.) 배치할 위치*/}
                <div className='bg-gray-200 h-full'>
                    <Outlet />
                </div>
                
            </div> 
        </>
    );
};

export default Broadcast;
