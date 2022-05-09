import { AxiosResponse } from 'axios';

import request from 'api/core';

enum CRITERION {
    PRODUCT_COUNT = 'PRODUCT_COUNT',
}

enum DIRECTION {
    DESC = 'DESC',
    ASC = 'ASC',
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
        sort = {
            criterion: CRITERION.PRODUCT_COUNT,
            direction: DIRECTION.DESC,
        },
    }: BrandsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/brands',
            params: {
                'filter.name': filter?.name,
                'filter.categoryNo': filter?.categoryNo,
                pageNumber,
                pageSize,
                hasTotalCount,
                fromDB,
                sort,
            },
        }),

    // TODO brandNo 400 error 발생 추후 테스트 필요
    getDisplayBrandDetail: (brandNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/brands/${brandNo}`,
        }),
};

export default display;
