import * as request from '~/utils/request';
import { getCurrentLesson } from '~/redux/reducer/lessonReducer';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';

export const getCourseByPathName = async (slug, token) => {
    try {
        const res = await request.get('/course/path', {
            headers: {
                token,
            },
            params: {
                course: slug,
            },
        });
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getLessonById = async (lessonId, dispatch, token) => {
    dispatch(loadingStart());
    try {
        const res = await request.get('/lesson', {
            params: {
                id: lessonId,
            },
            headers: {
                token,
            },
        });
        dispatch(getCurrentLesson(res.data));
        dispatch(loadingSuccess());

        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const getAllComments = async (lessonId, token) => {
    try {
        const res = await request.get(`/comment`, {
            params: {
                id: lessonId,
            },
            headers: {
                token,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getCommentReply = async (commentId, token) => {
    try {
        const res = await request.get(`/comment/replies`, {
            headers: {
                token,
            },
            params: {
                id: commentId,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const createComment = async (newComment, token) => {
    try {
        const res = await request.post('/comment/create', newComment, {
            headers: {
                token,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const createCommentReply = async (replyComment, token) => {
    try {
        const res = await request.post('/comment/reply', replyComment, {
            headers: {
                token,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getLearningRoute = async (type) => {
    try {
        const res = await request.get('/learning', {
            params: {
                type,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getLearningRouteBySlug = async (slug) => {
    try {
        const res = await request.get(`/learning/path/${slug}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getCoursesRegistered = async (token) => {
    try {
        const res = await request.get('/course/registered', {
            headers: {
                token,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getCombinedCourses = async (type) => {
    try {
        const res = await request.get('/course', {
            params: {
                type,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};
