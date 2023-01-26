import config from '~/config';
import * as request from '~/utils/request';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';
import { loginSuccess, logoutSuccess, registerSuccess } from '~/redux/reducer/authReducer';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/auth/login', user, {
            params: {
                role: 'user',
            },
        });

        dispatch(loginSuccess(res.data));
        dispatch(loadingSuccess());
        navigate(config.routes.home);

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const RegisterNewUser = async (newUser, dispatch, navigate) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/auth/register', newUser);

        dispatch(registerSuccess(res.data));
        dispatch(loadingSuccess());
        navigate(config.routes.home);

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response;
    }
};

export const logoutUser = async (dispatch, navigate, token) => {
    dispatch(loadingStart());
    try {
        await request.post(
            '/auth/logout',
            {},
            {
                headers: {
                    token: token,
                },
            }
        );

        dispatch(logoutSuccess());
        dispatch(loadingSuccess());
        navigate('/login');
        window.location.reload();
    } catch (error) {
        dispatch(loadingSuccess());
    }
};

export const sendEmailVerify = async (email) => {
    try {
        const res = await request.post('/auth/verify-email', { email });
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const registerCourse = async (pathName, dispatch, token) => {
    dispatch(loadingStart());
    try {
        const res = await request.post(
            `/user/registered-course`,
            {},
            {
                headers: {
                    token,
                },
                params: {
                    path: pathName,
                },
            }
        );
        dispatch(loadingSuccess());

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const getInfoUserByUsername = async (username, token) => {
    try {
        const res = await request.get(`/user/get-info/${username}`, {
            headers: {
                token,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const changeAvatarUser = async (avatar, token, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/avatar', avatar, {
            headers: {
                token,
            },
        });

        dispatch(loadingSuccess());
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const changeCoverUser = async (cover, token, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/cover', cover, {
            headers: {
                token,
            },
        });
        dispatch(loadingSuccess());

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const changeInfoUser = async (info, token, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post(`/user/info`, info, {
            headers: {
                token,
            },
        });

        dispatch(loadingSuccess());

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const toggleSavaPost = async (postId, token, dispatch) => {
    try {
        const res = await request.post(
            `/user/toggle/bookmark`,
            {},
            {
                headers: {
                    token,
                },

                params: {
                    postId,
                },
            }
        );

        dispatch(loginSuccess(res.data));
        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};

export const getPostSave = async (token) => {
    try {
        const res = await request.get('/user/bookmark', {
            headers: {
                token,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getNotifyUser = async (token) => {
    try {
        const res = await request.get(`/user/alert`, {
            headers: {
                token,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const markWatched = async (notiId = null, type, token) => {
    try {
        const res = await request.post(
            `/user/alert/mark`,
            {},
            {
                headers: {
                    token,
                },
                params: {
                    watch: notiId,
                    type,
                },
            }
        );

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const refreshUser = async (dispatch, token) => {
    try {
        const res = await request.get('/auth/current-user', {
            headers: {
                token: token,
            },
            params: {
                v: Math.random(),
            },
        });

        const { data, ...other } = res;
        dispatch(loginSuccess(data));

        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};
