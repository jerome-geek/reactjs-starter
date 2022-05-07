import axios, { AxiosInstance } from 'axios';

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
    // TODO: 토큰이 만료됐을 경우 처리 필요
    return res;
});

export default request;
