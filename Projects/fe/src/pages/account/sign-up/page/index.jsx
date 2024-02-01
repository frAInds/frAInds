import FriendsLogo from "@/common/components/FriendsLogo";
import "@/pages/account/sign-up/css/sign-up.css"
import { useState } from "react";
const SignUp = () => {

  const [isFocusedUsername, setFocusUsername] = useState(false);
  const [isFocusedPassword, setFocusPassword] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  //username 입력창 focus시
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
  
  //username, password 입력시 span 사라지게
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }


  //submit 버튼
  const handleSubmit = (e) => {
    e.preventDefault();

    //입력된 데이터 출력으로 테스트
    console.log(FormData);
  }

  
  return (
    //sign up container with white bg color
    <div className="flex justify-center items-center h-full">
      <div className="bg-white h-4/5 w-3/5 p-5">

        <div className="logo-container mb-4">
          <FriendsLogo></FriendsLogo>
          </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center items-center p-3">
          
            <label htmlFor="" className={`relative ${isFocusedUsername ? 'focused' : ''}`}>
              <input type="text" 
              required
              // placeholder="input username here"
              className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
              focus:border-blue-600 transition duration-200 transform origin-top-left"
              onFocus={handleFocusUsername}
              onBlur={handleBlurUsername}
              onChange={handleUsernameChange}
              />
              <span className={`absolute text-xl left-2 transition duration-200 pointer-events-none
              ${isFocusedUsername ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'opacity-20'}`}>
                username?
              </span>
            </label>

            <label htmlFor="" className={`relative ${isFocusedPassword ? 'focused' : ''}`}>
              <input type="password" 
              required
              className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
              focus:border-blue-600 transition duration-200 transform origin-top-left mt-8"
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              onChange={handlePasswordChange}
              />
              <span className={`absolute text-xl left-2 top-8 transition duration-200 pointer-events-none
              ${isFocusedPassword ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'opacity-20'}`}>
                password?
              </span>
            </label>

            <button className="rounded border-2 border-gray-400 mt-8 w-[40%] hover:bg-blue-600">
              SUBMIT
            </button>

            {/* hidden string that shows up when rules are violated */}
          
        </form>
      </div>
    </div>
    
  )
}

export default SignUp