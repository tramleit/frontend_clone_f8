import request from '~/utils/request';
import { getAllCoursesFailed, getAllCoursesSuccess } from '~/redux/reducer/homeReducer';

export const getAllCourses = async (dispatch) => {
    try {
        const res = await request.get('/course/get');
        console.log('getAllCourses: ', res);
        dispatch(getAllCoursesSuccess(res));
    } catch (error) {
        console.log('error getAllCourses: ', error);
        dispatch(getAllCoursesFailed());
        return error;
    }
};
