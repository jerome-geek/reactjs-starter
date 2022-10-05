import axios, { AxiosResponse } from 'axios';

export interface GolfCourseParams {
    q: string;
    country: string;
    realm: string;
}

const golfCourse = {
    getState: (params: GolfCourseParams): Promise<AxiosResponse> => {
        return axios({
            method: 'GET',
            baseURL: '/golf-course/search-realm.ajax.php',
            params,
        });
    },
};

export default golfCourse;
