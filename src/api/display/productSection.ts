import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { getProductSectionResponse, ProductSection } from 'models/display';
import { BY, SALE_STATUS } from 'models';

const productSection = {
    getProductSections: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/sections',
            headers: Object.assign({}, defaultHeaders()),
        }),
    /**
     * 상품 섹션 조회하기 (단일섹션-페이징) v1.1
     *
     * - 상품 섹션 번호로 상품 섹션 조회하는 API입니다
     * - 버전 v1.1 API입니다.
     */
    getProductSection: (
        sectionNo: string,
        {
            by,
            soldout,
            saleStatus,
            pageNumber,
            pageSize,
            hasTotalCount,
            hasOptionValues,
        }: Partial<ProductSection> & Paging,
    ): Promise<AxiosResponse<getProductSectionResponse[]>> =>
        request({
            method: 'GET',
            url: `display/sections/${sectionNo}`,
            params: {
                by,
                soldout,
                saleStatus,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
            headers: Object.assign({}, defaultHeaders()),
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
            headers: Object.assign({}, defaultHeaders()),
        }),
};

export default productSection;
