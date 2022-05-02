import { AxiosResponse } from 'axios';
import request from 'api/core';

const banner = {
    getBanners: (bannerSectionCodes: Array<String>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/banners/${bannerSectionCodes}`,
        }),
    // 샵바이 프로 전용
    getSkinBanners: (
        skinCode: String,
        bannerGroupCodes: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/skin-banners',
            data: {
                skinCode,
                bannerGroupCodes,
            },
        }),
    // 샵바이 프로 전용
    getBannerGroupBySkin: (
        isPreview: Boolean = false,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: 'skin-banners/groups-by-skin',
            data: {
                isPreview,
            },
        }),
};

export default banner;
