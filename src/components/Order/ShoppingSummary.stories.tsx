import { ComponentStory, ComponentMeta } from '@storybook/react';
import ShoppingSummary from './ShoppingSummary';

export default {
    component: ShoppingSummary,
    argTypes: {
        myGoodsCount: { type: 'number' },
        totalAvailableAmt: { type: 'number' },
        couponCount: { type: 'number' },
    },
} as ComponentMeta<typeof ShoppingSummary>;

const Template: ComponentStory<typeof ShoppingSummary> = ({
    myGoodsCount,
    totalAvailableAmt,
    couponCount,
}) => (
    <ShoppingSummary
        myGoodsCount={myGoodsCount}
        totalAvailableAmt={totalAvailableAmt}
        couponCount={couponCount}
    />
);

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {
    myGoodsCount: 0,
    totalAvailableAmt: 0,
    couponCount: 0,
};
