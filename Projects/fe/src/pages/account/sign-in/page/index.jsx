import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendsLogo from "@/common/components/FriendsLogo";
import { Link, useNavigate } from "react-router-dom";
// import { logout } from '@/common/reducers/userSlice';
import { login, logout } from '@/common/reducers/authSlice';
import { Input } from "@nextui-org/react";


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [value, setValue] = useState("");

    const isLoggedin = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    //redux codes go here
    const dispatch = useDispatch();

    const handleLogin = async (e) => {

        e.preventDefault();

        try{
            const result = await dispatch(login(username, password));

            if(login.fulfilled.match(result)){
                
                redirectToMainContent();
            }else{
                console.error('login failed');
            }
        }catch(error){
            console.error('login failed', error);
        }


        
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    //로그인 성공시 메인페이지로 이동하기 따로 함수로 만듦
    const redirectToMainContent = () => {
        // console.log("isLoggedin: ",isLoggedin);
        navigate("/");
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
                <form className='flex flex-col p-3 gap-5 w-full items-center'>
                    <div className="w-3/4 mb-2">
                        <Input
                        isRequired
                        type="text"
                        label="Username"
                        onValueChange={setValue}
                        placeholder="Username"
                        classNames={{
                            label: "text-black dark:text-white",
                            input: [
                            
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700 dark:placeholder:text-white",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                            "shadow-xl",
                            "bg-default-200",
                            // "dark:bg-default/60",
                            "dark:hover:bg-default/70",
                            // "group-data-[focused=true]:bg-default-200/50",
                            // "dark:group-data-[focused=true]:bg-default/60",
                            // "!cursor-text",
                            ],
                        }}/>
                    </div>

                    <div className="w-3/4 mb-2">
                        <Input
                        isRequired
                        type="text"
                        label="Password"
                        onValueChange={setValue}
                        placeholder="Password"
                        classNames={{
                            label: "text-black dark:text-white",
                            input: [
                            
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700 dark:placeholder:text-white",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                            "shadow-xl",
                            "bg-default-200",
                            // "dark:bg-default/60",
                            "dark:hover:bg-default/70",
                            // "group-data-[focused=true]:bg-default-200/50",
                            // "dark:group-data-[focused=true]:bg-default/60",
                            // "!cursor-text",
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

export default SignIn;
