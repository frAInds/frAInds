import FriendsLogo from "@/common/components/FriendsLogo";
import "@/pages/account/sign-up/css/sign-up.css";
import { useState, useEffect, useMemo,memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";


const SignUp = ({ isOnLogin }) => {
  // username, password, 확인용 password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  // 이전에 입력한 값이 계속 남아있어서 초기화 하는 부분
  const reset = useCallback(() => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setIsUsernameInvalid(false);
    setIsPasswordInvalid(false);
    setIsPasswordMismatch(false);
  }, []);

  useEffect(() => {
    if (!isOnLogin) {
      reset();
    }
  }, [isOnLogin, reset]);

  const navigate = useNavigate();

  //username, password regex
  const validateUsername = useCallback((value) => /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{10,20}$/.test(value), []);
  const validatePassword = useCallback((value) => /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,}$/.test(value), []);

  const handleUsernameChange = useCallback((e) => {
    const value = e.target.value;
    setUsername(value);
    setIsUsernameInvalid(!validateUsername(value));
  }, [validateUsername]);
  
  const handlePasswordChange = useCallback((e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordInvalid(!validatePassword(value));
    setIsPasswordMismatch(value !== confirmPassword);
  }, [validatePassword, confirmPassword]);
  
  const handleConfirmPasswordChange = useCallback((e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsPasswordMismatch(value !== password);
  }, [password]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
  
    if (isUsernameInvalid || isPasswordInvalid || isPasswordMismatch) {
      console.error('Invalid form data');
      return;
    }
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 전달할 값(key)와 이 파일에서 사용하는 변수 이름(value)
        body: JSON.stringify({ username: username, password:password }),
      });
  
      // 실패
    if (!response.ok) {
      throw new Error('Sign up failed!');
    }

    const data = await response.json();

    if (!data) {
      throw new Error('Sign up failed!');
    }
  
    navigate('/');
  
    } catch (error) {
      console.error('Error:', error);
    }
    console.log({ username, password });
  },[username, password, isUsernameInvalid, isPasswordInvalid, isPasswordMismatch, navigate]);

  return (
    <div className="flex justify-center items-center h-full">
    <div className="bg-white rounded-lg p-6 h-[70%] w-1/2 flex flex-col justify-center">
      <FriendsLogo className="mb-20"></FriendsLogo>

      <form onSubmit={handleSubmit} className="flex flex-col items-center p-3 gap-5">

        <div className="w-3/4 mb-2">
          <Input
            isRequired
            type="text"
            label="Username"
            color={isUsernameInvalid ? "danger" : "default"}
            onChange={handleUsernameChange}
            placeholder="Username"
            isInvalid={isUsernameInvalid}
            value={username}
            status
            disableAnimation={true}
            classNames={{
              label: "text-black dark:text-white",
              input: [
                
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700 dark:placeholder:text-white",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/90",
                "hover:bg-default-300/80",
              ],
            }}/>
            {/* username 검증 에러 */}
            {isUsernameInvalid && (
            <div className="text-red-500 text-sm mt-1">
              영어 소문자 + 숫자로 이루어진 10 ~ 20글자로 작성해주세요.
            </div>
  )}
        </div>
        
        {/* password */}
        <div className="w-3/4 mb-2">
          <Input
            isRequired
            type="password"
            label="password"
            color={isPasswordInvalid ? "danger" : "default"}
            onChange={handlePasswordChange}
            placeholder="password"
            // status={isPasswordInvalid ? "error" : "default"}
            disableAnimation={true}
            value={password}
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
                "bg-default-200/90",
                "hover:bg-default-300/80",
              ],
            }}/>
          {isPasswordInvalid && (
              <div className="text-red-500 text-sm mt-1">
                비밀번호는 8자 이상이어야 하며, 숫자와 특수문자를 포함해야 합니다.
              </div>
          )}
        </div>
        
        {/* 비밀번호 확인용 */}
        <div className="w-3/4 mb-2">
          <Input
            isRequired
            type="password"
            label="password confirm"
            color={isPasswordMismatch ? "danger" : "default"}
            onChange={handleConfirmPasswordChange}
            placeholder="password confirm"
            disableAnimation={true}
            value={confirmPassword}
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
                "bg-default-200/90",
                "hover:bg-default-300/80",
              ],
            }}
          />
          {isPasswordMismatch && (
              <div className="text-red-500 text-sm mt-1">
                비밀번호가 일치하지 않습니다.
              </div>
          )}
        </div>

        <button className="rounded border-2 border-gray-400 mt-5 w-[40%] bg-violet-400">
          SUBMIT
        </button>

      </form>
    </div>
  </div>
  );
};

export default memo(SignUp);
