import { useState } from 'react';
import { useQuery } from 'react-query';
import { head } from '@fxts/core';

import Header from 'components/shared/Header';
import BandBanner from 'components/shared/BandBanner';
import { banner } from 'api/display';
import BANNER from 'const/banner';

const Main = () => {
    const [bandBannerVisible, setBandBannerVisible] = useState(true);

    const onBandBannerCloseClick = () => {
        setBandBannerVisible(false);
    };

    const { data: mainBannerData } = useQuery(
        ['bandBanner'],
        async () => await banner.getBanners([BANNER.mainBandBanner]),
        {
            select: ({ data }) => head(data),
        },
    );

    return (
        <>
            <Header />
            {bandBannerVisible && mainBannerData && (
                <BandBanner
                    title={mainBannerData.accounts[0].banners[0].name}
                    url={
                        mainBannerData.accounts[0].banners[0].videoUrl ??
                        mainBannerData.accounts[0].banners[0].landingUrl
                    }
                    onCloseClick={onBandBannerCloseClick}
                />
            )}

            <div>메인페이지입니다</div>
        </>
    );
};

export default Main;
