import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/common/reducers/userSlice"

const rootReducer = combineReducers({
    user: userReducer,
    //다른 reducer 추가 가능
});

export default rootReducer;