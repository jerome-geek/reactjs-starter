import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { ShoppingCartBody } from 'models/order/index';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const cart = {
    getCart: (
        params: {
            divideInvalidProducts?: boolean;
        } = { divideInvalidProducts: false },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/cart',
            params: {
                divideInvalidProducts: params.divideInvalidProducts,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    registerCart: (
        body: Omit<ShoppingCartBody, 'cartNo'>[],
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/cart',
            data: body,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getCartCount: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/cart/count',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
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
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    checkCartValidation: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/cart/validate',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
};

export default cart;
