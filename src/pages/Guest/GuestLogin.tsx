import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import Button from 'components/Common/Button';
import StyledInput from 'components/Input/StyledInput';
import Header from 'components/shared/Header';
import { guestOrder } from 'api/order';
import { ORDER_REQUEST_TYPE } from 'models';

const GuestLogin = () => {
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
            <Header />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '20px',
                }}
            >
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                    }}
                >
                    비회원 주문 조회
                </h1>

                <p style={{ fontWeight: 'bold' }}>
                    메일로 발송된 주문서의 주문번호와 <br /> 주문 시 입력한
                    비밀번호를 입력해주세요
                </p>

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
                        <StyledInput
                            type='text'
                            placeholder='주문번호를 입력해주세요.'
                            border='1px solid rgb(163, 166, 174)'
                            borderRadius='5px'
                            padding='5px'
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
                        <StyledInput
                            type='password'
                            placeholder='비밀번호를 입력해주세요'
                            border='1px solid rgb(163, 166, 174)'
                            borderRadius='5px'
                            padding='5px'
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
                    </div>

                    <Button
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px 20px',
                            width: '100%',
                        }}
                    >
                        조회하기
                    </Button>
                </form>
            </div>
        </>
    );
};

export default GuestLogin;
