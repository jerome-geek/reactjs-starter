import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import { PAY_TYPE } from 'models';
import { PaymentReserve } from 'models/order';
import { isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';

const CommonPaymentContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
`;

const SheetInputWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #dbdbdb;
    text-align: left;
    min-height: 104px;
    &:last-child {
        border-bottom: none;
    }
`;

const SheetInputTitleBox = styled.div`
    width: 200px;
    padding: 44px 0 40px 41px;
    display: flex;
    flex-direction: column;
`;

const SheetInputBox = styled.div`
    width: 550px;
    padding-top: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    color: ${(props) => props.theme.text1};
    > #defaultAddress {
        display: none;
    }
    > label {
        display: flex;
        align-items: center;
        > p {
            color: #8f8f8f;
            margin-left: 10px;
        }
    }
    ${media.medium} {
        width: 100%;
    }
`;

const SheetButton = styled.div<{ width: string; isClicked: boolean }>`
    width: ${(props) => props.width};
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: ${(props) => (props.isClicked ? '#fff' : props.theme.text3)};
    background: ${(props) =>
        props.isClicked ? props.theme.secondary : props.theme.bg2};
    margin-bottom: 10px;
    cursor: pointer;
    ${media.medium} {
        width: 48.9%;
        height: 54px;
        text-align: center;
        line-height: 54px;
        font-size: 1rem;
    }
    ${media.small} {
        font-size: 1.6rem;
    }
`;

const CommonPayment = ({
    setValue,
}: {
    setValue: UseFormSetValue<PaymentReserve>;
}) => {
    const [paymentMethod, setPaymentMethod] = useState<PAY_TYPE>(
        PAY_TYPE.CREDIT_CARD,
    );

    const { width } = useWindowSize();

    const changePaymentMethodHandler = (payType: PAY_TYPE) => () => {
        setPaymentMethod(payType);
        setValue('payType', payType);
    };

    const { t: sheet } = useTranslation('orderSheet');

    return (
        <CommonPaymentContainer>
            <SheetInputWrapper>
                {!isMobile(width) && (
                    <SheetInputTitleBox>일반 결제</SheetInputTitleBox>
                )}
                <SheetInputBox>
                    <SheetButton
                        isClicked={paymentMethod === PAY_TYPE.CREDIT_CARD}
                        width='20%'
                        onClick={changePaymentMethodHandler(
                            PAY_TYPE.CREDIT_CARD,
                        )}
                    >
                        신용카드
                    </SheetButton>
                    <SheetButton
                        isClicked={
                            paymentMethod === PAY_TYPE.REALTIME_ACCOUNT_TRANSFER
                        }
                        width='29.09%'
                        onClick={changePaymentMethodHandler(
                            PAY_TYPE.REALTIME_ACCOUNT_TRANSFER,
                        )}
                    >
                        실시간 계좌 이체
                    </SheetButton>
                    <SheetButton
                        isClicked={paymentMethod === PAY_TYPE.VIRTUAL_ACCOUNT}
                        width='20%'
                        onClick={changePaymentMethodHandler(
                            PAY_TYPE.VIRTUAL_ACCOUNT,
                        )}
                    >
                        가상계좌
                    </SheetButton>
                    <SheetButton
                        isClicked={paymentMethod === PAY_TYPE.KPAY}
                        width='20%'
                        onClick={changePaymentMethodHandler(PAY_TYPE.KPAY)}
                    >
                        Kpay
                    </SheetButton>
                </SheetInputBox>
            </SheetInputWrapper>
        </CommonPaymentContainer>
    );
};

export default CommonPayment;
