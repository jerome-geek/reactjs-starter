import { AxiosResponse } from 'axios';

import request from 'api/core';

enum CRITERION {
    productCount = 'PRODUCT_COUNT',
}

enum DIRECTION {
    desc = 'DESC',
    asc = 'ASC',
}

interface BrandsParams {
    filter?: { name?: String; categoryNo?: Number };
    pageNumber?: Number;
    pageSize?: Number;
    hasTotalCount?: Boolean;
    fromDB?: Boolean;
    sort?: { criterion?: CRITERION; direction?: DIRECTION };
}

const display = {
    getDisplayBrands: ({
        filter,
        pageNumber,
        pageSize,
        hasTotalCount = false,
        fromDB = false,
        sort = { criterion: CRITERION.productCount, direction: DIRECTION.desc },
    }: BrandsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/brands',
            data: { filter, pageNumber, pageSize, hasTotalCount, fromDB, sort },
        }),

    // TODO brandNo 400 error 발생 추후 테스트 필요
    getDisplayBrandDetail: (brandNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/brands/${brandNo}`,
        }),
};

export default display;
