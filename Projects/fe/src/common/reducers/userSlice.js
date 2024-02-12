import { createSlice } from "@reduxjs/toolkit";

// //redux toolkit 비동기 처리 함수 createAsyncThunk
// //첫 번째 parameter로 내가 선언/정의한 slice의 name값에 해당되는것 + 이 함수 이름 쓰기
// //내 userSlice의 name = user, 함수이름 = loginUser -> 'user/userLogin'
// export const loginUser = createAsyncThunk(
//     'user/userLogin',
//     async(userCredential, { rejectWithValue }) => {
//         try{
//             //test
//             console.log(userCredential, 'logging in.');
            
//             //testuser1 testpassword1
//             if(userCredential.username === 'testuser1' && userCredential.password === 'testpassword1'){
//                 return { id:1, username: 'testuser1', password: 'test' };
//             }else{
//                 throw new Error('login failed: invalid credentials');
//             }
//         }catch(error){
//             return rejectWithValue(error.message);
//         }
//     }
// );

export const userSlice = createSlice({
    name: 'user',
    //초기상태
    initialState: {
        user: null,

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
    },
});

//export "default" 는 파일당 1개
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
