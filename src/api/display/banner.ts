import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

const banner = {
    getBanners: (bannerSectionCodes: Array<String>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/banners/${bannerSectionCodes}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: JSON.parse(localStorage.accessToken).accessToken,
            }),
        }),

    getSkinBanners: ({
        skinCode,
        bannerGroupCodes,
    }: {
        skinCode: String;
        bannerGroupCodes: String;
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
