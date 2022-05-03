import { AxiosResponse } from 'axios';
import request from '../core';

interface CouponsParams {
    endYmd?: String;
    pageNumber: String;
    pageSize: String;
    startYmd?: String;
    usable: String;
}

const coupon = {
    getCoupons: ({
        pageNumber = '1',
        pageSize = '30',
        usable = 'true',
    }: CouponsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/coupons',
            data: {
                pageNumber,
                pageSize,
                usable,
            },
        }),

    getCouponsIssuable: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/coupons/issuable' }),

    getCouponsSummary: (expireDay: String): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/coupons/summary', data: expireDay }),

    postCouponsRegisterCode: (promotionCode: String): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `coupons/register-code/${promotionCode}`,
        }),

    postCouponsDownload: (couponNo: String): Promise<AxiosResponse> =>
        request({ method: 'POST', url: `/coupons/${couponNo}/download` }),

    getCouponsExcludeTargets: (
        couponNo: String,
        pageNumber: 1,
        pageSize: 10,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/exclude-targets`,
            data: { pageNumber, pageSize },
        }),

    getCouponsTargets: (
        couponNo: String,
        pageNumber: 1,
        pageSize: 10,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/${couponNo}/targets`,
            data: { pageNumber, pageSize },
        }),

    postCouponsEventsDownload: (eventNo: String): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/events/${eventNo}/download`,
        }),

    postCouponsProductsDownload: (productNo: String): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/events/${productNo}/download`,
        }),

    getCouponsProductsIssuable: (
        productNo: String,
        channelType: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/coupons/products/${productNo}/issable/coupons`,
            data: { channelType },
        }),
};

export default coupon;
