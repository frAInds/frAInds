import FriendsLogo from "@/common/components/FriendsLogo";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {

  //login input을 한번에 2개 받는게 아니고
  //id(username) 입력(혹은 엔터) -> next 버튼 -> 비번입력 -> 제출버튼 식으로 할거
  const [step, nextStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [isFocused, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  }

  const handleBlur = () => {
    setFocus(false);
  }

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
    try{
      const response = await fetch('@/pages/account/testdata/json/users.json');
      if(!response.ok){
          throw new Error(`http error ${response.status}`);
      }
      const data = await response.json();

      const user = data.users.find(
          (user) => user.username === username && user.password === password
      );

      if(user){
          console.log('login success', user);
          alert('login success');

          //로그인 상태 true로 전환
          setLoggedin((prevLoggedin) => !prevLoggedin);
          console.log('Login state updated:', !loggedin);

          navigate("/chat");

      }else if(!username || !password){
          console.log('username or password is not entered');
          alert('username or password is not entered');
      }else{
          console.log('username or password is invalid');
          alert('invalid username or password');
      }
  }catch(error){
      console.error('error occured', error);
  }

  }

  return (
    <>
    {/* h-full(매우 중요) */}
    <div className="flex items-center justify-center h-full ">
      <div className="bg-white rounded-lg p-6 h-1/2 w-1/2 flex flex-col items-center justify-center">
          {step === 1 && (
            <>
            <FriendsLogo className="mb-3"></FriendsLogo>

            
            <input 
            type="text"
            placeholder="ID or username"
            // className="border border-gray-300 rounded-md p-1 mb-2 w-[70%]"
            className="border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
            focus:border-blue-600 transition duration-200 transform origin-top-left p-1 mb-2 w-[70%]"
            value={username}
            required
            onChange={
              (e) => {
                setUsername(e.target.value);
              }
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
            
            <button className="bg-blue-600 rounded-md text-white w-[60%] mt-3"
            onClick={handleStep}
            >
              NEXT
            </button>
            </>
          )}

          {step === 2 && (
            <>

            <FriendsLogo className="mb-3"></FriendsLogo>

            {/* 2nd input */}
            <input 
            type="password"
            placeholder="passwrd"
            className="border border-gray-300 rounded-md p-1 mb-2 w-[70%]"
            value={password}
            onChange={
              (e) => {
                setPassword(e.target.value);
              }
            }
            />
            
            <button className="bg-blue-600 rounded-md text-white w-[60%] mt-3"
            onClick={handleSlide}
            >
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
            <button>
              SIGN UP
            </button>
          </Link>
          
      </div>
        
      

    </div>
    
    </>
    
  )
}

export default SignIn