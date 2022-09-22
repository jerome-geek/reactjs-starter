import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
    const { t: sheet } = useTranslation('orderSheet');

    return (
        <OrdererInformationContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    {sheet('ordererInformation.category.name')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={sheet(
                            'ordererInformation.category.placeholder.name',
                        )}
                        type={'text'}
                        {...register('orderer.ordererName', {
                            required: {
                                value: true,
                                message: sheet('alert.inputName'),
                            },
                        })}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    {sheet('ordererInformation.category.phoneNumber')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={sheet(
                            'ordererInformation.category.placeholder.phoneNumber',
                        )}
                        type={'text'}
                        {...register('orderer.ordererContact1', {
                            required: {
                                value: true,
                                message: sheet('alert.inputPhoneNumber'),
                            },
                        })}
                        onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1');
                        }}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    {sheet('ordererInformation.category.eMail')}
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder={sheet(
                            'ordererInformation.category.placeholder.email',
                        )}
                        type={'text'}
                        {...register('orderer.ordererEmail', {
                            required: {
                                value: true,
                                message: sheet('alert.inputEmail'),
                            },
                        })}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
        </OrdererInformationContainer>
    );
};

export default OrdererInformation;
