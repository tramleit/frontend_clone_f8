import * as request from '~/utils/request';

export const search = async (params) => {
    try {
        const res = await request.get('upload/search', {
            params: {
                q: params,
            },
        });

        return res;
    } catch (error) {
        return error;
    }
};

export const getDataHomePage = async (type) => {
    try {
        const res = await request.get('/home', {
            params: {
                type,
            },
        });

        return res;
    } catch (error) {
        return error.response.data;
    }
};
