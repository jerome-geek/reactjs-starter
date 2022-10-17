import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { KRW } from 'utils/currency';

interface DeliveryInfoProps {
    deliveryFee: number;
}

const DeliveryInfoContainer = styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 26px;
    border-bottom: 2px solid #ededed;
    margin-bottom: 26px;
`;

const DeliveryInfoTitle = styled.p`
    font-size: 16px;
    letter-spacing: 0;
    color: #191919;
    margin-right: 20px;
    font-weight: normal;
`;

const DeliveryFee = styled.span`
    font-size: 16px;
    letter-spacing: 0;
    margin-right: 10px;

    > sub {
        font-size: 12px;
    }
`;

const DeliveryDesc = styled.div`
    font-size: 16px;
    color: #999;

    > sub {
        font-size: 12px;
    }
`;

const DeliveryInfo: FC<DeliveryInfoProps> = ({ deliveryFee }) => {
    const { t: productDetail } = useTranslation('productDetail');

    return (
        <DeliveryInfoContainer>
            <DeliveryInfoTitle>
                {productDetail('shippingInformation')}
            </DeliveryInfoTitle>
            <DeliveryFee
                dangerouslySetInnerHTML={{
                    __html: KRW(deliveryFee, {
                        symbol: '<sub>원</sub>',
                        precision: 0,
                        pattern: `<sub>${productDetail(
                            'shippingCost',
                        )}</sub> # !`,
                        negativePattern: `- # !`,
                    }).format(),
                }}
            />
            {/* TODO: 추가배송비 확인 필요 */}
            <DeliveryDesc>
                <sub>도서산간지역 / 제주도</sub> 7,500 <sub>원</sub>
            </DeliveryDesc>
        </DeliveryInfoContainer>
    );
};

export default DeliveryInfo;
