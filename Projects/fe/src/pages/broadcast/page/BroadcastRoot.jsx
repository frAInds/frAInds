//images
import exImg from '@/pages/test/page/images/DALLE.webp';
import exImg1 from '@/pages/test/page/images/cyborg_taemin.png';
import { useState } from 'react';
import { Button, Card, CardFooter, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Input, CircularProgress } from '@nextui-org/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/common/components/ui/carousel"
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';



export const BroadcastRoot = () => {
    //modal에 입력할 값 2개
    const [streamKey, setStreamKey] = useState('');
    const [chatUrl, setChatUrl] = useState('');
    //입력이 끝나면 로딩 딜레이 감안해서 약 30초 정도?
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    //성공 알림
    const toastSuccess = () => toast('방송이 성공적으로 시작되었습니다.', { icon: '🚀' });

    //실패 알림
    const toastFail = () => toast('방송 시작에 실패했습니다. 다시 시도해주세요.', { icon: '❌' });

    const startBroadcast = () => {
        fetch('/api/start-broadcast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stream_key: streamKey, chat_url: chatUrl }),
        })
        .then(response => {
            if (response.ok) {
                toast.success('방송이 성공적으로 시작되었습니다.', { icon: '🚀' });
                setIsLoading(true);

                //로딩 약 30초 설정
                setTimeout(() => {
                    navigate('/broadcast/taemin');
                }, 30000);
            } else {
                // console.error('방송 시작에 실패했습니다.');
                toast.error('방송 시작에 실패했습니다. 다시 시도해주세요.', { icon: '❌' });
                setIsLoading(false);
                // 오류 처리 로직
                resetInput();
            }
        })
        .catch(error => {
            console.error('방송 시작 중 오류가 발생했습니다.', error);
            toast.error('방송 시작에 실패했습니다. 다시 시도해주세요.', { icon: '❌' });
            setIsLoading(false);
            // 오류 처리 로직
            resetInput();
        });
    };

    //엔드포인트와 통신 실패시 Input 초기화하기
    const resetInput = () => {
        setChatUrl('');
        setStreamKey('');
    };

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
                                    <Card className='ml-8 '>
                                        <img alt="Woman listing to music" className="object-contain" height={400} src={images.src} width={400} />
                                        <CardFooter className='justify-center bg-testBlack/90'>
                                        <Button onPress={onOpen} className="bg-violet-400 text-xl">
                                            {images.title} 방송 시작
                                        </Button>

                                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center' className='flex' shadow='none' 
                                        classNames={{ backdrop: "bg-test1A1918/50 backdrop-opacity-40" }}>
                                            <ModalContent className='h-[350px]' >
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader className="flex flex-col gap-1">방송 시작</ModalHeader>
                                                        <ModalBody className='items-center justify-center gap-4 mt-6'>
                                                            <Input
                                                                isRequired
                                                                autoFocus
                                                                label="스트림 키(OBS에서 확인 가능합니다.)"
                                                                placeholder='스트림 키를 입력해주세요.'
                                                                variant='bordered'
                                                                value={streamKey}
                                                                onChange={(e) => {
                                                                    setStreamKey(e.target.value);
                                                                }}
                                                                >
                                                            </Input>

                                                            <Input
                                                            isRequired
                                                                label="채팅 URL"
                                                                placeholder='Youtube 라이브 채팅창 URL을 입력해주세요'
                                                                variant='bordered'
                                                                value={chatUrl}
                                                                onChange={(e) => {
                                                                    setChatUrl(e.target.value);
                                                                }}>
                                                            </Input>
                                                            <div className='flex justify-end w-full'>
                                                                <Link isBlock showAnchorIcon isExternal href='https://support.google.com/youtube/answer/9854503?hl=ko#zippy=%2C%EC%8A%A4%ED%8A%B8%EB%A6%BC-%ED%82%A4%2C%EC%8A%A4%ED%8A%B8%EB%A6%BC-url'>스트림 키 가이드</Link>
                                                                <Link isBlock showAnchorIcon isExternal href='https://support.google.com/youtube/answer/2524549?hl=ko#zippy='>채팅 URL 가이드</Link>
                                                            </div>
                                                            
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color='success' onClick={startBroadcast}>방송 시작!</Button>
                                                            <Button onClick={onClose}>취소</Button>
                                                            <Toaster />
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
