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

const orderSheet = {
    writeOrderSheet: ({
        productCoupons,
        trackingKey,
        cartNos,
        channelType,
        products,
    }: OrderSheetBody): Promise<AxiosResponse<{ orderSheetNo: string }>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
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
        });
    },

    getOrderSheet: (
        orderSheetNo: string,
        { includeMemberAddress }: { includeMemberAddress?: boolean },
    ): Promise<AxiosResponse<OrderSheetResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/order-sheets/${orderSheetNo}`,
            params: { includeMemberAddress },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getCalculatedOrderSheet: (
        orderSheetNo: string,
        body: GetCalculatedOrderSheet,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/order-sheets/${orderSheetNo}/calculate`,
            data: {
                addressRequest: body?.addressRequest,
                couponRequest: body?.couponRequest,
                accumulationUseAmt: body?.accumulationUseAmt,
                shippingAddress: body?.shippingAddress,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getCanApplyCoupon: (
        orderSheetNo: string,
        params?: { channelType: string },
    ): Promise<AxiosResponse<ApplyCouponResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/order-sheets/${orderSheetNo}/coupons`,
            params: { channelType: params?.channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    applyCoupon: (
        orderSheetNo: string,
        {
            cartCouponIssueNo,
            channelType,
            promotionCode,
            productCoupons,
        }: CouponRequest,
    ): Promise<AxiosResponse<CouponApplyResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
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
        });
    },

    getAppliedCouponPrice: (
        orderSheetNo: string,
        {
            cartCouponIssueNo,
            channelType,
            promotionCode,
            productCoupons,
        }: CouponRequest,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
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
        });
    },
    getMaximumAppliedCouponPrice: (
        orderSheetNo: string,
        { channelType }: { channelType?: string },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/order-sheets/${orderSheetNo}/coupons/maximum`,
            data: {
                channelType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default orderSheet;
