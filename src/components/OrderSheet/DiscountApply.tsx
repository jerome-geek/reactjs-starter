import { FC } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import StyledInput from 'components/Input/StyledInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import { PaymentInfo, PaymentReserve } from 'models/order';
import media from 'utils/styles/media';

interface DiscounApplyProps {
    paymentInfo?: PaymentInfo;
    subPayAmt: number;
    setValue?: UseFormSetValue<PaymentReserve>;
    onCouponModalClick: () => void;
    onAccumulationButtonClick: () => void;
}

const DiscountApplyContainer = styled.div`
    margin-bottom: 60px;
`;

const DiscountApplyTitle = styled.h3`
    font-size: 24px;
    letter-spacing: -1.2px;
    line-height: 36px;
    font-weight: bold;
    color: #191919;
    margin-bottom: 20px;

    ${media.medium} {
        font-size: 18px;
        letter-spacing: -0.72px;
    }
`;

const DiscountContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    padding: 30px 0;

    ${media.medium} {
        padding: 20px 0;
    }
`;

const DiscountContentContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid #dbdbdb;
    text-align: left;
    min-height: 104px;

    ${media.medium} {
        flex-direction: column;
        align-items: baseline;
    }

    &:last-child {
        border-bottom: none;
    }
`;

const DiscountContentTitle = styled.p`
    font-size: 1rem;
    letter-spacing: 0;
    line-height: 24px;
    color: #191919;
    padding-right: 120px;
    margin-bottom: 0px;

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        text-align: left;
        margin-bottom: 12px;
    }
`;

const DiscountInputContainer = styled.div`
    display: flex;
    color: ${(props) => props.theme.text1};
    margin-right: 20px;
    flex-direction: column;

    ${media.medium} {
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        margin-right: 4px;
    }
`;

const AccumulationAmountBox = styled.div<{ boxWidth?: string }>`
    width: ${(props) => (props.boxWidth ? props.boxWidth : '100%')};
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-bottom: 10px;
`;

const DiscountInput = styled(StyledInput)`
    border: none;
    background: ${(props) => props.theme.bg2};
    padding: 15px 20px;
    margin-right: 20px;

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;
        color: #a8a8a8;
        letter-spacing: -0.64px;
    }
`;

const ApplyButton = styled(PrimaryButton).attrs({ type: 'button' })`
    width: auto;
    max-width: 100px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
`;

const AccumulationDescription = styled.p`
    letter-spacing: 0px;
    color: #8f8f8f;
    font-size: 12px;
`;

const DiscountApply: FC<DiscounApplyProps> = ({
    paymentInfo,
    subPayAmt,
    setValue,
    onCouponModalClick,
    onAccumulationButtonClick,
}) => {
    const { t: orderSheet } = useTranslation('orderSheet');

    const onDiscountChange = (value: string | number) => {
        if (setValue) {
            setValue('subPayAmt', Number(value));
        }
    };

    return (
        <DiscountApplyContainer>
            <DiscountApplyTitle>
                {orderSheet('applyDiscount.title')}
            </DiscountApplyTitle>

            <DiscountContainer>
                <DiscountContentContainer>
                    <DiscountContentTitle>
                        {orderSheet('applyDiscount.category.coupon')}
                    </DiscountContentTitle>
                    <DiscountInputContainer>
                        <AccumulationAmountBox>
                            <DiscountInput
                                readOnly
                                value={paymentInfo?.cartCouponAmt || ''}
                            />
                            <ApplyButton onClick={() => onCouponModalClick()}>
                                {orderSheet('applyDiscount.applyCoupon')}
                            </ApplyButton>
                        </AccumulationAmountBox>
                    </DiscountInputContainer>
                </DiscountContentContainer>

                <DiscountContentContainer>
                    <DiscountContentTitle>
                        {orderSheet('applyDiscount.category.accumulation')}
                    </DiscountContentTitle>
                    <DiscountInputContainer>
                        <AccumulationAmountBox>
                            <DiscountInput
                                onChange={(e) =>
                                    onDiscountChange(e.currentTarget.value)
                                }
                                value={subPayAmt || 0}
                            />
                            <ApplyButton
                                onClick={() => onAccumulationButtonClick()}
                            >
                                {orderSheet('applyDiscount.useAccumulation')}
                            </ApplyButton>
                        </AccumulationAmountBox>
                        <AccumulationDescription>
                            {`${orderSheet(
                                'applyDiscount.availableAccumulation',
                            )} : ${paymentInfo?.availableMaxAccumulationAmt} `}
                        </AccumulationDescription>
                    </DiscountInputContainer>
                </DiscountContentContainer>
            </DiscountContainer>
        </DiscountApplyContainer>
    );
};

export default DiscountApply;
