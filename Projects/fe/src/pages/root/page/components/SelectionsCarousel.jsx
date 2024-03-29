import { useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import Autoplay from 'embla-carousel-autoplay';
import exImg from '@/pages/test/page/images/1701826553654.jpg';
import NavigationButtons from "./NavigationButtons";

import { Link } from "react-router-dom";

//carousel 형식으로 된 캐릭터 선택창
const SelectionsCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        startIndex: 1
    }, [
        // Autoplay({
        //     delay: 2000
        // }),
        WheelGesturesPlugin(),
        // AutoHeight()
    ])

    useEffect(() => {
        if (emblaApi) console.log(emblaApi.slideNodes())
    }, [emblaApi])

    return (
        <>
            <div className="overflow-hidden mt-10" ref={emblaRef}>
                <div className="flex items-start">

                    {/* 첫 번째 셀렉션 */}
                    <div className="ml-[10vw] shrink-0 grow-0 flex flex-col items-center gap-6">
                        <img className=" bg-top  rounded-2xl w-[80vw] h-[45vh] block
                            cursor-pointer"
                            style={{
                                backgroundImage: `url(${exImg})`
                            }}
                        />
                        <NavigationButtons
                            onLeftClicked={() => emblaApi.scrollPrev()}
                            onRightClicked={() => emblaApi.scrollNext()}
                        />
                        <div className="shadow-2xl bg-indigo-100 dark:shadow-black dark:bg-slate-800 rounded-2xl 
                            shrink-0 grow-0 w-full py-3 px-10 flex flex-col max-w-[780px] mt-10 text-pretty dark:text-indigo-400 dark:font-medium text-lg">
                            <span className="m-auto font-extrabold text-4xl">
                                유태민 나무위키
                            </span>
                            <br />
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </div>

                    {/* 두 번째 셀렉션 */}
                    <div className="ml-[5vw] shrink-0 grow-0 flex flex-col items-center gap-6">
                        <img className=" bg-top rounded-2xl w-[80vw] h-[45vh] block
                            cursor-pointer"
                            style={{
                                backgroundImage: `url(${exImg})`
                            }}
                        />
                        <NavigationButtons
                            onLeftClicked={() => emblaApi.scrollPrev()}
                            onRightClicked={() => emblaApi.scrollNext()}
                        />
                        <div className="shadow-2xl bg-indigo-100 dark:shadow-black dark:bg-slate-800 rounded-2xl 
                            shrink-0 grow-0 w-full py-3 px-10 flex flex-col max-w-[780px] mt-10 text-pretty dark:text-indigo-400 dark:font-medium text-lg">
                            <span className="m-auto font-extrabold text-4xl">
                                충기 나무위키
                            </span>
                            <br />
                            <p>이충기 1979년 서울대학교 계산통계학과(이학사)</p> 
                            <p>1981년 서울대학교 계산통계학과(이학석사)</p>
                            <p>1993년 조지아공과대학교 전산과학대학(전산학박사)</p>
                            <p>1994 ~ 1996 한국전산원 전산망 표준본부 선임연구원</p>
                            <p>2000 ~ 2001 명지대학교 정보통신교육연구센터 센터장</p>
                            <p>2003 ~ 2004 조지아공과대학교 전산과학대학 방문교수</p>
                            <p>2010 ~ 2011 퍼듀대학교 컴퓨터과학과 방문교수 </p>
                            <p>1996 ~ 현재 명지대학교 컴퓨터공학과 교수 관심분야 | 모바일 컴퓨팅, 공학 교육</p>
                        </div>
                    </div>

                    {/* 세 번째 셀렉션 */}
                    <div className="ml-[5vw] mr-[10vw] shrink-0 grow-0 flex flex-col items-center gap-6">
                        <Link to={"/chat/dog"}> 
                            <img className="bg-top  rounded-2xl w-[80vw] h-[45vh] block
                                cursor-pointer"
                                style={{
                                    backgroundImage: `url(${exImg})`
                                }}
                                onClick={() => console.log("dog Clicked")}

                            />
                        </Link>
                        
                        <NavigationButtons
                            onLeftClicked={() => emblaApi.scrollPrev()}
                            onRightClicked={() => emblaApi.scrollNext()}
                        />
                        <div className="shadow-2xl bg-indigo-100 dark:shadow-black dark:bg-slate-800 rounded-2xl 
                            shrink-0 grow-0 w-full py-3 px-10 flex flex-col max-w-[780px] mt-10 text-pretty dark:text-indigo-400 dark:font-medium text-lg">
                            <span className="m-auto font-extrabold text-4xl">
                                강아지 나무위키
                            </span>
                            <br />
                            왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈
                            왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈
                            왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈왈
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SelectionsCarousel