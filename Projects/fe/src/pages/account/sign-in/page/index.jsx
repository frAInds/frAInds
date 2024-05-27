import { useEffect, useState, memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendsLogo from "@/common/components/FriendsLogo";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from '@/common/reducers/authSlice';
import { Input } from "@nextui-org/react";


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = useCallback((e) => {
        const value = e.target.value;
        console.log(value);
        setUsername(value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
        const value = e.target.value;
        console.log(value);

        setPassword(value);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        console.log(username, password);
        const data = { username, password };
        console.log("Sending data:", { username, password });
        console.log(JSON.stringify({ username, password }));        
        
        fetch('/api/signin', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(data),
        })
        .then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                    return response.json();
            })
        .then(
            (responseData) => {
                const { access_token, username, status } = responseData;
                console.log("Response data:", responseData);
                localStorage.setItem('token', access_token); // 토큰 저장
                console.log(username,"logged in");
                console.log("User status:", status);
                const userData = { username: username, status };
                console.log("User data:", userData);
                dispatch(loginSuccess(userData)); // 사용자 정보를 상태에 저장
                redirectToMainContent();
            })
        .catch((error) => {
            console.error("Login error:", error);
            dispatch(loginFailure(error));
        });
    };

    //로그인 성공시 메인페이지로 이동하기 따로 함수로 만듦
    const redirectToMainContent = () => {
        navigate("/broadcast");
    };

  // 로그인 상태에 따라 다른 UI 표시
    return (
        <>
        <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-lg p-6 h-[70%] w-1/2 flex flex-col items-center justify-center">
                <FriendsLogo className="mb-20"></FriendsLogo>
                <form className='flex flex-col p-3 gap-5 w-full items-center ' onSubmit={handleLogin} autoComplete="off">
                    <div className="w-3/4 mb-2">
                        <Input
                        isRequired
                        name="username"
                        type="text"
                        label="Username"
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        autoComplete="off"
                        value={username}
                        // key={Date.now()}

                        classNames={{
                            label: "text-black dark:text-white",
                            input: [
                            
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700 dark:placeholder:text-white",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                            "shadow-xl",
                            "bg-primary-200/50",
                            "dark:hover:bg-primary-200/70",
                            ],
                        }}/>
                    </div>

                    <div className="w-3/4 mb-2">
                        <Input
                        isRequired
                        name="password"
                        type="password"
                        label="Password"
                        onChange={handlePasswordChange}

                        placeholder="Password"
                        autoComplete="off"
                        // key={Date.now()}
                        value={password}
                        classNames={{
                            label: "text-black dark:text-white",
                            input: [
                            
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700 dark:placeholder:text-white",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "shadow-xl",
                                "bg-primary-200/50",
                                "dark:hover:bg-primary-200/70",
                            ],
                        }}/>
                    </div>
                
                
                    <button className="rounded-2xl border-2 border-gray-400 mt-5 w-[40%] bg-violet-400">
                        Login !
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default memo(SignIn);
