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
        dispatch(loginSuccess(res.data));
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
        dispatch(registerSuccess(res.data));
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

export const getUserById = async (idUser) => {
    try {
        const res = await request.get(`/user/${idUser}`);
        return res;
    } catch (error) {
        return error;
    }
};

export const handleSendMail = async (email) => {
    try {
        const res = await request.post('/user/verify-email', { email });
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const handlePostComment = async (newComment) => {
    try {
        const res = await request.post('/user/comment/create', newComment);

        return res;
    } catch (error) {
        return error.response.status;
    }
};

export const registerCourse = async (pathName, userId, dispatch) => {
    try {
        const res = await request.post(`/user/register-course/${pathName}`, { userId });
        dispatch(loginSuccess(res.data));
        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};

export const getAllMyCourses = async (userId) => {
    try {
        const res = await request.post(`/user/get-myCourse/${userId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getInfoUserByUsername = async (username) => {
    try {
        const res = await request.get(`/user/get-info/${username}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};
