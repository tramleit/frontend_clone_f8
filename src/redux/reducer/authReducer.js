import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            console.log('loginSuccess: ', action.payload);
            state.login.currentUser = action.payload;
        },
        registerSuccess: (state, action) => {
            console.log('registerSuccess: ', action.payload);
            state.login.currentUser = action.payload;
        },
        logoutSuccess: (state) => {
            state.login.currentUser = null;
        },
    },
});

export const { loginSuccess, registerSuccess, logoutSuccess } = authReducer.actions;

export default authReducer.reducer;
