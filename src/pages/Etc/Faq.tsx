import React, { KeyboardEvent, useCallback, useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';
import { find, pipe, toArray } from '@fxts/core';

import SEOHelmet from 'components/shared/SEOHelmet';
import SectionDropdown from 'components/SectionDropdown';
import Loader from 'components/shared/Loader';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as MobileSearchIcon } from 'assets/icons/search_mobile.svg';
import BOARD from 'const/board';
import { BoardCategory, BoardListItem } from 'models/manage';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import { board } from 'api/manage';
import PATHS from 'const/paths';

const FaqContainer = styled.div`
    max-width: 1060px;
    width: 100%;
    padding: 20px;
    margin: 116px auto 153px;
    ${media.small} {
        margin: 0 auto 88px;
        overflow: hidden;
    }
`;

const FaqTitle = styled.h2`
    margin: 0 0 38px;
    color: ${(props) => props.theme.text1};
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    ${media.small} {
        font-size: 2rem;
    }
`;

const FaqSearchContainer = styled.div`
    width: 100%;
    background: ${(props) => props.theme.bg2};
    padding: 20px 0;
    ${media.small} {
        width: 100vw;
        margin-left: -20px;
        padding: 15px 24px;
    }
`;

const FaqSearchBox = styled.form`
    margin: 0 auto;
    width: 408px;
    height: 44px;
    background: #fff;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.small} {
        width: 100%;
        height: 54px;
    }
`;

const FaqSearchInput = styled.input.attrs({ type: 'text' })`
    width: 100%;
    padding: 8px 20px;
    &::placeholder {
        font-size: 1rem;
        letter-spacing: -0.64;
        color: ${(props) => props.theme.text3};
    }
    ${media.small} {
        width: 80%;
        font-size: 1.333rem;
        &::placeholder {
            font-size: 1.333rem;
        }
    }
`;

const FaqSearchButton = styled.button`
    width: auto;
    text-align: center;
    padding: 0 10px;
    ${media.small} {
        padding: 0 20px;
    }
`;

const FaqCategoryContainer = styled.ul`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ${media.small} {
        width: 100vw;
        justify-content: left;
    }
`;

const MobileFaqCategoryContainer = styled.div`
    ${media.small} {
        width: 100%;
        justify-content: flex-start;
        overflow-x: scroll;
    }
`;

const FaqCategoryBox = styled.li<{ isActive?: boolean }>`
    margin-left: 30px;
    text-align: center;
    cursor: pointer;
    letter-spacing: 0;
    color: ${(props) =>
        props.isActive ? props.theme.text1 : props.theme.text2};
    text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
    :hover {
        color: ${(props) => props.theme.text1};
    }
    &:first-child {
        margin-left: 0;
    }
    ${media.medium} {
        margin-left: 20px;
    }
    ${media.small} {
        margin-left: 8px;
        font-size: 1.333rem;
        font-weight: 400;
        letter-spacing: -0.64px;
        padding: 15px 12px;
        line-height: 24px;
        border: ${(props) => `1px solid ${props.theme.line3}`};
        white-space: nowrap;
        color: ${(props) => (props.isActive ? '#fff' : '#8f8f8f')};
        background: ${(props) =>
            props.isActive ? props.theme.secondary : '#fff'};
        text-decoration: none;
        :hover {
            color: ${(props) => (props.isActive ? '#fff' : '#8f8f8f')};
        }
    }
`;

const FaqDetailContainer = styled.div`
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    > div {
        padding: 20px 0;
        text-align: center;
        font-size: 1.25rem;
        color: ${(props) => props.theme.text1};
        font-weight: bold;
        letter-spacing: -0.8px;
        background: ${(props) => props.theme.bg2};
    }
    > p {
        text-align: center;
        padding: 80px 0;
        color: ${(props) => props.theme.text3};
        line-height: 24px;
    }
    ${media.small} {
        > div {
            font-size: 1.666rem;
        }
        > p {
            padding: 72px 0;
            font-size: 1.333rem;
        }
    }
`;

const FaqDetailBox = styled.li`
    display: flex;
    padding: 32px 20px;
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    letter-spacing: -0.8px;
    > div {
        p {
            font-size: 1.25rem;
        }
    }
    ${media.small} {
        padding: 16.5px 10px;
        letter-spacing: -0.64px;
        > div {
            p {
                font-size: 1.1666rem;
            }
        }
    }
`;

const FaqDetail = styled.p`
    > p {
        font-size: 1rem !important;
        ${media.small} {
            font-size: 1.1666rem !important;
        }
    }
`;

const FaqDetailLabel = styled.p`
    color: #999;
    letter-spacing: -0.48px;
    width: 162px;
    font-size: 0.75rem;
    line-height: 30px;
    ${media.small} {
        width: auto;
        font-size: 1rem;
        white-space: nowrap;
        padding-right: 33px;
        font-size: 1.333rem;
    }
`;

const MoreViewButton = styled.button`
    display: block;
    text-align: center;
    padding: 6px 12px;
    color: #fff;
    background: ${(props) => props.theme.secondary};
    font-weight: 500;
    margin: 15px auto;
`;

const InquiryButton = styled.div`
    width: auto;
    font-size: 1rem;
    margin: 50px auto 0;
    letter-spacing: -0.64px;
    color: ${(props) => props.theme.text1};
    text-align: center;
    > a {
        font-weight: bold;
        text-decoration: underline;
    }
    ${media.small} {
        font-size: 1.333rem;
    }
`;

interface FaqList extends BoardListItem {
    content?: string;
}

const Faq = () => {
    const [faqCategoryList, setFaqCategoryList] = useState<BoardCategory[]>([]);
    const [faqList, setFaqList] = useState(
        new Map<number, Map<number, FaqList>>(),
    );
    const [totalCountList, setTotalCountList] = useState(
        new Map<number, number>(),
    );
    const [currentCategoryNo, setCurrentCategoryNo] = useState<number>(0);
    const count = 5;
    const [listItemCount, setListItemCount] = useState(count);
    const [keyword, setKeyword] = useState('');

    const { width } = useWindowSize();

    useQuery<AxiosResponse<BoardCategory[]>, AxiosError>(
        ['faqCategoryList'],
        async () => await board.getCategories(BOARD.FAQ),
        {
            onSuccess: (res) => {
                setFaqCategoryList([...res.data]);
                setCurrentCategoryNo(res.data[0].categoryNo);
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    alert(error.message);
                    return;
                }
                alert('알수 없는 에러가 발생했습니다.');
            },
        },
    );

    const faqListUseQueries = useQueries(
        faqCategoryList.map(({ categoryNo }) => {
            return {
                queryKey: [
                    'faqCategoryList',
                    {
                        categoryNo,
                        listItemCount,
                    },
                ],
                queryFn: async () =>
                    await board.getArticlesByBoardNo(BOARD.FAQ, {
                        pageNumber: 1,
                        pageSize: listItemCount,
                        hasTotalCount: true,
                        categoryNo,
                        keyword,
                    }),
                keepPreviousData: true,
                onSuccess: (res: any) => {
                    setTotalCountList((prev) => {
                        return new Map(prev).set(
                            categoryNo,
                            res.data?.totalCount,
                        );
                    });
                    setFaqList((prev) => {
                        const faqListObject = new Map<number, FaqList>();
                        res.data?.items?.forEach((item: any) => {
                            faqListObject.set(item.articleNo, item);
                        });
                        return new Map(prev).set(categoryNo, faqListObject);
                    });
                },
                onError: (error: any) => {
                    if (error instanceof AxiosError) {
                        alert(error.response?.data.message);
                        return;
                    }
                    alert('알수 없는 에러가 발생했습니다.');
                },
            };
        }),
    );

    const getNoticeDetailHandler = (articleNo: number) => async () => {
        if (!faqList?.get(currentCategoryNo)?.get(articleNo)?.content) {
            try {
                const noticeDetail = await board.getArticleDetail(
                    BOARD.FAQ,
                    articleNo.toString(),
                );
                setFaqList((prev) => {
                    prev.get(currentCategoryNo)?.set(
                        articleNo,
                        noticeDetail.data,
                    );
                    return new Map(prev);
                });
            } catch (err) {
                alert(err);
            }
        }
        return;
    };

    const handleCategoryClick = (categoryNo: number) => () => {
        setCurrentCategoryNo(categoryNo);
        setListItemCount(count);
    };

    const refetchAll = useCallback(() => {
        faqListUseQueries.forEach((result) => result.refetch());
    }, [faqListUseQueries]);

    const isLoading = faqListUseQueries.some((res) => res.isLoading);

    const isMoreFaq =
        faqList.get(currentCategoryNo)?.size ===
        totalCountList.get(currentCategoryNo);

    return (
        <>
            <SEOHelmet
                data={{
                    title: '자주 묻는 질문',
                    meta: {
                        title: '자주 묻는 질문',
                        description: 'FAQ',
                    },
                    og: {
                        title: '자주 묻는 질문',
                        description: 'FAQ',
                    },
                }}
            />
            <FaqContainer>
                <FaqTitle>자주 묻는 질문</FaqTitle>
                <FaqSearchContainer>
                    <FaqSearchBox
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            refetchAll();
                        }}
                        onKeyUp={(e: KeyboardEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            if (e.key === 'Enter') {
                                refetchAll();
                            }
                        }}
                    >
                        <FaqSearchInput
                            placeholder='궁금한 점을 검색해보세요 :)'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <FaqSearchButton>
                            {isMobile(width) ? (
                                <MobileSearchIcon />
                            ) : (
                                <SearchIcon />
                            )}
                        </FaqSearchButton>
                    </FaqSearchBox>
                </FaqSearchContainer>
                <MobileFaqCategoryContainer>
                    <FaqCategoryContainer>
                        {faqCategoryList.map(({ categoryNo, label }) => {
                            return (
                                faqList.get(categoryNo) && (
                                    <FaqCategoryBox
                                        isActive={
                                            categoryNo === currentCategoryNo
                                        }
                                        key={categoryNo}
                                        onClick={handleCategoryClick(
                                            categoryNo,
                                        )}
                                    >
                                        {isDesktop(width) && '# '}
                                        {label}({totalCountList.get(categoryNo)}
                                        )
                                    </FaqCategoryBox>
                                )
                            );
                        })}
                    </FaqCategoryContainer>
                </MobileFaqCategoryContainer>

                {isLoading ? (
                    <Loader />
                ) : (
                    <FaqDetailContainer>
                        {faqList.get(currentCategoryNo) &&
                        totalCountList.get(currentCategoryNo) &&
                        totalCountList.get(currentCategoryNo)! > 0 ? (
                            <>
                                <div>
                                    {
                                        pipe(
                                            faqCategoryList,
                                            find(
                                                (categoryItem) =>
                                                    categoryItem.categoryNo ===
                                                    currentCategoryNo,
                                            ),
                                        )?.label
                                    }
                                    ({totalCountList.get(currentCategoryNo)})
                                </div>
                                <ul>
                                    {pipe(
                                        faqList.get(currentCategoryNo)!,
                                        toArray,
                                    ).map(([key, data]) => {
                                        return (
                                            <FaqDetailBox
                                                onClick={getNoticeDetailHandler(
                                                    data.articleNo,
                                                )}
                                                key={key}
                                            >
                                                <FaqDetailLabel>
                                                    {data.categoryLabel}
                                                </FaqDetailLabel>
                                                <SectionDropdown
                                                    title={data.title}
                                                >
                                                    <FaqDetail
                                                        dangerouslySetInnerHTML={{
                                                            __html: data.content!,
                                                        }}
                                                    ></FaqDetail>
                                                </SectionDropdown>
                                            </FaqDetailBox>
                                        );
                                    })}
                                </ul>
                            </>
                        ) : (
                            <p>등록된 질문이 없습니다.</p>
                        )}
                    </FaqDetailContainer>
                )}
                {!isMoreFaq && (
                    <MoreViewButton
                        onClick={() => {
                            setListItemCount((prev) => prev + count);
                        }}
                    >
                        더보기
                    </MoreViewButton>
                )}
                <InquiryButton>
                    원하는 질문이 없나요?&nbsp;&nbsp;&nbsp;
                    <Link to={PATHS.INQUIRY}>1:1 문의하기</Link>
                </InquiryButton>
            </FaqContainer>
        </>
    );
};

export default Faq;
