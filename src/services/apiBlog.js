import { getAllBlogsFailed, getAllBlogsSuccess } from '~/redux/reducer/homeReducer';
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
        console.log('res: ', res);

        return res;
    } catch (error) {
        console.log('error: ', error);
        return error.response.data;
    }
};
