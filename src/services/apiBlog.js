import { getAllBlogsFailed, getAllBlogsSuccess } from '~/redux/reducer/homeReducer';
import request from '~/utils/request';

export const getAllBlogs = async (dispatch) => {
    try {
        const res = await request.get('/blog/get');
        console.log('getAllBlogs: ', res);
        dispatch(getAllBlogsSuccess(res));
    } catch (error) {
        console.log('error getAllBlogs: ', error);
        dispatch(getAllBlogsFailed());
    }
};
