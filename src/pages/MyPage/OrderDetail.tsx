import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { includes } from '@fxts/core';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import useOrderDetail from 'hooks/queries/useOrderDetail';
import { PAY_TYPE } from 'models';
import DepositInfo from 'components/Order/DepositInfo';
import PaymentInfo from 'components/Order/PaymentInfo';
import DeliveryInfo from 'components/Order/DeliveryInfo';

const OrderDetailContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const OrderInformationTitle = styled.h3`
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -1.2px;
    color: #191919;
    margin-bottom: 24px;
`;

const OrderInformationContainer = styled.section`
    margin-bottom: 24px;
`;

const OrderDetail = () => {
    const { orderNo } = useParams() as { orderNo: string };

    const orderDetailData = useOrderDetail({ orderNo });

    const isBankInfoVisible = useMemo(
        () =>
            includes(orderDetailData?.data?.payType, [
                PAY_TYPE.ACCOUNT,
                PAY_TYPE.REALTIME_ACCOUNT_TRANSFER,
                PAY_TYPE.VIRTUAL_ACCOUNT,
                PAY_TYPE.ESCROW_REALTIME_ACCOUNT_TRANSFER,
                PAY_TYPE.ESCROW_VIRTUAL_ACCOUNT,
            ]),
        [orderDetailData?.data?.payType],
    );

    return (
        <OrderDetailContainer>
            {/* TODO: 주문상품 표시 */}
            <OrderInformationContainer>
                <OrderInformationTitle>주문 상세</OrderInformationTitle>
            </OrderInformationContainer>

            {isBankInfoVisible && (
                <DepositInfo
                    paymentAmt={orderDetailData?.data?.payInfo.payAmt || 0}
                    bankName={orderDetailData?.data?.payInfo.bankInfo.bankName}
                    account={orderDetailData?.data?.payInfo.bankInfo.account}
                    remitterName={
                        orderDetailData?.data?.payInfo.bankInfo.remitterName
                    }
                    paymentExpirationYmdt={
                        orderDetailData?.data?.payInfo.bankInfo
                            .paymentExpirationYmdt
                    }
                />
            )}

            {orderDetailData.data?.payInfo && (
                <PaymentInfo
                    payAmt={orderDetailData.data.payInfo.payAmt || 0}
                    standardAmt={
                        orderDetailData.data.lastOrderAmount.standardAmt
                    }
                    deliveryAmt={
                        orderDetailData.data.lastOrderAmount.deliveryAmt
                    }
                    totalDiscountAmt={
                        orderDetailData.data.lastOrderAmount
                            .immediateDiscountAmt +
                        orderDetailData.data.lastOrderAmount
                            .additionalDiscountAmt
                    }
                    totalCouponAmt={
                        orderDetailData.data.lastOrderAmount
                            .cartCouponDiscountAmt +
                        orderDetailData.data.lastOrderAmount
                            .productCouponDiscountAmt +
                        orderDetailData.data.lastOrderAmount
                            .deliveryCouponDiscountAmt
                    }
                    subPayAmt={orderDetailData.data.lastOrderAmount.subPayAmt}
                />
            )}

            {orderDetailData.data?.shippingAddress && (
                <DeliveryInfo
                    receiverName={
                        orderDetailData.data.shippingAddress.receiverName || ''
                    }
                    receiverAddress={
                        orderDetailData.data.shippingAddress.receiverAddress ||
                        ''
                    }
                    receiverContact={
                        orderDetailData.data.shippingAddress.receiverContact1 ||
                        ''
                    }
                />
            )}
        </OrderDetailContainer>
    );
};

export default OrderDetail;
