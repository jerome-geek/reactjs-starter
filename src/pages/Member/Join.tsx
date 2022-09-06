import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { every, pipe, map, toArray, some } from '@fxts/core';
import styled from 'styled-components';
import { DevTool } from '@hookform/devtools';
import { ErrorMessage } from '@hookform/error-message';

import { useAppDispatch } from 'state/reducers';
import { fetchProfile } from 'state/slices/memberSlice';
import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import StyledInput from 'components/Input/StyledInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import Checkbox from 'components/Input/Checkbox';
import Radiobox from 'components/Input/Radiobox';
import { profile } from 'api/member/index';
import { authentication } from 'api/auth';
import { useDebounce } from 'hooks';
import { tokenStorage } from 'utils/storage';
import media from 'utils/styles/media';
import { SEX, SHOPBY_TERMS_TYPES, VC_TERMS_TYPES } from 'models';

interface LocationState {
    joinTermsAgreements: SHOPBY_TERMS_TYPES | VC_TERMS_TYPES[];
}

interface SignUp {
    email: string;
    memberName: string;
    password: string;
    year: number;
    month: number;
    day: number;
    smsAgreed: boolean;
    directMailAgreed: boolean;
    sex: SEX;
}

interface Id {
    [id: string]: boolean | string;
}

const JoinInputContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    margin-bottom: 20px;

    & > label {
        font-size: 12px;
        line-height: 18px;
        color: #191919;
        letter-spacing: 0;
        margin-bottom: 8px;

        ${media.small} {
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -0.64px;
        }
    }
`;

const JoinInput = styled(StyledInput)`
    padding: 10px 20px;
    border: 1px solid #dbdbdb;
    letter-spacing: -0.64px;
    color: #a8a8a8;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
`;

const CheckBoxContainer = styled.div`
    border-bottom: 1px solid #dbdbdb;
    padding: 20px 0;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
        font-size: 10px;
        color: #858585;
        letter-spacing: -0.4px;
    }
`;

const CheckboxTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #191919;
    margin-left: 16px;

    ${media.small} {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.56px;
        margin-left: 8px;
    }
`;

const MarketingList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MarketingListItem = styled.li`
    margin-right: 14px;
`;

const SignUpButton = styled(PrimaryButton)`
    width: 100%;
    letter-spacing: 0;
    font-size: 16px;
    line-height: 24px;
`;

const Join = () => {
    const [marketingAgreement, setMarketingAgreement] = useState([
        {
            // SMS 알림 수신 동의 여부 (nullable)
            id: 'smsAgreed',
            name: 'SMS',
            isChecked: false,
            optional: true,
        },
        {
            // 이메일 알림 수신 동의 여부 (nullable)
            id: 'directMailAgreed',
            name: '이메일',
            isChecked: false,
            optional: true,
        },
    ]);

    const isAllMarketingAgreementChecked = useMemo(
        () => every((a) => a.isChecked, marketingAgreement),
        [marketingAgreement],
    );

    const agreeMarketingAgreement = (id: string) =>
        setMarketingAgreement((prev) =>
            pipe(
                prev,
                map((a) =>
                    a.id === id ? { ...a, isChecked: !a.isChecked } : a,
                ),
                toArray,
            ),
        );

    const agreeAllMarketingAgreement = (checked: boolean) =>
        setMarketingAgreement((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isChecked: checked })),
                toArray,
            ),
        );

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const { joinTermsAgreements } = location.state as LocationState;

    const navigate = useNavigate();

    const {
        register,
        setValue,
        watch,
        getValues,
        handleSubmit,
        setError,
        clearErrors,
        setFocus,
        formState: { errors },
        control,
    } = useForm<SignUp & Id>();

    const watchYear = watch('year');
    const watchMonth = watch('month');

    const dispatch = useAppDispatch();

    // TODO: 핸드폰 인증 로직
    // const certificatePhone = () => {
    // };

    const checkExistEmail = useDebounce(() => {
        profile
            .checkDuplicateEmail({ email: getValues('email') })
            .then((res) => {
                if (res.data.exist) {
                    setError('email', {
                        message: '이미 존재하는 이메일 입니다.',
                    });
                } else {
                    clearErrors('email');
                }
            });
    }, 1000);

    const handleLogin = async (memberId: string, password: string) => {
        try {
            const { data } = await authentication.issueAccessToken({
                memberId: memberId,
                password: password,
                keepLogin: false,
            });

            if (data) {
                tokenStorage.setAccessToken(
                    JSON.stringify({
                        ...data,
                        expiry: new Date().getTime() + data.expireIn * 1000,
                    }),
                );

                dispatch(fetchProfile());
                navigate('/member/join-completed');
            }
        } catch (error) {
            alert('알 수 없는 에러 발생!');
            navigate('/');
        }
    };

    const checkedMarketingAgreement = (id: string) =>
        pipe(
            marketingAgreement,
            some((b) => b.isChecked && b.id === id),
        );

    const signUp = async (inputData: SignUp) => {
        const { email, memberName, password, year, month, day, sex } =
            inputData;

        try {
            const successSignUpResponse = await profile.createProfile({
                email,
                memberId: email,
                memberName,
                password,
                birthday: year + '' + month + '' + day,
                smsAgreed: checkedMarketingAgreement('smsmAgreed'),
                directMailAgreed: checkedMarketingAgreement('smsAgreed'),
                joinTermsAgreements,
                sex,
            });
            console.log(
                '🚀 ~ file: Join.tsx ~ line 259 ~ signUp ~ successSignUpResponse',
                successSignUpResponse,
            );
            return;
            if (successSignUpResponse) {
                handleLogin(email, password);
            }
        } catch (error: any) {}
    };

    useEffect(() => {
        if (watchYear?.toString().length === 4) {
            setFocus('month');
        }
        if (watchMonth?.toString().length === 2) {
            setFocus('day');
        }
    }, [watchYear, watchMonth, setFocus]);

    return (
        <>
            <Header />

            <LayoutResponsive type='small' style={{ marginTop: '150px' }}>
                <form onSubmit={handleSubmit(signUp)}>
                    <JoinInputContainer>
                        <label htmlFor='email'>이메일</label>
                        <JoinInput
                            type='email'
                            placeholder='이메일 주소를 입력해주세요. (수신 가능 E-mail)'
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: '이메일을 입력해주세요',
                                },
                                // pattern: {
                                //     value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                                //     message:
                                //         '올바른 이메일 형식을 입력해주세요',
                                // },
                                // onChange: checkExistEmail,
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='email'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </JoinInputContainer>

                    <JoinInputContainer>
                        <label htmlFor='phone'>전화번호</label>
                        <JoinInput
                            type='phone'
                            placeholder="휴대폰 번호 '-' 제외하고 입력해 주세요."
                            {...register('phone', {
                                required: {
                                    value: true,
                                    message: '전화번호를 입력해주세요',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='phone'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </JoinInputContainer>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <JoinInputContainer>
                            <label htmlFor='memberName'>이름</label>
                            <JoinInput
                                type='text'
                                placeholder='이름을 입력해주세요.'
                                {...register('memberName', {
                                    required: {
                                        value: true,
                                        message: '이름을 입력해주세요',
                                    },
                                })}
                            />
                        </JoinInputContainer>
                        <JoinInputContainer>
                            <p
                                style={{
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                    color: '#191919',
                                    letterSpacing: 0,
                                    marginBottom: '8px',
                                }}
                            >
                                성별
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Radiobox
                                    id='male'
                                    value={SEX.MALE}
                                    checked={SEX.MALE === watch('sex')}
                                    {...register('sex', { required: true })}
                                    onClick={(e) => {
                                        console.log(e);
                                    }}
                                >
                                    <p>남성</p>
                                </Radiobox>

                                <Radiobox
                                    id='female'
                                    value={SEX.FEMALE}
                                    checked={SEX.FEMALE === watch('sex')}
                                    {...register('sex', { required: true })}
                                >
                                    <p>여성</p>
                                </Radiobox>
                            </div>
                        </JoinInputContainer>
                        <ErrorMessage
                            errors={errors}
                            name='memberName'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </div>

                    <JoinInputContainer>
                        <label htmlFor='password'>비밀번호</label>
                        <div style={{ marginBottom: '8px', width: '100%' }}>
                            <JoinInput
                                type='password'
                                id='password'
                                placeholder='비밀번호를 입력해주세요. (영문 + 숫자 + 특수문자 8~16자리)'
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: '비밀번호를 입력해주세요',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                        message:
                                            '비밀번호 형식에 맞게 입력해주세요',
                                    },
                                })}
                            />
                        </div>
                        <div>
                            <JoinInput
                                type='password'
                                placeholder='비밀번호를 입력해주세요. (영문 + 숫자 + 특수문자 8~16자리)'
                                {...register('checkPassword', {
                                    validate: {
                                        positive: (val) =>
                                            val === getValues('password') ||
                                            '비밀번호가 일치하지 않습니다.',
                                    },
                                })}
                            />
                        </div>

                        <ErrorMessage
                            errors={errors}
                            name='password'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='checkPassword'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </JoinInputContainer>

                    <div>
                        <input
                            type='number'
                            placeholder='2000'
                            style={{ border: '1px solid #000' }}
                            {...register('year', {
                                required: {
                                    value: true,
                                    message: '생년월일을 입력해주세요',
                                },
                                maxLength: 4,
                            })}
                        />
                        <span>/</span>
                        <input
                            type='number'
                            placeholder='08'
                            style={{ border: '1px solid #000' }}
                            {...register('month', {
                                required: {
                                    value: true,
                                    message: '생년월일을 입력해주세요',
                                },
                                maxLength: 2,
                            })}
                        />
                        <span>/</span>
                        <input
                            type='number'
                            placeholder='15'
                            style={{ border: '1px solid #000' }}
                            {...register('day', {
                                required: {
                                    value: true,
                                    message: '생년월일을 입력해주세요',
                                },
                                maxLength: 2,
                            })}
                        />
                    </div>

                    <CheckBoxContainer>
                        <Checkbox
                            shape='square'
                            checked={isAllMarketingAgreementChecked}
                            id='agreeAllMarketing'
                            onChange={(e) =>
                                agreeAllMarketingAgreement(e.target.checked)
                            }
                        >
                            <CheckboxTitle>마케팅 수신 전체 동의</CheckboxTitle>
                        </Checkbox>

                        <MarketingList>
                            {marketingAgreement.map(
                                ({ id, name, isChecked }) => (
                                    <MarketingListItem key={id}>
                                        <Checkbox
                                            shape='circle'
                                            onChange={() =>
                                                agreeMarketingAgreement(id)
                                            }
                                            checked={isChecked}
                                        >
                                            <CheckboxTitle>
                                                {name}&nbsp;
                                                <span>(선택)</span>
                                            </CheckboxTitle>
                                        </Checkbox>
                                    </MarketingListItem>
                                ),
                            )}
                        </MarketingList>
                    </CheckBoxContainer>

                    <SignUpButton type='submit'>회원가입</SignUpButton>
                </form>
            </LayoutResponsive>

            <DevTool control={control} placement='top-right' />
        </>
    );
};

export default Join;
