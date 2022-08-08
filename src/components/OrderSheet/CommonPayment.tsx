import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';

import { PAY_TYPE } from 'models';
import { PaymentReserve } from 'models/order';

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
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    letter-spacing: -0.64px;
    font-weight: 400;
    height: 44px;
    width: ${(props) => (props.inputWidth ? props.inputWidth : '100%')};
    padding: 0 20px;
    min-height: 44px;
    margin-bottom: 10px;
    background: #f8f8fa;
    &::placeholder {
        color: #a8a8a8;
    }
    &:focus {
        border: 1px solid red;
    }
`;

const SheetButton = styled.div<{ width: string; isClicked: boolean }>`
    width: ${(props) => props.width};
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: ${(props) => (props.isClicked ? '#fff' : '#a8a8a8')};
    background: ${(props) => (props.isClicked ? '#222943' : '#f8f8fA')};
    margin-bottom: 10px;
    cursor: pointer;
`;

const CommonPayment = ({
    setValue,
}: {
    setValue: UseFormSetValue<PaymentReserve>;
}) => {
    const [paymentMethod, setPaymentMethod] = useState<PAY_TYPE>(
        PAY_TYPE.CREDIT_CARD,
    );

    const changePaymentMethodHandler = (payType: PAY_TYPE) => () => {
        setPaymentMethod(payType);
        setValue('payType', payType);
    };

    return (
        <CommonPaymentContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>일반 결제</SheetInputTitleBox>
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
