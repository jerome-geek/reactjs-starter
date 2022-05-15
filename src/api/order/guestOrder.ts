import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    ShoppingCartBody,
    TokenIssueBody,
    ReceiptBody,
    DeliveryBody,
    PasswordParams,
    ORDER_REQUEST_TYPE,
    CLAIM_TYPE,
} from 'api/order/types';

const guestOrder = {
    // TODO parameter 모름 400, 404 error 발생 추후 테스트 필요
    getCart: ({
        orderCnt,
        channelType,
        optionInputs,
        optionNo,
        productNo,
        cartNo,
        divideInvalidProducts,
    }: ShoppingCartBody & {
        divideInvalidProducts?: Boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/guest/cart',
            data: [
                {
                    divideInvalidProducts,
                    orderCnt,
                    channelType,
                    optionInputs,
                    optionNo,
                    productNo,
                    cartNo,
                },
            ],
        }),

    getOrderDetail: (
        orderNo: String,
        { orderRequestType }: { orderRequestType?: ORDER_REQUEST_TYPE },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/orders/${orderNo}`,
            params: { orderRequestType },
        }),

    // TODO orderNo 모름, 404 error 발생 추후 테스트 필요
    issueOrderToken: (
        orderNo: String,
        { password, name, mobileNo, email, orderRequestType }: TokenIssueBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/orders/${orderNo}`,
            data: { password, name, mobileNo, email, orderRequestType },
        }),

    // TODO GuestToken, orderOptionNo 모름, 400 error 발생 추후 테스트 필요
    confirmOrder: (orderOptionNo: String): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/confirm`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    // TODO GuestToken, orderOptionNo 모름, 400 error 발생 추후 테스트 필요
    processDeliveryCompletion: (
        orderOptionNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/delivery-done`,
            data: { orderOptionNo },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    // TODO GuestToken, orderNo 모름, 400 error 발생 추후 테스트 필요
    requestReceipt: (
        orderNo: String,
        { cashReceiptIssuePurposeType, cashReceiptKey }: ReceiptBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/orders/${orderNo}/cashReceipt`,
            data: { cashReceiptIssuePurposeType, cashReceiptKey },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    // TODO GuestToken, orderNo 모름, 400 error 발생 추후 테스트 필요
    getGuestOrderDetail: (
        orderNo: String,
        {
            orderRequestType,
            claimType,
        }: { orderRequestType?: ORDER_REQUEST_TYPE; claimType?: CLAIM_TYPE },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/orders/${orderNo}/claim`,
            params: { orderRequestType, claimType },
        }),

    // TODO guestToken, orderNo 모름, 400 error 발생 추후 테스트 필요
    updateDeliveryInfo: (
        orderNo: String,
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
            add,
        }: DeliveryBody & { add: Boolean },
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order/${orderNo}/deliveries`,
            params: { add },
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
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    // TODO orderNo 모름, 400 error 발생 추후 테스트 필요
    sendPasswordByEmail: (
        orderNo: String,
        { replyType, mobileNo, email, name }: PasswordParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `guest/orders/${orderNo}/forgot-password`,
            params: { replyType, mobileNo, email, name },
        }),
};

export default guestOrder;