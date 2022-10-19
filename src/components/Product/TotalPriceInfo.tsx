import { FC } from 'react';
import styled from 'styled-components';
import { KRW } from 'utils/currency';

interface TotalPriceInfoProps {
    totalAmount: number;
    totalPrice: number;
}

const TotalPriceInfoContainer = styled.div`
    margin-bottom: 26px;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0;
    color: #191919;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & span {
        font-size: 20px;
        color: #a8a8a8;
    }
`;

const TotalPriceInfo: FC<TotalPriceInfoProps> = ({
    totalAmount = 0,
    totalPrice = 0,
}) => {
    return (
        <TotalPriceInfoContainer>
            <p>
                총 상품금액&nbsp;
                <span>{`(총 ${totalAmount > 0 ? totalAmount : '-'}개)`}</span>
            </p>
            <p>{totalPrice > 0 ? KRW(totalPrice).format() : '- 원'}</p>
        </TotalPriceInfoContainer>
    );
};

export default TotalPriceInfo;
