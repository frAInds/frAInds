import { useState,  useEffect,  } from 'react';
import defaultBg from '../images/default_bg.jpg'
import defaultPerson from '../images/default_person.png'

const TaeminBroadcast = () => {

    const [imageData, setImageData] = useState({
        background: '', 
        person: '',
    });
    const [audioUrl, setAudioUrl] = useState('');
    const [caption, setCaption] = useState('');

    useEffect(() => {
        // API 호출을 통해 이미지 URL을 받아오는 함수
        const websocketUrl = "ws://localhost:8000/ws/data";
        const websocket = new WebSocket(websocketUrl);

        websocket.onopen = () => {
            console.log('WebSocket Connection Established');
        };

        websocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('WebSocket Message Received:', data);
                setCaption(data.caption || '');


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
    },);

    return(
        <>
            {/* container */}
            <div className="flex w-full h-[92vh] relative">
                {/* 전체 화면을 채우는 flex 컨테이너 */}
                <img src={defaultBg} alt="Background" className="w-full h-5/6 object-cover z-0" />
                <div className="absolute bottom-0 h-40 w-full bg-black z-10 flex items-center justify-center">
                    <p className="text-white text-2xl">{caption}</p>
                </div>
            </div>
        </>
    );
}
export default TaeminBroadcast;