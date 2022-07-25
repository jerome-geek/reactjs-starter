import { AxiosResponse } from 'axios';
import qs from 'qs';

import request, { defaultHeaders } from 'api/core';
import { CartList, CartPrice, ShoppingCartBody } from 'models/order/index';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const cart = {
    //TODO getCart, getCartCount, getCartValidation를 제외한 나머지는 cartNo 혹은 orderNo가 필수로 들어가므로 나중에 test 해야 함
    getCart: ({
        divideInvalidProducts,
    }: {
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse<CartList>> =>
        request({
            method: 'GET',
            url: '/cart',
            params: { divideInvalidProducts },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

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
    }: {
        cartNo: number | number[];
    }): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: '/cart',
            params: { cartNo },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'comma' });
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getSelectedCartPrice: ({
        cartNo,
        divideInvalidProducts,
    }: {
        cartNo: number[] | number | null;
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse<CartPrice>> =>
        request({
            method: 'GET',
            url: '/cart/calculate',
            params: { cartNo, divideInvalidProducts },
            paramsSerializer: (params) => {
                return typeof params === 'object'
                    ? qs.stringify(params, { arrayFormat: 'comma' })
                    : '';
            },
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
