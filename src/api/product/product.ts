import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

export enum CRITERION {
    RECENT_PRODUCT = 'RECENT_PRODUCT',
}

export enum DIRECTION {
    DESC_DELIVERY_FEIGN_CLIENT = 'DESCDeliveryFeignClient',
    DESC = 'DESC',
    ASC = 'ASC',
}

export enum SALE_STATUS {
    ON_SALE = 'ONSALE',
    ALL_CONDITIONS = 'ALL_CONDITIONS',
    READY_ON_SALE = 'READY_ONSALE',
    RESERVATION_AND_ON_SALE = 'RESERVATION_AND_ONSALE',
}

export enum DISCOUNTED_COMPARISON {
    GT = 'GT',
    LTE = 'LTE',
    GTE = 'GTE',
    EQ = 'EQ',
    BETWEEN = 'BETWEEN',
}

export enum DELIVERY_CONDITION_TYPE {
    FREE = 'FREE',
    CONDITIONAL = 'CONDITIONAL',
    FIXED_FEE = 'FIXED_FEE',
}

export enum BY {
    POPULAR = 'POPULAR',
    SALE_YMD = 'SALE_YMD',
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
    REVIEW = 'REVIEW',
    SALE_CNT = 'SALE_CNT',
    RECENT_PRODUCT = 'RECENT_PRODUCT',
    MD_RECOMMEND = 'MD_RECOMMEND',
    LIKE_CNT = 'LIKE_CNT',
}

export enum SHIPPING_AREA_TYPE {
    PARTNER = 'PARTNER',
    MALL = 'MALL',
}

export enum CHANNEL_TYPE {
    NAVER_EP = 'NAVER_EP',
    DANAWA = 'DANAWA',
    ENURI = 'ENURI',
    WONDER = 'WONDER',
    COOCHA = 'COOCHA',
    FACEBOOK = 'FACEBOOK',
}

interface ProductsParams {
    deliveryTemplateNo: number;
    hasOptionValues?: boolean;
    pageSize?: number;
    pageNumber?: number;
    productSort?: {
        criterion?: CRITERION;
        direction?: DIRECTION;
    };
}

interface RestockParams {
    optionNos: number[];
    privacyInfoAgreement: boolean;
    name: string;
    phone: string;
}

interface GroupCodeParams {
    groupManagementCodes: string[];
    saleStatus?: SALE_STATUS;
    isSoldOut?: boolean;
}
interface ProductSearchParams {
    filter?: {
        discountedPrices?: number;
        keywords?: string;
        keywordInResult?: string;
        discountedComparison?: DISCOUNTED_COMPARISON;
        deliveryConditionType?: DELIVERY_CONDITION_TYPE;
        saleStatus?: SALE_STATUS;
        soldout?: boolean;
        totalReviewCount?: boolean;
        familyMalls?: boolean;
        productManagementCd?: string;
        excludeMallProductNo?: number;
        includeMallProductNo?: number;
    };
    order?: {
        by?: BY;
        direction?: DIRECTION;
        soldoutPlaceEnd?: boolean;
    };
    categoryNos?: number;
    brandNos?: number;
    partnerNo?: number;
    clientKey?: string;
    pageNumber?: number;
    pageSize?: number;
    onlySaleProduct?: boolean;
    hasMaxCouponAmt?: boolean;
    hasTotalCount?: boolean;
    hasOptionValues?: boolean;
    includeSummaryInfo?: boolean;
    shippingAreaType?: SHIPPING_AREA_TYPE;
}

const product = {
    // TODO deliveryTemplateNo을 모름 500 error 발생 추후 테스트 필요
    getBundleProducts: ({
        deliveryTemplateNo,
        hasOptionValues = false,
        pageSize = 30,
        pageNumber = 1,
        productSort = {
            criterion: CRITERION.RECENT_PRODUCT,
            direction: DIRECTION.DESC_DELIVERY_FEIGN_CLIENT,
        },
    }: ProductsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/bundle-shipping',
            params: {
                deliveryTemplateNo,
                hasOptionValues,
                pageSize,
                pageNumber,
                'productSort.criterion': productSort?.criterion,
                'productSort.direction': productSort?.direction,
            },
        }),

    getFavoriteKeywords: (size?: number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/favoriteKeywords',
            params: { size },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getGroupManagementCodes: ({
        groupManagementCodes,
        saleStatus = SALE_STATUS.ON_SALE,
        isSoldOut = false,
    }: GroupCodeParams): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/products/group-management-code',
            data: { groupManagementCodes, saleStatus, isSoldOut },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO productNos을 모름 400 error 발생 추후 테스트 필요
    getProductOptions: (productNos: number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/options',
            params: { productNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 샵바이 프리미엄 전용 (400 error)
    requestRestockNotification: ({
        optionNos,
        privacyInfoAgreement = false,
        name,
        phone,
    }: RestockParams): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/products/restock',
            data: { optionNos, privacyInfoAgreement, name, phone },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    searchProducts: ({
        filter = {
            soldout: false,
            totalReviewCount: false,
            familyMalls: false,
        },
        order = { direction: DIRECTION.DESC },
        categoryNos,
        brandNos,
        partnerNo,
        clientKey,
        pageNumber,
        pageSize,
        onlySaleProduct = false,
        hasMaxCouponAmt = false,
        hasTotalCount = false,
        hasOptionValues = false,
        includeSummaryInfo = true,
        shippingAreaType,
    }: ProductSearchParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/search',
            params: {
                'filter.discountedPrices': filter.discountedPrices,
                'filter.keywords': filter.keywords,
                'filter.keywordInResult': filter.keywordInResult,
                'filter.discountedComparison': filter.discountedComparison,
                'filter.deliveryConditionType': filter.deliveryConditionType,
                'filter.saleStatus': filter.saleStatus,
                'filter.soldout': filter.soldout,
                'filter.totalReviewCount': filter.totalReviewCount,
                'filter.familyMalls': filter.familyMalls,
                'filter.productManagementCd': filter.productManagementCd,
                'filter.excludeMallProductNo': filter.excludeMallProductNo,
                'filter.includeMallProductNo': filter.includeMallProductNo,
                'order.by': order.by,
                'order.direction': order.direction,
                'order.soldoutPlaceEnd': order.soldoutPlaceEnd,
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
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    //TODO productNo을 모름 403 error 발생 추후 테스트 필요
    getProductDetail: (
        productNo: string,
        channelType?: CHANNEL_TYPE,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}`,
            params: { channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getBestReviewProducts: ({
        filter = { familyMalls: false },
        categoryNos,
        clientKey,
        pageNumber,
        pageSize,
        hasTotalCount = false,
        hasOptionValues = false,
    }: Pick<
        ProductSearchParams,
        | 'filter'
        | 'categoryNos'
        | 'clientKey'
        | 'pageNumber'
        | 'pageSize'
        | 'hasTotalCount'
        | 'hasOptionValues'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/best-review/search',
            params: {
                'filter.familyMalls': filter.familyMalls,
                categoryNos,
                clientKey,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getBestSellerProducts: ({
        filter = { familyMalls: false },
        categoryNos,
        clientKey,
        pageNumber,
        pageSize,
        hasTotalCount = false,
        hasOptionValues = false,
    }: Pick<
        ProductSearchParams,
        | 'filter'
        | 'categoryNos'
        | 'clientKey'
        | 'pageNumber'
        | 'pageSize'
        | 'hasTotalCount'
        | 'hasOptionValues'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/best-seller/search',
            params: {
                'filter.familyMalls': filter.familyMalls,
                categoryNos,
                clientKey,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getProductDisplayCategories: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/display-categories`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO productNo을 모름 404 error 발생 추후 테스트 필요
    getProductOption: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getRelatedProducts: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/related-products`,
        }),

    getShortUrl: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/url-shortening`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO productNo을 모름 404 error 발생 추후 테스트 필요
    getProductOptionImages: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options/images`,
        }),

    // TODO productNo, optionNo을 모름 404 error 발생 추후 테스트 필요
    getOptionImages: (
        productNo: string,
        optionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options/${optionNo}/images`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default product;
