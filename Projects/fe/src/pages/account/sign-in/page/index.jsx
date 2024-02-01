import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendsLogo from "@/common/components/FriendsLogo";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from '@/common/reducers/userSlice';

const SignIn = () => {
  const [step, nextStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const isLoggedin = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleStep = () => {
    if(step === 1 && (username.length >= 8) && username.trim !== ''){
      nextStep(2);
    }
  };

  const handleSlide = () => {
    nextStep((prevStep) => {
      if(prevStep === 1){
        nextStep(2);
      }
    });
    // 2 -> 1 없음
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
                <input
                  type="text"
                  placeholder="ID or username"
                  className="border-2 rounded-lg border-gray-600 border-opacity-50 outline-none focus:border-blue-600 transition duration-200 transform origin-top-left p-1 mb-2 w-[70%]"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button className="bg-blue-600 rounded-md text-white w-[60%] mt-3" onClick={handleStep}>
                  NEXT
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <FriendsLogo className="mb-3" />
                <input
                  type="password"
                  placeholder="passwrd"
                  className="border border-gray-300 rounded-md p-1 mb-2 w-[70%]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-600 rounded-md text-white w-[60%] mt-3" onClick={handleLogin}>
                  LOG IN
                </button>
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

export default SignIn;
