import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';
import * as request from '~/utils/request';

export const createNewPosts = async (newPost, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/post/create', newPost);

        dispatch(loadingSuccess());
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const getPostByPage = async (page) => {
    try {
        const res = await request.get('/post', {
            params: {
                page,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getPostBySlug = async (slug) => {
    try {
        const res = await request.get(`post/${slug}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getMyPosts = async (userId) => {
    try {
        const res = await request.get('/my-posts', {
            params: {
                id: userId,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const deletePostById = async (postId) => {
    try {
        const res = await request.remove(`/post/delete/${postId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

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

export const reactionPosts = async (data) => {
    try {
        const res = await request.post('/reaction', data);

        return res;
    } catch (error) {
        return error.response.data;
    }
};
