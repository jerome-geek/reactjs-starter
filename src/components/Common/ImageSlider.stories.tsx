import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductImageList, { BulletStyle } from 'components/Common/ImageSlider';

export default {
    component: ProductImageList,
    parameters: {
        componentSubtitle: '스와이퍼 컴포넌트',
    },
} as ComponentMeta<typeof ProductImageList>;

const imageList = [
    'https://picsum.photos/200/300',
    'https://picsum.photos/300/300',
    'https://picsum.photos/400/300',
    'https://picsum.photos/500/300',
];

const Template: ComponentStory<typeof ProductImageList> = ({
    productImageList,
    productImageAlt,
    ...props
}: {
    productImageList?: string[];
    productImageAlt?: string;
    width?: string;
    height?: string;
    bulletStyle?: BulletStyle;
    slideImageWidth?: string;
    loop?: boolean;
}) => (
    <ProductImageList
        productImageList={productImageList}
        productImageAlt={productImageAlt}
        {...props}
    />
);

export const finite = Template.bind({});
finite.args = {
    productImageList: imageList,
    width: '300px',
    height: '400px',
    slideImageWidth: '',
    bulletStyle: {
        bulletWidth: '',
        activeBulletWidth: '',
        bulletHeight: '',
        activeBulletHeight: '',
        bulletColor: '',
        activeBulletColor: '',
        bulletBorderRadius: '',
        activeBulletBorderRadius: '',
        bulletDistance: '',
    },
    loop: true,
};
