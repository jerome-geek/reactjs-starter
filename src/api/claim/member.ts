import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CLAIM_TYPE } from 'models';
import {
    CanceledPrice,
    CancelOptions,
    ExchangeRequest,
    ReturnAccount,
    ReturnOption,
} from 'models/claim';

const member = {
    getClaimList: ({
        claimTypes,
        endYmd,
        hasTotalCount,
        pageNumber,
        pageSize,
        startYmd,
    }: Paging &
        SearchDate & { claimTypes?: CLAIM_TYPE }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/claims',
            params: {
                claimTypes,
                endYmd,
                hasTotalCount,
                pageNumber,
                pageSize,
                startYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 이하 함수들 404 error message: 리소스(order option)를 찾지 못하였습니다, 혹은 orderNo 등 모름
    requestCancelOptions: ({
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
            url: '/profile/claims/cancel',
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
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getRefundPrice: ({
        claimType,
        productCnt,
        claimReasonType,
        returnWayType,
        claimedProductOptions,
        responsibleObjectType,
    }: CanceledPrice): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/claims/estimate',
            data: {
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
                claimedProductOptions,
                responsibleObjectType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    requestReturnOfMultipleOptions: ({
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
            url: '/profile/claims/return',
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
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    updateReturnAccount: (
        claimNo: string,
        { bank, account, depositorName }: ReturnAccount,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/claims/${claimNo}/account`,
            data: { bank, account, depositorName },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    checkClaimValidation: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/claims/${claimNo}/check-withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getClaimDetailByClaimNo: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/claims/${claimNo}/result`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    cancelClaimByClaimNo: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/claims/${claimNo}/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getContentsForClaim: (
        orderOptionNo: string,
        { claimType }: { claimType: CLAIM_TYPE },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/order-options/${orderOptionNo}/claims`,
            params: { claimType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    requestCancelClaimOption: (
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
            url: `/profile/order-options/${orderOptionNo}/claims/cancel`,
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
                accessToken: localStorage.getItem('accessToken') || '',
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
            url: `/profile/order-options/${orderOptionNo}/claims/estimate`,
            params: {
                responsibleObjectType,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
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
            url: `/profile/order-options/${orderOptionNo}/claims/exchange`,
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
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getClaimDetailByOrderOptionNo: (
        orderOptionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/order-options/${orderOptionNo}/claims/result`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    requestReturnOfSingleOption: (
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
            url: `/profile/order-options/${orderOptionNo}/claims/return`,
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
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    cancelClaimByOrderOptionNo: (
        orderOptionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/order-options/${orderOptionNo}/claims/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    requestCancel: (
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
            url: `/profile/orders/${orderNo}/claims/cancel`,
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
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default member;
