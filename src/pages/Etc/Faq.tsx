import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import SEOHelmet from 'components/shared/SEOHelmet';
import media from 'utils/styles/media';
import { board } from 'api/manage';
import { BoardCategory, BoardList, BoardListItem } from 'models/manage';
import SectionDropdown from 'components/SectionDropdown';
import Loader from 'components/shared/Loader';

const FaqContainer = styled.div`
    max-width: 1440px;
    padding: 20px;
    margin: 0 auto;
`;

const FaqTitle = styled.h2`
    margin: 20px 0;
`;

const FaqBox = styled.div`
    max-width: 768px;
    margin: 0 auto;
    ${media.small} {
        width: 100%;
    }
`;

const FaqSearchBox = styled.form`
    border: 1px solid #888;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FaqSearchInput = styled.input.attrs({ type: 'text' })`
    width: 90%;
    padding: 10px 10px;
`;

const FaqSearchButton = styled.button`
    width: 10%;
    text-align: center;
`;

const FaqCategoryContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #aaa;
`;

const FaqCategoryBox = styled.div`
    width: calc(100% / 3);
    border: 1px solid #aaa;
    margin-top: -0.5px;
    margin-bottom: -0.5px;
    border-left: none;
    text-align: center;
    padding: 18px 0;
    color: #aaa;
    cursor: pointer;
    &.isActive {
        background: #000;
        color: #fff;
    }
    :hover {
        color: #fff;
        background: #000;
    }
`;

const FaqDetailContainer = styled.div`
    margin-top: 15px;
`;

const FaqDetailBox = styled.div`
    margin-bottom: 10px;
`;

const FaqDetailLabel = styled.p`
    color: #888;
`;

const Faq = () => {
    const [faqList, setFaqList] = useState<BoardCategory[]>([]);
    const [faqData, setFaqData] = useState<BoardList>();
    const [faqDataList, setFaqDataList] =
        useState<{ [id: string]: (BoardListItem & { content?: string })[] }>();
    const [currentCategoryNo, setCurrentCategoryNo] = useState<number>(0);
    const [listItemCount, setListItemCount] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

    useQuery<AxiosResponse<BoardCategory[]>, AxiosError>(
        ['faqList'],
        async () => await board.getCategories('9216'),
        {
            onSuccess: (res) => {
                setFaqList([...res.data]);
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

    useQuery<AxiosResponse<BoardList>, AxiosError>(
        ['faqData'],
        async () => await board.getArticlesByBoardNo('9216', {}),
        {
            onSuccess: (res) => {
                setFaqData(res.data);
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    alert(error.message);
                    return;
                }
                alert('알수 없는 에러가 발생했습니다.');
            },
            onSettled: () => {
                setIsLoading(false);
            },
        },
    );

    useEffect(() => {
        setCurrentCategoryNo(faqList[0]?.categoryNo);
    }, [faqList]);

    useEffect(() => {
        const faqDataListObject: {
            [id: string]: (BoardListItem & { content?: string })[];
        } = {};

        setFaqDataList((prev) => {
            faqList.forEach((boardCategory) => {
                const categoryNo = boardCategory.categoryNo;
                faqDataListObject[`${categoryNo}`] = [];

                faqData?.items?.forEach((item) => {
                    if (item.categoryNo === categoryNo) {
                        faqDataListObject[`${categoryNo}`].push(item);
                    }
                });
            });

            return { ...prev, ...faqDataListObject };
        });
    }, [faqData?.items, faqList]);

    const getNoticeDetailHandler = async (articleNo: number) => {
        try {
            const noticeDetail = await board.getArticleDetail(
                '9216',
                articleNo.toString(),
            );
            setFaqDataList((prev) => {
                prev?.[currentCategoryNo].forEach((ele) => {
                    if (ele.articleNo === articleNo) {
                        ele.content = noticeDetail.data.content;
                    }
                });
                return Object.assign({}, prev);
            });
        } catch (err) {
            alert(err);
        }
    };

    const handleCategoryClick = (categoryNo: number) => {
        setCurrentCategoryNo(categoryNo);
    };

    const onMoreButtonClick = () => setListItemCount((prev) => prev + 5);

    useEffect(() => {
        setListItemCount(5);
    }, [currentCategoryNo]);

    const searchKeyword = useRef<HTMLInputElement>(null);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await board.getArticlesByBoardNo('9216', {
                keyword: searchKeyword.current?.value,
            });
            if (data) {
                setFaqData(data.data);
            }
        } catch (error) {
            alert('알 수 없는 에러 발생!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FaqContainer>
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
            <FaqTitle>자주 묻는 질문</FaqTitle>
            <FaqBox>
                <FaqSearchBox onSubmit={handleSearch}>
                    <FaqSearchInput
                        placeholder='궁금한 점을 검색해보세요!'
                        ref={searchKeyword}
                    />
                    <FaqSearchButton>검색</FaqSearchButton>
                </FaqSearchBox>
            </FaqBox>
            <FaqCategoryContainer>
                {faqList.map(({ categoryNo, label }) => {
                    return (
                        <FaqCategoryBox
                            className={
                                currentCategoryNo === categoryNo
                                    ? 'isActive'
                                    : ''
                            }
                            id={`${categoryNo}`}
                            key={categoryNo}
                            onClick={() => handleCategoryClick(categoryNo)}
                        >
                            {label}({faqDataList?.[`${categoryNo}`]?.length})
                        </FaqCategoryBox>
                    );
                })}
            </FaqCategoryContainer>
            {isLoading ? (
                <Loader />
            ) : (
                <FaqDetailContainer>
                    <p>
                        {
                            faqList?.filter(
                                (item) => item.categoryNo === currentCategoryNo,
                            )[0]?.label
                        }
                        ({faqDataList?.[`${currentCategoryNo}`]?.length})
                    </p>
                    <div>
                        {faqDataList?.[`${currentCategoryNo}`]
                            ?.slice(0, listItemCount)
                            ?.map(
                                ({
                                    categoryLabel,
                                    articleNo,
                                    title,
                                    content,
                                }) => {
                                    return (
                                        <FaqDetailBox
                                            onClick={() =>
                                                getNoticeDetailHandler(
                                                    articleNo,
                                                )
                                            }
                                            key={articleNo}
                                        >
                                            <FaqDetailLabel>
                                                {categoryLabel}
                                            </FaqDetailLabel>
                                            <SectionDropdown title={title}>
                                                {content && (
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: content,
                                                        }}
                                                    ></p>
                                                )}
                                            </SectionDropdown>
                                        </FaqDetailBox>
                                    );
                                },
                            )}
                    </div>
                </FaqDetailContainer>
            )}
            {faqDataList?.[`${currentCategoryNo}`]?.length &&
                faqDataList?.[`${currentCategoryNo}`]?.length >
                    listItemCount && (
                    <div onClick={onMoreButtonClick}>더보기</div>
                )}
        </FaqContainer>
    );
};

export default Faq;
