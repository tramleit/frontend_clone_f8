import * as request from '~/utils/request';

export const searchByName = async (params, type) => {
    try {
        const res = await request.get('/search', {
            params: {
                type,
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
