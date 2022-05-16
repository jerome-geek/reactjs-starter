import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { ProductSection } from 'models/display';

const productSection = {
    getProductSections: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/sections',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getProductSection: (
        sectionNo: string,
        {
            by,
            direction,
            soldout,
            saleStatus,
            pageNumber,
            pageSize,
            hasTotalCount,
            hasOptionValues,
        }: Omit<ProductSection, 'sectionId'> & Paging,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `display/sections/${sectionNo}`,
            params: {
                by,
                direction,
                soldout,
                saleStatus,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getDisplaySection: (
        sectionId: string,
        {
            by,
            soldout,
            saleStatus,
            pageNumber,
            pageSize,
            hasTotalCount,
            hasOptionValues,
        }: Omit<ProductSection, 'sectionNo' | 'direction'> & Paging,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/sections/ids/${sectionId}`,
            params: {
                by,
                soldout,
                saleStatus,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default productSection;
