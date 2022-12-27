import request from '~/utils/request';
import { getAllVideosFailed, getAllVideosSuccess } from '~/redux/reducer/homeReducer';

export const getAllVideos = async (dispatch) => {
    try {
        const res = await request.get('/video/get');
        dispatch(getAllVideosSuccess(res.data.data));
    } catch (error) {
        dispatch(getAllVideosFailed());
    }
};
