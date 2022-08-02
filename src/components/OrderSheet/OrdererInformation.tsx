import styled from 'styled-components';

import { PaymentReserve } from 'models/order';
import { UseFormRegister } from 'react-hook-form';

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
                        {...register('orderer.ordererName')}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>전화번호</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='휴대폰 번호 &lsquo;-&lsquo;제외하고 입력해 주세요.'
                        type={'text'}
                        {...register('orderer.ordererContact1')}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>이메일</SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='이메일을 입력해주세요.'
                        type={'text'}
                        {...register('orderer.ordererEmail')}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
        </OrdererInformationContainer>
    );
};

export default OrdererInformation;
