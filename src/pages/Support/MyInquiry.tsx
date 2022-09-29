import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useWindowSize } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import InquiryContent from 'components/Support/InquiryContent';
import Paging from 'components/shared/Paging';
import Loader from 'components/shared/Loader';
import { isMobile } from 'utils/styles/responsive';
import { inquiry } from 'api/manage';
import media from 'utils/styles/media';

const MyInquiryContainer = styled.section`
    width: 1060px;
    margin: 118px auto 155px;
    color: ${(props) => props.theme.text1};
    ${media.xlarge} {
        width: 100%;
        margin: 50px 0 88px;
        padding: 0 24px;
    }
    ${media.medium} {
        position: relative;
        padding: 0 24px 90px;
    }
`;

const MyInquiryContainerTop = styled.div`
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.medium} {
        justify-content: start;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    ${media.xlarge} {
        font-size: 1.428rem;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const InquiryButton = styled(Link)`
    background: ${(props) => props.theme.secondary};
    width: 221px;
    padding: 14px 0;
    display: inline-block;
    color: #fff;
    text-align: center;
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        width: calc(100% - 48px);
        font-size: 1.333rem;
        position: absolute;
        bottom: 0;
    }
`;

const MyInquiryListContainer = styled.ul`
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `2px solid ${props.theme.secondary}`};
    > p {
        padding: 80px 0;
        text-align: center;
        color: ${(props) => props.theme.text3};
    }
    ${media.xlarge} {
        font-size: 1.142rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const InquiryPaging = styled(Paging)`
    margin-top: 40px;
`;

const MyInquiry = () => {
    const [inquiryParams, setInquiryParams] = useState({
        pageNumber: 1,
        pageSize: 10,
        hasTotalCount: true,
    });
    const [totalPage, setTotalPage] = useState(1);

    const { width } = useWindowSize();

    const { t: translation } = useTranslation('myInquiry');

    const {
        data: inquiryList,
        refetch: inquiryRefetch,
        isLoading,
    } = useQuery(
        ['myInquiry', { inquiryParams }],
        async () =>
            inquiry.getInquiries({
                ...inquiryParams,
            }),
        {
            select: (res) => res.data,
            onSuccess: (res) => {
                let totalPage = 0;
                if (res.totalCount % inquiryParams.pageSize === 0) {
                    totalPage = res.totalCount / inquiryParams.pageSize;
                } else {
                    totalPage =
                        Math.floor(res.totalCount / inquiryParams.pageSize) + 1;
                }
                setTotalPage(totalPage);
            },
        },
    );

    const { mutate: deleteMutation } = useMutation(
        async (inquiryNo: string | number) =>
            await inquiry.deleteInquiry(inquiryNo.toString()),
        {
            onSuccess: () => {
                alert(translation('deletedAlert'));
                inquiryRefetch();
            },
        },
    );

    const deleteInquiry = (inquiryNo: number | string) => {
        if (window.confirm(translation('toDeleteAlert'))) {
            deleteMutation(inquiryNo);
        } else {
            return;
        }
    };

    return (
        <>
            <SEOHelmet
                data={{
                    title: translation('title'),
                    meta: {
                        title: translation('title'),
                        description: translation('description'),
                    },
                    og: {
                        title: translation('title'),
                        description: translation('description'),
                    },
                }}
            />
            {isMobile(width) ? (
                <MobileHeader title={translation('mobileTitle')} />
            ) : (
                <Header />
            )}
            <MyInquiryContainer>
                <MyInquiryContainerTop>
                    <Title>{translation('title')}</Title>
                    <InquiryButton to={'/support/inquiry'}>
                        {translation('subTitle')}
                    </InquiryButton>
                </MyInquiryContainerTop>
                {isLoading ? (
                    <Loader />
                ) : (
                    <MyInquiryListContainer>
                        {inquiryList?.items && inquiryList.items.length > 0 ? (
                            inquiryList?.items.map((inquiryData) => {
                                return (
                                    <InquiryContent
                                        deleteInquiry={deleteInquiry}
                                        inquiryData={inquiryData}
                                    />
                                );
                            })
                        ) : (
                            <p>{translation('noInquiry')}</p>
                        )}
                    </MyInquiryListContainer>
                )}
                <InquiryPaging
                    currentPage={inquiryParams.pageNumber}
                    totalPage={totalPage}
                    onFirstClick={() => {
                        setInquiryParams((prev) => {
                            return { ...prev, pageNumber: 1 };
                        });
                    }}
                    onBeforeClick={() => {
                        if (inquiryParams.pageNumber <= 1) {
                            return;
                        }
                        setInquiryParams((prev) => {
                            return { ...prev, pageNumber: prev.pageNumber - 1 };
                        });
                    }}
                    onNextClick={() => {
                        if (inquiryParams.pageNumber >= totalPage) {
                            return;
                        }
                        setInquiryParams((prev) => {
                            return { ...prev, pageNumber: prev.pageNumber + 1 };
                        });
                    }}
                    onEndClick={() => {
                        setInquiryParams((prev) => {
                            return { ...prev, pageNumber: totalPage };
                        });
                    }}
                />
            </MyInquiryContainer>
        </>
    );
};

export default MyInquiry;
