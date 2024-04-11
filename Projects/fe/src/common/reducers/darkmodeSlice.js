//다크모드 on/off 상태관리용 파일
import { createSlice } from '@reduxjs/toolkit';
export const darkmodeSlice = createSlice({ 
    name: 'darkmode',
    initialState: {
        value: false,
    },
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        },
    },
});

export const { toggle } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;