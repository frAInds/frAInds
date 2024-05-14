import FriendsLogo from "@/common/components/FriendsLogo";
import "@/pages/account/sign-up/css/sign-up.css";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";


const SignUp = () => {
  const [value, setValue] = useState("");
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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

      if(!data){
        throw new Error('Sign up failed!');
      }

      navigate('/');

    }catch(error){
      console.error('Error:', error);
    }
    console.log({ username, password });
  };

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = useMemo(() => {
    if (username === "") return false;

    return validateEmail(username) ? false : true;
  }, [username]);


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
            color={isInvalid ? "danger" : "default"}
            errorMessage={isInvalid && "부적절한 id 형식입니다."}
            onChange={(e) => {
              console.log(username)
              setUsername(e.target.value);
            }}
            placeholder="Username"
            isInvalid={isInvalid}
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
            type="password"
            label="password"
            color="primary"
            onInput={(e) => setPassword(e.target.value)}
            placeholder="password"
            classNames={{
              label: "text-black dark:text-white",
              input: [
                
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700 dark:placeholder:text-white",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-primary-200/50",
                "dark:bg-default",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
                
              ],
            }}
          />
        </div>

        <button className="rounded border-2 border-gray-400 mt-5 w-[40%] bg-violet-400">
          SUBMIT
        </button>

      </form>
    </div>
  </div>
  );
};

export default SignUp;
