import * as request from '~/utils/request';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';
import { loginSuccess, logoutSuccess, registerSuccess } from '~/redux/reducer/authReducer';

// Ok
export const loginUser = async (user, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/auth/login', user, {
            params: {
                role: 'user',
            },
        });

        dispatch(loginSuccess(res.data));
        dispatch(loadingSuccess());

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

// Ok
export const registerNewUser = async (newUser, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/auth/register', newUser);

        dispatch(registerSuccess(res.data));
        dispatch(loadingSuccess());

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

// Ok
export const logoutUser = async (dispatch, token) => {
    dispatch(loadingStart());
    try {
        const res = await request.post(
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
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

// Ok
export const sendEmailVerify = async (email) => {
    try {
        const res = await request.post('/auth/verify-email', { email });
        return res;
    } catch (error) {
        return error.response.data;
    }
};

// Ok
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

// Ok
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

// Ok
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

// Ok
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

// Ok
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

// Ok
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

// Ok
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

// Ok
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

// Ok
export const markWatched = async (type, token, notiId = null) => {
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

// Ok
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
