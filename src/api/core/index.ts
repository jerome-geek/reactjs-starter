import axios, { AxiosInstance } from 'axios';

import { RESPONSE } from 'const/http';
import { getPlatform } from 'utils';

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
request.defaults.timeout = 2500;

// 요청 인터셉터 추가
request.interceptors.request.use((config) => {
    return config;
});

// 응답 인터셉터 추가
request.interceptors.response.use((res) => {
    switch (res.status) {
        case RESPONSE.HTTP_UNAUTHORIZED:
            alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('VC_ACCESS_TOKEN');
            localStorage.removeItem('VC_GUESS_TOKEN');
            return window.location.replace('/member/login');

        // TODO: API를 찾을 수 없습니다
        case RESPONSE.HTTP_NOT_FOUND:
            return window.location.replace('/not_found');

        // TODO: 500 에러 처리
        case RESPONSE.HTTP_INTERNAL_SERVER_ERROR:
            return window.location.replace('/error-server');

        default:
            return res;
    }
});

export default request;
