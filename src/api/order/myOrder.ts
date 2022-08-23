import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CLAIM_TYPE, ORDER_REQUEST_TYPE } from 'models';
import { DeliveryBody, OrderSummary, CashReceiptBody } from 'models/order';
import { tokenStorage } from 'utils/storage';

const myOrder = {
    /**
     * 주문 리스트 조회하기
     * - 시작일 종료일 사이의 주문리스트를 조회하는 API 입니다.
     *
     * @param params
     * @returns Promise<AxiosResponse>
     */
    getOrderList: (
        params?: { orderRequestTypes?: ORDER_REQUEST_TYPE } & Paging &
            SearchDate,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/orders',
            params: {
                orderRequestTypes: params?.orderRequestTypes,
                pageNumber: params?.pageNumber,
                pageSize: params?.pageSize,
                hasTotalCount: params?.hasTotalCount,
                startYmd: params?.startYmd,
                endYmd: params?.endYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 주문 상세 조회하기
     * - 주문번호로 상세 데이터를 조회하는 API 입니다.
     *
     * @param orderNo
     * @param params
     * @returns Promise<AxiosResponse>
     */
    getOrderDetail: (
        orderNo: string,
        params?: {
            orderRequestTypes: Exclude<
                keyof typeof ORDER_REQUEST_TYPE,
                'ALL' | 'CLAIM' | 'NORMAL'
            >;
        },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/profile/orders/${orderNo}`,
            params: { orderRequestTypes: params?.orderRequestTypes },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 상태별 주문 옵션별 수량 조회하기
     * - 시작일 종료일 사이의 상태별 주문 옵션별 수량을 조회하는 API 입니다.
     * - 옵션별로 카운트 합니다.
     *
     * @param params SearchDate
     * @returns Promise<AxiosResponse<OrderSummary>>
     */
    getOrderOptionStatus: (
        params?: SearchDate,
    ): Promise<AxiosResponse<OrderSummary>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/order-options/summary/status',
            params: { startYmd: params?.startYmd, endYmd: params?.endYmd },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
    /**
     * 상품 주문 구매 확정하기
     * - 배송중, 배송완료 상태의 상태주문을 구매확정 처리하는 API 입니다.
     *
     * @param orderOptionNo string
     * @returns Promise<AxiosResponse>
     */
    confirmPurchase: (orderOptionNo: string): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'PUT',
            url: `/profile/order-options/${orderOptionNo}/confirm`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 상품 주문 배송완료 처리하기
     * - 배송중 상태의 상품주문을 배송완료 처리하는 API 입니다.
     *
     * @param orderOptionNo string
     * @returns Promise<AxiosResponse>
     */
    processDeliveryDone: (orderOptionNo: string): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'PUT',
            url: `/profile/order-options/${orderOptionNo}/delivery-done`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 상태별 주문 수량 및 금액 조회하기
     * - 시작일 종료일 사이의 상태별 주문 옵션별 수량을 조회하는 API 입니다.
     * - 옵션별로 카운트 합니다.
     *
     * @param param0
     * @returns Promise<AxiosResponse>
     */
    getOrderStatusCountAndPrice: (
        params?: {
            orderStatusType: Exclude<
                keyof typeof ORDER_REQUEST_TYPE,
                'ALL' | 'CLAIM' | 'NORMAL'
            >;
        } & SearchDate,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/orders/summary/amount',
            params: {
                orderStatusType: params?.orderStatusType,
                startYmd: params?.startYmd,
                endYmd: params?.endYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 상태별 주문 수량 조회하기
     * - 시작일 종료일 사이의 상태별 주문 옵션별 수량을 조회하는 API 입니다.
     * - 옵션별로 카운트 합니다.(FIX ME: 옵션별이 아니고 주문별인듯)
     * @returns Promise<AxiosResponse>
     */
    getOrderStatus: (): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/orders/summary/status',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 현금영수증 신청하기
     * - 구매자가 무통장입금 주문에 대하여 현금영수증을 발급하는 API 입니다.
     *
     * @param orderNo string
     * @param params CashReceiptBody
     * @returns Promise<AxiosResponse>
     */
    requestCashReceipt: (
        orderNo: string,
        params?: CashReceiptBody,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/profile/orders/${orderNo}/cashReceipt`,
            data: {
                cashReceiptKey: params?.cashReceiptKey,
                cashReceiptIssuePurposeType:
                    params?.cashReceiptIssuePurposeType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 전체 주문취소를 위한 주문 상세 조회하기 (클레임 상세사유 포함)
     * - 주문번호로 상세 데이터를 조회하는 API 입니다.
     * - 클레임 상세사유를 포합합니다.
     * @param orderNo
     * @param param1
     * @returns
     */
    getOrderDetailForClaim: (
        orderNo: string,
        params?: {
            orderRequestType?: ORDER_REQUEST_TYPE;
            claimType: CLAIM_TYPE;
        },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/profile/orders/${orderNo}/claim`,
            params: {
                orderRequestType: params?.orderRequestType,
                claimType: params?.claimType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 주문단위 배송정보 수정하기
     * - 주문번호에 속한 배송정보를 일괄 수정하는 API 입니다.
     *
     * @param orderNo
     * @param body DeliveryBody
     * @returns Promise<AxiosResponse>
     */
    updateDeliveryInformation: (
        orderNo: string,
        body?: DeliveryBody,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'PUT',
            url: `/profile/orders/${orderNo}/deliveries`,
            data: {
                receiverZipCd: body?.receiverZipCd,
                receiverAddress: body?.receiverAddress,
                receiverJibunAddress: body?.receiverJibunAddress,
                receiverDetailAddress: body?.receiverDetailAddress,
                receiverName: body?.receiverName,
                receiverContact1: body?.receiverContact1,
                receiverContact2: body?.receiverContact2,
                customIdNumber: body?.customIdNumber,
                countryCd: body?.countryCd,
                deliveryMemo: body?.deliveryMemo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default myOrder;
