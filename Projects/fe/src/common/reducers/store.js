import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/common/reducers/userSlice";
import authReducer from "@/common/reducers/authSlice";
//dark mode
import darkmodeReducer from "@/common/reducers/darkmodeSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        darkmode: darkmodeReducer,
    }

    //다른 미들웨어 추가
});

export default store;