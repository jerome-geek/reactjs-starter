import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { ShoppingCartBody } from 'models/order/index';

const cart = {
    getCart: ({
        divideInvalidProducts,
    }: {
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/cart',
            params: { divideInvalidProducts },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 에러, cartNo 모름, 테스트 필요
    updateCart: ({
        cartNo,
        orderCnt,
        optionInputs,
    }: Pick<
        ShoppingCartBody,
        'cartNo' | 'orderCnt' | 'optionInputs'
    >): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/cart',
            data: [{ orderCnt, cartNo, optionInputs }],
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 에러, cartNo 모름, 테스트 필요
    registerCart: ({
        orderCnt,
        channelType,
        optionInputs,
        optionNo,
        productNo,
    }: Omit<ShoppingCartBody, 'cartNo'>): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/cart',
            data: [
                { orderCnt, channelType, optionInputs, optionNo, productNo },
            ],
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    deleteCart: ({
        cartNo,
    }: Pick<ShoppingCartBody, 'cartNo'>): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: '/cart',
            params: { cartNo },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getSelectedCartPrice: ({
        cartNo,
        divideInvalidProducts,
    }: Pick<ShoppingCartBody, 'cartNo'> & {
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/cart/calculate',
            params: { cartNo, divideInvalidProducts },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getCartCount: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/cart/count',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getSelectedCartGroupPrice: ({
        cartNo,
        divideInvalidProducts,
    }: Pick<ShoppingCartBody, 'cartNo'> & {
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/cart/subset',
            params: { cartNo, divideInvalidProducts },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getCartValidation: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/cart/validate',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default cart;
