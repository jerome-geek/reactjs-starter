import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { A11y, Navigation, Pagination } from 'swiper';
import { SwiperProps } from 'swiper/react';
import { useWindowSize } from 'usehooks-ts';
import { filter, head, pipe } from '@fxts/core';

import Header from 'components/shared/Header';
import BandBanner from 'components/shared/BandBanner';
import MainSlideBanner from 'components/Main/MainSlideBanner';
import MainCategoryBanners from 'components/Main/MainCategoryBanners';
import MainBanner from 'components/Main/MainBanner';
import MainVideoBanner from 'components/Main/MainVideoBanner';
import ETCSection from 'components/Main/ETCSection';
import { banner, productSection } from 'api/display';
import { sortBanners } from 'utils/banners';
import { isMobile } from 'utils/styles/responsive';
import BANNER from 'const/banner';
import PRODUCT_SECTION from 'const/productSection';
import NewReleases from 'components/Main/NewReleases';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import { BY, SALE_STATUS } from 'models';

const Main = () => {
    const { width } = useWindowSize();
    const [bandBannerVisible, setBandBannerVisible] = useState(true);

    const onBandBannerCloseClick = () => {
        setBandBannerVisible(false);
    };

    const getMainBannerCode = useMemo(
        () =>
            isMobile(width)
                ? BANNER.MAIN_MOBILE_BANNER
                : BANNER.MAIN_WEB_BANNER,
        [width],
    );

    const { data: mainBannerData } = useQuery(
        ['mainBanner', getMainBannerCode],
        async () =>
            await banner.getBanners([
                getMainBannerCode,
                BANNER.MAIN_BAND_BANNER,
                BANNER.MAIN_CATEGORY_BANNER,
                BANNER.MAIN_ETC_BANNER,
            ]),
        {
            select: ({ data }) => {
                const filteredBannerData = (code: string) =>
                    pipe(
                        data,
                        filter((a) => a.code === code),
                        head,
                    );

                return {
                    mainBandBanner: filteredBannerData(BANNER.MAIN_BAND_BANNER),
                    mainBanner: filteredBannerData(getMainBannerCode),
                    mainCategoryBanner: filteredBannerData(
                        BANNER.MAIN_CATEGORY_BANNER,
                    ),
                    mainETCBanner: filteredBannerData(BANNER.MAIN_ETC_BANNER),
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
            style: {
                transform: 'translate3d(0, 0, 0)',
                zIndex: 0,
            },
        }),
        [],
    );

    const { data: newReleasesData } = useQuery(
        ['product_section', PRODUCT_SECTION.NEW_RELEASE],
        async () =>
            await productSection.getProductSection(
                PRODUCT_SECTION.NEW_RELEASE,
                {
                    by: BY.ADMIN_SETTING,
                    soldout: false,
                    saleStatus: SALE_STATUS.ONSALE,
                    pageNumber: 1,
                    pageSize: 10,
                    hasTotalCount: false,
                    hasOptionValues: false,
                },
            ),
        {
            select: ({ data }) => {
                return data;
            },
        },
    );

    return (
        <>
            <Header />

            {bandBannerVisible &&
                mainBannerData?.mainBandBanner?.accounts[0]?.banners && (
                    <BandBanner
                        title={
                            mainBannerData.mainBandBanner.accounts[0].banners[0]
                                .name
                        }
                        url={
                            mainBannerData.mainBandBanner.accounts[0].banners[0]
                                .videoUrl ??
                            mainBannerData.mainBandBanner.accounts[0].banners[0]
                                .landingUrl
                        }
                        onCloseClick={onBandBannerCloseClick}
                    />
                )}

            {/* 메인 슬라이드 배너 */}
            {mainBannerData?.mainBanner?.accounts[1]?.banners && (
                <MainSlideBanner
                    settings={{
                        ...settings,
                        style:
                            width > 428
                                ? {
                                      ...settings.style,
                                      height: '828px',
                                  }
                                : {
                                      ...settings.style,
                                      height: '410px',
                                  },
                    }}
                    banners={sortBanners(
                        mainBannerData.mainBanner.accounts[1]?.banners,
                    )}
                />
            )}

            <LayoutResponsive>
                {/* 카테고리 아이콘 리스트 */}
                {mainBannerData?.mainCategoryBanner?.accounts && (
                    <MainCategoryBanners
                        banners={sortBanners(
                            mainBannerData?.mainCategoryBanner?.accounts[0]
                                .banners,
                        )}
                    />
                )}

                {/* TODO: New Release */}
                {newReleasesData?.products && (
                    <NewReleases
                        settings={{
                            ...settings,
                        }}
                        title='New Releases'
                        products={newReleasesData.products}
                    />
                )}

                {/* 메인 배너 리스트 */}
                {mainBannerData?.mainBanner?.accounts[2]?.banners &&
                    sortBanners(
                        mainBannerData?.mainBanner.accounts[2]?.banners,
                    ).map(
                        ({
                            bannerNo,
                            name,
                            imageUrl,
                            description,
                            browerTargetType,
                        }) => (
                            <MainBanner
                                key={bannerNo}
                                title={name}
                                imgUrl={imageUrl}
                                desc={description}
                                url={browerTargetType}
                            />
                        ),
                    )}
            </LayoutResponsive>

            {/* 유튜브 슬라이드 배너 */}
            {mainBannerData?.mainBanner?.accounts[3]?.banners && (
                <MainVideoBanner
                    settings={{
                        ...settings,
                        style: {
                            width: '100%',
                            maxWidth: '1280px',
                            height: 'auto',
                        },
                    }}
                    title={mainBannerData?.mainBanner.accounts[3]?.accountName}
                    banners={mainBannerData?.mainBanner.accounts[3]?.banners}
                />
            )}

            {/* ETC */}
            <LayoutResponsive>
                {mainBannerData?.mainETCBanner?.accounts[0]?.banners && (
                    <ETCSection
                        iconWidth={
                            mainBannerData?.mainETCBanner.accounts[0]?.width
                        }
                        iconHeight={
                            mainBannerData?.mainETCBanner.accounts[0]?.height
                        }
                        banners={sortBanners(
                            mainBannerData?.mainETCBanner.accounts[0]?.banners,
                        )}
                    />
                )}
            </LayoutResponsive>
        </>
    );
};

export default Main;
