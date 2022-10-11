import axios, { AxiosInstance } from 'axios';

import HTTP_RESPONSE from 'const/http';
import PATHS from 'const/paths';
import { getPlatform } from 'utils';
import { tokenStorage } from 'utils/storage';

export const defaultHeaders = () => {
    return {
        version: process.env.REACT_APP_VERSION || '',
        clientId: process.env.REACT_APP_CLIENT_ID || '',
        platform: getPlatform(),
    };
};

const request: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: defaultHeaders(),
});

// 요청 타임아웃 설정
request.defaults.timeout = 5000;

// 요청 인터셉터 추가
request.interceptors.request.use((config) => {
    return config;
});

// 응답 인터셉터 추가
request.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        switch (error.request.status) {
            case HTTP_RESPONSE.HTTP_UNAUTHORIZED:
                localStorage.removeItem('persist:root');
                tokenStorage.clear();
                alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요.');
                return window.location.replace(PATHS.LOGIN);

            case HTTP_RESPONSE.HTTP_INTERNAL_SERVER_ERROR:
                return window.location.replace(PATHS.ERROR);

            case HTTP_RESPONSE.HTTP_BAD_REQUEST:
                alert(error?.response?.data.message || '잘못된 요청입니다.');
                return error.response;

            default:
                return error;
        }
    },
);

export default request;
