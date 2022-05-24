import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setAccessToken } from 'state/slices/tokenSlice';
import { authentication } from 'api/auth';
import { useQueryString } from 'hooks';
import paths from 'const/paths';
import StyledInput from 'components/Input/StyledInput';

const Login = () => {
    const navigate = useNavigate();
    const { returnUrl } = useQueryString();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    const onSubmit = async (formData: any) => {
        const { data } = await authentication.issueAccessToken({
            memberId: formData.email,
            password: formData.password,
            keepLogin: formData.keepLogin,
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
                    dispatch(
                        setAccessToken({
                            ...data,
                            expiry: new Date().getTime() + data.expireIn,
                        }),
                    );

                    navigate(
                        (returnUrl as string)
                            ? (returnUrl as string)
                            : paths.MAIN,
                        {
                            replace: true,
                        },
                    );
                }
            }
        }
    };

    return (
        <div style={{ margin: '0 auto' }}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <h1
                    style={{
                        fontWeight: 'bold',
                        fontSize: '24px',
                        padding: '20px',
                    }}
                >
                    로그인
                </h1>
                <StyledInput
                    type='text'
                    placeholder='E-mail'
                    border='1px solid rgb(163, 166, 174)'
                    borderRadius='5px'
                    padding='5px'
                    {...register('email', {
                        required: {
                            value: true,
                            message: '이메일을 입력해주세요',
                        },
                        // pattern: {
                        //     value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        //     message: '이메일 형식에 맞지 않습니다',
                        // },
                    })}
                />
                {errors?.email && <p>{errors.email.message}</p>}
                <StyledInput
                    type='password'
                    placeholder='PW'
                    border='1px solid rgb(163, 166, 174)'
                    borderRadius='5px'
                    padding='5px'
                    {...register('password', {
                        required: {
                            value: true,
                            message: '비밀번호를 입력해주세요',
                        },
                    })}
                />
                {errors?.password && <p>{errors.password.message}</p>}
                <label htmlFor=''>
                    <input type='checkbox' {...register('keepLogin')} />
                    로그인 상태 유지
                </label>
                <button
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '10px 20px',
                    }}
                >
                    이메일로 로그인
                </button>
                <div style={{ marginTop: '10px' }}>
                    <Link to='/'>비밀번호 찾기</Link> |{' '}
                    <Link to='/'>회원가입</Link>
                </div>

                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid rgb(198, 203, 216)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>네이버</span>
                    </div>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid rgb(198, 203, 216)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>카카오</span>
                    </div>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid rgb(198, 203, 216)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>페이스북</span>
                    </div>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid rgb(198, 203, 216)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>구글</span>
                    </div>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid rgb(198, 203, 216)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span>애플</span>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>혹시 비회원으로 주문하셨나요?</p>
                    <button
                        style={{
                            border: '1px solid rgb(198, 203, 216)',
                            padding: '5px 10px',
                            width: '100%',
                            marginTop: '5px',
                        }}
                    >
                        비회원 주문 조회
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
