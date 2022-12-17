import request from '~/utils/request';

export const search = async (params) => {
    try {
        const res = await request.get('/course/search', {
            params: {
                q: params,
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
};
