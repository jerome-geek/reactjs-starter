import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { tokenStorage } from 'utils/storage';
import { ACCUMULATION_REASON, ORDER_DIRECTION } from 'models';

const accumulation = {
    /**
     * 적립금 이력 조회하기
     * - 적립금 이력을 전체 검색하는 API 입니다.
     *
     * @param body Omit<Paging, 'hasTotalCount'>
     *      & { accumulationReason?: ACCUMULATION_REASON; direction?: ORDER_DIRECTION; }
     *      & SearchDate
     * @returns Promise<AxiosResponse>
     */
    getAccumulationHistories: (
        body?: Omit<Paging, 'hasTotalCount'> & {
            accumulationReason?: ACCUMULATION_REASON;
            direction?: ORDER_DIRECTION;
        } & SearchDate,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/accumulations',
            params: {
                pageNumber: body?.pageNumber,
                pageSize: body?.pageSize,
                accumulationReason: body?.accumulationReason,
                startYmd: body?.startYmd,
                endYmd: body?.endYmd,
                direction: body?.direction ?? ORDER_DIRECTION.DESC,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 적립금 요약 조회하기
     * - 적립금 요약정보를 조회하는 API 입니다.
     *
     * @param param0
     * @returns Promise<AxiosResponse>
     */
    getAccumulationSummary: (params?: SearchDate): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/accumulations/summary',
            params: {
                expireStartYmdt: params?.startYmd,
                expireEndYmdt: params?.endYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 해당 회원의 예상 적립금 조회하기
     * - 해당 회원의 예상 적립금(적립대기)을 조회하는 API 입니다.
     *
     * @returns Promise<AxiosResponse>
     */
    getExpectAccumulation: (): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/accumulations/waiting',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default accumulation;
