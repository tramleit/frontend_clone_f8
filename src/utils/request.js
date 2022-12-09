import axios from 'axios';

const request = axios.create({
    baseURL: process.env.API_SEARCH_URL || 'http://localhost:8080/api',
});

export const get = async (path, option = {}) => {
    const res = await request.get(path, option);

    return res.data;
};

export default request;
