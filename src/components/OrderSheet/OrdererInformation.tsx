import styled, { DefaultTheme, ThemeProps } from 'styled-components';
import { UseFormRegister } from 'react-hook-form';

import { PaymentReserve } from 'models/order';
import { sheetInputStyle } from 'styles/componentStyle';

const SheetInputWrapper = styled.div`
    ${sheetInputStyle.sheetInputWrapper}
`;

const SheetInputTitleBox = styled.div`
    ${sheetInputStyle.sheetInputTitleBox}
`;

const SheetInputBox = styled.div<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetInputBox}
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetTextInput}
    width: ${(props: { inputWidth?: string }) =>
        props.inputWidth ? props.inputWidth : '100%'};
`;

const OrdererInformationContainer = styled.div`
    ${sheetInputStyle.informationContainer}
`;

const OrdererInformation = ({
    register,
}: {
    register: UseFormRegister<PaymentReserve>;
}) => {
    return (
        <OrdererInformationContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>이름</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='이름을 입력하세요.'
                        type={'text'}
                        {...register('orderer.ordererName', {
                            required: {
                                value: true,
                                message: '이름을 입력해주세요',
                            },
                        })}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>전화번호</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='휴대폰 번호 &lsquo;-&lsquo;제외하고 입력해 주세요.'
                        type={'text'}
                        {...register('orderer.ordererContact1', {
                            required: {
                                value: true,
                                message: '휴대폰 번호를 입력해주세요',
                            },
                            pattern:
                                /^[0-9]+$/ ||
                                '휴대폰 번호는 숫자를 입력해주세요',
                        })}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>이메일</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='이메일을 입력해주세요.'
                        type={'text'}
                        {...register('orderer.ordererEmail', {
                            required: {
                                value: true,
                                message: '이메일을 입력해주세요',
                            },
                        })}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
        </OrdererInformationContainer>
    );
};

export default OrdererInformation;
