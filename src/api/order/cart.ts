import { AxiosResponse } from 'axios';
import qs from 'qs';

import request, { defaultHeaders } from 'api/core';
import {
    CartList,
    CartPriceInfo,
    getMaximumCouponCartPriceResponse,
    OptionInputs,
    ShoppingCartBody,
} from 'models/order/index';
import { shopbyTokenStorage } from 'utils/storage';

const cart = {
    getCart: (
        params: {
            divideInvalidProducts?: boolean;
        } = { divideInvalidProducts: false },
    ): Promise<AxiosResponse<CartList>> => {
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

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
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

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
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

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
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

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

    /**
     * 장바구니에서 선택된 상품금액 계산하기
     *  - 장바구니에서 선택된 상품만 계산하여 금액만 리턴하는 API 입니다.
     *  - 아래 화면예시에서 상품/옵션별 배송비는 업데이트(재계산)하지 못합니다.
     *  - cartNo 파라미터 자체를 넘기지 않는 경우 : 장바구니 전체
     *  - cartNo 에 빈 값을 넘기는 경우 : 0원
     * TODO: cartNo는 dot seperated value(string)
     *
     * @param params
     * @returns
     */
    getSelectedCartPrice: (params: {
        cartNo: number[] | number | null;
        divideInvalidProducts?: boolean;
    }): Promise<AxiosResponse<CartPriceInfo>> => {
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

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

    getCartCount: (): Promise<AxiosResponse<{ count: number }>> => {
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

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
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

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
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/cart/validate',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 장바구니 기준 최대 쿠폰 할인 금액 가져오기
     *  - 장바구니 기준으로 최대 할인이 가능한 쿠폰 정보를 조회합니다.
     *
     * @param parmas
     * @returns
     */
    getMaximumCouponCartPrice: (params: {
        cartNo: number;
    }): Promise<AxiosResponse<getMaximumCouponCartPriceResponse>> => {
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/cart/coupons/maximum',
            params: params?.cartNo,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default cart;
