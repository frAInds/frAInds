import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(

    'user/loginUser',

    async (userData, thunkAPI) => {
        const { username, password } = userData;
        
        try{
            //api 호출하는 공간
            const response = await fetch(
                'login-api',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'app/json'
                    },
                    body: JSON.stringify({ username, password}),

                });

                //response 실패
            if(!response.ok()){
                throw new Error('login failed');
            }

            const data = await response.json();
        }catch(error){
            throw new Error('login failed');
        }
    }
);







export const userSlice = createSlice({
    name: 'user',
    //초기상태
    initialState: {
        user: null,
        //회원가입 성공 후 저장된 사용자 정보
        registeredUsers: [],
        isAuthenticated: false, //로그인 여부
    },
    reducers: {
        //action 함수들 관리할 state: 로그인/비로그인(or 로그아웃) 로그아웃 버튼은 추가예정
        //state = 현재 상태, action = 상태를 바꿀 변수
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        registeredUsers: (state, action) => {
            state.registeredUsers.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // 로그인 성공 시 사용자 정보를 상태에 저장하고 isAuthenticated를 true로 설정
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        // loginUser의 실패 상황에 대한 처리
        builder.addCase(loginUser.rejected, (state, action) => {
            // 로그인 실패 시 사용자 정보와 isAuthenticated를 초기화
            state.user = null;
            state.isAuthenticated = false;
            // 에러 처리 등 추가적인 작업 가능
        });
    }
});

//export "default" 는 파일당 1개
export const { logout, registeredUser } = userSlice.actions;

export default userSlice.reducer;
