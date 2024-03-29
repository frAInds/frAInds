import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(

    'user/loginUser',

    async( {username, password }, { rejectWithValue }) => {
        try{
            //login API calls here
            if(username.trim() === 'testuser1' && password.trim() === 'testpassword1'){
                return { username };
            }else{
                throw new Error('invalid user credentials');
            }
        }catch(error){
            return rejectWithValue(error.response.data);
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
    extraReducers: (builder) =>{

        builder
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isAuthenticated = false;
        });
        
    }
});

//export "default" 는 파일당 1개
export const { logout, registeredUser } = userSlice.actions;

export default userSlice.reducer;
