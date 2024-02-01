import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//초기상태
const initialState = {
    //로그인 초기상태는 false
    isLoggedin: false,
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //action 함수들 관리할 state: 로그인/비로그인(or 로그아웃) 로그아웃 버튼은 추가예정
        //state = 현재 상태, action = 상태를 바꿀 변수
        login: (state, action) => {
            state.isLoggedin = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedin = false;
            state.user = null;
        },
    }
});

//export "default" 는 파일당 1개
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
