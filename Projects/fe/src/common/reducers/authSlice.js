import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//sample json db server
import { loginUserApi } from "@/assets/db/authApi";
// 사용자 인증 정보같은거 담은 Slice

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await loginUserApi(username, password);
            // response.data에는 사용자 정보가 포함되어 있다고 가정

            console.log("res data: ",response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//로그아웃 비동기 처리하기
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutUserApi();
            return;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, //로그인된 사용자 정보
        isAuthenticated: false, //로그인 여부
        error: null,

    },
    reducers: {
        
        // logout: (state) => {
        //     state.isAuthenticated = false;
        // },
    },
    extraReducers: (builder) =>{
        builder
        // 중요 ** 여기서 상태 처리될 때 위에 loginUserApi는 이미 처리된 상태.
        // 그래서 return해서 data가 컴포넌트로 넘어간 이후에 동작 상태(fulfilled, pending 등)
        //에 따라서 state가 수정된다.
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                //로그인이 됐으니까 null -> 사용자
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                //로그아웃 시 사용자 -> null
                state.user = null;
            })
    }
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;