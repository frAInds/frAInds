import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/common/reducers/rootReducer";

const store = configureStore({
    reducer: rootReducer,

    //다른 미들웨어 추가
});

export default store;