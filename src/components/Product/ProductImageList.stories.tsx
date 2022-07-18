import { ComponentStory, ComponentMeta } from '@storybook/react';

import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ReactComponent as PrevIcon } from 'assets/icons/prev_button.svg';
import { ReactComponent as NextIcon } from 'assets/icons/next_button.svg';
import './ProductImageBullet.css';
import { useRef } from 'react';

export default {
    parameters: {
        componentSubtitle: '',
    },
} as ComponentMeta<any>;

const ProductImageBox = styled.div`
    background: #fff;
`;

const ProductImage = styled.div`
    width: 330.5px;
    height: 361px;
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

const Template: ComponentStory<any> = ({ loop }: { loop: boolean }) => {
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
                    loop={loop}
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#F8F8FA',
                    }}
                >
                    <SwiperSlide
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <p>이미지_1</p>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <p>이미지_2</p>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <p>이미지_3</p>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <p>이미지_4</p>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <p>이미지_5</p>
                    </SwiperSlide>
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

export const Infinite = Template.bind({});
Infinite.args = {
    loop: true,
};

export const finite = Template.bind({});
finite.args = {
    loop: false,
};
