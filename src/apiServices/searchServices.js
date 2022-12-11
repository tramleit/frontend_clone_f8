import * as request from '~/utils/request';

export const search = async (q) => {
    try {
        const res = await request.get('/course/search', {
            params: {
                q,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error);
    }
};

export const register = async () => {};
