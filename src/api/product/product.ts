import { AxiosResponse } from 'axios';

import request from 'api/core';

interface ProductsParams {
    deliveryTemplateNo: Number;
    hasOptionValues?: Boolean;
    pageSize?: Number;
    pageNumbewr?: Number;
    productSort?: { criterion?: String; direction?: String };
}

interface RestockParams {
    optionNos: Number[];
    privacyInfoAgreement: Boolean;
    name: String;
    phone: String;
}

interface ProductSearchParams {
    filter?: {
        discountedPrices?: Number;
        keywords?: String;
        keywordInResult?: String;
        discountedComparison?: String;
        deliveryConditionType?: String;
        saleStatus?: String;
        soldout?: Boolean;
        totalReviewCount?: Boolean;
        familyMalls?: Boolean;
        productManagementCd?: String;
        excludeMallProductNo?: Number;
        includeMallProductNo?: Number;
    };
    order?: {
        by?: String;
        direction?: String;
        soldoutPlaceEnd?: Boolean;
    };
    categoryNos?: Number;
    brandNos?: Number;
    partnerNo?: Number;
    clientKey?: String;
    pageNumber?: Number;
    pageSize?: Number;
    onlySaleProduct?: Boolean;
    hasMaxCouponAmt?: Boolean;
    hasTotalCount?: Boolean;
    hasOptionValues?: Boolean;
    includeSummaryInfo?: Boolean;
    shippingAreaType?: String;
}

const product = {
    // TODO deliveryTemplateNo을 모름 500 error 발생 추후 테스트 필요
    getProductsBundle: ({
        deliveryTemplateNo,
        hasOptionValues,
        pageSize,
        pageNumbewr,
        productSort,
    }: ProductsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/bundle-shipping',
            data: {
                deliveryTemplateNo,
                hasOptionValues,
                pageSize,
                pageNumbewr,
                productSort,
            },
        }),

    getFavoriteKeywords: (size?: Number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/favoriteKeywords',
            data: { size },
        }),

    groupManagementCodeInquiry: (
        groupManagementCodes: String[],
        saleStatus: String,
        isSoldOut: Boolean,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/products/group-management-code',
            data: { groupManagementCodes, saleStatus, isSoldOut },
        }),

    // TODO productNos을 모름 400 error 발생 추후 테스트 필요
    getProductOptions: (productNos: Number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/options',
            data: { productNos },
        }),

    // TODO 샵바이 프리미엄 전용 (400 error)
    requestRestockNoti: ({
        optionNos,
        privacyInfoAgreement,
        name,
        phone,
    }: RestockParams): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/products/restock',
            data: { optionNos, privacyInfoAgreement, name, phone },
        }),

    getProductsSearch: ({
        filter,
        order,
        categoryNos,
        brandNos,
        partnerNo,
        clientKey,
        pageNumber,
        pageSize,
        onlySaleProduct,
        hasMaxCouponAmt,
        hasTotalCount,
        hasOptionValues,
        includeSummaryInfo,
        shippingAreaType,
    }: ProductSearchParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/search',
            data: {
                filter,
                order,
                categoryNos,
                brandNos,
                partnerNo,
                clientKey,
                pageNumber,
                pageSize,
                onlySaleProduct,
                hasMaxCouponAmt,
                hasTotalCount,
                hasOptionValues,
                includeSummaryInfo,
                shippingAreaType,
            },
        }),

    //TODO productNo을 모름 403 error 발생 추후 테스트 필요
    getProductDetail: (
        productNo: String,
        channelType?: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}`,
            data: { channelType },
        }),

    getProductBestReview: ({
        filter,
        categoryNos,
        clientKey,
        pageNumber,
        pageSize,
        hasTotalCount,
        hasOptionValues,
    }: ProductSearchParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/best-review/search',
            data: {
                filter,
                categoryNos,
                clientKey,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
        }),

    getProductBestSeller: ({
        filter,
        categoryNos,
        clientKey,
        pageNumber,
        pageSize,
        hasTotalCount,
        hasOptionValues,
    }: ProductSearchParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/best-seller/search',
            data: {
                filter,
                categoryNos,
                clientKey,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
        }),

    getProductDisplayCategories: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/display-categories`,
        }),

    // TODO productNo을 모름 404 error 발생 추후 테스트 필요
    getProductOption: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options`,
        }),

    getProductsRelated: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/related-products`,
        }),

    getProductsUrl: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/url-shortening`,
        }),

    // TODO productNo을 모름 404 error 발생 추후 테스트 필요
    getProductOptionsImages: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options/images`,
        }),

    // TODO productNo, optionNo을 모름 404 error 발생 추후 테스트 필요
    getOptionsImages: (
        productNo: String,
        optionNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options/${optionNo}/images`,
        }),
};

export default product;
