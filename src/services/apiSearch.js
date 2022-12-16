import request from '~/utils/request';
import { searchSuccess } from '~/redux/reducer/searchReducer';

export const search = async (params, dispatch) => {
    try {
        const res = await request.get('/course/search', {
            params: {
                q: params,
            },
        });
        dispatch(searchSuccess(res.data));
        return res.data;
    } catch (error) {
        return error;
    }
};
