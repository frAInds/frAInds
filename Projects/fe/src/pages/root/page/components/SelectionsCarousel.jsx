import { useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import Autoplay from 'embla-carousel-autoplay';
import exImg from '@/pages/test/page/images/1701826553654.jpg';
import NavigationButtons from "./NavigationButtons";

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
                            shrink-0 grow-0 w-full py-3 px-10 flex flex-col max-w-[780px] mt-10 text-pretty dark:text-indigo-500 dark:font-medium text-lg">
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
                            shrink-0 grow-0 w-full py-3 px-10 flex flex-col max-w-[780px] mt-10 text-pretty dark:text-indigo-500 dark:font-medium text-lg">
                            <span className="m-auto font-extrabold text-4xl">
                                충기 나무위키
                            </span>
                            <br />
                            충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기
                            충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기
                            충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기
                            충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기충기
                        </div>
                    </div>

                    {/* 세 번째 셀렉션 */}
                    <div className="ml-[5vw] mr-[10vw] shrink-0 grow-0 flex flex-col items-center gap-6">
                        <img className="bg-top  rounded-2xl w-[80vw] h-[45vh] block
                            cursor-pointer"
                            style={{
                                backgroundImage: `url(${exImg})`
                            }}
                            onClick={() => console.log("Clicked")}
                        />
                        <NavigationButtons
                            onLeftClicked={() => emblaApi.scrollPrev()}
                            onRightClicked={() => emblaApi.scrollNext()}
                        />
                        <div className="shadow-2xl bg-indigo-100 dark:shadow-black dark:bg-slate-800 rounded-2xl 
                            shrink-0 grow-0 w-full py-3 px-10 flex flex-col max-w-[780px] mt-10 text-pretty dark:text-indigo-500 dark:font-medium text-lg">
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