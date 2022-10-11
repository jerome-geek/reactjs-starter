import { AxiosResponse } from 'axios';
import qs from 'qs';

import request, { defaultHeaders } from 'api/core';
import {
    CartList,
    CartPrice,
    OptionInputs,
    ShoppingCartBody,
} from 'models/order/index';
import { tokenStorage } from 'utils/storage';

const cart = {
    getCart: (
        params: {
            divideInvalidProducts?: boolean;
        } = { divideInvalidProducts: false },
    ): Promise<AxiosResponse<CartList>> => {
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
    }: {
        cartNo: number;
        orderCnt: number;
        optionInputs: OptionInputs[];
    }): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'PUT',
            url: '/cart',
            data: [{ orderCnt, cartNo, optionInputs }],
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    registerCart: (
        body: Omit<ShoppingCartBody, 'cartNo'>[],
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: '/cart',
            data: body,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    deleteCart: ({
        cartNo,
    }: {
        cartNo: number | number[];
    }): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'DELETE',
            url: '/cart',
            params: { cartNo },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'comma' });
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getSelectedCartPrice: (params: {
        cartNo: number[] | number | null;
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse<CartPrice>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/cart/calculate',
            params: {
                cartNo: params.cartNo,
                divideInvalidProducts: params.divideInvalidProducts,
            },
            paramsSerializer: (param) =>
                qs.stringify(param, { arrayFormat: 'comma' }),

            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getCartCount: (): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/cart/count',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getSelectedCartGroupPrice: ({
        cartNo,
        divideInvalidProducts,
    }: Pick<ShoppingCartBody, 'cartNo'> & {
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/cart/subset',
            params: { cartNo, divideInvalidProducts },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    checkCartValidation: (): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/cart/validate',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default cart;
