import { useState,  useEffect,  } from 'react';
import defaultBg from '../images/default_bg.jpg'
import defaultPerson from '../images/default_person.png'

const TaeminBroadcast = () => {

    const [imageData, setImageData] = useState({
        background: '', 
        person: '',
    });

    useEffect(() => {
        // API 호출을 통해 이미지 URL을 받아오는 함수
        const websocketUrl = "ws://localhost:8000/api/django/";
        const websocket = new WebSocket(websocketUrl);

        websocket.onopen = () => {
            console.log('WebSocket Connection Established');
        };

        websocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setImageData({
                    background: data.background || imageData.background,  // 서버에서 새 배경 이미지 URL을 제공하지 않으면 현재 이미지 유지
                    person: data.person || imageData.person, // 서버에서 새 인물 이미지 URL을 제공하지 않으면 현재 이미지 유지
                });
                setAudioUrl(data.audioUrl);
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
            <div className="flex justify-center items-center w-full h-screen"> {/* 전체 화면을 채우는 flex 컨테이너 */}
                <img src={defaultBg} alt="Background" className="absolute w-full h-full object-cover z-0" />
                <div className="absolute z-10 flex justify-center items-center"> {/* 사람 이미지를 중앙 정렬하기 위한 컨테이너 */}
                    <img src={defaultPerson} alt="Person" className="size-auto object-cover" />
                </div>
            </div>
        </>
    );
}
export default TaeminBroadcast;