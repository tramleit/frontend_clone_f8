import request from '~/utils/request';
import { getAllCoursesFailed, getAllCoursesSuccess } from '~/redux/reducer/homeReducer';
import { getCurrentLesson } from '~/redux/reducer/lessonReducer';

export const getAllCourses = async (dispatch) => {
    try {
        const res = await request.get('/course/get');
        dispatch(getAllCoursesSuccess(res.data.data));
    } catch (error) {
        dispatch(getAllCoursesFailed());
    }
};
export const getCourseByPathName = async (pathName) => {
    try {
        const res = await request.get('/course/get/path', {
            params: {
                pathName: pathName,
            },
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getLessonById = async (lessonId, dispatch) => {
    try {
        const res = await request.get('/course/lesson', {
            params: {
                id: lessonId,
            },
        });
        dispatch(getCurrentLesson(res.data.data));

        const { data, ...other } = res.data;
        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};

export const getAllComments = async (lessonId) => {
    try {
        const res = await request.post('/course/comment/get', { lessonId });
        console.log('res: ', res);

        return res.data.data;
    } catch (error) {
        console.log('error: ', error);
    }
};
