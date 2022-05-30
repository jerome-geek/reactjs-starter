import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CLAIM_TYPE } from 'models';
import {
    CancelOptions,
    CanceledPrice,
    ReturnOption,
    ReturnAccount,
    ExchangeRequest,
} from 'models/claim';

const guest = {
    // TODO guestToken이 없기 때문에 나중에 테스트 필요
    cancelPendingDepositOrder: ({
        // TODO 함수명 생각하기, 입금 대기 상태의 주문을 취소하는 함수
        claimReasonDetail,
        responsibleObjectType,
        claimType,
        claimedProductOptions,
        saveBankAccountInfo,
        bankAccountInfo,
        claimReasonType,
        refundsImmediately,
    }: CancelOptions): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/guest/claims/cancel',
            data: {
                claimReasonDetail,
                responsibleObjectType,
                claimType,
                claimedProductOptions,
                saveBankAccountInfo,
                bankAccountInfo,
                claimReasonType,
                refundsImmediately,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getRefundPrice: ({
        responsibleObjectType,
        claimedProductOptions,
        claimType,
        productCnt,
        claimReasonType,
        returnWayType,
    }: CanceledPrice): Promise<AxiosResponse> => // TODO 함수명 생각하기
        request({
            method: 'POST',
            url: '/guest/claims/estimate',
            data: {
                responsibleObjectType,
                claimedProductOptions,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    requestReturn: ({
        claimImageUrls,
        claimType,
        productCnt,
        claimReasonType,
        claimReasonDetail,
        bankAccountInfo,
        saveBankAccountInfo,
        returnAddress,
        returnWayType,
        claimedProductOptions,
        deliveryCompanyType,
        invoiceNo,
        responsibleObjectType,
    }: ReturnOption & CanceledPrice): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/guest/claims/return',
            data: {
                claimImageUrls,
                claimType,
                productCnt,
                claimReasonType,
                claimReasonDetail,
                bankAccountInfo,
                saveBankAccountInfo,
                returnAddress,
                returnWayType,
                claimedProductOptions,
                deliveryCompanyType,
                invoiceNo,
                responsibleObjectType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    updateReturnAccount: (
        claimNo: string,
        { depositorName, bank, account }: ReturnAccount,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/claims/${claimNo}/account`,
            data: { depositorName, bank, account },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    checkCancelOfClaimValidation: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/claims/${claimNo}/check-withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getClaimDetailByClaimNo: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/claims/${claimNo}/result`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    cancelClaimByClaimNo: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/claims/${claimNo}/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getClaimInformation: (
        orderOptionNo: string,
        { claimType }: { claimType: CLAIM_TYPE },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims`,
            params: { claimType },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    cancelClaimOption: (
        orderOptionNo: string,
        {
            claimReasonDetail,
            responsibleObjectType,
            claimType,
            saveBankAccountInfo,
            bankAccountInfo,
            claimReasonType,
            refundsImmediately,
            productCnt,
        }: Omit<CancelOptions, 'claimedProductOptions'> & {
            productCnt: number;
        },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/cancel`,
            data: {
                claimReasonDetail,
                responsibleObjectType,
                claimType,
                saveBankAccountInfo,
                bankAccountInfo,
                claimReasonType,
                refundsImmediately,
                productCnt,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getClaimOptionPrice: (
        orderOptionNo: string,
        {
            responsibleObjectType,
            claimType,
            productCnt,
            claimReasonType,
            returnWayType,
        }: Omit<CanceledPrice, 'claimedProductOptions'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims/estimate`,
            params: {
                responsibleObjectType,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    requestExchange: (
        orderOptionNo: string,
        {
            responsibleObjectType,
            claimType,
            productCnt,
            claimReasonType,
            returnWayType,
            claimImageUrls,
            claimReasonDetail,
            bankAccountInfo,
            saveBankAccountInfo,
            returnAddress,
            deliveryCompanyType,
            invoiceNo,
            exchangeAddress,
            exchangeOption,
        }: Omit<CanceledPrice, 'claimedProductOptions'> &
            ReturnOption &
            ExchangeRequest,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/exchange`,
            data: {
                responsibleObjectType,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
                claimImageUrls,
                claimReasonDetail,
                bankAccountInfo,
                saveBankAccountInfo,
                returnAddress,
                deliveryCompanyType,
                invoiceNo,
                exchangeAddress,
                exchangeOption,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getClaimDetailByOptionNo: (orderOptionNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims/result`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    requestReturnOption: (
        orderOptionNo: string,
        {
            claimImageUrls,
            claimType,
            productCnt,
            claimReasonType,
            claimReasonDetail,
            bankAccountInfo,
            saveBankAccountInfo,
            returnAddress,
            returnWayType,
            deliveryCompanyType,
            invoiceNo,
            responsibleObjectType,
        }: ReturnOption & Omit<CanceledPrice, 'claimedProductOptions'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/return`,
            data: {
                claimImageUrls,
                claimType,
                productCnt,
                claimReasonType,
                claimReasonDetail,
                bankAccountInfo,
                saveBankAccountInfo,
                returnAddress,
                returnWayType,
                deliveryCompanyType,
                invoiceNo,
                responsibleObjectType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    cancelClaimByOrderNo: (orderOptionNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/claims/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    cancelOrder: (
        orderNo: string,
        {
            claimReasonDetail,
            responsibleObjectType,
            claimType,
            saveBankAccountInfo,
            bankAccountInfo,
            claimReasonType,
            refundsImmediately,
        }: Omit<CancelOptions, 'claimedProductOptions'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/orders/${orderNo}/claims/cancel`,
            data: {
                claimReasonDetail,
                responsibleObjectType,
                claimType,
                saveBankAccountInfo,
                bankAccountInfo,
                claimReasonType,
                refundsImmediately,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),
};
