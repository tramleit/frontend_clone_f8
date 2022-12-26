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
        const res = await axiosJWT.post('http://localhost:8080/api/user/logout', id, {
            headers: {
                token: token,
            },
        });
        console.log('res: ', res);
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (error) {
        console.log('error: ', error);
        dispatch(logoutFailed());
    }
};

export const getUserById = async (idUser) => {
    try {
        const res = await request.get(`/user/${idUser}`);
        return res;
    } catch (error) {
        console.log('error: ', error);
        return error;
    }
};

export const handleSendMail = async (email) => {
    try {
        const res = await request.post('/user/verify-email', { email });
        console.log('res: ', res);
        return res;
    } catch (error) {
        console.log('error: ', error);
        return error.response.data;
    }
};
