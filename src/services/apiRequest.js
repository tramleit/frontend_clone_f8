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
} from '~/redux/reducer/authReducer';
import { searchSuccess } from '~/redux/reducer/searchReducer';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await request.post('/user/login', user);
        dispatch(loginSuccess(res));
        navigate('/');
        return res;
    } catch (error) {
        dispatch(loginFailed());
        return error.response;
    }
};

export const RegisterNewUser = async (newUser, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await request.post('/user/register', newUser);
        dispatch(registerSuccess(res));
        navigate('/');
        return res;
    } catch (error) {
        dispatch(registerFailed());
        return error.response;
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

export const GetAllCourseFree = async () => {
    try {
        const res = await request.get('/course/get');
        console.log('res: ', res);
    } catch (error) {
        console.log('error: ', error);
    }
};
