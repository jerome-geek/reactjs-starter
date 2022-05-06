import { AxiosResponse } from 'axios';

import request from 'api/core';

enum CRITERION {
    recentProduct = 'RECENT_PRODUCT',
}

enum DIRECTION {
    descDeliveryFeignClient = 'DESCDeliveryFeignClient',
    desc = 'DESC',
    asc = 'ASC',
}

enum SALE_STATUS {
    onSale = 'ONSALE',
    allConditions = 'ALL_CONDITIONS',
    readyOnSale = 'READY_ONSALE',
    reservationAndOnSale = 'RESERVATION_AND_ONSALE',
}

enum DISCOUNTED_COMPARISON {
    gt = 'GT',
    lte = 'LTE',
    gte = 'GTE',
    eq = 'EQ',
    between = 'BETWEEN',
}

enum DELIVERY_CONDITION_TYPE {
    free = 'FREE',
    conditional = 'CONDITIONAL',
    fixedFee = 'FIXED_FEE',
}

enum BY {
    popular = 'POPULAR',
    saleYmd = 'SALE_YMD',
    discountedPrice = 'DISCOUNTED_PRICE',
    review = 'REVIEW',
    saleCnt = 'SALE_CNT',
    recentProduct = 'RECENT_PRODUCT',
    mdRecommend = 'MD_RECOMMEND',
    likeCnt = 'LIKE_CNT',
}

enum SHIPPING_AREA_TYPE {
    partner = 'PARTNER',
    mall = 'MALL',
}

enum CHANNEL_TYPE {
    naverEp = 'NAVER_EP',
    danawa = 'DANAWA',
    enuri = 'ENURI',
    wonder = 'WONDER',
    coocha = 'COOCHA',
    facebook = 'FACEBOOK',
}

interface ProductsParams {
    deliveryTemplateNo: Number;
    hasOptionValues?: Boolean | null;
    pageSize?: Number | null;
    pageNumber?: Number | null;
    productSort?: {
        criterion?: CRITERION | null;
        direction?: DIRECTION | null;
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
    saleStatus: SALE_STATUS | null;
    isSoldOut: Boolean | null;
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
        productSort = {
            criterion: CRITERION.recentProduct,
            direction: DIRECTION.descDeliveryFeignClient,
        },
    }: ProductsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/bundle-shipping',
            data: {
                deliveryTemplateNo,
                hasOptionValues,
                pageSize,
                pageNumber,
                productSort,
            },
        }),

    getFavoriteKeywords: (size?: Number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/favoriteKeywords',
            data: { size },
        }),

    groupManagementCodeInquiry: ({
        groupManagementCodes,
        saleStatus = SALE_STATUS.onSale,
        isSoldOut = false,
    }: GroupCodeParams): Promise<AxiosResponse> =>
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
        }),

    getProductsSearch: ({
        filter = {
            soldout: false,
            totalReviewCount: false,
            familyMalls: false,
        },
        order = { direction: DIRECTION.desc },
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
        channelType?: CHANNEL_TYPE,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}`,
            data: { channelType },
        }),

    getProductBestReview: ({
        filter = { familyMalls: false },
        categoryNos,
        clientKey,
        pageNumber,
        pageSize,
        hasTotalCount = false,
        hasOptionValues = false,
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
        filter = { familyMalls: false },
        categoryNos,
        clientKey,
        pageNumber,
        pageSize,
        hasTotalCount = false,
        hasOptionValues = false,
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
