import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';
import * as request from '~/utils/request';

export const handleCreateNewPost = async (newPost, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/blog/create', newPost);

        dispatch(loadingSuccess());
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const getPageBlogs = async (page) => {
    try {
        const res = await request.get(`/blog/get-page?page=${page}`);

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getPostBySlug = async (slug) => {
    try {
        const res = await request.get(`/blog/get-post/${slug}`);

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getMyPosts = async (userId) => {
    try {
        const res = await request.get(`/blog/my-posts?q=${userId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const deletePostById = async (postId) => {
    try {
        const res = await request.remove(`/blog/delete/${postId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getTopic = async (topic, page) => {
    try {
        const res = await request.get(`/blog`, {
            params: {
                topic: topic,
                page: page,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const reactionPost = async (data) => {
    try {
        const res = await request.post(`/blog/reaction`, data);

        return res;
    } catch (error) {
        return error.response.data;
    }
};
