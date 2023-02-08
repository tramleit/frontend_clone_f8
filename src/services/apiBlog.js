import * as request from '~/utils/request';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';

// Ok
export const createNewPosts = async (newPost, dispatch, token) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/posts/create', newPost, {
            headers: {
                token: token,
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
export const getPostByPage = async (page) => {
    try {
        const res = await request.get('/posts', {
            params: {
                page,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

// Ok
export const getPostBySlug = async (slug) => {
    try {
        const res = await request.get(`posts/${slug}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

// Ok
export const getMyPosts = async (token) => {
    try {
        const res = await request.get('/my-posts', {
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
export const deletePostById = async (postId, token) => {
    try {
        const res = await request.remove(`/posts/delete`, {
            headers: {
                token,
            },
            params: {
                id: postId,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

// Ok
export const getTopic = async (topic, page) => {
    try {
        const res = await request.get(`/topic/${topic}`, {
            params: {
                page: page,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

// Ok
export const reactionPosts = async (postsId, token) => {
    try {
        const res = await request.post(
            '/reaction',
            { postsId },
            {
                headers: {
                    token,
                },
            }
        );

        return res;
    } catch (error) {
        return error.response.data;
    }
};
