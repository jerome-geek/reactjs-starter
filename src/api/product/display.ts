import { AxiosResponse } from 'axios';

import request from 'api/core';

interface BrandsParams {
    filter?: { name: String; categoryNo: Number };
    pageNumber?: Number;
    pageSize?: Number;
    hasTotalCount?: Boolean;
    fromDB?: Boolean;
    sort?: { criterion: String; direction: String };
}

const display = {
    getDisplayBrands: ({
        filter,
        pageNumber,
        pageSize,
        hasTotalCount,
        fromDB,
        sort,
    }: BrandsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/brands',
            data: { filter, pageNumber, pageSize, hasTotalCount, fromDB, sort },
        }),

    getDisplayBrandsDetail: (brandNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/brands/${brandNo}`,
        }),
};

export default display;
