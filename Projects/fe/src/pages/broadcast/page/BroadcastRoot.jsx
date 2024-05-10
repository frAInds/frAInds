//images
import exImg from '@/pages/test/page/images/DALLE.webp';
import exImg1 from '@/pages/test/page/images/cyborg_taemin.png';
import Header from "@/pages/root/page/components/Header";
import { Button, Card, CardFooter } from '@nextui-org/react';
import {Link, Outlet} from 'react-router-dom';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/common/components/ui/carousel"
  


export const BroadcastRoot = () => {

    const OPTIONS = { loop: true, dragFree: true, align: "center", dragThreshold: 20}

    const images = [
        {
            title: '유태민',
            src: exImg, 
            alt: "첫 번째 이미지 설명", 
            url: '/broadcast/taemin',
        },
        {
            title: '사이보그',
            src: exImg1, 
            alt: "두 번째 이미지 설명", 
            url: '/broadcast/cyborg',
        },
      ];


    return (
        <>
            <div className="dark:bg-121212 max-w-[100vw] min-h-screen
            flex flex-col items-center">

                <div className="flex mt-10 text-6xl text-center mb-20 text-indigo-400">
                    {/* font 추후 수정 예정 */}
                    <p>[ 방송 캐릭터 선택하기 ]</p>
                </div>

                <Carousel className="w-1/4" options={OPTIONS} >
                    <CarouselContent>
                        {images.map((images, index) => (
                            <CarouselItem key={index}>
                                <Link to={images.url}>
                                    <div className="p-1 ">
                                        <Card isPressable className='ml-8'>
                                            <img
                                                alt="Woman listing to music"
                                                className="object-contain"
                                                height={400}
                                                src={images.src}
                                                width={400}
                                            />
                                            <CardFooter className='justify-center bg-testBlack/90'>
                                                <Button className="bg-violet-400 text-xl">{images.title} 방송 시작</Button>
                                            </CardFooter>
                                        </Card> 
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    )
}

export default BroadcastRoot;
