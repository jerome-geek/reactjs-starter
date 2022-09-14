import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWindowSize } from 'usehooks-ts';

import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import StyledInput from 'components/Input/StyledInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import media from 'utils/styles/media';
import { isDesktop } from 'utils/styles/responsive';
import { guestOrder } from 'api/order';
import { ORDER_REQUEST_TYPE } from 'models';
import { ReactComponent as VCLogo } from 'assets/logo/vc.svg';

interface GuestLoginFormData {
    guestOrderNo: string;
    guestPassword: string;
}

const GuestLoginContainer = styled.div`
    width: 440px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 10rem 0;

    ${media.medium} {
        width: calc(100% - 4rem);
        padding: 44px 0 160px 0;
    }
`;

const GuestLoginTitle = styled.h1`
    font-size: 2.25rem;
    line-height: 54px;
    letter-spacing: -1.8px;
    color: #191919;
    margin-bottom: 30px;

    ${media.medium} {
        text-align: left;
        line-height: 12px;
        margin-bottom: 22px;
    }
`;

const GuestLoginDescription = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #858585;
    margin-bottom: 54px;

    ${media.medium} {
        color: #191919;
        letter-spacing: -1px;
        text-align: left;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 62px;
    }
`;

const FlexFormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const GuestLoginInputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const GuestLoginInput = styled(StyledInput)`
    width: 100%;
    padding: 10px 20px;
    border: 1px solid #dbdbdb;
`;

const SubmitButton = styled(PrimaryButton).attrs({ type: 'submit' })`
    width: 100%;
`;

const GuestLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GuestLoginFormData>();

    const { width } = useWindowSize();

    const onSubmit = handleSubmit(async ({ guestOrderNo, guestPassword }) => {
        await guestOrder
            .issueOrderToken(guestOrderNo, {
                password: guestPassword,
                orderRequestType: ORDER_REQUEST_TYPE.ALL,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(
                    '🚀 ~ file: GuestLogin.tsx ~ line 106 ~ .then ~ err',
                    err,
                );
            });
    });

    return (
        <>
            {isDesktop(width) ? (
                <Header />
            ) : (
                <MobileHeader title={'비회원 주문 조회'} />
            )}
            g
            <GuestLoginContainer>
                <GuestLoginTitle>
                    {isDesktop(width) ? '비회원 주문 조회' : <VCLogo />}
                </GuestLoginTitle>
                <GuestLoginDescription>
                    메일로 발송된 주문서의 주문번호와
                    <br />
                    주문시 입력한 비밀번호를 입력해주세요.
                </GuestLoginDescription>

                <FlexFormContainer onSubmit={onSubmit}>
                    <GuestLoginInputContainer>
                        <GuestLoginInput
                            type='text'
                            placeholder='주문번호를 입력해주세요.'
                            {...register('guestOrderNo', {
                                required: {
                                    value: true,
                                    message: '주문번호를 입력해주세요.',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='guestOrderNo'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </GuestLoginInputContainer>
                    <GuestLoginInputContainer>
                        <GuestLoginInput
                            type='text'
                            placeholder='비밀번호를 입력해주세요.'
                            {...register('guestPassword', {
                                required: {
                                    value: true,
                                    message: '비밀번호를 입력해주세요.',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='guestPassword'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </GuestLoginInputContainer>

                    <SubmitButton>조회하기</SubmitButton>
                </FlexFormContainer>
            </GuestLoginContainer>
        </>
    );
};

export default GuestLogin;
