import * as request from '~/utils/request';

export const handleUploadImage = async (file) => {
    try {
        const res = await request.post('/upload/image', file);

        return res;
    } catch (error) {
        return error.response.data;
    }
};
