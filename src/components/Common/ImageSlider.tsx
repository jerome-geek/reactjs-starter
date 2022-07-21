import { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ReactComponent as PrevIcon } from 'assets/icons/prev_button.svg';
import { ReactComponent as NextIcon } from 'assets/icons/next_button.svg';

export interface BulletStyle {
    bulletWidth?: string;
    activeBulletWidth?: string;
    bulletHeight?: string;
    activeBulletHeight?: string;
    bulletColor?: string;
    activeBulletColor?: string;
    bulletBorderRadius?: string;
    activeBulletBorderRadius?: string;
    bulletDistance?: string;
}

const ProductImageBox = styled.div``;

const ProductImage = styled.div<{ width?: string; height?: string }>`
    width: ${(props) => props.width || '661px'};
    height: ${(props) => props.width || '722px'};
    position: relative;
`;

const PrevButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 44.2px;
    z-index: 1;
`;

const NextButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 44.2px;
    z-index: 1;
`;

const SwiperBulletWrapper = styled.div<BulletStyle>`
    z-index: 2;
    width: fit-content !important;
    position: absolute;
    bottom: 20px !important;
    left: 50% !important;
    transform: translateX(-50%);

    .swiper-pagination-bullet {
        width: ${(props) => props.bulletWidth || '27px'};
        height: ${(props) => props.bulletHeight || '3px'};
        background: ${(props) => props.bulletColor || '#d4d4d4'};
        border-radius: ${(props) => props.bulletBorderRadius || '0'};
        margin-right: ${(props) => props.bulletDistance || '5px'};
        &:last-child {
            margin-right: 0;
        }
    }

    .swiper-pagination-bullet-active {
        width: ${(props) => props.activeBulletWidth || '27px'};
        height: ${(props) => props.activeBulletHeight || '3px'};
        background: ${(props) => props.activeBulletColor || '#c00020'};
        border-radius: ${(props) => props.activeBulletBorderRadius || '0'};
    }
`;

const ProductImageList = ({
    productImageList,
    productImageAlt,
    width,
    height,
    bulletStyle,
    slideImageWidth,
    loop,
}: {
    productImageList?: string[];
    productImageAlt?: string;
    width?: string;
    height?: string;
    bulletStyle?: BulletStyle;
    slideImageWidth?: string;
    loop?: boolean;
}) => {
    const prevElRef = useRef(null);
    const nextElRef = useRef(null);
    const paginationRef = useRef(null);

    return (
        <ProductImageBox>
            <ProductImage width={width} height={height}>
                <Swiper
                    navigation={{
                        prevEl: prevElRef.current,
                        nextEl: nextElRef.current,
                    }}
                    pagination={{
                        clickable: true,
                        el: paginationRef.current,
                    }}
                    modules={[Pagination, Navigation]}
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#F8F8FA',
                    }}
                    loop={loop ? loop : false}
                >
                    {productImageList &&
                        productImageList.map((productImage) => {
                            return (
                                <SwiperSlide
                                    key={productImage}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <img
                                        src={productImage}
                                        alt={productImageAlt}
                                        style={{
                                            width: slideImageWidth
                                                ? slideImageWidth
                                                : 'auto',
                                        }}
                                    />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
                <PrevButton ref={prevElRef}>
                    <PrevIcon />
                </PrevButton>
                <NextButton ref={nextElRef}>
                    <NextIcon />
                </NextButton>
                <SwiperBulletWrapper
                    ref={paginationRef}
                    bulletWidth={bulletStyle?.bulletWidth}
                    activeBulletWidth={bulletStyle?.activeBulletWidth}
                    bulletHeight={bulletStyle?.bulletHeight}
                    activeBulletHeight={bulletStyle?.activeBulletHeight}
                    bulletColor={bulletStyle?.bulletColor}
                    activeBulletColor={bulletStyle?.activeBulletColor}
                    bulletBorderRadius={bulletStyle?.bulletBorderRadius}
                    activeBulletBorderRadius={
                        bulletStyle?.activeBulletBorderRadius
                    }
                    bulletDistance={bulletStyle?.bulletDistance}
                ></SwiperBulletWrapper>
            </ProductImage>
        </ProductImageBox>
    );
};

export default ProductImageList;
