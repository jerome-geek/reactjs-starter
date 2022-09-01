import { Dispatch, SetStateAction, useRef } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';

import { PaymentInfo, PaymentReserve } from 'models/order';
import { OrderPrice } from 'pages/Cart/Cart';

const DiscountApplyContainer = styled.div`
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
    width: 440px;
    padding-top: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-start;
    color: ${(props) => props.theme.text1};
`;

const AccumulationAmountBox = styled.div<{ boxWidth?: string }>`
    width: ${(props) => (props.boxWidth ? props.boxWidth : '100%')};
    display: flex;
    flex-direction: column;
    justify-content: end;
    > p {
        letter-spacing: 0px;
        color: #8f8f8f;
        font-size: 12px;
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
    color: #a8a8a8;
    &:focus {
        border: 1px solid red;
    }
`;

const SheetButton = styled.button<{ width: string }>`
    width: ${(props) => props.width};
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #222943;
    margin-bottom: 10px;
    cursor: pointer;
`;

const DiscountApply = ({
    setIsCouponListModal,
    paymentInfo,
    setValue,
    setOrderPriceData,
    getValues,
}: {
    setIsCouponListModal: Dispatch<SetStateAction<boolean>>;
    paymentInfo?: PaymentInfo;
    setValue: UseFormSetValue<PaymentReserve>;
    setOrderPriceData: Dispatch<SetStateAction<OrderPrice>>;
    getValues: UseFormGetValues<PaymentReserve>;
}) => {
    const accumulationAmount = useRef<HTMLInputElement>(null);

    return (
        <DiscountApplyContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>할인 쿠폰</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        inputWidth='75%'
                        disabled={true}
                        value={paymentInfo?.cartCouponAmt || 0}
                    />
                    <SheetButton
                        width='20.4%'
                        onClick={() => setIsCouponListModal((prev) => !prev)}
                    >
                        적용
                    </SheetButton>
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>적립금</SheetInputTitleBox>
                <SheetInputBox>
                    <AccumulationAmountBox boxWidth='75%'>
                        <SheetTextInput
                            inputWidth='100%'
                            ref={accumulationAmount}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value
                                    .replace(/[^0-9.]/g, '')
                                    .replace(/(\..*)\./g, '$1');
                            }}
                        />
                        <p>
                            사용 가능 적립금:{' '}
                            {paymentInfo?.availableMaxAccumulationAmt}
                        </p>
                    </AccumulationAmountBox>
                    <SheetButton
                        width='20.4%'
                        onClick={(e) => {
                            if (!accumulationAmount.current?.value) {
                                return alert('포인트를 입력해주세요');
                            }
                            if (
                                paymentInfo?.availableMaxAccumulationAmt! <
                                Number(accumulationAmount.current?.value)
                            ) {
                                return alert(
                                    '사용 가능한 포인트를 초과하였습니다.',
                                );
                            }
                            setValue(
                                'subPayAmt',
                                Number(accumulationAmount.current?.value),
                            );
                            setOrderPriceData((prev) => {
                                prev.accumulationAmount = {
                                    name: '적립금 사용금액',
                                    price: `- ${getValues('subPayAmt')}`,
                                };

                                return { ...prev };
                            });
                        }}
                    >
                        사용
                    </SheetButton>
                </SheetInputBox>
            </SheetInputWrapper>
        </DiscountApplyContainer>
    );
};

export default DiscountApply;
