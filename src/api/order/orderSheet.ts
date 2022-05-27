import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    OrderSheetBody,
    GetCalculatedOrderSheet,
    CouponRequest,
} from 'models/order';

const orderSheet = {
    // TODO 400 error, message: "구매불가한 옵션이 포함되어 있습니다."
    writeOrderSheet: ({
        productCoupons,
        trackingKey,
        cartNos,
        channelType,
        products,
    }: OrderSheetBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/order-sheets',
            data: {
                productCoupons,
                trackingKey,
                cartNos,
                channelType,
                products,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 404 error, message: "잘못된 요청입니다.", 이하 함수들 전부 orderSheetNo를 필수로 요구하므로 나중에 테스트 必
    getOrderSheet: (
        orderSheetNo: string,
        { includeMemberAddress }: { includeMemberAddress: boolean },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/order-sheets/${orderSheetNo}`,
            params: { includeMemberAddress },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getCalculatedOrderSheet: (
        orderSheetNo: string,
        {
            addressRequest,
            couponRequest,
            accumulationUseAmt,
            shippingAddress,
        }: GetCalculatedOrderSheet,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/order-sheets/${orderSheetNo}/calculate`,
            data: {
                addressRequest,
                couponRequest,
                accumulationUseAmt,
                shippingAddress,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getCanApplyCoupon: (
        orderSheetNo: string,
        { channelType }: { channelType: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/order-sheets/${orderSheetNo}/coupons`,
            params: { channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    applyCoupon: (
        orderSheetNo: string,
        {
            cartCouponIssueNo,
            channelType,
            promotionCode,
            productCoupons,
        }: CouponRequest,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/order-sheets/${orderSheetNo}/coupons/apply`,
            data: {
                cartCouponIssueNo,
                channelType,
                promotionCode,
                productCoupons,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getAppliedCouponPrice: (
        orderSheetNo: string,
        {
            cartCouponIssueNo,
            channelType,
            promotionCode,
            productCoupons,
        }: CouponRequest,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/order-sheets/${orderSheetNo}/coupons/calculate`,
            data: {
                cartCouponIssueNo,
                channelType,
                promotionCode,
                productCoupons,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getMaximumAppliedCouponPrice: (
        orderSheetNo: string,
        { channelType }: { channelType?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/order-sheets/${orderSheetNo}/coupons/maximum`,
            data: {
                channelType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default orderSheet;
