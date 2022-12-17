import { getAllBlogsFailed, getAllBlogsSuccess } from '~/redux/reducer/homeReducer';
import request from '~/utils/request';

export const getAllBlogs = async (dispatch) => {
    try {
        const res = await request.get('/blog/get');
        dispatch(getAllBlogsSuccess(res.data));
    } catch (error) {
        dispatch(getAllBlogsFailed());
    }
};
