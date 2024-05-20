import { useEffect, useState, memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendsLogo from "@/common/components/FriendsLogo";
import { Link, useNavigate } from "react-router-dom";
// import { logout } from '@/common/reducers/userSlice';
import { login, logout } from '@/common/reducers/authSlice';
import { Input } from "@nextui-org/react";


const SignIn = ({ isOnLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const isLoggedin = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    //redux codes go here
    const dispatch = useDispatch();

    useEffect(() => {
        setUsername('');
        setPassword('');
      }, []);

    const handleUsernameChange = useCallback((e) => {
        const value = e.target.value;
        setUsername(value);
    }, [username]);

    const handlePasswordChange = useCallback((e) => {
        const value = e.target.value;
        setPassword(value);
    }, [password]);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch('/api/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: username, password:password }),
            });
        

            if (!response.ok) {
                throw new Error('Login failed!');
              }
          
              const data = await response.json();
              redirectToMainContent();

              if (!data) {
                throw new Error('Login failed!');
              }
            
          } catch (error) {
            console.error('Login failed 2', error);
          }
        
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    //로그인 성공시 메인페이지로 이동하기 따로 함수로 만듦
    const redirectToMainContent = () => {
        // console.log("isLoggedin: ",isLoggedin);
        navigate("/root");
    }

    //로그인 여부 확인용 useEffect
    useEffect(
        () => {
            console.log("isLoggedin: ",isLoggedin);
        }, [isLoggedin]
    ); 

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
