import request from '~/utils/request';
import { getAllCoursesFailed, getAllCoursesSuccess } from '~/redux/reducer/homeReducer';

export const getAllCourses = async (dispatch) => {
    try {
        const res = await request.get('/course/get');
        dispatch(getAllCoursesSuccess(res.data));
    } catch (error) {
        dispatch(getAllCoursesFailed());
    }
};
