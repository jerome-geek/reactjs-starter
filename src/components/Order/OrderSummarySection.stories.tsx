import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import OrderSummarySection from './OrderSummarySection';

export default {
    // title: '주문/배송 조회',
    component: OrderSummarySection,
    argTypes: {
        orderSummary: {
            description: 'description1111',
        },
    },
} as ComponentMeta<typeof OrderSummarySection>;

const Template: ComponentStory<typeof OrderSummarySection> = ({
    orderSummary,
    ...args
}) => <OrderSummarySection orderSummary={orderSummary} {...args} />;

export const DefaultComponent = Template.bind({});
DefaultComponent.args = {
    orderSummary: {
        depositWaitCnt: 0,
        payDoneCnt: 0,
        productPrepareCnt: 0,
        deliveryPrepareCnt: 0,
        deliveryIngCnt: 0,
        deliveryDoneCnt: 0,
        buyConfirmCnt: 0,
        cancelProcessingCnt: 0,
        cancelDoneCnt: 0,
        exchangeProcessingCnt: 0,
        exchangeDoneCnt: 0,
        returnProcessingCnt: 0,
        returnDoneCnt: 0,
    },
};
