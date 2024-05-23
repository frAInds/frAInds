//images
import exImg from '@/pages/test/page/images/DALLE.webp';
import exImg1 from '@/pages/test/page/images/cyborg_taemin.png';
import Header from "@/pages/root/page/components/Header";
import { Button, Card, CardFooter, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Input } from '@nextui-org/react';
import { Outlet} from 'react-router-dom';

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

    //modal button handler + useDisclosure
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


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
                                <div className="p-1">
                                    <Card className='ml-8'>
                                        <img alt="Woman listing to music" className="object-contain" height={400} src={images.src} width={400} />
                                        <CardFooter className='justify-center bg-testBlack/90'>
                                        <Button onPress={onOpen} className="bg-violet-400 text-xl">
                                            {images.title} 방송 시작
                                        </Button>
                                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center' className='flex '>
                                            <ModalContent className='h-2/5'>
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader className="flex flex-col gap-1">방송 시작</ModalHeader>
                                                        <ModalBody className='items-center justify-center'>
                                                            <Input
                                                                className='mb-6'
                                                                autoFocus
                                                                label="스트림 키(Youtube)"
                                                                placeholder='스트림 키를 입력해주세요.'
                                                                variant='bordered'>
                                                            </Input>

                                                            <Input
                                                            className='mt-2'
                                                                label="채팅 URL"
                                                                placeholder='Youtube 채팅 URL을 입력해주세요'
                                                                variant='bordered'>
                                                            </Input>
                                                            <div className='flex justify-end w-full'>
                                                                <Link isBlock showAnchorIcon isExternal href='https://www.youtube.com/'>asdf</Link>
                                                                <Link isBlock showAnchorIcon isExternal href='https://www.youtube.com'>qwer</Link>
                                                            </div>
                                                            
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color='success' onClick={onClose}>방송 시작!</Button>
                                                            <Button onClick={onClose}>취소</Button>
                                                            
                                                        </ModalFooter>
                                                    </>
                                                )}
                                                
                                            </ModalContent>
                                        </Modal>
                                        </CardFooter>
                                    </Card>
                                </div>
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
