import styled from 'styled-components';

import currency from 'currency.js';
import { OrderPrice } from 'pages/Cart/Cart';
import media from 'utils/styles/media';

const CartOrderBox = styled.div`
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

const OrderSheetPrice = ({
    title,
    cartOrderPrice,
    amountPrice,
}: {
    title: string;
    cartOrderPrice?: OrderPrice;
    amountPrice?: number;
}) => {
    return (
        <CartOrderBox>
            <CartOrderPriceTitle>{title}</CartOrderPriceTitle>
            <CartOrderPriceBox>
                {cartOrderPrice &&
                    Object.values(cartOrderPrice).map(({ name, price }) => {
                        return (
                            <OrderPriceWrapper key={name}>
                                <CartOrderSubTitle>{name}</CartOrderSubTitle>
                                <CartOrderPrice>
                                    {currency(price, {
                                        symbol: '',
                                        precision: 0,
                                    }).format()}{' '}
                                    원
                                </CartOrderPrice>
                            </OrderPriceWrapper>
                        );
                    })}
            </CartOrderPriceBox>
            <CartOrderPaymentAmount>
                <CartOrderSubTitle>총 결제금액</CartOrderSubTitle>
                <CartOrderPrice>
                    <span>
                        {amountPrice
                            ? currency(amountPrice, {
                                  symbol: '',
                                  precision: 0,
                              }).format()
                            : 0}
                    </span>
                    &nbsp;&nbsp;원
                </CartOrderPrice>
            </CartOrderPaymentAmount>
        </CartOrderBox>
    );
};

export default OrderSheetPrice;
