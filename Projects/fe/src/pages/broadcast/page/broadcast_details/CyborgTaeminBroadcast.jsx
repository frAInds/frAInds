//강아지 채팅방 url은 chat/dog
//캐릭터마다 채팅창 양식이 달라서 구분해야함
import { useEffect, useRef, useState } from 'react';
import defaultBg from '../images/default_bg.jpg'
import defaultPerson from '../images/default_person.png'

const CyborgTaeminBroadcast = () => {

    //이미지(배경, 인물)
    const [imageData, setImageData] = useState({
        background: '', 
        person: '',
    });

    //음성, 자막
    const [audioUrl, setAudioUrl] = useState('');
    const [caption, setCaption] = useState('');

    useEffect(() => {
        // API 호출을 통해 이미지 URL, 음성, 자막을 받아오기
        const websocketUrl = "wss://example.com/ws/images";
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
                    <img src={defaultPerson} alt="Person" className="size-80 object-cover" />
                </div>
                <audio src={audioUrl} autoPlay controls className="absolute z-20" />
                <div className="text-white text-center bg-black bg-opacity-50 p-4 mt-4 rounded absolute z-20">
                    {caption}
                </div>
            </div>
        </>
    );
    
}
export default CyborgTaeminBroadcast;