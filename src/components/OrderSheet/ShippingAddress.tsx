import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SingleValue, StylesConfig } from 'react-select';
import { shallowEqual } from 'react-redux';
import {
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { useWindowSize } from 'usehooks-ts';

import SelectBox, { customStyle } from 'components/Common/SelectBox';
import { PaymentReserve } from 'models/order';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square_unchecked.svg';
import { useTypedSelector } from 'state/reducers';
import { sheetInputStyle } from 'styles/componentStyle';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';

const OrdererInformationContainer = styled.div`
    ${sheetInputStyle.informationContainer}
`;

const SheetInputWrapper = styled.div`
    ${sheetInputStyle.sheetInputWrapper}
`;

const SheetInputTitleBox = styled.div`
    ${sheetInputStyle.sheetInputTitleBox}
`;

const SheetInputBox = styled.div`
    ${sheetInputStyle.sheetInputBox};
`;

const CheckBox = styled.label`
    display: flex;
    align-items: center;
    ${media.medium} {
        margin-top: 12px;
        > p {
            margin-left: 7px;
            color: ${(props) => props.theme.text2};
        }
    }
`;

const SheetTextInput = styled.input<{ inputWidth?: string }>`
    ${sheetInputStyle.sheetTextInput}
    width: ${(props: { inputWidth?: string }) =>
        props.inputWidth ? props.inputWidth : '100%'};
    &:first-child {
        margin-bottom: 12px;
    }
    ${media.medium} {
        min-height: 54px;
        &:first-child {
            width: ${(props: { inputWidth?: string }) =>
                props.inputWidth ? props.inputWidth : '100%'};
        }
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
    ${media.medium} {
        width: 27.1%;
        min-height: 54px;
        line-height: 54px;
    }
`;

const OrdererInformation = ({
    register,
    setValue,
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

    const { width } = useWindowSize();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

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
                        {...register('shippingAddress.receiverName', {
                            required: {
                                value: true,
                                message: '이름을 입력해주세요.',
                            },
                        })}
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
                        {...register('shippingAddress.receiverContact1', {
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
                <SheetInputTitleBox>
                    <p>주소검색</p>
                </SheetInputTitleBox>
                <SheetInputBox>
                    <SheetTextInput
                        inputWidth='71%'
                        placeholder='예) 테헤란로 108길 23'
                        type={'text'}
                        disabled={true}
                        {...register('shippingAddress.receiverAddress')}
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
                        {...register('shippingAddress.receiverDetailAddress', {
                            required: {
                                value: true,
                                message: '상세 주소를 입력해주세요',
                            },
                        })}
                    />
                    <input
                        type='hidden'
                        id='defaultAddress'
                        onChange={() => {
                            setDefaultAddress((prev) => !prev);
                        }}
                        checked={defaultAddress}
                    />
                    {member && (
                        <CheckBox htmlFor='defaultAddress'>
                            {defaultAddress ? <Checked /> : <UnChecked />}
                            <p>기본 배송지로 설정</p>
                        </CheckBox>
                    )}
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
                                    marginBottom: `${
                                        isMobile(width) ? '0' : '10px'
                                    }`,
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
