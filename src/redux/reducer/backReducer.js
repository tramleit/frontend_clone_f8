import { createSlice } from '@reduxjs/toolkit';

const backReducer = createSlice({
    name: 'back',
    initialState: {
        prevBack: '/',
    },
    reducers: {
        backToPreviousPage: (state, action) => {
            state.prevBack = action.payload;
        },
    },
});

export const { backToPreviousPage } = backReducer.actions;
export default backReducer.reducer;
