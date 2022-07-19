import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductImageList from 'components/Product/ProductImageList';

export default {
    component: ProductImageList,
    parameters: {
        componentSubtitle: '스와이퍼 컴포넌트',
    },
} as ComponentMeta<typeof ProductImageList>;

const imageList = [
    'https://picsum.photos/201/300',
    'https://picsum.photos/202/300',
    'https://picsum.photos/203/300',
    'https://picsum.photos/204/300',
];

const Template: ComponentStory<typeof ProductImageList> = ({
    productImageList,
    productImageAlt,
    ...props
}: {
    productImageList?: string[];
    productImageAlt?: string;
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
};
