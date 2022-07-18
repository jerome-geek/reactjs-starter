import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';

import { fetchProfile } from 'state/slices/memberSlice';
import { useAppDispatch } from 'state/reducers';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import StyledInput from 'components/Input/StyledInput';
import Header from 'components/shared/Header';
import CheckBox from 'components/Input/CheckBox';
import PrimaryButton from 'components/Button/PrimaryButton';
import { authentication } from 'api/auth';
import { tokenStorage } from 'utils/storage';
import { useQueryString } from 'hooks';
import PATHS from 'const/paths';
import { ReactComponent as AppleIcon } from 'assets/icons/sns_apple.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/sns_facebook.svg';
import { ReactComponent as GoogleIcon } from 'assets/icons/sns_google.svg';
import LoginLogo from 'assets/logo/loginLogo.png';

interface LoginFormData {
    memberId: string;
    password: string;
    keepLogin: boolean;
}

const LoginInputContainer = styled.div`
    margin-bottom: 20px;
    width: 100%;
`;

const Login = () => {
    const navigate = useNavigate();
    const { returnUrl } = useQueryString();

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            keepLogin: false,
        },
    });

    const dispatch = useAppDispatch();

    const onSubmit = handleSubmit(async ({ memberId, password, keepLogin }) => {
        try {
            const { data } = await authentication.issueAccessToken({
                memberId,
                password,
                keepLogin,
            });

            if (data) {
                if (
                    data.dormantMemberResponse !== null ||
                    data.dormantMemberResponse === 'M0020'
                ) {
                    // TODO: 휴면회원인 경우 로직
                } else {
                    // 휴면회원이 아닌 경우
                    if (data.daysFromLastPasswordChange > 90) {
                        // TODO: 비밀번호 90일 초과시 로직 비밀번호 변경 성공 => 로그아웃 / 비밀번호 변경 안함 => 로그인
                    } else {
                        // TODO: 비밀번호 90일 초과하지 않은 경우 로그인 처리
                        tokenStorage.setAccessToken(
                            JSON.stringify({
                                ...data,
                                expiry:
                                    new Date().getTime() + data.expireIn * 1000,
                            }),
                        );

                        dispatch(fetchProfile());

                        const pathname = (returnUrl ?? PATHS.MAIN) as string;
                        navigate({ pathname });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <div style={{ margin: '0 auto' }}>
            <Header />
            <DevTool control={control} placement='top-right' />

            <LayoutResponsive type='small' style={{ padding: '10rem 0' }}>
                <img src={LoginLogo} alt='' style={{ marginBottom: '50px' }} />
                <form
                    onSubmit={onSubmit}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <LoginInputContainer>
                        <StyledInput
                            type='text'
                            placeholder='아이디'
                            border='1px solid #DBDBDB'
                            style={{
                                width: '100%',
                                padding: '10px 20px',
                            }}
                            {...register('memberId', {
                                required: {
                                    value: true,
                                    message: '이메일을 입력해주세요',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='memberId'
                            render={({ message }) => <p>{message}</p>}
                        />
                    </LoginInputContainer>

                    <LoginInputContainer>
                        <StyledInput
                            type='password'
                            placeholder='비밀번호'
                            border='1px solid #DBDBDB'
                            style={{
                                width: '100%',
                                padding: '10px 20px',
                            }}
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: '비밀번호를 입력해주세요',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='password'
                            render={({ message }) => <p>{message}</p>}
                        />
                    </LoginInputContainer>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '30px',
                        }}
                    >
                        <CheckBox
                            checked={watch('keepLogin')}
                            label='로그인 상태 유지하기'
                            {...register('keepLogin')}
                        />

                        <ul
                            style={{
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#8F8F8F',
                            }}
                        >
                            <li
                                style={{
                                    paddingRight: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate('/member/find-id')}
                            >
                                아이디 찾기
                            </li>
                            <li
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                    navigate('/member/find-password')
                                }
                            >
                                비밀번호 찾기
                            </li>
                        </ul>
                    </div>

                    <PrimaryButton
                        style={{ width: '100%', marginBottom: '50px' }}
                    >
                        로그인
                    </PrimaryButton>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: '40px',
                        }}
                    >
                        <div style={{ marginRight: '32px' }}>
                            <p>SNS 로그인</p>
                        </div>
                        <div>
                            <AppleIcon
                                style={{ width: '34px', paddingRight: '5px' }}
                            />
                            <AppleIcon
                                style={{ width: '34px', paddingRight: '5px' }}
                            />
                            <AppleIcon
                                style={{ width: '34px', paddingRight: '5px' }}
                            />
                            <FacebookIcon
                                style={{ width: '34px', paddingRight: '5px' }}
                            />
                            <GoogleIcon style={{ width: '34px' }} />
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: '24px',
                        }}
                    >
                        <span
                            style={{
                                color: '#C3C3C3',
                                fontSize: '12px',
                                marginRight: '10px',
                            }}
                        >
                            회원이 아니신가요?
                        </span>{' '}
                        <Link
                            to='/'
                            style={{
                                fontSize: '12px',
                                color: '#191919',
                                textDecoration: 'underline',
                            }}
                        >
                            회원가입
                        </Link>
                    </div>

                    <div>
                        <Link
                            to='/guest/login'
                            style={{
                                fontSize: '12px',
                                color: '#191919',
                                textDecoration: 'underline',
                            }}
                        >
                            비회원 주문조회
                        </Link>
                    </div>
                </form>
            </LayoutResponsive>
        </div>
    );
};

export default Login;
