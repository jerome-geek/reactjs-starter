import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    CouponsParams,
    IssuableCouponResponse,
    TargetParams,
} from 'models/promotion';

const coupon = {
    getCoupons: ({
        endYmd,
        pageNumber,
        pageSize,
        usable,
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
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getCouponsIssuable: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/coupons/issuable',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getCouponsSummary: ({
        expireDay,
    }: {
        expireDay: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/coupons/summary',
            params: { expireDay },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    issueCouponByPromotionCode: (
        promotionCode: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `coupons/register-code/${promotionCode}`,
        }),

    issueCoupon: (
        couponNo: number,
        { channelType }: { channelType: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/${couponNo}/download`,
            data: { channelType },
        }),

    getExcludeTargetsByCouponNumber: (
        couponNo: string,
        { pageNumber, pageSize }: TargetParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/exclude-targets`,
            params: { pageNumber, pageSize },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getCouponTargets: (
        couponNo: string,
        { pageNumber, pageSize }: TargetParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/targets`,
            params: { pageNumber, pageSize },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    issueEventCoupons: (eventNo: string): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/events/${eventNo}/download`,
        }),

    issueProductCoupons: (
        productNo: string,
        { channelType }: { channelType: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/products/${productNo}/download`,
            data: { channelType },
        }),

    getIssuableCoupons: (
        productNo: string,
        { channelType }: { channelType?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/products/${productNo}/issuable/coupons`,
            params: { channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default coupon;
