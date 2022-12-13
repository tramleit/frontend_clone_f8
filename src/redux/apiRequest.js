import * as request from '~/utils/request';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import { searchSuccess } from './searchSlice';

export const search = async (params, dispatch) => {
    try {
        const res = await request.get('/course/search', {
            params: {
                q: params,
            },
        });
        dispatch(searchSuccess(res.data));
        return res.data;
    } catch (error) {
        return error;
    }
};

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await request.post('/user/login', user);
        dispatch(loginSuccess(res));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
        return error.response;
    }
};

export const RegisterNewUser = async (newUser, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await request.post('/user/register', newUser);
        dispatch(registerSuccess());
        navigate('/');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch, id, navigate, token, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post('http://localhost:8080/api/user/logout', id, {
            headers: {
                token: token,
            },
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(logoutFailed());
    }
};
