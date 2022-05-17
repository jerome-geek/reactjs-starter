import { AxiosResponse } from 'axios';

import request from 'api/core';

export enum TERMS_TYPES {
    MALL_INTRODUCTION = 'MALL_INTRODUCTION',
    USE = 'USE',
    E_COMMERCE = 'E_COMMERCE',
    PI_PROCESS = 'PI_PROCESS',
    PI_COLLECTION_AND_USE_REQUIRED = 'PI_COLLECTION_AND_USE_REQUIRED',
    PI_COLLECTION_AND_USE_OPTIONAL = 'PI_COLLECTION_AND_USE_OPTIONAL',
    PI_PROCESS_CONSIGNMENT = 'PI_PROCESS_CONSIGNMENT',
    PI_THIRD_PARTY_PROVISION = 'PI_THIRD_PARTY_PROVISION',
    PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE = 'PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE',
    ACCESS_GUIDE = 'ACCESS_GUIDE',
    WITHDRAWAL_GUIDE = 'WITHDRAWAL_GUIDE',
    PI_SELLER_PROVISION = 'PI_SELLER_PROVISION',
    PI_COLLECTION_AND_USE_ON_ORDER = 'PI_COLLECTION_AND_USE_ON_ORDER',
    ORDER_INFO_AGREE = 'ORDER_INFO_AGREE',
    CLEARANCE_INFO_COLLECTION_AND_USE = 'CLEARANCE_INFO_COLLECTION_AND_USE',
    TRANSFER_AGREE = 'TRANSFER_AGREE',
    REGULAR_PAYMENT_USE = 'REGULAR_PAYMENT_USE',
    AUTO_APPROVAL_USE = 'AUTO_APPROVAL_USE',
    PI_LIQUOR_PURCHASE_PROVISION = 'PI_LIQUOR_PURCHASE_PROVISION',
    PI_RESTOCK_NOTICE = 'PI_RESTOCK_NOTICE',
}

const terms = {
    getTerms: ({
        termsTypes,
    }: {
        termsTypes: TERMS_TYPES;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/terms',
            params: { termsTypes },
        }),

    // TODO 400 error, message: termsTypes이 유효하지 않습니다.
    getTermHistory: ({
        termsTypes,
        futureDaysToShow,
    }: {
        termsTypes: TERMS_TYPES;
        futureDaysToShow?: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/terms/history',
            params: { termsTypes, futureDaysToShow },
        }),

    // TODO 400 error, message: 해당 약관에 접근 권한이 없습니다.
    getTermDetail: (termsNo: number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/terms/${termsNo}`,
        }),
};

export default terms;
