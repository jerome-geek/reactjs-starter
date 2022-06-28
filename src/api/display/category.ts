import { AxiosResponse } from 'axios';

import request from 'api/core';

const category = {
    getCategories: ({
        keyword,
    }: {
        keyword?: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/categories',
            params: {
                keyword,
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
