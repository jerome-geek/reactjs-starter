import { AxiosResponse } from 'axios';

import request from 'api/core';

const category = {
    getCategories: ({ keyword }: { keyword: String }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/categories',
            params: {
                keyword,
            },
        }),

    getNewProductCategories: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/categories/new-product-categories' }),

    getCategory: (categoryNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/categories/${categoryNo}`,
        }),
};

export default category;
