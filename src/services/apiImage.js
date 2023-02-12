import * as request from '~/utils/request';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';

export const uploadImage = async (file, dispatch, token) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/upload/image', file, {
            headers: {
                token,
            },
        });

        dispatch(loadingSuccess());
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};
