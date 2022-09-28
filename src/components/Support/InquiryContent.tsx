import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { INQUIRY_STATUS } from 'const/status';
import { InquiryItem } from 'models/manage';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';

const MyInquiryList = styled.li`
    cursor: pointer;
`;

const MyInquiryListPreview = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    &:last-child {
        border-bottom: none;
    }
`;

const MyInquiryListStatus = styled.div<{ status: string }>`
    font-size: 0.625rem;
    width: 9.434%;
    display: flex;
    justify-content: center;
    > p {
        border: ${(props) =>
            props.status === 'ANSWERED'
                ? 'none'
                : `1px solid ${props.theme.line1}`};
        background: ${(props) =>
            props.status === 'ANSWERED' ? props.theme.bg1 : 'none'};
        color: ${(props) =>
            props.status === 'ANSWERED' ? '#fff' : props.theme.text1};
        display: inline-block;
        padding: 2px 3px;
    }
    ${media.xlarge} {
        font-size: 0.857rem;
    }
    ${media.medium} {
        font-size: 1rem;
        width: 18.421%;
        flex-direction: column;
        align-items: center;
        white-space: nowrap;
        > p {
            flex-basis: content;
            text-align: center;
        }
    }
`;

const MyInquiryListInformation = styled.div`
    width: 66.792%;
    display: flex;
    justify-content: space-between;
    ${media.medium} {
        width: 62.632%;
        flex-direction: column;
        height: 36.6px;
    }
    ${media.xsmall} {
        width: 60%;
        flex-direction: column;
        margin-left: 5px;
    }
`;

const MyInquiryInformationLeft = styled.div`
    display: flex;
    align-items: center;
`;

const MyInquiryPreviewTitle = styled.p`
    margin-right: 34px;
    ${media.xlarge} {
        font-size: 1.142rem;
        font-weight: 500;
    }
    ${media.medium} {
        font-size: 1.333rem;
        margin-bottom: 4px;
    }
`;

const MyInquiryDate = styled.div`
    font-size: 0.625rem;
    font-weight: normal;
    letter-spacing: 0;
    ${media.xlarge} {
        font-size: 0.857rem;
    }
    ${media.medium} {
        font-size: 1rem;
        margin-top: 7px;
    }
`;

const MyInquiryOrderNo = styled.div`
    font-size: 0.75rem;
    color: ${(props) => props.theme.text3};
    letter-spacing: 0;
    span {
        text-decoration: underline;
    }
    ${media.xlarge} {
        font-size: 0.857rem;
    }
    ${media.medium} {
        font-size: 1rem;
    }
`;

const MyInquiryListModify = styled.div`
    width: 21.32%;
    display: flex;
    justify-content: end;
    > a,
    button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        padding: 12px 0;
        width: 47.78%;
        border: 1px solid #d1d2d2;
    }
    ${media.xlarge} {
        > a,
        button {
            font-size: 0.857rem;
        }
    }
    ${media.medium} {
        flex-direction: column;
        align-items: end;
        > a,
        button {
            width: 80%;
            padding: 6px 0;
            font-size: 1rem;
        }
    }
`;

const ModifyButton = styled(Link)`
    margin-right: 10px;
    ${media.medium} {
        margin: 0 0 8px 0;
    }
`;

const DeleteButton = styled.button``;

const MyInquiryContentContainer = styled.div<{ isVisible: boolean }>`
    display: flex;
    overflow: hidden;
    background: ${(props) => props.theme.bg2};
    ${(props) =>
        props.isVisible
            ? 'height: auto; padding: 31px 0'
            : 'height: 0; padding: 0;'};
    ${media.medium} {
        flex-direction: column;
        ${(props) =>
            props.isVisible
                ? 'height: auto; padding: 20px 14px'
                : 'height: 0; padding: 0;'};
    }
`;

const MyInquiryTitle = styled.div`
    width: 29.811%;
    padding-left: 10.671%;
    ${media.xlarge} {
        font-size: 1.428rem;
    }
    ${media.medium} {
        font-weight: 500;
        padding-left: 0;
        width: 100%;
        margin-bottom: 25px;
        font-size: 1.666rem;
    }
`;

const MyInquiryContent = styled.div`
    width: 70%;
    > div {
        padding: 20px 0;
        &:first-child {
            border-bottom: ${(props) => `1px dashed ${props.theme.line2}`};
            padding: 0 0 20px;
        }
        > p {
            font-weight: bold;
            display: flex;
            align-items: center;
            > span {
                font-weight: 300;
                letter-spacing: 0;
                font-size: 0.625rem;
                margin-left: 14px;
            }
        }
    }
    ${media.xlarge} {
        > div {
            > p {
                font-size: 1.142rem;
                > span {
                    font-size: 0.857rem;
                }
            }
        }
    }
    ${media.medium} {
        width: 100%;
        > div {
            > p {
                font-size: 1.333rem;
                > span {
                    font-size: 1rem;
                }
            }
        }
    }
`;

const InquiryText = styled.div`
    margin-top: 20px;
    letter-spacing: -0.48px;
    font-weight: 300;
    color: #767676;
    font-size: 0.75rem;
    line-height: 18px;
    ${media.xlarge} {
        font-size: 1.142rem;
        line-height: 20px;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const InquiryContent = ({
    inquiryData,
    deleteInquiry,
}: {
    inquiryData: InquiryItem;
    deleteInquiry: (
        e: MouseEvent<HTMLButtonElement>,
        inquiryNo: number,
    ) => void;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const { width } = useWindowSize();

    const handleDropdown = (e: MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        setIsVisible((prev) => !prev);
    };

    return (
        <MyInquiryList key={inquiryData.inquiryNo} onClick={handleDropdown}>
            <MyInquiryListPreview>
                <MyInquiryListStatus status={inquiryData.inquiryStatus}>
                    <p>{INQUIRY_STATUS[inquiryData.inquiryStatus]}</p>
                    {isMobile(width) && (
                        <MyInquiryDate>
                            {dayjs(inquiryData.registerYmdt).format('YY-MM-DD')}
                        </MyInquiryDate>
                    )}
                </MyInquiryListStatus>
                <MyInquiryListInformation>
                    <MyInquiryInformationLeft>
                        <MyInquiryPreviewTitle>
                            {inquiryData.inquiryTitle}
                        </MyInquiryPreviewTitle>
                        {!isMobile(width) && (
                            <MyInquiryDate>
                                {!isMobile(width) &&
                                    dayjs(inquiryData.registerYmdt).format(
                                        'YY-MM-DD',
                                    )}
                            </MyInquiryDate>
                        )}
                    </MyInquiryInformationLeft>
                    <MyInquiryOrderNo>
                        {inquiryData.orderNo && (
                            <p>
                                주문번호 <span>{inquiryData.orderNo}</span>
                            </p>
                        )}
                    </MyInquiryOrderNo>
                </MyInquiryListInformation>
                <MyInquiryListModify>
                    {(inquiryData.inquiryStatus === 'ISSUED' ||
                        inquiryData.inquiryStatus === 'ASKED' ||
                        inquiryData.inquiryStatus === 'IN_PROGRESS') && (
                        <ModifyButton
                            to={`/support/inquiry/${inquiryData.inquiryNo}`}
                        >
                            수정하기
                        </ModifyButton>
                    )}
                    <DeleteButton
                        // onClick={(e) => {
                        //     e.stopPropagation();
                        //     if (window.confirm('삭제하시겠습니까?')) {
                        //         deleteMutation(inquiryData.inquiryNo);
                        //     } else {
                        //         return;
                        //     }
                        // }}
                        onClick={(e) => {
                            deleteInquiry(e, inquiryData.inquiryNo);
                        }}
                    >
                        삭제하기
                    </DeleteButton>
                </MyInquiryListModify>
            </MyInquiryListPreview>
            <MyInquiryContentContainer isVisible={isVisible}>
                <MyInquiryTitle>
                    <p>{inquiryData.inquiryTitle}</p>
                </MyInquiryTitle>
                <MyInquiryContent>
                    <div>
                        <p>
                            문의
                            <span>
                                {dayjs(inquiryData.registerYmdt).format(
                                    'YY-MM-DD',
                                )}
                            </span>
                        </p>
                        <InquiryText
                            dangerouslySetInnerHTML={{
                                __html: inquiryData.inquiryContent,
                            }}
                        ></InquiryText>
                    </div>
                    {inquiryData.answer ? (
                        <div>
                            <p>
                                답변
                                <span>
                                    {dayjs(
                                        inquiryData.answer?.answerRegisterYmdt,
                                    ).format('YY-MM-DD')}
                                </span>
                            </p>
                            <InquiryText
                                dangerouslySetInnerHTML={{
                                    __html: inquiryData.answer?.answerContent,
                                }}
                            ></InquiryText>
                        </div>
                    ) : (
                        <div>
                            <InquiryText>등록된 답변이 없습니다.</InquiryText>
                        </div>
                    )}
                </MyInquiryContent>
            </MyInquiryContentContainer>
        </MyInquiryList>
    );
};

export default InquiryContent;
