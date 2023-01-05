import * as request from '~/utils/request';

export const handleCreateNewPost = async (newPost) => {
    try {
        const res = await request.post('/blog/create', newPost);

        return res;
    } catch (error) {
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

        return res.data;
    } catch (error) {
        return error.response;
    }
};
