import { Dispatch, SetStateAction, useRef } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import { PaymentInfo, PaymentReserve } from 'models/order';
import { OrderPrice } from 'pages/Cart/Cart';
import { sheetInputStyle } from 'styles/componentStyle';
import { isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';

const DiscountApplyContainer = styled.div`
    ${sheetInputStyle.informationContainer}
`;

const SheetInputWrapper = styled.div`
    ${sheetInputStyle.sheetInputWrapper}
`;

const SheetInputTitleBox = styled.div`
    ${sheetInputStyle.sheetInputTitleBox}
`;

const SheetInputBox = styled.div`
    ${sheetInputStyle.sheetInputBox}
    color: ${(props) => props.theme.text1};
    ${media.medium} {
        align-items: flex-start;
    }
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
    ${media.medium} {
        width: 71%;
        > p {
            margin-top: 10px;
        }
    }
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetTextInput}
    border: none;
    width: ${(props) => (props.inputWidth ? props.inputWidth : '100%')};
    background: ${(props) => props.theme.bg2};
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
    ${media.medium} {
        height: 54px;
        line-height: 54px;
        margin-bottom: 0;
        width: 27.1%;
    }
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
    const { width } = useWindowSize();

    const accumulationAmount = useRef<HTMLInputElement>(null);

    const { t: sheet } = useTranslation('orderSheet');

    const applyAccumulationHandler = () => {
        if (!accumulationAmount.current?.value) {
            return alert(sheet('alert.inputPoint'));
        }
        if (
            paymentInfo?.availableMaxAccumulationAmt! <
            Number(accumulationAmount.current?.value)
        ) {
            return alert(sheet('alert.exceedPoint'));
        }
        setValue('subPayAmt', Number(accumulationAmount.current?.value));
        setOrderPriceData((prev) => {
            prev.accumulationAmount = {
                name: sheet('paymentInformation.category.accumulationDiscount'),
                price: `- ${getValues('subPayAmt')}`,
            };

            return { ...prev };
        });
    };

    return (
        <DiscountApplyContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    {sheet('applyDiscount.category.coupon')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        inputWidth={isMobile(width) ? '71%' : '75%'}
                        disabled={true}
                        value={paymentInfo?.cartCouponAmt || 0}
                    />
                    <SheetButton
                        width='20.4%'
                        onClick={() => setIsCouponListModal((prev) => !prev)}
                    >
                        {sheet('applyDiscount.applyCoupon')}
                    </SheetButton>
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    {sheet('applyDiscount.category.accumulation')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <AccumulationAmountBox boxWidth='75%'>
                        <SheetTextInput
                            inputWidth={isMobile(width) ? '100%' : '75%'}
                            ref={accumulationAmount}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value
                                    .replace(/[^0-9.]/g, '')
                                    .replace(/(\..*)\./g, '$1');
                            }}
                            defaultValue={0}
                        />
                        <p>
                            {sheet('applyDiscount.availableAccumulation')}:{' '}
                            {paymentInfo?.availableMaxAccumulationAmt}
                        </p>
                    </AccumulationAmountBox>
                    <SheetButton
                        width='20.4%'
                        onClick={() => applyAccumulationHandler()}
                    >
                        {sheet('applyDiscount.useAccumulation')}
                    </SheetButton>
                </SheetInputBox>
            </SheetInputWrapper>
        </DiscountApplyContainer>
    );
};

export default DiscountApply;
