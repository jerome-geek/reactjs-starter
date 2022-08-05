import styled from 'styled-components';
import {
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SingleValue, StylesConfig } from 'react-select';

import SelectBox, { customStyle } from 'components/Common/SelectBox';
import { PaymentReserve } from 'models/order';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square.svg';

const OrdererInformationContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    display: flex;
    flex-direction: column;
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
    align-items: center;
    color: ${(props) => props.theme.text1};
    > #defaultAddress {
        display: none;
    }
    > label {
        display: flex;
        align-items: center;
        cursor: pointer;
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
    border: 1px solid #ddd;
    &::placeholder {
        color: #a8a8a8;
    }
    &:focus {
        border: 1px solid red;
    }
`;

const SheetButton = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #222943;
    margin-bottom: 10px;
    cursor: pointer;
`;

const OrdererInformation = ({
    register,
    setValue,
    getValues,
    ordererInformation,
    setIsSearchAddressModal,
}: {
    register: UseFormRegister<PaymentReserve>;
    setValue: UseFormSetValue<PaymentReserve>;
    getValues: UseFormGetValues<PaymentReserve>;
    ordererInformation?: {
        receiverName: string;
        receiverContact1: string;
    };
    setIsSearchAddressModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [directInput, setDirectInput] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(false);

    const deliveryMemo = [
        { label: '배송 전에 미리 연락바랍니다.' },
        { label: '집 앞에 놔주세요.' },
        { label: '경비실에 맡겨주세요.' },
        { label: '부재 시 집앞에 놔주세요.' },
        { label: '부재 시 경비실에 맡겨주세요.' },
        {
            label: '직접 입력',
            directInput: true,
        },
    ];

    useEffect(() => {
        if (ordererInformation) {
            setValue(
                'shippingAddress.receiverName',
                ordererInformation?.receiverName,
            );
            setValue(
                'shippingAddress.receiverContact1',
                ordererInformation.receiverContact1,
            );
        }
    }, [ordererInformation, setValue]);

    useEffect(() => {
        setValue('useDefaultAddress', defaultAddress);
    }, [defaultAddress, setValue]);

    return (
        <OrdererInformationContainer>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>수령인 이름</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='이름을 입력하세요.'
                        type={'text'}
                        {...register('shippingAddress.receiverName')}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>휴대폰 번호</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        placeholder='휴대폰 번호 &lsquo;-&lsquo;제외하고 입력해 주세요.'
                        type={'text'}
                        {...register('shippingAddress.receiverContact1')}
                    />
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>주소검색</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        inputWidth='75%'
                        placeholder='예) 테헤란로 108길 23'
                        type={'text'}
                        {...(getValues('shippingAddress.receiverAddress')
                            ? { ...register('shippingAddress.receiverAddress') }
                            : {
                                  ...register(
                                      'shippingAddress.receiverJibunAddress',
                                  ),
                              })}
                    />
                    <SheetButton
                        width='20.4%'
                        onClick={() => {
                            setIsSearchAddressModal((prev) => !prev);
                        }}
                    >
                        검색
                    </SheetButton>
                    <SheetTextInput
                        placeholder='상세 주소 입력'
                        type={'text'}
                        {...register('shippingAddress.receiverDetailAddress')}
                    />
                    <input
                        type='checkbox'
                        id='defaultAddress'
                        onChange={() => {
                            setDefaultAddress((prev) => !prev);
                        }}
                        checked={defaultAddress}
                    />
                    <label htmlFor='defaultAddress'>
                        {defaultAddress ? <Checked /> : <UnChecked />}
                        <p>기본 배송지로 설정</p>
                    </label>
                </SheetInputBox>
            </SheetInputWrapper>
            <SheetInputWrapper>
                <SheetInputTitleBox>
                    <p>택배사 요청 사항</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    {directInput ? (
                        <SheetTextInput
                            placeholder='직접 입력'
                            type={'text'}
                            {...register('deliveryMemo')}
                        />
                    ) : (
                        <SelectBox<{
                            label: string;
                            directInput: boolean;
                        }>
                            styles={{
                                ...(customStyle as StylesConfig<
                                    Partial<{
                                        label: string;
                                        directInput: boolean;
                                    }>,
                                    false
                                >),
                                container: (provided: any) => ({
                                    ...provided,
                                    marginBottom: '10px',
                                    boxSizing: 'border-box',
                                    width: '100%',
                                }),
                                control: (
                                    provided: any,
                                    { menuIsOpen }: { menuIsOpen: boolean },
                                ) => ({
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    border: '2px solid #DBDBDB',
                                    borderBottom: menuIsOpen ? 'none' : '',
                                    display: 'flex',
                                    height: '44px',
                                    paddingLeft: '5px',
                                    cursor: 'pointer',
                                }),
                                option: () => ({
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    borderLeft: '2px solid #DBDBDB',
                                    background: '#fff',
                                    padding: '15px 20px',
                                    paddingLeft: '20px',
                                    color: '#191919',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderLeft: '2px solid #c00020',
                                        background: '#F0EFF4',
                                        fontWeight: 'bold',
                                    },
                                }),
                            }}
                            placeHolder='택배 요청 사항을 선택해 주세요.'
                            options={deliveryMemo}
                            onChange={(
                                selectedOption: SingleValue<
                                    Partial<{
                                        label: string;
                                        directInput: boolean;
                                    }>
                                >,
                            ) => {
                                if (selectedOption?.directInput) {
                                    setDirectInput(true);
                                } else {
                                    setDirectInput(false);
                                    setValue(
                                        'deliveryMemo',
                                        selectedOption?.label,
                                    );
                                }
                            }}
                        />
                    )}
                </SheetInputBox>
            </SheetInputWrapper>
        </OrdererInformationContainer>
    );
};

export default OrdererInformation;
