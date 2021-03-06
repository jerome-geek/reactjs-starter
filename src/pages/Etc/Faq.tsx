import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';

import SEOHelmet from 'components/shared/SEOHelmet';
import media from 'utils/styles/media';
import { board } from 'api/manage';
import { BoardCategory, BoardList, BoardListItem } from 'models/manage';
import SectionDropdown from 'components/SectionDropdown';
import Loader from 'components/shared/Loader';
import { useTypedSelector } from 'state/reducers';
import paths from 'const/paths';

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

const FaqCategoryBox = styled.div<{ isActive?: boolean }>`
    width: calc(100% / 3);
    border: 1px solid #aaa;
    margin-top: -0.5px;
    margin-bottom: -0.5px;
    border-left: none;
    text-align: center;
    padding: 18px 0;
    color: #aaa;
    cursor: pointer;
    background: ${(props) => (props.isActive ? '#000' : '#fff')};
    color: ${(props) => (props.isActive ? '#fff' : '#000')};
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

const InquiryButton = styled.div`
    width: 150px;
    text-align: center;
    padding: 10px 10px;
    border-radius: 5px;
    border: 2px solid #000;
    font-weight: bold;
    font-size: 15px;
    margin: 10px auto;
    cursor: pointer;
    :hover {
        background: #000;
        color: #fff;
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
    const navigate = useNavigate();
    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    useQuery<AxiosResponse<BoardCategory[]>, AxiosError>(
        ['faqCategoryList'],
        async () => await board.getCategories('9216'),
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
                alert('?????? ?????? ????????? ??????????????????.');
            },
            refetchOnWindowFocus: false,
        },
    );

    const { isFetching, refetch } = useQuery<
        AxiosResponse<BoardList>,
        AxiosError
    >(
        ['faqList'],
        async () =>
            await board.getArticlesByBoardNo('9216', {
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
                alert('?????? ?????? ????????? ??????????????????.');
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
                    '9216',
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

    const goInquiryPage = () => {
        if (!member) {
            alert('????????? ??? ??????????????????');
            navigate(paths.LOGIN);
        }
        // TODO inquiry ???????????? ?????????
    };

    return (
        <FaqContainer>
            <SEOHelmet
                data={{
                    title: '?????? ?????? ??????',
                    meta: {
                        title: '?????? ?????? ??????',
                        description: 'FAQ',
                    },
                    og: {
                        title: '?????? ?????? ??????',
                        description: 'FAQ',
                    },
                }}
            />
            <FaqTitle>?????? ?????? ??????</FaqTitle>
            <FaqBox>
                <FaqSearchBox
                    onSubmit={(e) => {
                        e.preventDefault();
                        refetch();
                    }}
                >
                    <FaqSearchInput
                        placeholder='????????? ?????? ??????????????????!'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <FaqSearchButton>??????</FaqSearchButton>
                </FaqSearchBox>
            </FaqBox>
            <FaqCategoryContainer>
                {faqCategoryList.map(({ categoryNo, label }) => {
                    return (
                        faqList.get(categoryNo) && (
                            <FaqCategoryBox
                                isActive={categoryNo === currentCategoryNo}
                                key={categoryNo}
                                onClick={handleCategoryClick(categoryNo)}
                            >
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
                    {faqList.get(currentCategoryNo)?.size ? (
                        <>
                            <p>
                                {
                                    faqCategoryList?.filter(
                                        (item) =>
                                            item.categoryNo ===
                                            currentCategoryNo,
                                    )[0]?.label
                                }
                                ({faqList.get(currentCategoryNo)?.size})
                            </p>
                            <div>
                                {Array.from(faqList.get(currentCategoryNo)!)
                                    .slice(0, listItemCount)
                                    .map(([key, data]) => {
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
                            </div>
                        </>
                    ) : (
                        <p>??????????????? ????????????.</p>
                    )}
                </FaqDetailContainer>
            )}
            {faqList.has(currentCategoryNo) &&
                faqList.get(currentCategoryNo)!.size > listItemCount && (
                    <div
                        onClick={() => setListItemCount((prev) => prev + count)}
                    >
                        ?????????
                    </div>
                )}
            <InquiryButton onClick={goInquiryPage}>1:1 ????????????</InquiryButton>
        </FaqContainer>
    );
};

export default Faq;
