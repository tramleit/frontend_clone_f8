import * as request from '~/utils/request';

export const handleUploadImage = async (file) => {
    try {
        const res = await request.post('/upload/image', file);
        console.log('res: ', res);

        return res;
    } catch (error) {
        console.log('error: ', error);
        return error.response.data;
    }
};
