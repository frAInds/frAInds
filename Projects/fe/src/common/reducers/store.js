import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/common/reducers/userSlice";
import authReducer from "@/common/reducers/authSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    }

    //다른 미들웨어 추가
});

export default store;