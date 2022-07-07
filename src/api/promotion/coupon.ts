import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CouponsParams, TargetParams } from 'models/promotion';
import { tokenStorage } from 'utils/storage';
import { CHANNEL_TYPE } from 'models';

const coupon = {
    /**
     * 내 쿠폰 가져오기
     * - 로그인한 사용자가 보유한 쿠폰중 사용가능한 쿠폰과 이미 사용한 쿠폰을 구분하여 조회합니다.
     * @param CouponParams
     * @returns Promise<AxiosResponse>
     */
    getUserCoupons: (params?: CouponsParams): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/coupons',
            params: {
                pageNumber: params?.pageNumber,
                pageSize: params?.pageSize,
                startYmd: params?.startYmd,
                endYmd: params?.endYmd,
                usable: params?.usable,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 발급 가능한 쿠폰 조회하기
     * - 상품과 상관없이 오늘 날짜 기준으로 다운로드 가능한 쿠폰을 모두 조회합니다.
     * @returns Promise<AxiosResponse>
     */
    getIssuableCoupons: (): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/coupons/issuable',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 내 쿠폰 요약정보 가져오기
     * - 로그인한 사용자가 보유한 쿠폰의 정보를 요약하여 조회합니다.
     * @param params { expireDay: string; }
     * @returns Promise<AxiosResponse>
     */
    getCouponsSummary: (params?: {
        expireDay: string;
    }): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/coupons/summary',
            params: { expireDay: params?.expireDay },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 코드 쿠폰 발급하기
     * - 등록된 프로모션 코드를 이용해 쿠폰을 발급받습니다.
     * @param promotionCode string
     * @returns Promise<AxiosResponse>
     */
    issueCouponByPromotionCode: (
        promotionCode: string,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `coupons/register-code/${promotionCode}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 쿠폰 발급하기
     * - 선택한 쿠폰번호에 해당하는 다운로드 쿠폰을 발급받습니다.
     * @param couponNo string
     * @param body { channelType: CHANNEL_TYPE; }
     * @returns Promise<AxiosResponse>
     */
    issueCoupon: (
        couponNo: number,
        body?: {
            channelType: CHANNEL_TYPE;
        },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/coupons/${couponNo}/download`,
            data: { channelType: body?.channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 쿠폰번호로 제외상품 조회하기
     * - 선택한 쿠폰번호에 해당하는 제외상품의 목록을 조회합니다.
     * @param couponNo string
     * @param params TargetParams
     * @returns Promise<AxiosResponse>
     */
    getExcludeTargetsByCouponNumber: (
        couponNo: string,
        params?: TargetParams,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/coupons/${couponNo}/exclude-targets`,
            params: {
                pageNumber: params?.pageNumber,
                pageSize: params?.pageSize,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 쿠폰번호로 타겟상품 조회하기
     * - 선택한 쿠폰번호에 해당하는 대상상품의 목록을 조회합니다.
     * @param couponNo string
     * @param params TargetParams
     * @returns Promise<AxiosResponse>
     */
    getCouponTargets: (
        couponNo: string,
        params?: TargetParams,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/coupons/${couponNo}/targets`,
            params: {
                pageNumber: params?.pageNumber,
                pageSize: params?.pageSize,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 기획전 번호로 쿠폰 발급하기
     * - 해당 기획전에서 다운로드받을 수 있는 모든 쿠폰을 발급합니다.
     * @param eventNo string
     * @returns Promise<AxiosResponse>
     */
    issueEventCoupons: (eventNo: string): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/coupons/events/${eventNo}/download`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 상품 번호로 쿠폰 발급하기
     * - 해당 상품에서 다운로드받을 수 있는 모든 쿠폰을 발급합니다.
     * @param productNo string
     * @param body { channelType: CHANNEL_TYPE; }
     * @returns Promise<AxiosResponse>
     */
    issueProductCoupons: (
        productNo: string,
        body?: { channelType: CHANNEL_TYPE },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/coupons/products/${productNo}/download`,
            data: { channelType: body?.channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 상품 번호로 발급 가능한 쿠폰 조회하기
     * - 해당 상품 상세정보에서 다운로드 할수 있는 모든 쿠폰을 조회합니다.
     * @param productNo string
     * @param body { channelType: CHANNEL_TYPE; }
     * @returns Promise<AxiosResponse>
     */
    getIssuableCouponsByProductNo: (
        productNo: string,
        params?: { channelType: CHANNEL_TYPE },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/coupons/products/${productNo}/issuable/coupons`,
            params: { channelType: params?.channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default coupon;
