import { createContext, useState } from "react";

const someUtilFunction = () => console.log("called!");

const intialUserInformation = {
  username: 'example_username'
};

const initialSomeOtherInformation = {
  show_sidebar: false
};

export const TestContext = createContext(null);

const TestProvider = (props) => {
  const [userInformation, setUserInformation] = useState(intialUserInformation);
  const [someOtherInformation, setSomeOtherInformation] = useState(initialSomeOtherInformation);

  return (
    <TestContext.Provider
    // value에 아래와 같이 객체로 감싸서 넘겨주면 child component에서 useContext로 가져와 사용할 수 있다
    // util function이나 useRef로 생성한 객체도 이곳에 넣어서 child component에서 사용하게 할 수 있다.
      value={{
        userInformation, setUserInformation,
        someOtherInformation, setSomeOtherInformation,
        someUtilFunction
      }}
    >
      {props.children}
    </TestContext.Provider>
  )
}

export default TestProvider