//강아지 채팅방 url은 chat/dog
//캐릭터마다 채팅창 양식이 달라서 구분해야함
import { useState, useEffect } from "react";
import Chat from "..";
import exImg from '@/pages/test/page/images/1701826553654.jpg';
const TaeminChat = () => {

    const TaeminMoods = [
        { mood: "밥줘", image: "https://i.namu.wiki/i/HorlfONQCAnCvOGdYUFUX_lFTUiboyikJ4nbqmFVo_KVaKccJXV6K2yEICfhlGS6upPcGNIyYmQ1nxPuEZKD2v5d3HntL6Gru6LnT8yo4l-qg_CcykdrIhlC097hVkvOgWHbQ7cSbId-lUYioBV-rQ.webp" },
        { mood: "담배", image: "https://dino-typing.com/data/file/free/2041600034_PmDWUZIo_527245174acc9558e7a60da50a6f23c6350915bc.jpg" },
        { mood: "졸려", image: "https://i.namu.wiki/i/HorlfONQCAnCvOGdYUFUX_lFTUiboyikJ4nbqmFVo_KVaKccJXV6K2yEICfhlGS6upPcGNIyYmQ1nxPuEZKD2v5d3HntL6Gru6LnT8yo4l-qg_CcykdrIhlC097hVkvOgWHbQ7cSbId-lUYioBV-rQ.webp" },
        { mood: "돈줘", image: "https://i.namu.wiki/i/HorlfONQCAnCvOGdYUFUX_lFTUiboyikJ4nbqmFVo_KVaKccJXV6K2yEICfhlGS6upPcGNIyYmQ1nxPuEZKD2v5d3HntL6Gru6LnT8yo4l-qg_CcykdrIhlC097hVkvOgWHbQ7cSbId-lUYioBV-rQ.webp" },
    ];

    const [selectedMood, setSelectedMood] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMood = TaeminMoods[Math.floor(Math.random() * TaeminMoods.length)].mood;
            setSelectedMood(randomMood);
        }, 1000);

        return () => clearInterval(interval);
    }, []); 

    //스트링 - 이미지 
    const selectedImage = TaeminMoods.find(moodObj => moodObj.mood === selectedMood)?.image;

    
    const handleTaeminMood = () => {
        const randomMood = TaeminMoods[Math.floor(Math.random() * TaeminMoods.length)];
        console.log(randomMood); 
        setSelectedMood(randomMood);
    }

{/* 
    초기버전 구현사항
    1. 이미지 클릭 시 랜덤 스트링 이미지 위 또는 아래에 출력 
    2. 
*/}

    return(
        <div>
            {/* 화면을 좌우 2분할로 해서 왼쪽엔 아바타? 두고 */}
                {/* 오른쪽엔 채팅창 사용할 예정 */}

                {/* container */}
                <div className="flex w-full h-[92vh]">
                    {/* 왼쪽 */}
                    <div className="flex w-1/2 flex-col items-center">

                        {/* 이미지 들어갈곳 */}
                        <div className="h-3/4 w-full">
                            <img src={selectedImage}
                            className="rounded-2xl cursor-pointer object-contain h-full w-full"
                            />
                        </div>

                        {/* 랜덤 스트링 띄울곳 */}
                        <div className="w-full text-center">
                            <p>유태민(25세)</p>
                            <div className="">
                                {selectedMood && (
                                    <div className="text-6xl font-bold mt-16">
                                        <p>{selectedMood}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>

                    {/* 구분선(임시) */}
                    <div className="border-2 border-gray-950">

                    </div>
                    {/* 오른쪽 */}
                    <div className="flex w-1/2 ">
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                    </div>
                
                </div>
        </div>
    );
}
export default TaeminChat;