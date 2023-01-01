import { getAllBlogsFailed, getAllBlogsSuccess } from '~/redux/reducer/homeReducer';
import { getPageBlogSuccess } from '~/redux/reducer/pageBlogReducer';
import * as request from '~/utils/request';

export const getAllBlogs = async (dispatch) => {
    try {
        const res = await request.get('/blog/get');
        dispatch(getAllBlogsSuccess(res.data));
    } catch (error) {
        dispatch(getAllBlogsFailed());
    }
};

export const handleCreateNewPost = async (newPost) => {
    try {
        const res = await request.post('/blog/create', newPost);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getPageBlogs = async (page, dispatch) => {
    try {
        const res = await request.get(`/blog/get-page?page=${page}`);

        dispatch(getPageBlogSuccess(res.data));
        const { data, ...other } = res;
        return { ...other };
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
