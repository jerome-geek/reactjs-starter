import React, { useState, useEffect, useRef, Ref } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SEX, TERM } from 'api/member/profile';
import { profile } from 'api/member/index';
import { captcha } from 'api/auth';
import { useDebounce } from 'hooks';
import { VCMarketingTerms } from 'const/VCTerms';

const SignUpInput = () => {
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
    const [checkAgree, setCheckAgree] = useState<string[]>([]);
    const [captchaImage, setCaptchaImage] = useState(null);

    interface LocationState {
        joinTermsAgreements: TERM[];
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

    // type IDD = `id`

    const location = useLocation();
    const state = location.state as LocationState;
    const { joinTermsAgreements } = state;

    const navigate = useNavigate();
    const captchaCode = useRef<HTMLInputElement>(null);

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
    } = useForm<SignUp & Id>();

    const watchYear = watch('year');
    const watchMonth = watch('month');

    // const certificatePhone = () => { 핸드폰 인증 해야 함
    // };

    const goBackButton = () => {
        navigate(-1);
    };

    const getCaptchaImage = () => {
        captcha.generateCaptchaImage({ key: '1234qwer' }).then((res) => {
            setCaptchaImage(res.data.url);
        });
    };

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

    const agreeAllButton = (checked: boolean) => {
        setIsAllChecked(!isAllChecked);
        if (checked) {
            let checkArr: string[] = [];
            VCMarketingTerms.forEach(({ id }) => {
                checkArr.push(id);
                setValue(id, true);
            });
            setCheckAgree(checkArr);
        } else {
            setCheckAgree([]);
            VCMarketingTerms.forEach(({ id }) => {
                setValue(id, false);
            });
        }
    };

    const agreeButton = (checked: boolean, id: string) => {
        if (checked) {
            setCheckAgree([...checkAgree, id]);
            setValue(id, true);
        } else {
            setCheckAgree(checkAgree.filter((check) => check !== id));
            setValue(id, false);
        }
    };

    const checkCaptchaCode = (): boolean => {
        // 현재 회원가입 진행중 이 api 를 먼저 거쳐가는데 key 탓 인지 '자동등록방지 문자 입력 대상자가 아닙니다.' 라고 뜸
        captcha
            .checkCaptchaImage({
                key: '1234qwer',
                code: captchaCode.current?.value || '',
            })
            .then(() => {
                return true;
            })
            .catch((res) => {
                alert('자동 등록 방지 번호를 확인해주세요');
                console.log(res);
                return false;
            });
        return false;
    };

    const signUpButton = async (data: SignUp) => {
        const {
            email,
            memberName,
            password,
            year,
            month,
            day,
            smsAgreed,
            directMailAgreed,
            sex,
        } = data;

        if (!(await checkCaptchaCode())) {
            return;
        }

        profile
            .createProfile({
                email,
                memberId: email,
                memberName,
                password,
                birthday: year + '' + month + '' + day,
                smsAgreed,
                directMailAgreed,
                joinTermsAgreements,
                sex,
            })
            .then((res) => {
                console.log(res);
                // 다음 페이지로 넘김
            })
            .catch((res) => {
                console.log(res);
            });
    };

    useEffect(() => {
        getCaptchaImage();
    }, []);

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
            <header>
                <button onClick={goBackButton}>{'<'}</button>
                <h2>회원 가입</h2>
            </header>
            <form onSubmit={handleSubmit(signUpButton)}>
                <div>
                    <label>이메일</label>
                    <input
                        type='email'
                        style={{ border: '1px solid #000' }}
                        {...register('email', {
                            required: {
                                value: true,
                                message: '이메일을 입력해주세요',
                            },
                            pattern: {
                                value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                                message: '올바른 이메일 형식을 입력해주세요',
                            },
                            onChange: checkExistEmail,
                        })}
                    />
                    {errors.email && errors.email.message}
                </div>
                <div>
                    <div>
                        <label>이름</label>
                        <input
                            type='text'
                            style={{ border: '1px solid #000' }}
                            {...register('memberName', {
                                required: {
                                    value: true,
                                    message: '이름을 입력해주세요',
                                },
                            })}
                        />
                        {errors.memberName && errors.memberName.message}
                    </div>
                    <div>
                        <p>성별</p>
                        <div>
                            <label htmlFor='male'>남성</label>
                            <input
                                id='male'
                                value={SEX.MALE}
                                type='radio'
                                {...register('sex')}
                                defaultChecked={true}
                            />
                            <label htmlFor='female'>여성</label>
                            <input
                                id='female'
                                value={SEX.FEMALE}
                                type='radio'
                                {...register('sex')}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='password'>
                            비밀번호
                            <span>(영어, 숫자, 특수문자 포함 8자리 이상)</span>
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='비밀번호 입력'
                            style={{ border: '1px solid #000' }}
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
                        {errors.password && errors.password.message}
                        <input
                            type='password'
                            placeholder='비밀번호 재입력'
                            style={{ border: '1px solid #000' }}
                            {...register('checkPassword', {
                                validate: {
                                    positive: (val) =>
                                        val === getValues('password') ||
                                        '비밀번호가 일치하지 않습니다.',
                                },
                            })}
                        />
                        {errors.checkPassword && errors.checkPassword.message}
                    </div>
                    <div>휴대폰 번호</div>
                </div>
                <button type='button' /*onClick={certificatePhone}*/>
                    휴대폰 인증하기
                </button>
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
                <div>
                    <input
                        type='checkbox'
                        id='agreeAllMarketing'
                        onChange={(e) => agreeAllButton(e.target.checked)}
                        checked={checkAgree.length === VCMarketingTerms.length}
                    />
                    <label htmlFor='agreeAllMarketing'>
                        마케팅 수신 전체 동의
                    </label>
                    {VCMarketingTerms.map(({ id, name, option }) => (
                        <React.Fragment key={id}>
                            <input
                                type='checkbox'
                                id={id}
                                {...register(id)}
                                onChange={(e) =>
                                    agreeButton(e.target.checked, id)
                                }
                                checked={checkAgree.includes(id)}
                            />
                            <label htmlFor={id}>
                                {name}
                                {option && <span>(선택)</span>}
                            </label>
                        </React.Fragment>
                    ))}
                </div>
                <div>
                    <p>자동 등록 방지</p>
                    <div>
                        {captchaImage ? (
                            <img
                                src={captchaImage}
                                alt='자동 등록 방지 이미지'
                            />
                        ) : (
                            '...loading'
                        )}
                    </div>
                    <div>
                        <input
                            type='text'
                            style={{ border: '1px solid #000' }}
                            ref={captchaCode}
                        />
                    </div>
                    <div onClick={getCaptchaImage}>새로고침 버튼</div>
                </div>
                <button>회원가입</button>
            </form>
        </>
    );
};

export default SignUpInput;
