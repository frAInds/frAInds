//강아지 채팅방 url은 chat/dog
//캐릭터마다 채팅창 양식이 달라서 구분해야함
import { useState } from "react";
import Chat from "..";
import exImg from '@/pages/test/page/images/1701826553654.jpg';
const DogChat = () => {

    const dogMoods = [
        "밥줘", "산책", "졸려", "놀자",
    ];

    const [selectedMood, setSelectedMood] = useState('');

    
    const handleDogMood = () => {
        const randomMood = dogMoods[Math.floor(Math.random() * dogMoods.length)];
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
                            <img src={exImg} alt="dog"
                            className="rounded-2xl cursor-pointer object-contain h-full w-full"
                            onClick={handleDogMood}/>
                        </div>

                        {/* 랜덤 스트링 띄울곳 */}
                        <div className="w-full text-center">
                            <div className="">
                                {selectedMood && (
                                    <div className="text-2xl font-bold mt-16">
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
                    <div className="flex w-1/2 bg-emerald-300">
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                    </div>
                
                </div>
        </div>
    );
}
export default DogChat;