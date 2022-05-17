import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

export enum ACCUMULATION_REASON {
    ADD = 'ADD',
    SUB = 'SUB',
}

const accumulation = {
    getAccumulationHistories: ({
        pageNumber,
        pageSize,
        accumulationReason,
        startYmd,
        endYmd,
        direction = ORDER_DIRECTION.DESC,
    }: Omit<Paging, 'hasTotalCount'> & {
        accumulationReason?: ACCUMULATION_REASON;
    } & SearchDate & { direction?: ORDER_DIRECTION }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/accumulations',
            params: {
                pageNumber,
                pageSize,
                accumulationReason,
                startYmd,
                endYmd,
                direction,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getAccumulationSummary: ({
        expireStartYmdt,
        expireEndYmdt,
    }: {
        expireStartYmdt?: string;
        expireEndYmdt?: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/accumulations/summary',
            params: { expireStartYmdt, expireEndYmdt },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getMemberExpectAccumulation: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/accumulations/waiting',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default accumulation;
