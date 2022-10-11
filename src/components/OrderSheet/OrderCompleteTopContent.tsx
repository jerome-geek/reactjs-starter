import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import dayjs from 'dayjs';

import PAY_TYPES from 'const/payTypes';
import { PAY_TYPE } from 'models';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';

interface OrderCompleteTopContentProps {
    result?: 'SUCCESS' | 'FAIL';
    payType?: PAY_TYPE;
    orderNo?: string;
    paymentExpirationYmdt?: string;
    message?: string;
}

const Container = styled.div`
    width: 100%;
    height: 310px;
    background-color: ${(props) => props.theme.bg2};
    margin: 0 0 70px;
    padding: 101px 0 0;

    ${media.xlarge} {
        padding: 80px 0;
        height: auto;
    }
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 1.875rem;
    color: ${(props) => props.theme.text1};

    ${media.xlarge} {
        font-size: 1.71rem;
    }

    ${media.medium} {
        font-size: 2.5rem;
    }
`;

const PayType = styled.div`
    display: inline-block;
    padding: 6px 11px;
    border: 1px solid #8c909d;
    margin: 30px 0 14px;
    color: #767676;
    font-size: 0.75rem;
    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.166rem;
    }
`;

const OrderFailMessage = styled.p`
    margin-top: 20px;
    font-size: 1.25rem;
    color: ${(props) => props.theme.text2};
    line-height: 1.4;
`;

const DepositDeadline = styled.div`
    letter-spacing: -0.64px;
    color: #8f8f8f;
    margin-bottom: 14px;
    > span {
        font-weight: bold;
        color: ${(props) => props.theme.text1};
    }
    ${media.xlarge} {
        font-size: 1.143rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        > span {
            line-height: 30px;
        }
    }
`;

const OrderNoBox = styled.div`
    color: #767676;
    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.166rem;
    }
`;

const OrderCompleteTopContent: FC<OrderCompleteTopContentProps> = ({
    result,
    payType,
    orderNo,
    paymentExpirationYmdt,
    message,
}) => {
    const { t: orderComplete } = useTranslation('orderComplete');

    const { width } = useWindowSize();

    return (
        <Container>
            {result === 'SUCCESS' && (
                <>
                    <Title>{orderComplete('orderComplete')}</Title>
                    {payType && <PayType>{PAY_TYPES[payType]}</PayType>}
                    {payType === PAY_TYPE.VIRTUAL_ACCOUNT && (
                        <>
                            {isMobile(width) ? (
                                <DepositDeadline>
                                    <span>
                                        {`${dayjs(paymentExpirationYmdt).format(
                                            'YY.MM.DD',
                                        )} ${orderComplete('etc.until')}`}
                                        <br />
                                    </span>
                                    <span>
                                        {orderComplete('etc.intoAccount')}
                                    </span>{' '}
                                    {orderComplete('etc.productShipment')}
                                </DepositDeadline>
                            ) : (
                                <DepositDeadline>
                                    <span>
                                        {dayjs(paymentExpirationYmdt).format(
                                            'YY.MM.DD',
                                        )}{' '}
                                        {orderComplete('etc.until')}{' '}
                                        {orderComplete('etc.intoAccount')}
                                    </span>
                                    {orderComplete('etc.productShipment')}
                                </DepositDeadline>
                            )}
                        </>
                    )}
                    <OrderNoBox>
                        {orderComplete('etc.orderNo')} {orderNo}
                    </OrderNoBox>
                </>
            )}
            {result === 'FAIL' && (
                <>
                    <Title>{orderComplete('orderFail')}</Title>
                    <OrderFailMessage
                        dangerouslySetInnerHTML={{
                            __html:
                                message ?? orderComplete('orderFailMessage'),
                        }}
                    />
                </>
            )}
        </Container>
    );
};

export default OrderCompleteTopContent;
