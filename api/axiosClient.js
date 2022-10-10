import axios from 'react-native-axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosCilent = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Origin, X-Auth-Token, Authorization',
    },
    paramsSerializer: (params) => queryString.stringify({ ...params }),
});

axiosCilent.interceptors.request.use(async (config) => config);

axiosCilent.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    },
);

export default axiosCilent;