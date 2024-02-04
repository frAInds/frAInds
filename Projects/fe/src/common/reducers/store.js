import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/common/reducers/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
    }

    //다른 미들웨어 추가
});

export default store;