import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useRef } from 'react';
import styled from 'styled-components';

import { PaymentReserve } from 'models/order';

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
    padding: 40px 0 40px 41px;
    display: flex;
    flex-direction: column;
`;

const SheetInputBox = styled.div<{ inputWidth?: string }>`
    width: 440px;
    padding-top: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    color: ${(props) => props.theme.text1};
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    letter-spacing: -0.64px;
    font-weight: 400;
    height: 44px;
    width: ${(props) => (props.inputWidth ? props.inputWidth : '100%')};
    padding: 0 20px;
    min-height: 44px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    &::placeholder {
        color: #a8a8a8;
    }
    &:focus {
        border: 1px solid red;
    }
`;

const OrdererInformationContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    display: flex;
    flex-direction: column;
`;

const OrdererInformation = ({
    register,
    errors,
}: {
    register: UseFormRegister<PaymentReserve>;
    errors: FieldErrors<PaymentReserve>;
}) => {
    const checkTempPassword = useRef<HTMLInputElement>(null);

    return (
        <OrdererInformationContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>비밀번호</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='비밀번호를 입력해주세요'
                        type={'password'}
                        {...register('tempPassword', {
                            required: {
                                value: true,
                                message: '비밀번호를 입력해주세요',
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
                <SheetInputTitleBox>비밀번호 확인</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='비밀번호 확인'
                        type={'password'}
                        ref={checkTempPassword}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
        </OrdererInformationContainer>
    );
};

export default OrdererInformation;
