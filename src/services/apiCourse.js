import * as request from '~/utils/request';
import { getAllCoursesFailed, getAllCoursesSuccess } from '~/redux/reducer/homeReducer';
import { getCurrentLesson } from '~/redux/reducer/lessonReducer';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';

export const getAllCourses = async (dispatch) => {
    try {
        const res = await request.get('/course/get');
        dispatch(getAllCoursesSuccess(res.data));
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
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getLessonById = async (lessonId, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.get('/course/lesson', {
            params: {
                id: lessonId,
            },
        });
        dispatch(getCurrentLesson(res.data));
        dispatch(loadingSuccess());

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllComments = async (lessonId) => {
    try {
        const res = await request.get(`/comments/${lessonId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getCommentReply = async (commentId) => {
    try {
        const res = await request.get(`/comments/replies/${commentId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const createComment = async (newComment) => {
    try {
        const res = await request.post('/comments/create', newComment);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const createCommentReply = async (replyComment) => {
    try {
        const res = await request.post('/comments/reply', replyComment);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getLearningRoute = async () => {
    try {
        const res = await request.get('/learning/get');

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getLearningRouteBySlug = async (slug) => {
    try {
        const res = await request.get(`/learning/get-learning/${slug}`);

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
