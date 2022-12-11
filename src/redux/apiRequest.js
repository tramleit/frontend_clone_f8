import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:8080/api/user/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        console.log('error: ', error.response);
        dispatch(loginFailed(error.response));
        return error.response;
    }
};

export const RegisterNewUser = async (newUser, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:8080/api/user/register', newUser);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
    }
};
