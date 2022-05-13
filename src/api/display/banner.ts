import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

const banner = {
    getBanners: (bannerSectionCodes: string[]): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/banners/${bannerSectionCodes}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getSkinBanners: ({
        skinCode,
        bannerGroupCodes,
    }: {
        skinCode: string;
        bannerGroupCodes: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/skin-banners',
            params: {
                skinCode,
                bannerGroupCodes,
            },
        }),

    getBannerGroupBySkin: ({
        isPreview = false,
    }: {
        isPreview: Boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: 'skin-banners/groups-by-skin',
            params: {
                isPreview,
            },
        }),
};

export default banner;
