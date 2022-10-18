import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';

import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import SEOHelmet from 'components/shared/SEOHelmet';
import RequestResultProgress from 'components/GolfCourse/RequestResultProgress';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { useTranslation } from 'react-i18next';

const Container = styled.main`
    width: 840px;
    margin: 118px auto 153px;
    color: ${(props) => props.theme.text1};
    text-align: center;
    ${media.custom(888)} {
        width: 100%;
        margin: 50px 0 88px;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 40px;
    text-align: left;
    ${media.xlarge} {
        font-size: 1.428rem;
        letter-spacing: -1px;
        margin-bottom: 25px;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const CourseListContainer = styled.section`
    margin: 40px 0;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
`;

const CourseListCategory = styled.ul`
    display: flex;
    background: ${(props) => props.theme.bg2};
    > li {
        flex: 1 1 0px;
        padding: 20px 0;
        letter-spacing: 0;
    }
`;

const CourseList = styled.li`
    display: flex;
    padding: 21px 0;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    &:last-child {
        border-bottom: none;
    }
    > div {
        flex: 1 1 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const MobileCourseList = styled.li`
    display: flex;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    justify-content: space-between;
    padding: 21px 10px;
    &:last-child {
        border-bottom: none;
    }
    > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
`;

const CourseListStatus = styled.div<{ status: string }>`
    font-size: 12px;
    letter-spacing: 0;
    color: ${(props) => {
        switch (props.status) {
            case 'OPEN':
                return '#999';
            case 'DROP':
                return `${props.theme.primary}`;
            case 'SKIP':
                return `${props.theme.primary}`;
            case 'DONE':
                return '#508CFE';
        }
    }};
    ${media.medium} {
        margin-bottom: 5px;
        font-weight: bold;
    }
`;

const CourseListTitle = styled.div`
    color: ${(props) => props.theme.text2};
    ${media.medium} {
        color: ${(props) => props.theme.text1};
        font-size: 1.333rem;
    }
`;

const CourseListDate = styled.div`
    font-size: 10px;
    font-weight: 300;
`;

const NoticeContainer = styled.section`
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    text-align: left;
    letter-spacing: 0;
    ${media.medium} {
        border-top: ${(props) => `2px solid ${props.theme.line1}`};
        border-bottom: ${(props) => `1px solid ${props.theme.line1}`};
    }
`;

const NoticeTitle = styled.h3`
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    padding: 15px 24px;
    font-size: 1rem;
    font-weight: 500;
    ${media.medium} {
        padding: 10px 10px;
    }
`;

const NoticeList = styled.ul`
    padding: 15px 24px;
    line-height: 18px;
    font-size: 0.75rem;
    ${media.xlarge} {
        font-size: 0.858rem;
    }
    ${media.medium} {
        padding: 10px 10px;
        font-size: 0.8333rem;
    }
`;

const dummyRequestProgressData = [
    { status: '대기', count: '2' },
    { status: '취소', count: '1' },
    { status: '완료', count: '20' },
];

const GolfCourseList = () => {
    const { width } = useWindowSize();

    const { t: courseList } = useTranslation('courseList');

    return (
        <>
            <SEOHelmet
                data={{
                    title: courseList('title'),
                    meta: {
                        title: courseList('title'),
                        description: courseList('description'),
                    },
                    og: {
                        title: courseList('title'),
                        description: courseList('description'),
                    },
                }}
            />
            {isMobile(width) ? (
                <MobileHeader title={courseList('subTitle')} />
            ) : (
                <Header />
            )}
            <Container>
                <Title>{courseList('title')}</Title>
                <RequestResultProgress
                    requestProgressData={dummyRequestProgressData}
                />
                <CourseListContainer>
                    {!isMobile(width) && (
                        <CourseListCategory>
                            <li>{courseList('categoryStatus')}</li>
                            <li>{courseList('categoryTitle')}</li>
                            <li>{courseList('categoryDate')}</li>
                        </CourseListCategory>
                    )}
                    <ul>
                        {!isMobile(width) ? (
                            <>
                                <CourseList>
                                    <CourseListStatus status='OPEN'>
                                        <p>대기</p>
                                    </CourseListStatus>
                                    <CourseListTitle>
                                        <p>강원도 골프장</p>
                                    </CourseListTitle>
                                    <CourseListDate>
                                        <p>22-10-11</p>
                                    </CourseListDate>
                                </CourseList>
                                <CourseList>
                                    <CourseListStatus status='DROP'>
                                        <p>취소</p>
                                    </CourseListStatus>
                                    <CourseListTitle>
                                        <p>강원도 골프장</p>
                                    </CourseListTitle>
                                    <CourseListDate>
                                        <p>22-10-11</p>
                                    </CourseListDate>
                                </CourseList>
                                <CourseList>
                                    <CourseListStatus status='SKIP'>
                                        <p>취소</p>
                                    </CourseListStatus>
                                    <CourseListTitle>
                                        <p>강원도 골프장</p>
                                    </CourseListTitle>
                                    <CourseListDate>
                                        <p>22-10-21</p>
                                    </CourseListDate>
                                </CourseList>
                                <CourseList>
                                    <CourseListStatus status='DONE'>
                                        <p>완료</p>
                                    </CourseListStatus>
                                    <CourseListTitle>
                                        <p>강원도 골프장</p>
                                    </CourseListTitle>
                                    <CourseListDate>
                                        <p>22-10-01</p>
                                    </CourseListDate>
                                </CourseList>
                            </>
                        ) : (
                            <>
                                <MobileCourseList>
                                    <div>
                                        <CourseListStatus status='OPEN'>
                                            <p>대기</p>
                                        </CourseListStatus>
                                        <CourseListTitle>
                                            <p>강원도 골프장</p>
                                        </CourseListTitle>
                                    </div>
                                    <div>
                                        <CourseListDate>
                                            <p>22-10-11</p>
                                        </CourseListDate>
                                    </div>
                                </MobileCourseList>
                                <MobileCourseList>
                                    <div>
                                        <CourseListStatus status='DROP'>
                                            <p>취소</p>
                                        </CourseListStatus>
                                        <CourseListTitle>
                                            <p>강원도 골프장</p>
                                        </CourseListTitle>
                                    </div>
                                    <div>
                                        <CourseListDate>
                                            <p>22-10-11</p>
                                        </CourseListDate>
                                    </div>
                                </MobileCourseList>
                                <MobileCourseList>
                                    <div>
                                        <CourseListStatus status='SKIP'>
                                            <p>취소</p>
                                        </CourseListStatus>
                                        <CourseListTitle>
                                            <p>강원도 골프장</p>
                                        </CourseListTitle>
                                    </div>
                                    <div>
                                        <CourseListDate>
                                            <p>22-10-21</p>
                                        </CourseListDate>
                                    </div>
                                </MobileCourseList>
                                <MobileCourseList>
                                    <div>
                                        <CourseListStatus status='DONE'>
                                            <p>완료</p>
                                        </CourseListStatus>
                                        <CourseListTitle>
                                            <p>강원도 골프장</p>
                                        </CourseListTitle>
                                    </div>
                                    <div>
                                        <CourseListDate>
                                            <p>22-10-01</p>
                                        </CourseListDate>
                                    </div>
                                </MobileCourseList>
                            </>
                        )}
                    </ul>
                </CourseListContainer>
                <NoticeContainer>
                    <NoticeTitle>{courseList('notice.title')}</NoticeTitle>
                    <NoticeList>
                        {courseList('notice.content', {
                            returnObjects: true,
                        }).map((text) => {
                            return <li>{text}</li>;
                        })}
                    </NoticeList>
                </NoticeContainer>
            </Container>
        </>
    );
};

export default GolfCourseList;
