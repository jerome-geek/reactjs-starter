import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    OrderSheetBody,
    GetCalculatedOrderSheet,
    CouponRequest,
    OrderSheetResponse,
    ApplyCouponResponse,
    CouponApplyResponse,
} from 'models/order';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const orderSheet = {
    writeOrderSheet: ({
        productCoupons,
        trackingKey,
        cartNos,
        channelType,
        products,
    }: OrderSheetBody): Promise<AxiosResponse<{ orderSheetNo: string }>> =>
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getOrderSheet: (
        orderSheetNo: string,
        { includeMemberAddress }: { includeMemberAddress?: boolean },
    ): Promise<AxiosResponse<OrderSheetResponse>> =>
        request({
            method: 'GET',
            url: `/order-sheets/${orderSheetNo}`,
            params: { includeMemberAddress },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getCanApplyCoupon: (
        orderSheetNo: string,
        params?: { channelType: string },
    ): Promise<AxiosResponse<ApplyCouponResponse>> =>
        request({
            method: 'GET',
            url: `/order-sheets/${orderSheetNo}/coupons`,
            params: { channelType: params?.channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
    ): Promise<AxiosResponse<CouponApplyResponse>> =>
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
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
};

export default orderSheet;
