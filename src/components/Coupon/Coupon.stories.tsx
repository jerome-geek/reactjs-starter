import { ComponentStory, ComponentMeta } from '@storybook/react';
import Coupon from './Coupon';

export default {
    component: Coupon,
    argTypes: {
        discountAmt: { type: 'number' },
        discountRate: { type: 'number' },
        couponName: { type: 'string' },
        useEndYmdt: { control: 'date' },
    },
} as ComponentMeta<typeof Coupon>;

const Template: ComponentStory<typeof Coupon> = ({
    discountAmt,
    discountRate,
    couponName,
    useEndYmdt,
    ...args
}) => (
    <Coupon
        discountAmt={discountAmt}
        discountRate={discountRate}
        couponName={couponName}
        useEndYmdt={useEndYmdt}
        {...args}
    />
);

export const FixedRateCoupon = Template.bind({});
FixedRateCoupon.args = {
    discountAmt: 10000,
    discountRate: 10,
    couponName: '정률 할인 쿠폰',
    useEndYmdt: new Date(),
};

export const FixedAmountCoupon = Template.bind({});
FixedAmountCoupon.args = {
    discountAmt: 10000,
    discountRate: 0,
    couponName: '정액 할인 쿠폰',
    useEndYmdt: new Date(),
};
