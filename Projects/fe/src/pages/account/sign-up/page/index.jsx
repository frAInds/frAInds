import FriendsLogo from "@/common/components/FriendsLogo";
import "@/pages/account/sign-up/css/sign-up.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [isFocusedUsername, setFocusUsername] = useState(false);
  const [isFocusedPassword, setFocusPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFocusUsername = () => setFocusUsername(true);
  const handleBlurUsername = () => setFocusUsername(false);
  const handleFocusPassword = () => setFocusPassword(true);
  const handleBlurPassword = () => setFocusPassword(false);

  //
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    // Check username conditions
    if (!/^[a-z0-9]{8,16}$/.test(value)) {
      setErrorMessage("Username은 8 - 16 자리 사이의 소문자와 숫자여야 합니다.");
    } else {
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password conditions
    if (!/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{10,20}$/.test(value)) {
      setErrorMessage("Password should contain at least one lowercase letter, one number, one special character, and have a length of 10 to 20 characters.");
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      //실패
      if (!response.ok) {
        throw new Error('Sign up failed!');
      }

      const data = await response.json();
    }catch(e){
      console.error('Error:', error);
    }
    console.log({ username, password });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white rounded-lg p-6 h-[70%] w-1/2 flex flex-col justify-center">
        <FriendsLogo className="mb-20"></FriendsLogo>

        <form onSubmit={handleSubmit} className="flex flex-col items-center p-3">
          
          <label className={`relative ${isFocusedUsername ? 'focused' : ''}`}>
            <input
              type="text"
              required
              className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none focus:border-blue-600 transition duration-200 transform origin-top-left
              dark:bg-white dark:text-test1A1918"
              onFocus={handleFocusUsername}
              onBlur={handleBlurUsername}
              onChange={handleUsernameChange}
              value={username}
            />
            <span className={`absolute text-xl left-2 transition duration-200 pointer-events-none
              ${isFocusedUsername || username.trim() !== '' ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'text-gray-400 opacity-60'}`}>
              username
            </span>
          </label>

          <label className={`relative ${isFocusedPassword ? 'focused' : ''}`}>
            <input
              type="password"
              required
              className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
              focus:border-blue-600 transition duration-200 transform origin-top-left mt-8
              dark:bg-white dark:text-test1A1918"
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              onChange={handlePasswordChange}
              value={password}
            />
            <span className={`absolute text-xl left-2 top-8 transition duration-200 pointer-events-none
              ${isFocusedPassword || password.trim() !== '' ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'text-gray-400 opacity-60'}`}>
              password
            </span>
          </label>

          <div className="mt-10">
            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </div>
          

          <button className="rounded border-2 border-gray-400 mt-20 w-[40%] bg-violet-400">
            SUBMIT
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
