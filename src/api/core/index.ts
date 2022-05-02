import axios, { AxiosInstance } from 'axios';

// Axios Instance: https://pinokio0702.tistory.com/373 참고
const request: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        version: process.env.REACT_APP_VERSION || '',
        clientId: process.env.REACT_APP_CLIENT_ID || '',
        platform: 'PC',
    },
});

// 요청 타임아웃 설정
request.defaults.timeout = 2500;
// 요청 인터셉터 추가
request.interceptors.request.use();
// 응답 인터셉터 추가
request.interceptors.response.use();

export default request;
