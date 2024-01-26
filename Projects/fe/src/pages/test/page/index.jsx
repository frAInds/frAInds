import avatar from '@/pages/test/page/images/choongi_pic.png'
import { useEffect } from 'react'
import Message from './components/Message';

const Test = () => {
  useEffect(() => {
    document.body.classList.add('overflow-y-hidden')
  }, []);
  return (
    <div className="w-screen h-screen bg-zinc-800">


      {/* 채팅창 */}
      <div className="max-w-[400px] h-full flex flex-col">

        {/* 채팅창 위쪽 섹션 */}
        <div className=" bg-slate-300 h-full max-h-[85%] flex flex-col">
          <div className="flex justify-end gap-2 text-sm opacity-55 pt-1 px-2">
            <span>ㅡ</span>
            <span>ㅁ</span>
            <span>X</span>
          </div>

          {/* 채팅창 헤더 */}
          <div className="flex mt-3 gap-2 px-2">
            {/* 채팅방 이미지 */}
            <div className='place-content-center grid grid-cols-2 gap-1'>
              <img src={avatar} alt="" className='w-[20px]' />
              <img src={avatar} alt="" className='w-[20px]' />
              <img src={avatar} alt="" className='w-[20px]' />
              <img src={avatar} alt="" className='w-[20px]' />
            </div>
            {/* 채팅방 정보 */}
            <div className='flex flex-col'>
              <span className='text-sm text-slate-800'>캡스톤방</span>
              <div className='grid grid-cols-2 place-items-center'>
                <img src={avatar} alt="" className='w-[15px] ' />
                <span className='-ml-6 text-xs '>6</span>
              </div>
            </div>
            {/* 헤더 각종 아이콘들 */}
            <div className='ml-auto flex gap-3 items-center opacity-35 '>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </div>
          </div>

          {/* 메시지 히스토리 영역 */}
          <div className='flex flex-col-reverse text-5xl grow-0 overflow-y-scroll h-full'>
            <Message>12323</Message>
            <Message>1</Message>
            <Message>2</Message>
            <Message>3</Message>
            <Message>4</Message>
            <Message>5</Message>
            <Message>6</Message>
            <Message>7</Message>
            <Message>8</Message>
            <Message>9</Message>
            <Message>10</Message>
            <Message>11</Message>
            <Message>12</Message>
            <Message>13</Message>
          </div>
        </div>

        {/* 메시지 아래쪽 인풋 섹션 */}
        <div className="max-h-[15%] h-full bg-slate-50 p-3
        flex flex-col gap-1">
            <input className='basis-full text-slate-600 w-full border-0
            active:borer-0 text-wrap' />

          
          <div className='flex justify-start gap-1'>
            <svg className='opacity-25' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" /></svg>
            <svg className='opacity-25' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" /></svg>
            <svg className='opacity-25' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z" /></svg>
            <svg className='opacity-25' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M330-240q-104 0-177-73T80-490q0-104 73-177t177-73h370q75 0 127.5 52.5T880-560q0 75-52.5 127.5T700-380H350q-46 0-78-32t-32-78q0-46 32-78t78-32h370v80H350q-13 0-21.5 8.5T320-490q0 13 8.5 21.5T350-460h350q42-1 71-29.5t29-70.5q0-42-29-71t-71-29H330q-71-1-120.5 49T160-490q0 70 49.5 119T330-320h390v80H330Z" /></svg>
            <svg className='opacity-25' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M760-600v-160H600v-80h240v240h-80ZM120-120v-240h80v160h160v80H120Zm0-320v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-640v-80h80v80h-80Zm160 640v-80h80v80h-80Zm160 0v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Z" /></svg>
            <button type='button' className='w-fit ml-auto opacity-100
            py-1 px-2 rounded bg-yellow-300 text-slate-500 text-sm'>Send</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Test