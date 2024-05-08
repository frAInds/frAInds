//자기 캐릭터 생성 화면
// import { useSelector } from 'react-redux';
import DefaultImage from '@/pages/root/page/images/avatar_fallback.png';
import { Divider, Textarea, Button, Tooltip } from '@nextui-org/react';

import React, { useState, useRef, useCallback } from 'react';

const CreateChat = () => {


    //file upload
    const fileInputRef = useRef(null);
    //svg -> image
    const [state, setState] = useState({
        file: null,
        imagePreviewUrl: '',
        currentPage: 1,
        name: '캐릭터 이름',
        intro: '캐릭터 한 줄 소개',
    });
    const nextPage = useCallback(() => {
        setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }));
    }, []);
    const prevPage = useCallback(() => {
        setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }));
    }, []);
    const handleFileSelect = useCallback(() => {
        fileInputRef.current.click();
    }, []);
    const handleFileChange = useCallback((e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setState(prevState => ({ ...prevState, file: selectedFile, imagePreviewUrl: reader.result }));
            };
            reader.readAsDataURL(selectedFile);
        }
    }, []);

    const handleDiscard = useCallback(() => {
        setFile(null);
        setImagePreviewUrl('');
    }, []);

    const setName = useCallback((name) => {
        setState(prevState => ({ ...prevState, name }));
    }, []);

    const setIntro = useCallback((intro) => {
        setState(prevState => ({ ...prevState, intro }));
    }, []);

    const setFile = useCallback((file) => {
        setState(prevState => ({ ...prevState, file }));
    }, []);

    const setImagePreviewUrl = useCallback((imagePreviewUrl) => {
        setState(prevState => ({ ...prevState, imagePreviewUrl }));
    }, []);


    return(
        <>
        {/* container */}
            <div className='flex w-full h-[92vh] dark:bg-testBlack'>
                
                {/* 왼쪽 */}
                <div className='flex-col w-3/5 h-full justify-between'>
                    {/* 왼쪽 헤더 */}
                    <div className="flex h-20 items-center justify-center bg-gray-400 dark:bg-neutral-800 gap-12">

                        <button className={`flex flex-col h-full pt-3 gap-2 items-center ${state.currentPage === 1 ? 'text-violet-400 opacity-80' : 'text-white'}`}
                        onClick={() => setState(prevState => (({ ...prevState, currentPage: 1 })))}>
                            <p className='text-xl '>1단계</p>
                            <p className=''>profile</p>

                        </button>
                        <button className={`flex flex-col h-full pt-3 gap-2 items-center ${state.currentPage === 2 ? 'text-violet-400 opacity-80' : 'text-white'}`}
                        onClick={() => setState(prevState => (({ ...prevState, currentPage: 2 })))}>
                            <p className='text-xl '>2단계</p>
                            <p>상세 설정</p>

                        </button>
                        <button className={`flex flex-col h-full pt-3 gap-2 items-center ${state.currentPage === 3 ? 'text-violet-400 opacity-80' : 'text-white'}`}
                        onClick={() => setState(prevState => (({ ...prevState, currentPage: 3 })))}>
                            <p className='text-xl '>3단계</p>
                            <p>등록하기!</p>

                        </button>
                    </div>

                    {/* page 1 */}
                    {state.currentPage === 1 && (
                        <>
                            {/* img */}
                            <div className='flex w-full h-56 justify-center items-center mt-3'>
                                {state.imagePreviewUrl ? (
                                    <img src={state.imagePreviewUrl} alt="Preview" className='max-w-none h-40 object-contain rounded-2xl'/>
                                ) : (
                                    <img src={DefaultImage} alt="userImage" className='max-w-none h-40 object-contain rounded-2xl'/>
                                )}
                            </div>
                            {/* file input */}
                            <div className='flex w-full h-5 justify-center items-center '>
                                
                                <div className='w-28 h-10 rounded-lg bg-121212 flex justify-center items-center gap-5'>
                                    {/* input */}
                                    <button onClick={handleFileSelect} className="focus:outline-none">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" color="#f0efebff">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H12V5H6C5.44772 5 5 5.44772 5 6V12.1492L6.45991 10.3243C7.2465 9.34107 8.73508 9.32059 9.54843 10.2818L13.5049 14.9577L15.365 12.7875C15.9596 12.0938 17.0311 12.0884 17.6328 12.776L19 14.3385V12H21V16.6243V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14.6492V6ZM19 17.3757L16.5078 14.5275L14.6413 16.705C14.0402 17.4064 12.9541 17.4029 12.3574 16.6977L8.02165 11.5737L5 15.3508V18C5 18.5505 5.4449 18.9972 5.99478 19H18.0052C18.5551 18.9972 19 18.5505 19 18V17.3757ZM19 5V2H17V5H14V7H17V10H19V7H22V5H19Z" fill="currentColor"/>
                                        </svg>
                                    </button>
                                    <input type="file" onChange={handleFileChange} className='hidden' ref={fileInputRef}/>

                                    <Divider orientation="vertical" />
                                    {/* discard */}
                                    <button onClick={handleDiscard}>
                                        <svg width="20" height="20" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" color="#f0efebff">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.5 2.43702H9.5V4.43702H3.5V6.43702H5.5V19.437C5.5 20.5416 6.39543 21.437 7.5 21.437H17.5C18.6046 21.437 19.5 20.5416 19.5 19.437V6.43702H21.5V4.43702H15.5V2.43702ZM7.5 6.43702H17.5V19.437H7.5V6.43702ZM11.5 17.437H9.5V8.43702H11.5V17.437ZM15.5 17.437H13.5V8.43702H15.5V17.437Z" fill="currentColor"></path>
                                        </svg>
                                        {/* <input type="file" /> */}
                                    </button>
                                </div>
                            </div>

                            {/* input1 */}
                            <div  className='h-40'>
                                <Textarea 
                                    isRequired
                                    label="이름"
                                    labelPlacement="outside"
                                    placeholder="캐릭터 이름 입력"
                                    className='mt-10 px-10 transition-none'
                                    disableAnimation={true}
                                    
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            
                            {/* input2 */}
                            <div  className='h-40'>
                                <Textarea 
                                    isRequired
                                    label="한 줄 소개"
                                    labelPlacement="outside"
                                    placeholder="어떤 캐릭터인지 한 줄로 소개해주세요"
                                    className='mt-10 px-10'
                                    style={{height: '130px'}}
                                    disableAnimation={true}
                                    
                                    onChange={(e) => setIntro(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    {/* page 2 */}
                    {state.currentPage === 2 && (
                        <>
                            <div className='h-40'>
                                
                            </div>
                            <div className='h-40'>
                                <Textarea 
                                    isRequired
                                    label="첫 인사말"
                                    labelPlacement="outside"
                                    placeholder="캐릭터가 건넬 첫 인사말을 적어주세요"
                                    className='mt-10 px-10 h-40'
                                    disableAnimation={true}
                                />
                            </div>
                            
                            <div className='h-40'>
                                <Textarea       
                                    isRequired
                                    label="캐릭터 설정 및 정보"
                                    labelPlacement="outside"
                                    placeholder="캐릭터의 역할, 외모, 성격, 스킬 등을 자유롭게 적어주세요"
                                    className='mt-10 px-10'
                                    disableAnimation={true}

                                />
                            </div>
                        </>
                    )}
                    {/* area for buttons */}
                    <div className="fixed bottom-0 w-full" >
                        <div className="flex justify-between w-full h-20">
                            <div className='flex justify-start' style={{ position: 'fixed', left: '0%' }}>
                                {state.currentPage > 1 && (
                                    <Button color='primary' className='ml-10' onClick={prevPage}>
                                        이전
                                    </Button>
                                )}
                            </div>
                            
                            <div className='flex justify-end ' style={{ position: 'fixed', right: '40%' }}>
                                {state.currentPage < 3 && (
                                    <Button color='primary' className='mr-12' onClick={nextPage}>
                                        다음
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 */}
                <div className="flex flex-col w-2/5 h-full  border-l-2 border-black">
                    {/* header(right) */}  
                    <div className='flex w-full h-20 justify-center items-center bg-indigo-700 text-createHeaderText'>
                        {state.currentPage === 1 && (
                            <p className=''>캐릭터 미리보기</p>
                        )}
                        {state.currentPage === 2 && (
                            <p className=''>채팅 미리보기</p>
                        )}
                        {state.currentPage === 3 && (
                            <div className='flex-col text-center'>
                                <p className=''>캐릭터 채팅 테스트</p>
                                <p className=''>내가 만든 AI 캐릭터와 대화를 해보세요. 대화는 10턴까지 가능해요.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* 캐릭터 이름, 한 줄 소개 등 들어갈 블록 */}
                    <div className='flex w-full h-[200px] justify-center items-center mt-10'>
                        {/* 여기 이미지는 왼쪽 패널 이미지 따라감 */}
                        <div className='flex flex-col w-9/10 h-4/5 bg-test1A1918 rounded-2xl p-5 '>
                            <div className='flex w-full h-full items-center gap-3 mb-5'>
                                { state.imagePreviewUrl ? (
                                    <img src={state.imagePreviewUrl} alt="Preview" className='max-w-16 h-16 object-contain  rounded-2xl'/>
                                ) : (
                                    <img src={DefaultImage} alt="userImage" className='max-w-16 h-16 object-contain rounded-2xl'/>
                                )}

                                {/* 여기 캐릭터 이름, 한 줄 소개는 왼족 페이지의 값 따라감. 변화 실시간으로 하기 */}
                                <p className='items-center text-xl opacity-70'>{state.name}</p>
                            </div>
                            <p className='items-center text-xl opacity-70'>{state.intro}</p>
                        </div>
                    </div>

                    {/* 채팅예시 부분 */}
                    <div className='flex w-full h-[300px] justify-center items-center '>
                        {/* 여기 이미지는 왼쪽 패널 이미지 따라감 */}
                        <div className='flex flex-col w-9/10 h-full bg-test1A1918 rounded-2xl p-5 '>
                            
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}
export default React.memo(CreateChat);