import { AxiosResponse } from 'axios';

import request from 'api/core';

interface CouponsParams {
    endYmd?: String;
    pageNumber: String;
    pageSize: String;
    startYmd?: String;
    usable: String;
}

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
            data: {
                endYmd,
                pageNumber,
                pageSize,
                usable,
                startYmd,
            },
        }),

    getCouponsIssuable: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/coupons/issuable' }),

    getCouponsSummary: (expireDay: String): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/coupons/summary', data: expireDay }),

    issuePromotionCoupon: (promotionCode: String): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `coupons/register-code/${promotionCode}`,
        }),

    issueCoupons: (
        couponNo: String,
        channelType: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/${couponNo}/download`,
            data: { channelType },
        }),

    getCouponsExcludeTargets: (
        couponNo: String,
        pageNumber: String,
        pageSize: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/exclude-targets`,
            data: { pageNumber, pageSize },
        }),

    getCouponsTarget: (
        couponNo: String,
        pageNumber: String,
        pageSize: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/targets`,
            data: { pageNumber, pageSize },
        }),

    issueEventCoupons: (eventNo: String): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/events/${eventNo}/download`,
        }),

    issueProductCoupons: (
        productNo: String,
        channelType: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/products/${productNo}/download`,
            data: { channelType },
        }),

    searchAvailableCoupons: (
        productNo: String,
        channelType?: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/products/${productNo}/issuable/coupons`,
            data: { channelType },
        }),
};

export default coupon;
