import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { pipe, filter, head } from '@fxts/core';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { DevTool } from '@hookform/devtools';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledInput from 'components/Input/StyledInput';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { flex } from 'utils/styles/mixin';
import { useMall } from 'hooks';
import { ReactComponent as DropDownIcon } from 'assets/icons/arrow_drop_down.svg';

interface ClaimLocation {
    imageUrl: string;
    optionName: string;
    optionNo: number;
    orderCnt: number;
    productName: string;
    productNo: number;
}

const ClaimContainer = styled(LayoutResponsive)`
    max-width: 840px;
    text-align: left;
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -1.2px;
    margin-bottom: 18px;
`;

const ProductContainer = styled.div`
    ${flex}
    margin-bottom: 30px;
`;

const ImageContainer = styled.div`
    padding: 0 28px;
    margin: 30px 0;
`;

const ProductInfoContainer = styled.div`
    border-left: 1px solid #dbdbdb;
    max-height: 80px;
    padding: 28px;
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.h3`
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
    color: #191919;
`;

const Option = styled.p`
    font-size: 10px;
    letter-spacing: 0;
    color: #a8a8a8;
`;

const SelectboxContainer = styled.div`
    ${flex};

    width: 100%;
    background-color: #f8f8fa;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    padding: 20px 0;

    p {
        font-size: 16px;
        letter-spacing: -0.64px;
        color: #191919;
        margin-right: 20px;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 20px;

    h3 {
        margin-bottom: 10px;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0;
        color: #191919;
    }
`;

const TitleInput = styled(StyledInput)`
    width: 100%;
    max-height: 44px;
    padding: 10px;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    resize: none;
    min-height: 156px;
    padding: 10px;

    &:focus {
        border: ${(props) => `1px solid ${props.theme.line1}`};
    }
`;

const SubmitButton = styled(PrimaryButton).attrs({ type: 'submit' })`
    ${flex};

    padding: 10px 0;
    margin: 0 auto;
`;

const Claim = () => {
    const { type } = useParams() as { type: string };
    const location = useLocation() as {
        state: ClaimLocation;
    };

    // 상품문의는 별도로 처리해주어야함
    const claimList = useMemo(
        () => [
            {
                type: 'inquiry',
                title: '상품문의',
                selectBoxTitle: '문의 유형',
                placeholder: '문의 유형을 선택해주세요.',
            },
            {
                type: 'exchange',
                title: '교환 신청',
                selectBoxTitle: '교환 사유',
                placeholder: '교환 신청 유형을 선택해주세요.',
            },
            {
                type: 'return',
                title: '반품 신청',
                selectBoxTitle: '반품 사유',
                placeholder: '반품 신청 유형을 선택해주세요.',
            },
            {
                type: 'refund',
                title: '환불/취소',
                selectBoxTitle: '취소 사유',
                placeholder: '취소 신청 유형을 선택해주세요.',
            },
        ],
        [],
    );

    const currentClaim = useMemo(
        () =>
            pipe(
                claimList,
                filter((a) => a.type === type),
                head,
            ),
        [claimList, type],
    );

    const { mallInfo } = useMall();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async ({ type, title, content }) => {
        console.log('🚀 ~ file: Claim.tsx ~ line 140 ~ onSubmit ~ type', type);
    });

    return (
        <ClaimContainer>
            <DevTool control={control} placement='top-right' />

            {currentClaim && (
                <>
                    <Title>{currentClaim.title}</Title>

                    <ProductContainer>
                        <ImageContainer>
                            <img
                                src={location.state.imageUrl}
                                alt={location.state.productName}
                                width='150'
                                height='150'
                            />
                        </ImageContainer>
                        <ProductInfoContainer>
                            <ProductName>
                                {location.state.productName}
                            </ProductName>
                            <Option>{`${location.state.optionName} ${location.state.orderCnt}개`}</Option>
                        </ProductInfoContainer>
                    </ProductContainer>

                    <form onSubmit={onSubmit}>
                        <SelectboxContainer>
                            <p>{currentClaim.selectBoxTitle}</p>
                            <div>
                                <Controller
                                    control={control}
                                    name='type'
                                    rules={{
                                        required: {
                                            value: true,
                                            message: '유형을 선택해주세요.',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isSearchable={false}
                                            options={mallInfo?.claimReasonType}
                                            placeholder={
                                                currentClaim.placeholder
                                            }
                                            components={{
                                                DropdownIndicator: (
                                                    props: DropdownIndicatorProps,
                                                ) => (
                                                    <components.DropdownIndicator
                                                        {...props}
                                                    >
                                                        <DropDownIcon />
                                                    </components.DropdownIndicator>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </SelectboxContainer>
                        <ErrorMessage
                            errors={errors}
                            name='type'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />

                        {type === 'inquiry' && (
                            <InputContainer>
                                <h3>제목</h3>
                                <TitleInput
                                    {...register('title', {
                                        required: {
                                            value: type === 'inquiry',
                                            message: '제목을 입력해주세요.',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='title'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </InputContainer>
                        )}

                        <InputContainer>
                            <h3>내용</h3>
                            <StyledTextArea
                                {...register('content', {
                                    required: {
                                        value: true,
                                        message: '내용을 입력해주세요.',
                                    },
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name='content'
                                render={({ message }) => (
                                    <StyledErrorMessage>
                                        {message}
                                    </StyledErrorMessage>
                                )}
                            />
                        </InputContainer>

                        <SubmitButton>신청 하기</SubmitButton>
                    </form>
                </>
            )}
        </ClaimContainer>
    );
};

export default Claim;
