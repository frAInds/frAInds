// import Chat from "..";
//import three js for 3d models
import { useState, useMemo, useEffect, useRef } from 'react';

//resizable library
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/common/components/ui/resizable";
import { useSelector } from 'react-redux';

import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem, Input} from "@nextui-org/react";


//model dir
const MODEL_DIR = '/models/godzilla/scene.gltf';

const TaeminChat = () => {

    const isDarkModeOn = useSelector(state => state.darkmode.value);

    const [messages, setMessages] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleInputChages = (e) => {
        setMessages(e.target.value);
    }

    //서버 메세지 처리
    useEffect(() => {
        const websocketUrl = "ws://localhost:8000/api/django/";
        const websocket = new WebSocket(websocketUrl);

        //websocket connection 성공
        websocket.onopen = () => { 
            console.log('WebSocket Connection Established');
        }

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: prevMessages.length + 1,
                    text: data.message,
                    timestamp: new Date().toISOString(),
                    isUser:false,
                }
            ]);
        };

        //websocket 에러
        websocket.onerror = (event) => {
            console.error('WebSocket Error:', event);
        }

        //websocket 종료
        websocket.onclose = () => {
            console.log('WebSocket Connection Closed');
        };
        
        return () => {
            websocket.close();
        }

        
    }, []);

    //사용자 입력 text 채팅창에 쓰기
    const handleSendMessage = (e) => {
        e.preventDefault();

        if(!messages.trim()){
            return;
        }

        const newMessage = {
            text: messages,
            timestamp: new Date().toISOString(),
            isUser: true,
        }
        setChatMessages([newMessage, ...chatMessages]);
        setMessages('');
    };

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            const { scrollHeight, clientHeight } = chatContainerRef.current;
            if(scrollHeight > clientHeight){
                chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
            }
        }
    }, [chatMessages]);

    return(
        <ResizablePanelGroup direction="horizontal" autoSaveId="conditional">
            {/* container */}
            <div className='flex w-full h-[92vh]' >

                {/* 왼쪽 */}
                <ResizablePanel defaultSize={55} order={1}>
                    <div className="flex w-full h-full flex-col bg-gray-200 dark:bg-testBlack">
                        
                    </div>
                </ResizablePanel>

                {/* handle */}
                <ResizableHandle withHandle style={{ backgroundColor: `${isDarkModeOn ? 'white' : 'black'}` }} className='dark:bg-white '/>

                {/* 오른쪽 */}
                <ResizablePanel defaultSize={45} order={3}>
                    {/* <ResizablePanelGroup direction="vertical"> */}
                        <div className="flex h-full flex-col bg-gray-200 justify-between dark:bg-testBlack">
                            <div ref={chatContainerRef} className='flex flex-col-reverse overflow-auto '>
                                {chatMessages.map((message, index) => (
                                    <div key={index} className={`'p-4 w-2/5 ${message.isUser ? 'ml-auto text-right' : 'mr-auto text-left'} mr-4 my-6`}>
                                        <div className={`bg-gray-300 p-2 inline-block
                                        ${message.isUser ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-right' : 'rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'}
                                        dark:text-black ml-4`}>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="flex items-center justify-center">
                                <form onSubmit={handleSendMessage} className='p-4 px-2 mt-auto flex w-95p mr-4'>
                                    <Input
                                        type="text"
                                        value={messages}
                                        onChange={handleInputChages}
                                        className='flex-grow w-full h-10 border-2 border-gr rounded-md p-4 dark:text-white'
                                        placeholder='Type your message here...'
                                    />
                                    {/* <button type='submit' className='  text-white mt-2 rounded-md'>Send</button> */}
                                </form>
                            </div>

                        </div>
                    {/* </ResizablePanelGroup> */}
                </ResizablePanel>
            </div>
        </ResizablePanelGroup>

    );
}
export default TaeminChat;