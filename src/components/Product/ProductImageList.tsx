import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ReactComponent as PrevIcon } from 'assets/icons/prev_button.svg';
import { ReactComponent as NextIcon } from 'assets/icons/next_button.svg';
import './ProductImageBullet.css';

const ProductImageBox = styled.div``;

const ProductImage = styled.div`
    width: 661px;
    height: 722px;
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

const ProductImageList = ({
    productImageData,
    setProductImageData,
    productImageAlt,
    currentOptionNo,
    productNo,
}: {
    productImageData?: {
        [id: number]: string[];
    };
    setProductImageData: Dispatch<SetStateAction<{ [id: number]: string[] }>>;
    productImageAlt?: string;
    currentOptionNo: number;
    productNo: string;
}) => {
    useEffect(() => {
        setProductImageData({ 0: [] });
    }, [productNo]);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <ProductImageBox>
            <ProductImage>
                <Swiper
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Navigation]}
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#F8F8FA',
                    }}
                >
                    {productImageData?.[currentOptionNo] &&
                        productImageData[currentOptionNo].map(
                            (productImage) => {
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
                                                display: 'block',
                                            }}
                                        />
                                    </SwiperSlide>
                                );
                            },
                        )}
                </Swiper>
                <PrevButton ref={navigationPrevRef}>
                    <PrevIcon />
                </PrevButton>
                <NextButton ref={navigationNextRef}>
                    <NextIcon />
                </NextButton>
            </ProductImage>
        </ProductImageBox>
    );
};

export default ProductImageList;
