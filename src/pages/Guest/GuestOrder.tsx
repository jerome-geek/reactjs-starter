import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';

import Button from 'components/Button/Button';
import StyledInput from 'components/Input/StyledInput';
import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import SEOHelmet from 'components/shared/SEOHelmet';
import { guestOrder } from 'api/order';
import { ORDER_REQUEST_TYPE } from 'models';

const Title = styled.h1`
    font-size: 36px;
    color: #191919;
    letter-spacing: -1.8px;
    line-height: 54px;
`;

const Desc = styled.p`
    color: #858585;
    line-height: 24px;
`;

const InputContainer = styled.div`
    margin-bottom: 20px;
    width: 100%;
`;

const GuestOrder = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ guestOrderNo: string; guestPassword: string }>();

    const onSubmit = handleSubmit(async ({ guestOrderNo, guestPassword }) => {
        // TODO: 비회원 주문 토큰 발급 후 LocalStorage에 저장한 뒤 주문 상세페이지로 이동
        try {
            const response = await guestOrder.issueOrderToken(guestOrderNo, {
                orderRequestType: ORDER_REQUEST_TYPE.ALL,
                password: guestPassword,
            });
            navigate(`/guest/order/detail/${guestOrderNo}`);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <>
            <SEOHelmet data={{ title: '비회원 주문조회' }} />

            <Header />

            <LayoutResponsive type='small' style={{ padding: '10rem 0' }}>
                <Title
                    style={{
                        marginBottom: '30px',
                    }}
                >
                    비회원 주문 조회
                </Title>

                <Desc
                    style={{
                        marginBottom: '34px',
                    }}
                >
                    메일로 발송된 주문서의 주문번호와 <br /> 주문 시 입력한
                    비밀번호를 입력해주세요
                </Desc>

                <form onSubmit={onSubmit}>
                    <div
                        style={{
                            padding: '20px 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <InputContainer>
                            <StyledInput
                                type='text'
                                placeholder='주문번호를 입력해주세요.'
                                border='1px solid #DBDBDB'
                                style={{
                                    width: '100%',
                                    padding: '10px 20px',
                                }}
                                {...register('guestOrderNo', {
                                    required: {
                                        value: true,
                                        message: '주문번호를 입력해주세요',
                                    },
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name='guestOrderNo'
                                render={({ message }) => <p>{message}</p>}
                            />
                        </InputContainer>

                        <InputContainer>
                            <StyledInput
                                type='password'
                                placeholder='비밀번호를 입력해주세요'
                                border='1px solid #DBDBDB'
                                style={{
                                    width: '100%',
                                    padding: '10px 20px',
                                }}
                                {...register('guestPassword', {
                                    required: {
                                        value: true,
                                        message: '비밀번호를 입력해주세요',
                                    },
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name='guestPassword'
                                render={({ message }) => <p>{message}</p>}
                            />
                        </InputContainer>
                    </div>

                    <Button
                        buttonType='primary'
                        style={{ marginBottom: '50px' }}
                    >
                        조회하기
                    </Button>
                </form>
            </LayoutResponsive>
        </>
    );
};

export default GuestOrder;
