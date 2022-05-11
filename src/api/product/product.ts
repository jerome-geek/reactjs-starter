import { AxiosResponse } from 'axios';

import request from 'api/core';
import { defaultHeaders } from 'api/core';

enum CRITERION {
    RECENT_PRODUCT = 'RECENT_PRODUCT',
}

enum DIRECTION {
    DESC_DELIVERY_FEIGN_CLIENT = 'DESCDeliveryFeignClient',
    DESC = 'DESC',
    ASC = 'ASC',
}

enum SALE_STATUS {
    ON_SALE = 'ONSALE',
    ALL_CONDITIONS = 'ALL_CONDITIONS',
    READY_ON_SALE = 'READY_ONSALE',
    RESERVATION_AND_ON_SALE = 'RESERVATION_AND_ONSALE',
}

enum DISCOUNTED_COMPARISON {
    GT = 'GT',
    LTE = 'LTE',
    GTE = 'GTE',
    EQ = 'EQ',
    BETWEEN = 'BETWEEN',
}

enum DELIVERY_CONDITION_TYPE {
    FREE = 'FREE',
    CONDITIONAL = 'CONDITIONAL',
    FIXED_FEE = 'FIXED_FEE',
}

enum BY {
    POPULAR = 'POPULAR',
    SALE_YMD = 'SALE_YMD',
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
    REVIEW = 'REVIEW',
    SALE_CNT = 'SALE_CNT',
    RECENT_PRODUCT = 'RECENT_PRODUCT',
    MD_RECOMMEND = 'MD_RECOMMEND',
    LIKE_CNT = 'LIKE_CNT',
}

enum SHIPPING_AREA_TYPE {
    PARTNER = 'PARTNER',
    MALL = 'MALL',
}

enum CHANNEL_TYPE {
    NAVER_EP = 'NAVER_EP',
    DANAWA = 'DANAWA',
    ENURI = 'ENURI',
    WONDER = 'WONDER',
    COOCHA = 'COOCHA',
    FACEBOOK = 'FACEBOOK',
}

interface ProductsParams {
    deliveryTemplateNo: Number;
    hasOptionValues?: Boolean;
    pageSize?: Number;
    pageNumber?: Number;
    productSort?: {
        criterion?: CRITERION;
        direction?: DIRECTION;
    };
}

interface RestockParams {
    optionNos: Number[];
    privacyInfoAgreement: Boolean;
    name: String;
    phone: String;
}

interface GroupCodeParams {
    groupManagementCodes: String[];
    saleStatus?: SALE_STATUS;
    isSoldOut?: Boolean;
}
interface ProductSearchParams {
    filter?: {
        discountedPrices?: Number;
        keywords?: String;
        keywordInResult?: String;
        discountedComparison?: DISCOUNTED_COMPARISON;
        deliveryConditionType?: DELIVERY_CONDITION_TYPE;
        saleStatus?: SALE_STATUS;
        soldout?: Boolean;
        totalReviewCount?: Boolean;
        familyMalls?: Boolean;
        productManagementCd?: String;
        excludeMallProductNo?: Number;
        includeMallProductNo?: Number;
    };
    order?: {
        by?: BY;
        direction?: DIRECTION;
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
    shippingAreaType?: SHIPPING_AREA_TYPE;
}

const product = {
    // TODO deliveryTemplateNo을 모름 500 error 발생 추후 테스트 필요
    getProductsBundle: ({
        deliveryTemplateNo,
        hasOptionValues = false,
        pageSize = 30,
        pageNumber = 1,
        productSort,
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

    getFavoriteKeywords: (size?: Number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/favoriteKeywords',
            params: { size },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),

    groupManagementCodeInquiry: ({
        groupManagementCodes,
        saleStatus = SALE_STATUS.ON_SALE,
        isSoldOut = false,
    }: GroupCodeParams): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/products/group-management-code',
            data: { groupManagementCodes, saleStatus, isSoldOut },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),

    // TODO productNos을 모름 400 error 발생 추후 테스트 필요
    getProductOptions: (productNos: Number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/options',
            params: { productNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
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
                accessToken: localStorage.accessToken,
            }),
        }),

    getProductsSearch: ({
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
                accessToken: localStorage.accessToken,
            }),
        }),

    //TODO productNo을 모름 403 error 발생 추후 테스트 필요
    getProductDetail: (
        productNo: String,
        channelType?: CHANNEL_TYPE,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}`,
            params: { channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),

    getProductBestReview: ({
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
                accessToken: localStorage.accessToken,
            }),
        }),

    getProductBestSeller: ({
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
                accessToken: localStorage.accessToken,
            }),
        }),

    getProductDisplayCategories: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/display-categories`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),

    // TODO productNo을 모름 404 error 발생 추후 테스트 필요
    getProductOption: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
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
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
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
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),
};

export default product;
