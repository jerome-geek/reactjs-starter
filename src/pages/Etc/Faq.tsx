import React, { KeyboardEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';
import { filter, head, pipe, slice, toArray } from '@fxts/core';

import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import SectionDropdown from 'components/SectionDropdown';
import Loader from 'components/shared/Loader';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as MobileSearchIcon } from 'assets/icons/search_mobile.svg';
import BOARD from 'const/board';
import paths from 'const/paths';
import { BoardCategory, BoardList, BoardListItem } from 'models/manage';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import { board } from 'api/manage';

const FaqContainer = styled.div`
    max-width: 1060px;
    width: 100%;
    padding: 20px;
    margin: 116px auto 153px;
    ${media.custom(576)} {
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
    ${media.custom(576)} {
        font-size: 2rem;
    }
`;

const FaqSearchContainer = styled.div`
    width: 100%;
    background: ${(props) => props.theme.bg2};
    padding: 20px 0;
    ${media.custom(576)} {
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

    ${media.custom(576)} {
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
    ${media.custom(576)} {
        width: 80%;
        &::placeholder {
            font-size: 1.6rem;
        }
    }
`;

const FaqSearchButton = styled.button`
    width: auto;
    text-align: center;
    padding: 0 10px;
    ${media.custom(576)} {
        padding: 0 20px;
    }
`;

const FaqCategoryContainer = styled.ul`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ${media.custom(576)} {
        margin-left: -24px;
        margin: 16px 0 16px -24px;
        padding-left: 20px;
        width: 100vw;
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
    ${media.small} {
        margin-left: 20px;
    }
    ${media.custom(576)} {
        margin-left: 8px;
        font-size: 1.6rem;
        letter-spacing: -0.64px;
        padding: 15px 12px;
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
    ${media.custom(576)} {
        > div {
            font-size: 2rem;
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
    ${media.custom(576)} {
        padding: 16.5px 10px;
        letter-spacing: -0.64px;
        > div {
            p {
                font-size: 1.6rem;
            }
        }
    }
`;

const FaqDetailLabel = styled.p`
    color: #999;
    letter-spacing: -0.48px;
    width: 162px;
    font-size: 0.75rem;
    line-height: 30px;
    ${media.custom(576)} {
        width: auto;
        white-space: nowrap;
        padding-right: 33px;
    }
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
    ${media.custom(576)} {
        font-size: 1.6rem;
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

    const { isFetching, refetch } = useQuery<
        AxiosResponse<BoardList>,
        AxiosError
    >(
        ['faqList'],
        async () =>
            await board.getArticlesByBoardNo(BOARD.FAQ, {
                keyword,
            }),
        {
            onSuccess: (res) => {
                const faqListObject = new Map<number, Map<number, FaqList>>();
                setFaqList(() => {
                    faqCategoryList.forEach((boardCategory) => {
                        const categoryNo = boardCategory.categoryNo;
                        faqListObject.set(categoryNo, new Map());

                        res.data?.items?.forEach((item) => {
                            if (item.categoryNo === categoryNo) {
                                faqListObject
                                    ?.get(categoryNo)
                                    ?.set(item.articleNo, item);
                            }
                        });
                    });
                    return new Map(faqListObject);
                });
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    alert(error.message);
                    return;
                }
                alert('알수 없는 에러가 발생했습니다.');
            },
            select: (res) => {
                return res;
            },
            refetchOnWindowFocus: false,
        },
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
            <Header></Header>
            <FaqContainer>
                <FaqTitle>자주 묻는 질문</FaqTitle>
                <FaqSearchContainer>
                    <FaqSearchBox
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            refetch();
                        }}
                        onKeyUp={(e: KeyboardEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            if (e.key === 'Enter') {
                                refetch();
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
                <FaqCategoryContainer>
                    {faqCategoryList.map(({ categoryNo, label }) => {
                        return (
                            faqList.get(categoryNo) && (
                                <FaqCategoryBox
                                    isActive={categoryNo === currentCategoryNo}
                                    key={categoryNo}
                                    onClick={handleCategoryClick(categoryNo)}
                                >
                                    {isDesktop(width) && '# '}
                                    {label}({faqList.get(categoryNo)?.size})
                                </FaqCategoryBox>
                            )
                        );
                    })}
                </FaqCategoryContainer>
                {isFetching ? (
                    <Loader />
                ) : (
                    <FaqDetailContainer>
                        {faqList.get(currentCategoryNo) ? (
                            <>
                                <div>
                                    {
                                        pipe(
                                            faqCategoryList,
                                            filter(
                                                (categoryItem) =>
                                                    categoryItem.categoryNo ===
                                                    currentCategoryNo,
                                            ),
                                            toArray,
                                            head,
                                        )?.label
                                    }
                                    ({faqList.get(currentCategoryNo)?.size})
                                </div>
                                <ul>
                                    {pipe(
                                        faqList.get(currentCategoryNo)!,
                                        slice(0, listItemCount),
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
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: data.content!,
                                                        }}
                                                    ></p>
                                                </SectionDropdown>
                                            </FaqDetailBox>
                                        );
                                    })}
                                </ul>
                            </>
                        ) : (
                            <p>검색결과가 없습니다.</p>
                        )}
                    </FaqDetailContainer>
                )}
                {faqList.has(currentCategoryNo) &&
                    faqList.get(currentCategoryNo)!.size > listItemCount && (
                        <div
                            onClick={() =>
                                setListItemCount((prev) => prev + count)
                            }
                        >
                            더보기
                        </div>
                    )}
                <InquiryButton>
                    원하는 질문이 없나요?&nbsp;&nbsp;&nbsp;
                    <Link to={paths.MAIN}>1:1 문의하기</Link>
                </InquiryButton>
            </FaqContainer>
        </>
    );
};

export default Faq;
