//강아지 채팅방 url은 chat/dog
//캐릭터마다 채팅창 양식이 달라서 구분해야함
import { useEffect, useRef, useState } from 'react';

const CyborgTaeminChat = () => {


    return(
        <div>
            {/* 화면을 좌우 2분할로 해서 왼쪽엔 아바타? 두고 */}
                {/* 오른쪽엔 채팅창 사용할 예정 */}

                {/* container */}
                <div className="flex w-full h-[92vh] ">
                    {/* 왼쪽 */}
                    <div className="flex w-1/2 flex-col items-center border-white">
                        
                    </div>

                    {/* 구분선(임시) */}
                    <div className="border-2 border-gr">

                    </div>
                    {/* 오른쪽 */}
                    <div className="flex w-1/2 ">
                    
                    </div>
                
                </div>
        </div>
    );
}
export default CyborgTaeminChat;