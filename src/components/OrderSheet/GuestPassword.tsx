import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useRef } from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import { PaymentReserve } from 'models/order';
import { isMobile } from 'utils/styles/responsive';
import { sheetInputStyle } from 'styles/componentStyle';
import media from 'utils/styles/media';

const OrdererInformationContainer = styled.div`
    ${sheetInputStyle.informationContainer}
    ${media.medium} {
        padding-bottom: 8px;
    }
`;

const SheetInputWrapper = styled.div`
    ${sheetInputStyle.sheetInputWrapper}
    .order-info {
        color: #8f8f8f;
        margin: 20px 0 0 10px;
        > input {
            display: none;
        }
        > label {
            display: flex;
            align-items: center;
            cursor: pointer;
            > p {
                margin-left: 9px;
            }
        }
    }
    ${media.medium} {
        margin-bottom: 12px;
        .order-info {
            font-size: 1rem;
        }
    }
    ${media.small} {
        margin-bottom: 12px;
        .order-info {
            font-size: 1.4rem;
        }
    }
`;

const SheetInputTitleBox = styled.div`
    ${sheetInputStyle.sheetInputTitleBox}
    ${media.medium} {
        padding: 12px 0 12px 10px;
    }
`;

const SheetInputBox = styled.div<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetInputBox}
    ${media.medium} {
    }
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetTextInput}
    width: 100%;
`;

const GuestPassword = ({
    register,
    errors,
}: {
    register: UseFormRegister<PaymentReserve>;
    errors: FieldErrors<PaymentReserve>;
}) => {
    const checkTempPassword = useRef<HTMLInputElement>(null);

    const { width } = useWindowSize();

    const { t: sheet } = useTranslation('orderSheet');

    return (
        <OrdererInformationContainer>
            <SheetInputWrapper>
                {isMobile(width) && (
                    <div className='order-info'>
                        {sheet('guestPassword.desc')}
                    </div>
                )}
                <SheetInputTitleBox>
                    {sheet('guestPassword.category.password')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={sheet(
                            'guestPassword.category.placeholder.password',
                        )}
                        type={'password'}
                        {...register('tempPassword', {
                            required: {
                                value: true,
                                message: sheet('alert.inputPassword'),
                            },
                            validate: {
                                matchPassword: (tempPassword) => {
                                    return (
                                        checkTempPassword.current?.value ===
                                            tempPassword ||
                                        '비밀번호가 일치하지 않습니다.'
                                    );
                                },
                            },
                        })}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                {!isMobile(width) && (
                    <SheetInputTitleBox>
                        {sheet('guestPassword.category.checkPassword')}
                    </SheetInputTitleBox>
                )}
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={sheet(
                            'guestPassword.category.placeholder.checkPassword',
                        )}
                        type={'password'}
                        ref={checkTempPassword}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
        </OrdererInformationContainer>
    );
};

export default GuestPassword;
