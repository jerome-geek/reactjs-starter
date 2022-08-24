import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import StyledInput from 'components/Input/StyledInput';
import Button from 'components/Common/Button';

const GuestLoginWrapper = styled(LayoutResponsive)`
    margin-top: 150px;
`;

const GuestLoginTitle = styled.h1`
    font-size: 36px;
    line-height: 54px;
    letter-spacing: -1.8px;
    color: #191919;
    margin-bottom: 30px;
`;

const GuestLoginDescription = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #858585;
    margin-bottom: 54px;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const GuestLoginInput = styled(StyledInput)`
    width: 100%;
    padding: 10px 20px;
    border: 1px solid #dbdbdb;
`;

interface GuestLoginFormData {
    guestOrderNo: string;
    guestPassword: string;
}

const GuestLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GuestLoginFormData>();

    const onSubmit = handleSubmit(
        async ({ guestOrderNo, guestPassword }) => {},
    );

    return (
        <>
            <Header />
            <GuestLoginWrapper type='small'>
                <GuestLoginTitle>비회원 주문 조회</GuestLoginTitle>
                <GuestLoginDescription>
                    메일로 발송된 주문서의 주문번호와
                    <br />
                    주문시 입력한 비밀번호를 입력해주세요.
                </GuestLoginDescription>

                <FlexContainer as={'form'} onSubmit={onSubmit}>
                    <div style={{ marginBottom: '20px' }}>
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
                            render={({ message }) => <p>{message}</p>}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
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
                            render={({ message }) => <p>{message}</p>}
                        />
                    </div>

                    <Button>조회하기</Button>
                </FlexContainer>
            </GuestLoginWrapper>
        </>
    );
};

export default GuestLogin;
