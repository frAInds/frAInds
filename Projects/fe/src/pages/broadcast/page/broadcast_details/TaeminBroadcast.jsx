import { useState, useEffect } from 'react';
import defaultBg from '../images/default_bg.jpg';
import { Spinner } from '@nextui-org/react';

const TaeminBroadcast = () => {
    const [responsetext, setText] = useState('');
    const [responseemotion, setEmotion] = useState('');

    useEffect(() => {
        const websocketUrl = "ws://127.0.0.1:8000/ws";
        const websocket = new WebSocket(websocketUrl);
    
        websocket.onopen = () => {
            console.log('WebSocket Connection Established');
        };
    
        websocket.onmessage = (event) => {
            try {
                //console.log('WebSocket Message Received:', event.data);
                const data = JSON.parse(event.data);

                // 유니코드 이스케이프 시퀀스를 디코딩
                const decodedText = decodeURIComponent(JSON.stringify(data.response_text).replace(/\\u/g, '%u').slice(1, -1));
                const decodedEmotion = decodeURIComponent(JSON.stringify(data.response_emotion).replace(/\\u/g, '%u').slice(1, -1));

                console.log(decodedText);
                console.log(decodedEmotion);

                // 새로운 데이터 설정
                setText(decodedText || '');
                setEmotion(decodedEmotion || '');
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
        };
    }, []);

    return (
        <>
            {/* container */}
            <div className="flex w-full h-[92vh] relative justify-center">
                {/* 전체 화면을 채우는 flex 컨테이너 */}
                <img src={defaultBg} alt="Background" className="w-full h-5/6 object-cover z-0" />
                <div className="absolute bottom-0 h-40 w-full bg-black z-10 flex flex-col items-center justify-center">
                    <p className="text-white text-2xl">{responsetext}</p>
                    <p className="text-white text-xl">{responseemotion}</p>
                </div>
            </div>
        </>
    );
};

export default TaeminBroadcast;