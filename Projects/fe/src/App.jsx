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
import InitialLoad from "./common/components/InitialLoad";
import { NextUIProvider } from "@nextui-org/react";
import Help from "./pages/root/page/Help";
import Intro from "./pages/root/page/Intro";

import Landing from "./pages/landing/page";

//방송 url
import TaeminBroadcast from "./pages/broadcast/page/broadcast_details/TaeminBroadcast";
import CyborgTaeminBroadcast from "./pages/broadcast/page/broadcast_details/CyborgTaeminBroadcast";
import Broadcast from "@/pages/broadcast/page/index";
import BroadcastRoot from "./pages/broadcast/page/BroadcastRoot";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route
        errorElement={<ErrorBoundary />}
      >
        <Route path="/" element={<Landing />}></Route>
        <Route path="/intro" element={<Intro/>} />
        <Route path="/help" element={<Help/>} />

        <Route element={<InitialLoad />} >
            <Route path="account" element={<AccountLayout />}>
              <Route path="sign-in" element={<SignIn />}/>
              <Route path="sign-up" element={<SignUp />}/>
            </Route>

            <Route element={<RootLayout />}>
              <Route path="/broadcast" element={<BroadcastRoot />} />
            </Route>

            <Route path="broadcast" element={<Broadcast />}>
              <Route path="taemin" element={<TaeminBroadcast />} />
              <Route path="cyborg" element={<CyborgTaeminBroadcast />} />
            </Route>

          {/* //회원가입 성공 테스트용 */}
        </Route>
      </Route>
    )
  )

  return <>
    <NextUIProvider>
      {/* <TestProvider> */}
        <RouterProvider router={router} />
      {/* </TestProvider> */}
    </NextUIProvider>
  </>

}

export default App
