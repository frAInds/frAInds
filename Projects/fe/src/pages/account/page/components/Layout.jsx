import { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom";
import FriendsLogo from "@/common/components/FriendsLogo";
import choongGi from '@/pages/account/page/images/choongi_pic.png';
// import SignIn from '@/pages/account/sign-in/page/index.jsx';

export const Layout = () => {
    const sentences = [
        ['나는', '알고리즘을', '공부해야', '하는데', '너무', '어려워서', '하기', '싫다...'],
        ['코딩하는', '모습이', '멋있어', '보여서', '끝까지', '열심히', '공부하고', '싶다!'],
        ['프로그래밍', '마치', '마법', '같아서', '계속', '빠져들게', '된다.'],
        ['코딩이', '마치', '퍼즐을', '맞히는', '것처럼', '재미있어서', '하루가', '빨리', '지나간다.'],
        ['문제를', '해결하는', '과정에서', '새로운', '아이디어가', '떠오르면', '정말', '기분이', '좋다!'],
        ['코딩을', '시작하면', '맨날', '시간이', '가는줄', '모르겠어.'],
        ['프로그래밍은', '논리적', '사고를', '키우는', '좋은', '수단이야.'],
        ['코드를', '작성하고', '실행되는', '과정에서', '오류를', '찾아내는', '게', '재미있어.'],
        ['새로운', '프로젝트를', '시작하면', '늘', '도전이', '기대돼.'],
        ['코딩', '도중에', '도움을', '얻는', '커뮤니티가', '정말', '유용해.'],
        ['프로그래밍은', '끊임없이', '배울', '수', '있어서', '매력적이야.'],
        ['코드를', '작성하고', '동작하는', '순간', '의', '성취감이', '일품이야.'],
        ['코딩은', '창의력을', '자유롭게', '펼칠', '수', '있는', '분야야.'],
        ['문제를', '해결하면서', '느껴지는', '자신감은', '최고야.'],
        ['코딩은', '혼자', '하는', '것도', '좋지만,', '협업으로', '더', '흥미진진하다.'],
    ];

    const [curWordIdx, setCurWordIdx] = useState(0);
    const curSentenceIdx = useRef(0);

    const timer = useRef();
    clearTimeout(timer.current);

    useEffect(() => {
        if (curWordIdx >= sentences[curSentenceIdx.current].length) {
            timer.current = setTimeout(() => {
                setCurWordIdx(0);
                if (curSentenceIdx.current < sentences.length - 1)
                    curSentenceIdx.current += 1;
                else
                    curSentenceIdx.current = 0
                // console.log(curSentenceIdx.current)
            }, 2000);
        }
        else {
            timer.current = setTimeout(() => {
                setCurWordIdx(prevWordIdx => prevWordIdx + 1);
            }, 200)
        }
    }, [curWordIdx]);

    return (
        <>
            <div className="flex flex-row w-screen h-screen">
                {/* Left side */}
                <div className="bg-blue-950 w-full h-full basis-[55%] px-5">
                    {/* GPT logo top left */}
                    <FriendsLogo className="fixed" />


                    {/* text */}
                    <div className="w-full h-full flex flex-col justify-center gap-5">
                        <div className="flex justify-center">
                            <img className="inline-block h-[40vh]" src={choongGi} alt="" />
                        </div>
                        <div className="text-pink-400 text-4xl text-pretty font-semibold h-[25vh]">
                            {sentences[curSentenceIdx.current].map(
                                (word, idx) => {
                                    if (idx < curWordIdx)
                                        return <span key={idx} className="inline-block py-[10px]">
                                            {sentences[curSentenceIdx.current][idx]}&#160;
                                        </span>
                                    else if (idx == curWordIdx)
                                        return <span key={idx} className="inline-block py-[10px] underline underline-offset-8">
                                            {sentences[curSentenceIdx.current][idx]}
                                        </span>
                                })}
                            {sentences[curSentenceIdx.current].length - 1 > curWordIdx ?
                                <span className="text-5xl">
                                    ●
                                </span>
                                : null
                            }
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="bg-black w-full h-full basis-[45%]
                flex flex-col">

                    {/* <div className="flex items-center justify-items-center">
                        <Outlet />
                    </div> */}

                    {/* Right side center */}
                    <div className="basis-full">
                        <Outlet />
                    </div>

                    {/* Right side bottom area */}
                    <div className="h-fit mb-[3rem]">
                        <FriendsLogo />

                        <div className="flex flex-row justify-center items-center gap-3
                        underline text-gray-500 text-sm">
                            <span>Terms of use</span>
                            <span>|</span>
                            <span>Privacy policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout