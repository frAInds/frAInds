import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    //초기상태
    initialState: {
        user: null,
        //회원가입 성공 후 저장된 사용자 정보
        registeredUsers: [],
    },
    reducers: {
        //action 함수들 관리할 state: 로그인/비로그인(or 로그아웃) 로그아웃 버튼은 추가예정
        //state = 현재 상태, action = 상태를 바꿀 변수
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        registeredUsers: (state, action) => {
            state.registeredUsers.push(action.payload);
        },
    },
});

//export "default" 는 파일당 1개
export const { login, logout, registerUser } = userSlice.actions;
// export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
