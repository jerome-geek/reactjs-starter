import { AxiosResponse } from 'axios';

import request from 'api/core';
import { Category } from 'models/display';

const category = {
    getCategories: (params?: {
        keyword: string;
    }): Promise<AxiosResponse<Category>> =>
        request({
            method: 'GET',
            url: '/categories',
            params: {
                keyword: params?.keyword,
            },
        }),

    getNewProductCategories: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/categories/new-product-categories' }),

    getCategory: (categoryNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/categories/${categoryNo}`,
        }),
};

export default category;
