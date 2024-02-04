import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendsLogo from "@/common/components/FriendsLogo";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from '@/common/reducers/userSlice';

const SignInTest = () => {
    const [step, nextStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isFocusedUsername, setFocusUsername] = useState(false);
    const [isFocusedPassword, setFocusPassword] = useState(false);

    const handleFocusUsername = () => {
        setFocusUsername(true);
    }
    
    const handleBlurUsername = () => {
        setFocusUsername(false);
    }
    
      //password 입력창 focus시
    const handleFocusPassword = () => {
        setFocusPassword(true);
    }
    
    const handleBlurPassword = () => {
        setFocusPassword(false);
    }

    const isLoggedin = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStep = () => {
        if(step === 1 && (username.length >= 8) && username.trim !== ''){
        nextStep(2);
        }
    };

    const handleLogin = async () => {
        try {
        await dispatch(login({ username, password }));
        console.log('Login success!');
        
        // 로그인 성공 시 다른 URL로 이동
        navigate('../../test'); 
        } catch (error) {
        console.error('Login failed:', error.message);
        }
    };

    // 로그인 상태에 따라 다른 UI 표시
    return (
        <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-lg p-6 h-1/2 w-1/2 flex flex-col items-center justify-center">
            {isLoggedin ? (
            // 로그인 상태일 때
            <>
                <h2>Welcome, {username}!</h2>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </>
            ) : (
            // 로그인 상태가 아닐 때
            <>
                {step === 1 && (
                <>
                    <FriendsLogo className="mb-3" />

                    <form onSubmit={handleLogin} className='flex flex-col h-full justify-center items-center p-3'>
                        <label className={`relative ${isFocusedUsername ? 'focused' : ''}`}>
                            <input
                            type="text"
                            className="border-2 rounded-lg border-gray-600 border-opacity-50 outline-none focus:border-blue-600 transition duration-200 transform origin-top-left p-1 mb-2 w-[70%]"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={handleFocusUsername}
                            onBlur={handleBlurUsername}
                            />

                            <span className={`absolute text-xl left-2 transition duration-200 pointer-events-none
                        ${isFocusedUsername ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'opacity-20'}`}>
                            username?
                            </span>
                        </label>

                        <button className="bg-blue-600 rounded-md text-white w-[60%] mt-3" onClick={handleStep}>
                        NEXT
                        </button>
                    </form>

                </>
                )}

                {step === 2 && (
                <>
                    <FriendsLogo className="mb-3" />
                    <form onSubmit={handleLogin} className="flex flex-col h-full justify-center items-center p-3">
                        <label htmlFor="" className={`relative ${isFocusedPassword ? 'focused' : ''}`}>
                            <input
                            type="password"
                            className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
                            focus:border-blue-600 transition duration-200 transform origin-top-left mt-8"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={handleFocusPassword}
                            onBlur={handleBlurPassword}
                            />
                            <span className={`absolute text-xl left-2 top-8 transition duration-200 pointer-events-none
                            ${isFocusedPassword ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'opacity-20'}`}> 
                                password?
                            </span>
                        </label>
                        <button className="bg-blue-600 rounded-md text-white w-[60%] mt-3" onClick={handleLogin}>
                        LOG IN
                        </button>
                    </form>

                </>
                )}

                <div className="flex w-[90%] items-center justify-center">
                <div className="flex-grow border-t border-gray-200 mt-2 mr-2"></div>
                <span className="text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-200 mt-2 ml-2"></div>
                </div>

                <Link to="/account/sign-up" className="bg-green-600 rounded-md text-white w-[60%] mt-3 text-center">
                <button>SIGN UP</button>
                </Link>
            </>
            )}
        </div>
        </div>
    );
};

export default SignInTest;
