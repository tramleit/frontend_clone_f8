import * as request from '~/utils/request';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
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
        dispatch(loginSuccess(res.data));
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
