import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StylesConfig } from 'react-select';
import { shallowEqual } from 'react-redux';
import { useWindowSize } from 'usehooks-ts';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { head } from '@fxts/core';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import RequestResultProgress from 'components/GolfCourse/RequestResultProgress';
import SelectBox, { customStyle } from 'components/Common/SelectBox';
import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import SEOHelmet from 'components/shared/SEOHelmet';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { ReactComponent as ArrowRight } from 'assets/icons/arrow_right_small.svg';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square_unchecked.svg';
import { useTypedSelector } from 'state/reducers';
import PATHS from 'const/paths';
import { countries } from 'const/country';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';

const CourseRequestContainer = styled(LayoutResponsive)`
    width: 840px;
    ${media.custom(888)} {
        width: 100%;
        padding: 49px 24px;
    }
`;

const RequestResultContainer = styled.section`
    width: 100%;
    margin-bottom: 41px;
`;

const RequestResultTitle = styled.h3`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 12px;
    text-align: left;
    ${media.custom(1280)} {
        font-size: 1.428rem;
        letter-spacing: -1px;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const GoRequestListButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: right;
    font-size: 0.75rem;
    letter-spacing: 0;
    color: #999;
    margin-bottom: 11px;
    > svg {
        margin-left: 10px;
    }
    ${media.xlarge} {
        font-size: 0.857rem;
    }
    ${media.medium} {
        font-size: 1rem;
    }
`;

const CourseRequestBottom = styled.section`
    width: 440px;
    margin: 0 auto;
    ${media.custom(488)} {
        width: 100%;
        padding: 0 24px;
    }
`;

const CourseRequestTitle = styled.h2`
    color: ${(props) => props.theme.text1};
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 22px;
`;

const CourseRequestDescription = styled.p`
    color: #767676;
    margin-bottom: 30px;
    line-height: 1.3;
    ${media.medium} {
        font-size: 1.166rem;
        margin-bottom: 20px;
    }
`;

const CourseRequestForm = styled.form`
    padding-top: 10px;
    margin-bottom: 32px;
    width: 100%;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
`;

const RequestInformationContainer = styled.div`
    color: ${(props) => props.theme.text1};
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    padding: 20px 0 20px;
    &:last-child {
        border-bottom: none;
    }
`;

const CourseRequestSubTitle = styled.p`
    text-align: left;
    font-weight: 500;
    letter-spacing: 0px;
    margin-bottom: 30px;
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        letter-spacing: 0.8px;
        font-weight: bold;
        font-size: 1.333rem;
        margin-bottom: 22px;
    }
`;

const CourseRequestInputContainer = styled.div`
    margin-bottom: 21px;
    > &:last-child {
        margin-bottom: 0;
    }
    div {
        text-align: left;
        font-size: 1rem;
        ${media.xlarge} {
            font-size: 1.142rem;
        }
        ${media.medium} {
            font-size: 1.333rem;
        }
    }
`;

const CourseRequestInputTitle = styled.p`
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    margin-bottom: 14px;
    text-align: left;
    font-weight: 500;
    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        margin-bottom: 11px;
    }
`;

const RequireIcon = styled.span`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${(props) => props.theme.primary};
    margin-left: 10px;
`;

const CourseRequestInput = styled.input`
    width: 100%;
    padding: 9px 21px;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    font-size: 1rem;
    &::placeholder {
        color: ${(props) => props.theme.text3};
    }
    &:focus {
        border: ${(props) => `1px solid ${props.theme.primary}`};
    }
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        padding: 14px 21px;
    }
`;

const CourseRequestTextArea = styled(CourseRequestInput)`
    min-height: 132px;
`;

const CourseRequestImageFileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 44px;
    > label {
        color: #fff;
        background: ${(props) => props.theme.secondary};
        text-align: center;
        line-height: 44px;
        width: 23.18%;
        cursor: pointer;
        > input {
            display: none;
        }
    }
    ${media.medium} {
        height: 54px;
        > label {
            line-height: 54px;
        }
    }
`;

const CourseRequestImageTitle = styled(CourseRequestInput)`
    color: ${(props) => props.theme.text1};
    width: 75%;
    background: ${(props) => props.theme.bg2};
    border: none;
`;

const AgreeTermContainer = styled.div`
    margin-bottom: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
        > label {
            display: flex;
            align-items: center;
            > p {
                margin-left: 10px;
            }
        }
        > input {
            display: none;
        }
    }
    > a {
        font-size: 10px;
        letter-spacing: 0;
        color: #bcbcbc;
        text-decoration: underline;
    }
`;

const CourseRequestButton = styled.button`
    color: #fff;
    background: ${(props) => props.theme.secondary};
    text-align: center;
    line-height: 44px;
    width: 100%;
    font-size: 1rem;
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const dummyRequestProgressData = [
    { status: '대기', count: '2' },
    { status: '취소', count: '1' },
    { status: '완료', count: '20' },
];

const dummyRequestCategory = [
    '골프장 정보 추가 및 업데이트',
    '고도 정보 추가 및 업데이트',
    '그린뷰 정보 추가 및 업데이트',
    '코스뷰 정보 추가 및 업데이트',
];

interface CourseRequestBody {
    userEmail: string;
    userName: string;
    country: string;
    region?: string;
    golfCourseName?: string;
    requestCategory: string;
    requestDetail: string;
    productName: string;
    scoreImageUrl?: string;
    courseLayoutImageUrl?: string;
}

const GolfCourseRequest = () => {
    const [isAgreeTerm, setIsAgreeTerm] = useState(false);

    const [imageName, setImageName] = useState<{
        scoreImageName?: string;
        courseLayoutImageName?: string;
    }>({});

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CourseRequestBody>({
        defaultValues: {
            userEmail: member?.email,
            userName: member?.memberName,
        },
    });

    const { width } = useWindowSize();

    const requestSelectStyle = useMemo(() => {
        return {
            control: (
                provided: any,
                { menuIsOpen }: { menuIsOpen: boolean },
            ) => ({
                boxSizing: 'border-box',
                width: '100%',
                border: '1px solid #DBDBDB',
                borderBottom: menuIsOpen ? 'none' : '',
                display: 'flex',
                height: isMobile(width) ? '54px' : '44px',
                background: '#fff',
                paddingLeft: '12px',
            }),
            option: () => ({
                height: isMobile(width) ? '54px' : '44px',
                lineHeight: isMobile(width) ? '12px' : '4px',
                width: '100%',
                boxSizing: 'border-box',
                border: '1px solid #DBDBDB',
                background: '#fff',
                padding: '20px',
                paddingLeft: '21px',
                color: '#191919',
                cursor: 'pointer',
                fontWeight: 'normal',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                '&:hover': {
                    borderLeft: '2px solid #c00020',
                    background: '#F0EFF4',
                    fontWeight: 'bold',
                },
            }),
        };
    }, [width]);

    const onSubmit = handleSubmit(() => {
        if (!isAgreeTerm) {
            alert('약관에 동의해주세요');
            return;
        }
        // TODO 요청완료시 alert “골프장코스요청이완료되었습니다.신속하게반영될수있도록노력하겠습니다."
    });

    return (
        <>
            {isDesktop(width) ? (
                <Header />
            ) : (
                <MobileHeader title={'코스 요청하기'} />
            )}
            <SEOHelmet
                data={{
                    title: '보이스캐디 코스 요청',
                    meta: {
                        title: '보이스캐디 코스 요청',
                        description: '보이스캐디 코스 요청하기',
                    },
                    og: {
                        title: '보이스캐디 코스 요청',
                        description: '보이스캐디 코스 요청하기',
                    },
                }}
            />
            <CourseRequestContainer>
                <RequestResultContainer>
                    <RequestResultTitle>나의 요청 결과</RequestResultTitle>
                    <GoRequestListButton to={PATHS.GOLF_COURSE_LIST}>
                        자세히 <ArrowRight />
                    </GoRequestListButton>
                    <RequestResultProgress
                        requestProgressData={dummyRequestProgressData}
                    />
                </RequestResultContainer>
                <CourseRequestBottom>
                    <CourseRequestTitle>코스 요청하기</CourseRequestTitle>
                    <CourseRequestDescription>
                        필요한 골프장 정보를 입력해주세요.
                        <br />
                        신속하게 반영될 수 있도록 노력하겠습니다.
                    </CourseRequestDescription>
                    <CourseRequestForm>
                        <RequestInformationContainer>
                            <CourseRequestSubTitle>
                                요청자 정보
                            </CourseRequestSubTitle>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    이메일
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'email'}
                                    placeholder='이메일을 입력해주세요.'
                                    {...register('userEmail', {
                                        required: {
                                            value: true,
                                            message: '이메일을 입력해주세요',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='userEmail'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    이름
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    placeholder='이름을 입력해주세요.'
                                    {...register('userName', {
                                        required: {
                                            value: true,
                                            message: '이름을 입력해주세요',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='userName'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                        </RequestInformationContainer>

                        <RequestInformationContainer>
                            <CourseRequestSubTitle>
                                골프장 요청 정보
                            </CourseRequestSubTitle>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    국가
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <SelectBox<any>
                                    styles={{
                                        ...(customStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                        ...(requestSelectStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                    }}
                                    options={countries.map((country) => {
                                        return {
                                            label: country,
                                            value: country,
                                        };
                                    })}
                                    {...register('country', {
                                        required: {
                                            value: true,
                                            message: '국가를 선택해주세요',
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('country', e?.value);
                                    }}
                                    placeHolder='국가를 선택해주세요.'
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='country'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    지역
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    {...register('region')}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    골프장명
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    {...register('golfCourseName')}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    요청항목
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <SelectBox
                                    styles={{
                                        ...(customStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                        ...(requestSelectStyle as StylesConfig<
                                            Partial<any>,
                                            false
                                        >),
                                    }}
                                    options={dummyRequestCategory.map(
                                        (category) => {
                                            return {
                                                label: category,
                                                value: category,
                                            };
                                        },
                                    )}
                                    {...register('requestCategory', {
                                        required: {
                                            value: true,
                                            message: '요청 항목을 선택해주세요',
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('requestCategory', e?.value);
                                    }}
                                    placeHolder='요청 항목을 선택해주세요.'
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='requestCategory'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    세부내용
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestTextArea
                                    as={'textarea'}
                                    {...register('requestDetail', {
                                        required: {
                                            value: true,
                                            message: '세부내용을 입력해주세요',
                                        },
                                    })}
                                    placeholder='요청사항을 적어주세요.'
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='requestDetail'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    사용제품
                                    <RequireIcon />
                                </CourseRequestInputTitle>
                                <CourseRequestInput
                                    type={'text'}
                                    {...register('productName', {
                                        required: {
                                            value: true,
                                            message: '사용제품을 입력해주세요',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name='productName'
                                    render={({ message }) => (
                                        <StyledErrorMessage>
                                            {message}
                                        </StyledErrorMessage>
                                    )}
                                />
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    스코어카드 이미지
                                </CourseRequestInputTitle>
                                <CourseRequestImageFileContainer>
                                    <CourseRequestImageTitle
                                        placeholder='파일을 선택해주세요'
                                        type='text'
                                        disabled
                                        value={imageName.scoreImageName}
                                    />
                                    <label htmlFor='scoreCard'>
                                        <input
                                            type='file'
                                            id='scoreCard'
                                            accept='.bmp, .tif, .tiff, .miff, .gif, .jpe, .jpeg, .jpg, .jps, .pjpeg, .jng, .mng, .png'
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setImageName((prev) => {
                                                        return {
                                                            ...prev,
                                                            scoreImageName:
                                                                head(
                                                                    e.target
                                                                        .files!,
                                                                )?.name,
                                                        };
                                                    });
                                                }
                                            }}
                                        />
                                        파일 선택
                                    </label>
                                </CourseRequestImageFileContainer>
                            </CourseRequestInputContainer>
                            <CourseRequestInputContainer>
                                <CourseRequestInputTitle>
                                    코스 레이아웃 이미지
                                </CourseRequestInputTitle>
                                <CourseRequestImageFileContainer>
                                    <CourseRequestImageTitle
                                        placeholder='파일을 선택해주세요'
                                        type='text'
                                        disabled
                                        value={imageName.courseLayoutImageName}
                                    />
                                    <label htmlFor='courseLayout'>
                                        <input
                                            type='file'
                                            id='courseLayout'
                                            accept='.bmp, .tif, .tiff, .miff, .gif, .jpe, .jpeg, .jpg, .jps, .pjpeg, .jng, .mng, .png'
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setImageName((prev) => {
                                                        return {
                                                            ...prev,
                                                            courseLayoutImageName:
                                                                head(
                                                                    e.target
                                                                        .files!,
                                                                )?.name,
                                                        };
                                                    });
                                                }
                                            }}
                                        />
                                        파일 선택
                                    </label>
                                </CourseRequestImageFileContainer>
                            </CourseRequestInputContainer>
                        </RequestInformationContainer>
                    </CourseRequestForm>
                    <AgreeTermContainer>
                        <div>
                            <input
                                type='checkbox'
                                id='agreeRequestTerm'
                                onChange={() => setIsAgreeTerm(!isAgreeTerm)}
                                checked={isAgreeTerm}
                            />
                            <label htmlFor='agreeRequestTerm'>
                                {isAgreeTerm ? <Checked /> : <UnChecked />}
                                <p>
                                    개인정보수집에 대한 내용을 읽었으며,
                                    동의합니다.
                                </p>
                            </label>
                        </div>
                        <Link to={PATHS.MAIN}>자세히보기</Link>
                    </AgreeTermContainer>
                    <CourseRequestButton onClick={() => onSubmit()}>
                        골프 코스 요청하기
                    </CourseRequestButton>
                </CourseRequestBottom>
            </CourseRequestContainer>
        </>
    );
};

export default GolfCourseRequest;
