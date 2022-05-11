import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

const event = {
    // TODO: categoryNos는 콤마로 구분되어 들어가니 number인지 string인지 확인 필요!
    getEvents: ({
        keyword,
        categoryNos,
    }: {
        keyword: string;
        categoryNos: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/events',
            params: { keyword, categoryNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getClosedEvents: ({
        keyword,
        eventTitle,
        pageNumber = 1,
        pageSize = 10,
        hasTotalCount = false,
    }: {
        keyword: string;
        eventTitle: string;
        pageNumber: number;
        pageSize: number;
        hasTotalCount: boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/event/close',
            params: {
                keyword,
                eventTitle,
                pageNumber,
                pageSize,
                hasTotalCount,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO: productNos, categoryNos는 콤마로 구분되어 들어가니 number인지 string인지 확인 필요!
    getEventsByProducts: ({
        productNos,
        categoryNos,
    }: {
        productNos: number;
        categoryNos: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/events/products',
            params: { productNos, categoryNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    searchEventsByName: ({
        keyword,
        categoryNos,
        onlyIngStatus,
    }: {
        keyword: string;
        categoryNos: string;
        onlyIngStatus: boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/events/search-by-name',
            params: { keyword, categoryNos, onlyIngStatus },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getEvent: ({
        eventNo,
        order,
        soldout,
        saleStatus,
    }: {
        eventNo: string;
        order: string;
        soldout: boolean;
        saleStatus: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/events/${eventNo}`,
            params: { eventNo, order, soldout, saleStatus },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getEventsByProduct: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/events/products/${productNo}`,
            params: { productNo },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default event;
