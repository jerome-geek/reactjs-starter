import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

export enum PAGE_TYPE {
    MAIN = 'MAIN', // 메인페이지
    CATEGORY = 'CATEGORY', // 전시카테고리
    EVENT = 'EVENT', // 기획전
    PRODUCT = 'PRODUCT', // 상품
}

interface DesignPopup {
    displayUrl?: string;
    parameter?: string;
}

interface Popup {
    pageType: PAGE_TYPE;
    targetNo: number;
}

const popup = {
    getDesignPopups: ({
        displayUrl,
        parameter,
    }: DesignPopup): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/design-popups',
            data: { displayUrl, parameter },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: JSON.parse(localStorage.accessToken).accessToken,
            }),
        }),

    getAllPopups: ({ pageType, targetNo }: Popup): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/popups',
            params: { pageType, targetNo },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: JSON.parse(localStorage.accessToken).accessToken,
            }),
        }),

    getPopups: (
        popupNos: string,
        { pageType, targetNo }: Popup,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/popups/${popupNos}`,
            params: { pageType, targetNo },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: JSON.parse(localStorage.accessToken).accessToken,
            }),
        }),
};

export default popup;
