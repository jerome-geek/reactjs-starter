import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CouponsParams, TargetParams } from 'models/promotion';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const coupon = {
    /**
     * 내 쿠폰 가져오기
     * - 로그인한 사용자가 보유한 쿠폰중 사용가능한 쿠폰과 이미 사용한 쿠폰을 구분하여 조회합니다.
     *
     * @param param0
     * @returns
     */
    getUserCoupons: ({
        endYmd,
        pageNumber,
        pageSize,
        usable,
        startYmd,
    }: CouponsParams): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getCouponsIssuable: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/coupons/issuable',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
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
        { channelType }: { channelType?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/${couponNo}/download`,
            data: { channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
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
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
};

export default coupon;
