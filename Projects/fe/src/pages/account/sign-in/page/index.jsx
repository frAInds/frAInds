import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendsLogo from "@/common/components/FriendsLogo";
import { Link, useNavigate } from "react-router-dom";
import { logout } from '@/common/reducers/userSlice';

const SignIn = () => {
    const [step, nextStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isLoggedin = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    const [isFocusedUsername, setFocusUsername] = useState(false);
    const [isFocusedPassword, setFocusPassword] = useState(false);

    const handleFocusUsername = () => setFocusUsername(true);
    const handleBlurUsername = () => setFocusUsername(false);
        
    //password 입력창 focus시
    const handleFocusPassword = () => setFocusPassword(true);
    const handleBlurPassword = () => setFocusPassword(false);

    const handleStep = () => {
        if(step === 1 && username.trim() !== ''){
        nextStep(2);
        }
    };

    //redux codes go here
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username.trim() === 'testuser1' && password.trim() === 'testpassword1') {
            //올바른 경우 로그인 시도
            redirectToMainContent();
        } else {
            console.log('invalid user credentials');
            alert("invalid user credentials");

            //다시 id 입력화면으로
            nextStep(1);
        }
    };

    //로그인 성공시 메인페이지로 이동하기 따로 함수로 만듦
    const redirectToMainContent = () => {
        navigate("/");
    }

  // 로그인 상태에 따라 다른 UI 표시
    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-lg p-6 h-1/2 w-1/2 flex flex-col items-center justify-center">
                {isLoggedin ? (
                    <>
                        <h2>Welcome, {username}!</h2>
                        <button onClick={() => dispatch(logout())}>Logout</button>
                    </>
                ) : (
                    <>
                        {step === 1 && (
                            <>
                                <FriendsLogo className="mb-3" />
                                <form className="flex flex-col h-[80%] justify-center items-center p-3">
                                    <label className={ `relative ${ isFocusedUsername ? 'focused' : '' }` }>
                                        <input
                                            type="text"
                                            className="text-xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
                                            focus:border-blue-600 transition duration-200 transform origin-top-left mt-8"
                                            value={username}
                                            required
                                            onChange={(e) => setUsername(e.target.value)}
                                            onFocus={handleFocusUsername}
                                            onBlur={handleBlurUsername}
                                        />
                                        <span className={`absolute text-xl left-2 top-8 transition duration-200 pointer-events-none
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
                                <form className="flex flex-col h-[80%] justify-center items-center p-3" onSubmit={handleLogin} style={{ width: '90%' }}>
                                    <label htmlFor="" className={`relative ${isFocusedPassword ? 'focused' : ''}`}>
                                        <input
                                            type="password"
                                            className="text-xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
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

                        <div className="flex w-[90%] items-center justify-center mb-5">
                            <div className="flex-grow border-t border-gray-200 mt-2 mr-2"></div>
                            <span className="text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-200 mt-2 ml-2"></div>
                        </div>

                        <Link to="/account/sign-up" className="bg-green-600 rounded-md text-white w-[60%] text-center mb-16">
                            <button>SIGN UP</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignIn;
