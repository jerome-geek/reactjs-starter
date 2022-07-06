import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    CHANNEL_TYPE,
    CRITERION,
    PRODUCT_DIRECTION,
    PRODUCT_SALE_STATUS,
} from 'models';
import {
    GroupCodeParams,
    OptionResponse,
    ProductDetailResponse,
    ProductSearchParams,
    ProductsParams,
    RestockParams,
} from 'models/product';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const product = {
    // TODO deliveryTemplateNo을 모름 500 error 발생 추후 테스트 필요
    getBundleProducts: ({
        deliveryTemplateNo,
        hasOptionValues = false,
        pageSize = 30,
        pageNumber = 1,
        productSort = {
            criterion: CRITERION.RECENT_PRODUCT,
            direction: PRODUCT_DIRECTION.DESC_DELIVERY_FEIGN_CLIENT,
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getGroupManagementCodes: ({
        groupManagementCodes,
        saleStatus = PRODUCT_SALE_STATUS.ONSALE,
        isSoldOut = false,
    }: GroupCodeParams): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/products/group-management-code',
            data: { groupManagementCodes, saleStatus, isSoldOut },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    // TODO productNos을 모름 400 error 발생 추후 테스트 필요
    getProductOptions: (productNos: number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/options',
            params: { productNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    /**
     * 상품 검색(search engine)하기
     * - 상품 목록 조회하는 API입니다
     *   - Paging 기능 제공합니다
     *   - 아래 Parameters에 해당하는 검색조건들의 경우, 매 10분 마다 캐시가 됩니다 ( ex. 10시 10분, 10시 20분, 10시 30분...)
     *   - ex. 10시 13분에 상품명을 [테스트 상품 -> 임시 상품]으로 변경 후 '임시 상품'으로 검색 시, 10시 19분까지 검색되지않고, 10시 20분이후에 검색 가능합니다.
     *
     * @param params ProductSearchParams
     * @returns Promise<AxiosResponse>
     */
    searchProducts: (params?: ProductSearchParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/products/search',
            params: {
                'filter.discountedPrices': params?.filter?.discountedPrices,
                'filter.keywords': params?.filter?.keywords,
                'filter.keywordInResult': params?.filter?.keywordInResult,
                'filter.discountedComparison':
                    params?.filter?.discountedComparison,
                'filter.deliveryConditionType':
                    params?.filter?.deliveryConditionType,
                'filter.saleStatus': params?.filter?.saleStatus,
                'filter.soldout': params?.filter?.soldout,
                'filter.totalReviewCount': params?.filter?.totalReviewCount,
                'filter.familyMalls': params?.filter?.familyMalls,
                'filter.productManagementCd':
                    params?.filter?.productManagementCd,
                'filter.excludeMallProductNo':
                    params?.filter?.excludeMallProductNo,
                'filter.includeMallProductNo':
                    params?.filter?.includeMallProductNo,
                'order.by': params?.order?.by,
                'order.direction': params?.order?.direction,
                'order.soldoutPlaceEnd': params?.order?.soldoutPlaceEnd,
                categoryNos: params?.categoryNos,
                brandNos: params?.brandNos,
                partnerNo: params?.partnerNo,
                clientKey: params?.clientKey,
                pageNumber: params?.pageNumber,
                pageSize: params?.pageSize,
                onlySaleProduct: params?.onlySaleProduct,
                hasMaxCouponAmt: params?.hasMaxCouponAmt,
                hasTotalCount: params?.hasTotalCount,
                hasOptionValues: params?.hasOptionValues,
                includeSummaryInfo: params?.includeSummaryInfo,
                shippingAreaType: params?.shippingAreaType,
            },
        }),

    /**
     *상품번호 리스트로 상품을 조회하는 API입니다.
     *(hasOptionValues: 옵션값 포함여부, default: false)
     */
    getProductsByProductNoList: (data: {
        productNos: number[];
        hasOptionValues?: boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/products/search-by-nos',
            data: {
                productNos: data.productNos,
                hasOptionValues: data.hasOptionValues
                    ? data.hasOptionValues
                    : true,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    //TODO productNo을 모름 403 error 발생 추후 테스트 필요
    getProductDetail: (
        productNo: string,
        channelType?: CHANNEL_TYPE,
    ): Promise<AxiosResponse<ProductDetailResponse>> =>
        request({
            method: 'GET',
            url: `/products/${productNo}`,
            params: { channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getProductDisplayCategories: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/display-categories`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    // TODO productNo을 모름 404 error 발생 추후 테스트 필요
    getProductOption: (
        productNo: string,
    ): Promise<AxiosResponse<OptionResponse>> =>
        request({
            method: 'GET',
            url: `/products/${productNo}/options`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
};

export default product;
