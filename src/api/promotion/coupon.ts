import { AxiosResponse } from 'axios';

import request from 'api/core';

interface CouponsParams {
    endYmd?: String;
    pageNumber: String;
    pageSize: String;
    startYmd?: String;
    usable: String;
}

type TargetParams = Pick<CouponsParams, 'pageNumber' | 'pageSize'>;

const coupon = {
    getCoupons: ({
        endYmd,
        pageNumber = '1',
        pageSize = '30',
        usable = 'true',
        startYmd,
    }: CouponsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/coupons',
            params: {
                endYmd,
                pageNumber,
                pageSize,
                usable,
                startYmd,
            },
        }),

    getCouponsIssuable: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/coupons/issuable' }),

    getCouponsSummary: ({
        expireDay,
    }: {
        expireDay: String;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/coupons/summary',
            params: { expireDay },
        }),

    issueCouponByPromotionCode: (
        promotionCode: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `coupons/register-code/${promotionCode}`,
        }),

    issueCoupons: (
        couponNo: String,
        { channelType }: { channelType: String },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/${couponNo}/download`,
            data: { channelType },
        }),

    getExcludeTargetsByCouponNumber: (
        couponNo: String,
        { pageNumber, pageSize }: TargetParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/exclude-targets`,
            params: { pageNumber, pageSize },
        }),

    getCouponsTarget: (
        couponNo: String,
        { pageNumber, pageSize }: TargetParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/targets`,
            params: { pageNumber, pageSize },
        }),

    issueEventCoupons: (eventNo: String): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/events/${eventNo}/download`,
        }),

    issueProductCoupons: (
        productNo: String,
        { channelType }: { channelType: String },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/products/${productNo}/download`,
            data: { channelType },
        }),

    searchAvailableCoupons: (
        productNo: String,
        { channelType }: { channelType?: String },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/products/${productNo}/issuable/coupons`,
            params: { channelType },
        }),
};

export default coupon;
