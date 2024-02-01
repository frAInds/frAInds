import FriendsLogo from "@/common/components/FriendsLogo";
import "@/pages/account/sign-up/css/sign-up.css"
import { useState } from "react";
const SignUp = () => {

  const [isFocused, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  }

  const handleBlur = () => {
    setFocus(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //입력된 데이터 출력으로 테스트
    console.log(FormData);
  }
  return (
    //sign up container with white bg color
    <div className="flex justify-center items-center h-full">
      <div className="bg-white h-4/5 w-3/5 p-5">
        <FriendsLogo></FriendsLogo>
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center items-center p-3">
          {/* <div> */}
            <label htmlFor="" className={`relative ${isFocused ? 'focused' : ''}`}>
              <input type="text" 
              required
              // placeholder="input username here"
              className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
              focus:border-blue-600 transition duration-200 transform origin-top-left"
              onFocus={handleFocus}
              onBlur={handleBlur}
              />
              <span className={`absolute text-xl left-2 transition duration-200 pointer-events-none
              ${isFocused ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'opacity-20'}`}>
                username?
              </span>
            </label>
          {/* </div> */}
        </form>
      </div>
    </div>
    
  )
}

export default SignUp