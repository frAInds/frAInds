import FriendsLogo from "@/common/components/FriendsLogo";
import "@/pages/account/sign-up/css/sign-up.css";
import { useState } from "react";

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

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    // Check username conditions
    if (!/^[a-z0-9]{8,16}$/.test(value)) {
      setErrorMessage("Username should contain only lowercase letters and numbers, with a length of 8 to 16 characters.");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there is an error message
    if (errorMessage) {
      console.log(errorMessage);
      return;
    }

    // Proceed with form submission
    console.log({ username, password });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white rounded-lg p-6 h-[70%] w-1/2 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col h-full  items-center p-3">
          <FriendsLogo className="mb-5"></FriendsLogo>
          <label className={`relative ${isFocusedUsername ? 'focused' : ''}`}>
            <input
              type="text"
              required
              className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none focus:border-blue-600 transition duration-200 transform origin-top-left"
              onFocus={handleFocusUsername}
              onBlur={handleBlurUsername}
              onChange={handleUsernameChange}
              value={username}
            />
            <span className={`absolute text-xl left-2 transition duration-200 pointer-events-none
              ${isFocusedUsername || username.trim() !== '' ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'opacity-20'}`}>
              username
            </span>
          </label>

          <label className={`relative ${isFocusedPassword ? 'focused' : ''}`}>
            <input
              type="password"
              required
              className="text-2xl border-2 rounded-lg border-gray-600 border-opacity-50 outline-none
              focus:border-blue-600 transition duration-200 transform origin-top-left mt-8"
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              onChange={handlePasswordChange}
              value={password}
            />
            <span className={`absolute text-xl left-2 top-8 transition duration-200 pointer-events-none
              ${isFocusedPassword || password.trim() !== '' ? 'transform -translate-y-6 -translate-x-4 scale-75 text-blue-600  opacity-100' : 'opacity-20'}`}>
              password
            </span>
          </label>

          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}

          <button className="rounded border-2 border-gray-400 mt-20 w-[40%] hover:bg-blue-600">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
