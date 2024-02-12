import { Root } from "@/pages/root/page/index";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import ErrorBoundary from "@/common/components/ErrorBoundary";
import RootLayout from "@/pages/root/page/components/Layout";
import AccountLayout from "@/pages/account/page/components/Layout"
import SignIn from "@/pages/account/sign-in/page";
import SignUp from "@/pages/account/sign-up/page";
import Test from "./pages/test/page";
import SignInTest from "@/pages/test/page/sign-in_test";
import TestProvider from "./common/contexts/TestProvider";
import Chat from "./pages/chat/page";
import SignUpResult from "@/pages/account/sign-up/page/sign-up_result";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        errorElement={<ErrorBoundary />}
      >
        <Route path="account" element={<AccountLayout />}>
          <Route path="sign-in" element={<SignIn />}/>
          <Route path="sign-up" element={<SignUp />}/>
          
        </Route>

        <Route
          element={<RootLayout />}
        >
          <Route
            path="/"
            element={<Root />}
          />
        </Route>

        <Route path="test/*" element={<SignInTest />} />
        <Route
          path="test"
          element={<Test />}
        />

        <Route
          path="chat"
          element={<Chat />}
        />

      //회원가입 성공 테스트용

      <Route path="account/sign-up/result" element={<SignUpResult />}/>

      </Route>
    )
  )

  return <>
    <TestProvider>
      <RouterProvider router={router} />
    </TestProvider>
  </>

}

export default App
