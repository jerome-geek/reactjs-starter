import { AxiosResponse } from 'axios';

import request from 'api/core';

enum Criterion {
    recentProduct = 'RECENT_PRODUCT',
}

enum Direction {
    descDeliveryFeignClient = 'DESCDeliveryFeignClient',
    desc = 'DESC',
    asc = 'ASC',
}

enum SaleStatus {
    onSale = 'ONSALE',
    allConditions = 'ALL_CONDITIONS',
    readyOnSale = 'READY_ONSALE',
    reservationAndOnSale = 'RESERVATION_AND_ONSALE',
}

enum discountedComparison {
    gt = 'GT',
    lte = 'LTE',
    gte = 'GTE',
    eq = 'EQ',
    between = 'BETWEEN',
}

enum deliveryConditionType {
    free = 'FREE',
    contitional = 'CONDITIONAL',
    fixedFee = 'FIXED_FEE',
}

enum by {
    popular = 'POPULAR',
    saleYmd = 'SALE_YMD',
    discountedPrice = 'DISCOUNTED_PRICE',
    review = 'REVIEW',
    saleCnt = 'SALE_CNT',
    recentProduct = 'RECENT_PRODUCT',
    mdRecommend = 'MD_RECOMMEND',
    likeCnt = 'LIKE_CNT',
}

enum shippingAreaType {
    partner = 'PARTNER',
    mall = 'MALL',
}

enum channelType {
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
        criterion?: Criterion | null;
        direction?: Direction | null;
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
    saleStatus: SaleStatus | null;
    isSoldOut: Boolean | null;
}
interface ProductSearchParams {
    filter?: {
        discountedPrices?: Number;
        keywords?: String;
        keywordInResult?: String;
        discountedComparison?: discountedComparison;
        deliveryConditionType?: deliveryConditionType;
        saleStatus?: SaleStatus;
        soldout?: Boolean;
        totalReviewCount?: Boolean;
        familyMalls?: Boolean;
        productManagementCd?: String;
        excludeMallProductNo?: Number;
        includeMallProductNo?: Number;
    };
    order?: {
        by?: by;
        direction?: Direction;
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
    shippingAreaType?: shippingAreaType;
}

const product = {
    // TODO deliveryTemplateNo을 모름 500 error 발생 추후 테스트 필요
    getProductsBundle: ({
        deliveryTemplateNo,
        hasOptionValues = true,
        pageSize = 30,
        pageNumber = 1,
        productSort = {
            criterion: Criterion.recentProduct,
            direction: Direction.descDeliveryFeignClient,
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
        saleStatus = SaleStatus.onSale,
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
    requestRestockNoti: ({
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
        order = { direction: Direction.desc },
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
        channelType?: channelType,
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
