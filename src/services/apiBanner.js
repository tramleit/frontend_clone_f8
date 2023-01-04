import * as request from '~/utils/request';

export const getAllSlideShow = async () => {
    try {
        const res = await request.get('/banners/slideshow/get');

        return res;
    } catch (error) {
        console.log('error: ', error);
    }
};
