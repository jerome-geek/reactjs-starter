import { FC, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { sort, isBoolean } from '@fxts/core';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { useWindowSize } from 'usehooks-ts';

import MainCategory from 'components/Main/MainCategory';
import SlideButton from 'components/Button/SlideButton';
import { BannerInfo } from 'models/display';
import media from 'utils/styles/media';
import { getLinkTarget } from 'utils/html';

interface MainCategoryBannersProps {
    banners: BannerInfo[];
}

const MainCategoryBannersWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    position: relative;

    @media (min-width: 769px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 640px;
        height: 72px;
        padding-top: 50px;
        padding-bottom: 156px;
    }

    ${media.small} {
        margin: 44px 34px;
    }
`;

const MainCategoryBanners: FC<MainCategoryBannersProps> = ({ banners }) => {
    const { width } = useWindowSize();
    const prevElRef = useRef(null);
    const nextElRef = useRef(null);

    const settings = useMemo<SwiperProps>(
        () => ({
            modules: [Navigation, A11y],
            observer: true,
            resizeObserver: true,
            slidesPerView: 4,
            navigation: true,
            pagination: true,
        }),
        [],
    );

    return (
        <MainCategoryBannersWrapper>
            {width > 768 ? (
                <>
                    {banners.map(
                        ({
                            bannerNo,
                            imageUrl,
                            mouseOverImageUrl,
                            name,
                            landingUrl,
                            browerTargetType,
                        }) => {
                            return (
                                <MainCategory
                                    key={bannerNo}
                                    imageUrl={imageUrl}
                                    mouseOverImageUrl={mouseOverImageUrl}
                                    title={name}
                                    landingUrl={landingUrl}
                                    target={getLinkTarget(browerTargetType)}
                                />
                            );
                        },
                    )}
                </>
            ) : (
                <>
                    <Swiper
                        {...settings}
                        style={{ width: '360px' }}
                        onBeforeInit={(Swiper: SwiperClass) => {
                            if (!isBoolean(Swiper.params.navigation)) {
                                const navigation = Swiper.params.navigation;
                                if (navigation) {
                                    navigation.prevEl = prevElRef.current;
                                    navigation.nextEl = nextElRef.current;
                                }
                            }
                        }}
                        navigation={{
                            prevEl: prevElRef.current,
                            nextEl: nextElRef.current,
                        }}
                    >
                        {banners.map(
                            ({
                                bannerNo,
                                imageUrl,
                                mouseOverImageUrl,
                                name,
                                landingUrl,
                                browerTargetType,
                            }) => {
                                return (
                                    <SwiperSlide key={bannerNo}>
                                        <MainCategory
                                            imageUrl={imageUrl}
                                            mouseOverImageUrl={
                                                mouseOverImageUrl
                                            }
                                            title={name}
                                            landingUrl={landingUrl}
                                            target={getLinkTarget(
                                                browerTargetType,
                                            )}
                                        />
                                    </SwiperSlide>
                                );
                            },
                        )}
                    </Swiper>
                    <SlideButton
                        slideButtonType='prev'
                        ref={prevElRef}
                        style={{ left: '-14px' }}
                    />
                    <SlideButton
                        slideButtonType='next'
                        ref={nextElRef}
                        style={{ right: '-14px' }}
                    />
                </>
            )}
        </MainCategoryBannersWrapper>
    );
};

export default MainCategoryBanners;
