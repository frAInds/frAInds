// landing page 101
import {useState, useEffect} from 'react';
import FriendsLogo from "@/common/components/FriendsLogo";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './index.css';
const Landing = () => {

    const [visibleElements, setVisibleElements] = useState({
        showH1: false,
        showP1: false,
        showP2: false,
        showP3: false,
        showBtn: false,
    });

    useEffect(() => {
        setTimeout(() => setVisibleElements(prev => ({ ...prev, showH1: true })), 500); // H1이 0.5초 후에 나타남
        setTimeout(() => setVisibleElements(prev => ({ ...prev, showP1: true })), 1500); // 첫 번째 p가 1.5초 후에 나타남
        setTimeout(() => setVisibleElements(prev => ({ ...prev, showP2: true })), 2500); // 두 번째 p가 2.5초 후에 나타남
        setTimeout(() => setVisibleElements(prev => ({ ...prev, showP3: true })), 3500); // 세 번째 p가 3.5초 후에 나타남
        setTimeout(() => setVisibleElements(prev => ({ ...prev, showBtn: true })), 3500); // 세 번째 p가 3.5초 후에 나타남
    }, []);


    return (
        <>
            <div className="bg-white h-[92vh]">
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global"></nav>
                    {/* <div className="fixed inset-0 z-50" /> */}
                        <div className="flex items-center justify-center">
                            <FriendsLogo></FriendsLogo>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10"></div>
                        </div>
                </header>

                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                    >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                    </div>
                    <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">
                    
                        <div className="text-center">
                            <h1 className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl ${visibleElements.showH1 ? 'fade-in' : 'hidden'}`} style={{ wordBreak: 'break-word', whiteSpace: 'normal', width: '100%' }}>
                                친구 목소리의 AI 캐릭터, 실시간 방송까지!
                            </h1>
                            <p className={`mt-10 text-lg leading-8 text-gray-600 ${visibleElements.showP1 ? 'fade-in' : 'hidden'}`} style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                                친구와 지인의 말투를 학습한 AI 챗봇과 1대1 대화를 나누고, 
                            </p>
                            <p className={`text-lg leading-8 text-gray-600 ${visibleElements.showP2 ? 'fade-in' : 'hidden'}`} style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                                특별한 AI 캐릭터와 함께 유튜브 실시간 방송을 진행해 보세요. 
                            </p>
                            <p className={`text-lg leading-8 text-gray-600 ${visibleElements.showP3 ? 'fade-in' : 'hidden'}`} style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                                새로운 소통의 경험이 기다리고 있습니다. 
                            </p>

                            {/*  */}
                            <div className={`mt-4 flex items-center justify-center gap-x-6 ${visibleElements.showBtn ? 'fade-in' : 'hidden'}`}>
                                <Link to="/account/sign-in">
                                    <Button color="primary" size="lg" radius="sm" variant="solid" className="bg-gradient-to-tr from-violet-400 to-blue-400 shadow-lg">
                                        시작하기
                                    </Button>
                                </Link>
                                
                                
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
                </div>
        
        </>
    );
};
export default Landing;