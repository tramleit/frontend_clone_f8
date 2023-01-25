import config from '~/config';
import * as request from '~/utils/request';
import { loginSuccess, logoutSuccess, registerSuccess } from '~/redux/reducer/authReducer';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/login', user);

        dispatch(loginSuccess(res.data));
        dispatch(loadingSuccess());
        navigate(config.routes.home);
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response;
    }
};

export const RegisterNewUser = async (newUser, dispatch, navigate) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/register', newUser);

        dispatch(registerSuccess(res.data));
        dispatch(loadingSuccess());
        navigate(config.routes.home);
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response;
    }
};

export const logoutUser = async (dispatch, id, navigate, token, axiosJWT) => {
    dispatch(loadingStart());
    try {
        await axiosJWT.post('http://localhost:8080/api/user/logout', id, {
            headers: {
                token: token,
            },
        });

        dispatch(logoutSuccess());
        dispatch(loadingSuccess());
        navigate('/login');
        window.location.reload();
    } catch (error) {
        dispatch(loadingSuccess());
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

export const registerCourse = async (pathName, userId, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post(`/user/register-course/${pathName}`, { userId });

        dispatch(loginSuccess(res.data));
        dispatch(loadingSuccess());
        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        dispatch(loadingSuccess());
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

export const changeAvatarUser = async (avatar, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/change/avatar', avatar);
        dispatch(loadingSuccess());
        dispatch(loginSuccess(res.data));

        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const changeCoverUser = async (cover, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/change/cover', cover);
        dispatch(loadingSuccess());
        dispatch(loginSuccess(res.data));

        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const changeInfoUser = async (info, userId, dispatch) => {
    try {
        const res = await request.post(`/user/change/${userId}`, info, {
            withCredentials: true,
        });

        dispatch(loginSuccess(res.data));
        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};

export const toggleSavaPost = async (postId, userId, dispatch) => {
    try {
        const res = await request.post(`/user/toggle/bookmark?post=${postId}&user=${userId}`);

        dispatch(loginSuccess(res.data));
        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};

export const getPostSave = async (userId) => {
    try {
        const res = await request.get(`/user/?bookmark=${userId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getNotifyById = async (userId) => {
    try {
        const res = await request.get(`/user/alert/${userId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const setAlertWatchNotify = async (data) => {
    try {
        const res = await request.post(`/user/alert/watch`, data);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const markAllNotifyAsRead = async (userId) => {
    try {
        const res = await request.post(`/user/alert/watch/${userId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const refreshUser = async (dispatch, token, axiosJWT) => {
    try {
        const res = await axiosJWT.get('http://localhost:8080/api/user/current-user', {
            headers: {
                token: token,
            },
            params: {
                v: Math.random(),
            },
        });

        const { data, ...other } = res.data;
        dispatch(loginSuccess(data));

        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};
