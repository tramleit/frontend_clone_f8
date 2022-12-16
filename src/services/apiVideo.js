import request from '~/utils/request';
import { getAllVideosFailed, getAllVideosSuccess } from '~/redux/reducer/homeReducer';

export const getAllVideos = async (dispatch) => {
    try {
        const res = await request.get('/video/get');
        console.log('getAllVideos: ', res);
        dispatch(getAllVideosSuccess(res));
    } catch (error) {
        console.log('error getAllVideos: ', error);
        dispatch(getAllVideosFailed());
    }
};
