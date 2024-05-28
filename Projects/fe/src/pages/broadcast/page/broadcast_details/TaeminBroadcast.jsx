import { useState,  useEffect,  } from 'react';
import defaultBg from '../images/default_bg.jpg'
import { Spinner } from '@nextui-org/react';

const TaeminBroadcast = () => {

    const [imageData, setImageData] = useState(null);
    const [caption, setCaption] = useState('');
    const [emotion, setEmotion] = useState('');
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        const websocketUrl = "ws://localhost:8000/ws/data";
        const websocket = new WebSocket(websocketUrl);
    
        websocket.onopen = () => {
            console.log('WebSocket Connection Established');
        };
    
        websocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('WebSocket Message Received:', data);
    
                if (data.person) {
                    setImageData(`data:image/gif;base64,${data.person}`);
                } else {
                    setImageData(null);
                }
                setCaption(data.caption || '');
                setEmotion(data.emotion || '');
    
                // 이전 타이머 제거
                if (timer) {
                    clearTimeout(timer);
                }
    
                // 10초 후에 데이터 초기화
                const newTimer = setTimeout(() => {
                    setImageData(null);
                    setCaption('');
                    setEmotion('');
                }, 10000);
    
                setTimer(newTimer);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };
    
        websocket.onerror = (event) => {
            console.error('WebSocket Error:', event);
        };
    
        websocket.onclose = () => {
            console.log('WebSocket Connection Closed');
        };
    
        return () => {
            websocket.close();
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, []);

    return(
        <>
            {/* container */}
            <div className="flex w-full h-[92vh] relative justify-center">
                {/* 전체 화면을 채우는 flex 컨테이너 */}
                <img src={defaultBg} alt="Background" className="w-full h-5/6 object-cover z-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {imageData ? (
                        <img src={imageData} alt="Person" className="w-2/3 h-2/3 mb-56 object-cover z-10" />
                    ) : (
                        <Spinner color='success' size='lg' label='이미지 생성중...'/>
                    )};
                </div>
                <div className="absolute bottom-0 h-40 w-full bg-black z-10 flex flex-col items-center justify-center">
                    <p className="text-white text-2xl">{caption}</p>
                    <p className="text-white text-xl">{emotion}</p>
                </div>
            </div>
        </>
    );
}
export default TaeminBroadcast;
