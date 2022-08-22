import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CLAIM_TYPE, ORDER_REQUEST_TYPE } from 'models';
import { DeliveryBody, OrderDetailResponse, ReceiptBody } from 'models/order';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const myOrder = {
    // TODO 500 error
    getOrderList: ({
        orderRequestTypes,
        pageNumber,
        pageSize,
        hasTotalCount,
        startYmd,
        endYmd,
    }: { orderRequestTypes?: ORDER_REQUEST_TYPE } & Paging &
        SearchDate): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/orders',
            params: {
                orderRequestTypes,
                pageNumber,
                pageSize,
                hasTotalCount,
                startYmd,
                endYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
    // TODO orderNo가 포함 된 함수들은 테스트 x
    getOrderDetail: (
        orderNo: string,
        {
            orderRequestTypes,
        }: {
            orderRequestTypes?: Exclude<
                keyof typeof ORDER_REQUEST_TYPE,
                | 'DEPOSIT_WAIT'
                | 'PAY_DONE'
                | 'PRODUCT_PREPARE'
                | 'DELIVERY_PREPARE'
                | 'DELIVERY_ING'
                | 'DELIVERY_DONE'
                | 'BUY_CONFIRM'
                | 'CANCEL_DONE'
                | 'RETURN_DONE'
                | 'EXCHANGE_DONE'
                | 'PAY_WAIT'
                | 'PAY_CANCEL'
                | 'PAY_FAIL'
                | 'DELETE'
                | 'EXCHANGE_WAIT'
                | 'REFUND_DONE'
            >;
        },
    ): Promise<AxiosResponse<OrderDetailResponse>> =>
        request({
            method: 'GET',
            url: `/profile/orders/${orderNo}`,
            params: { orderRequestTypes },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getOrderStatusByOption: ({
        startYmd,
        endYmd,
    }: SearchDate): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/order-options/summary/status',
            params: { startYmd, endYmd },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    confirmPurchase: (orderOptionNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/order-options/${orderOptionNo}/confirm`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    processDeliveryDone: (orderOptionNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/order-options/${orderOptionNo}/delivery-done`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getOrderPrice: ({
        orderStatusType,
        startYmd,
        endYmd,
    }: {
        orderStatusType: Exclude<
            keyof typeof ORDER_REQUEST_TYPE,
            'ALL' | 'CLAIM' | 'NORMAL'
        >;
    } & SearchDate): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/orders/summary/amount',
            params: { orderStatusType, startYmd, endYmd },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getOrderStatus: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/orders/summary/status',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    requestCashReceipt: (
        orderNo: string,
        { cashReceiptKey, cashReceiptIssuePurposeType }: ReceiptBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/profile/orders/${orderNo}/cashReceipt`,
            data: { cashReceiptKey, cashReceiptIssuePurposeType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getOrderClaimDetail: (
        orderNo: string,
        {
            orderRequestType,
            claimType,
        }: { orderRequestType?: ORDER_REQUEST_TYPE; claimType: CLAIM_TYPE },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/orders/${orderNo}/claim`,
            params: { orderRequestType, claimType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    updateDeliveryInformation: (
        orderNo: string,
        {
            receiverZipCd,
            receiverAddress,
            receiverJibunAddress,
            receiverDetailAddress,
            receiverName,
            receiverContact1,
            receiverContact2,
            customIdNumber,
            countryCd,
            deliveryMemo,
        }: DeliveryBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/orders/${orderNo}/deliveries`,
            data: {
                receiverZipCd,
                receiverAddress,
                receiverJibunAddress,
                receiverDetailAddress,
                receiverName,
                receiverContact1,
                receiverContact2,
                customIdNumber,
                countryCd,
                deliveryMemo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
};

export default myOrder;
