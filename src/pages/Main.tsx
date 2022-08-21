import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { A11y, Navigation, Pagination } from 'swiper';
import { SwiperProps } from 'swiper/react';
import { useWindowSize } from 'usehooks-ts';
import { sort } from '@fxts/core';

import Header from 'components/shared/Header';
import BandBanner from 'components/shared/BandBanner';
import MainSlideBanner from 'components/Main/MainSlideBanner';
import MainCategoryBanners from 'components/Main/MainCategoryBanners';
import ETCSection from 'components/Main/ETCSection';
import { banner } from 'api/display';
import BANNER from 'const/banner';
import { BannerInfo } from 'models/display';

const Main = () => {
    const { width } = useWindowSize();
    const [bandBannerVisible, setBandBannerVisible] = useState(true);

    const onBandBannerCloseClick = () => {
        setBandBannerVisible(false);
    };

    const { data: mainBannerData } = useQuery(
        ['mainBanner', BANNER.mainBandBanner],
        async () =>
            await banner.getBanners([
                BANNER.mainBandBanner,
                BANNER.mainCategoryBanner,
            ]),
        {
            select: ({ data }) => {
                return {
                    mainBanner: data[0],
                    mainCategoryBanner: data[1],
                };
            },
        },
    );

    const settings = useMemo<SwiperProps>(
        () => ({
            modules: [Navigation, Pagination, A11y],
            observer: true,
            resizeObserver: true,
            spaceBetween: 50,
            slidesPerView: 1,
            navigation: true,
            pagination: true,
        }),
        [],
    );

    const sortBanners = useCallback((banners: BannerInfo[]) => {
        return sort((a, b) => a.displayOrder > b.displayOrder, banners);
    }, []);

    return (
        <>
            <Header />

            {bandBannerVisible && mainBannerData && (
                <BandBanner
                    title={
                        mainBannerData.mainBanner.accounts[0].banners[0].name
                    }
                    url={
                        mainBannerData.mainBanner.accounts[0].banners[0]
                            .videoUrl ??
                        mainBannerData.mainBanner.accounts[0].banners[0]
                            .landingUrl
                    }
                    onCloseClick={onBandBannerCloseClick}
                />
            )}

            {/* 메인 슬라이드 배너 */}
            {mainBannerData?.mainBanner.accounts[1].banners && (
                <MainSlideBanner
                    settings={{
                        ...settings,
                        style:
                            width > 428
                                ? { height: '828px' }
                                : { height: '410px' },
                    }}
                    banners={sortBanners(
                        mainBannerData.mainBanner.accounts[1]?.banners,
                    )}
                />
            )}

            {/* 카테고리 아이콘 리스트 */}
            {mainBannerData?.mainCategoryBanner.accounts && (
                <MainCategoryBanners
                    banners={sortBanners(
                        mainBannerData?.mainCategoryBanner?.accounts[0].banners,
                    )}
                />
            )}

            {/* TODO: New Release */}

            {/* TODO: 메인 배너 리스트 */}

            {/* ETC */}
            {mainBannerData?.mainBanner.accounts[4]?.banners && (
                <ETCSection
                    iconWidth={mainBannerData?.mainBanner.accounts[4]?.width}
                    iconHeight={mainBannerData?.mainBanner.accounts[4]?.height}
                    banners={sortBanners(
                        mainBannerData?.mainBanner.accounts[4]?.banners,
                    )}
                />
            )}
        </>
    );
};

export default Main;
