import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { OrderPrice } from 'pages/Cart/Cart';
import media from 'utils/styles/media';
import { KRW } from 'utils/currency';
import { PaymentInfo } from 'models/order';

interface OrderSheetPriceProps {
    title: string;
    cartOrderPrice?: OrderPrice;
    totalAmountPrice?: number;
    paymentInfo?: PaymentInfo;
}

const OrderSheetPriceContainer = styled.div`
    background: #f8f8fa;
    width: 100%;
`;

const CartOrderPriceTitle = styled.div`
    text-align: center;
    padding: 30px 33.5px 20px;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -1.2px;
    height: 36px;
    box-sizing: content-box;
    color: #191919;
`;

const CartOrderPriceBox = styled.div`
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    padding: 32px 0 30px;
    width: 83%;
    margin: 0 auto;
    color: #858585;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        display: flex;
        justify-content: space-between;
    }
`;

const OrderPriceWrapper = styled.div`
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const CartOrderPaymentAmount = styled.div`
    margin: 0 auto;
    width: 83%;
    padding: 32px 0;
    display: flex;
    justify-content: space-between;
    span {
        color: #c00020;
        font-size: 24px;
        font-weight: bold;
    }
`;

const CartOrderSubTitle = styled.div`
    ${media.medium} {
        font-size: 1.125rem;
    }
    ${media.small} {
        font-size: 1.6rem;
    }
`;

const CartOrderPrice = styled.div`
    letter-spacing: 0px;
    ${media.medium} {
        font-size: 1.125rem;
    }
    ${media.small} {
        font-size: 1.6rem;
    }
`;

const OrderSheetPrice: FC<OrderSheetPriceProps> = ({
    title,
    cartOrderPrice,
    totalAmountPrice = 0,
    paymentInfo,
}) => {
    const { t } = useTranslation('orderSheet');

    return (
        <OrderSheetPriceContainer>
            <CartOrderPriceTitle>{title}</CartOrderPriceTitle>
            {paymentInfo && (
                <>
                    <CartOrderPriceBox>
                        <OrderPriceWrapper>
                            <CartOrderSubTitle>
                                {t(
                                    'paymentInformation.category.amountOrderPrice',
                                )}
                            </CartOrderSubTitle>
                            <CartOrderPrice>
                                {KRW(paymentInfo?.totalStandardAmt).format()}
                            </CartOrderPrice>
                        </OrderPriceWrapper>
                        <OrderPriceWrapper>
                            <CartOrderSubTitle>
                                {t(
                                    'paymentInformation.category.amountDeliveryFee',
                                )}
                            </CartOrderSubTitle>
                            <CartOrderPrice>
                                {KRW(
                                    paymentInfo?.deliveryAmt +
                                        paymentInfo.remoteDeliveryAmt,
                                ).format()}
                            </CartOrderPrice>
                        </OrderPriceWrapper>
                        <OrderPriceWrapper>
                            <CartOrderSubTitle>
                                {t(
                                    'paymentInformation.category.amountDiscount',
                                )}
                            </CartOrderSubTitle>
                            <CartOrderPrice>
                                {KRW(
                                    Math.abs(
                                        paymentInfo.totalImmediateDiscountAmt +
                                            paymentInfo.totalAdditionalDiscountAmt,
                                    ) * -1,
                                ).format()}
                            </CartOrderPrice>
                        </OrderPriceWrapper>
                        <OrderPriceWrapper>
                            <CartOrderSubTitle>
                                {t(
                                    'paymentInformation.category.couponDiscount',
                                )}
                            </CartOrderSubTitle>
                            <CartOrderPrice>
                                {KRW(
                                    Math.abs(
                                        paymentInfo.productCouponAmt +
                                            paymentInfo.cartCouponAmt +
                                            paymentInfo.deliveryCouponAmt,
                                    ) * -1,
                                ).format()}
                            </CartOrderPrice>
                        </OrderPriceWrapper>
                    </CartOrderPriceBox>
                    <CartOrderPaymentAmount>
                        <CartOrderSubTitle>
                            {t('paymentInformation.category.amountPrice')}
                        </CartOrderSubTitle>
                        <CartOrderPrice>
                            <span>
                                {KRW(paymentInfo.paymentAmt).format({
                                    symbol: '',
                                    precision: 0,
                                })}
                            </span>
                            &nbsp;&nbsp;원
                        </CartOrderPrice>
                    </CartOrderPaymentAmount>
                </>
            )}
        </OrderSheetPriceContainer>
    );
};

export default OrderSheetPrice;
