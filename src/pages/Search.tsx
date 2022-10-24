import { useState, useMemo, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueries } from 'react-query';
import { filter, head, map, pipe, some, toArray } from '@fxts/core';
import styled, { css } from 'styled-components';
import { useWindowSize } from 'usehooks-ts';

import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import FlexContainer from 'components/shared/FlexContainer';
import InputWithIcon from 'components/Input/InputWithIcon';
import ProductSearchResult from 'components/Search/ProductSearchResult';
import ManualSearchResult from 'components/Search/ManualSearchResult';
import NoticeSearchResult from 'components/Search/NoticeSearchResult';
import GolfCourseSearchResult from 'components/Search/GolfCourseSearchResult';
import { useQueryString } from 'hooks';
import BOARD from 'const/board';
import BREAKPOINTS from 'const/breakpoints';
import { board } from 'api/manage';
import { product } from 'api/product';
import media from 'utils/styles/media';
import {
    ArticleParams,
    BoardListItem as BoardListItemModel,
} from 'models/manage';
import { ProductSearchParams } from 'models/product';
import { ORDER_DIRECTION } from 'models';

interface tab {
    key: string;
    name: string;
    isActive: boolean;
}

const SearchContainer = styled(LayoutResponsive)``;

const SearchResultSummary = styled.form`
    width: 100%;
    background-color: #f8f8fa;
    padding: 60px 0;
    margin-bottom: 40px;

    ${media.small} {
        background-color: #fff;
    }
`;
const SearchResultTitle = styled.p`
    font-size: 32px;
    line-height: 48px;
    text-align: center;
    letter-spacing: 0px;
    margin-bottom: 40px;

    ${media.small} {
        font-size: 20px;
        line-height: 28px;
        text-align: left;
        letter-spacing: -1px;
    }
`;

const SearchResultkeywords = styled.span`
    font-weight: bold;
    color: #191919;
`;

const SearchResultCount = styled.span`
    color: #c00020;
`;

const SearchFilter = styled.ul`
    display: flex;
`;

const SearchFilterItem = styled.li<{ isActive: boolean }>`
    color: ${(props) => (props.isActive ? '#191919' : '#8F8F8F')};
    cursor: pointer;
    ${(props) =>
        props.isActive &&
        css`
            text-decoration: underline;
            font-weight: bold;
        `};
    :not(:last-child) {
        margin-right: 40px;
    }
`;

const SearchResultContainer = styled.div``;

const Search = () => {
    const { keywords } = useQueryString() as { keywords: string };

    const [query, setQuery] = useState('');
    const onInputChange = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => setQuery(value);

    const [productListTotalCount, setProductListTotalCount] = useState(0);
    const [productList, setProductList] = useState([]);
    const [productListSearchCondition, setProductListSearchCondition] =
        useState<ProductSearchParams>({
            filter: {
                keywords: keywords,
            },
            order: {
                direction: ORDER_DIRECTION.DESC,
            },
            hasTotalCount: true,
            pageNumber: 1,
            pageSize: 10,
        });

    const [manualListTotalCount, setManualListTotalCount] = useState(0);
    const [manualList, setManualList] = useState<BoardListItemModel[]>([]);
    const [manualListSearchCondition, setManualListSearchCondition] =
        useState<ArticleParams>({
            keyword: keywords,
            direction: ORDER_DIRECTION.DESC,
            pageNumber: 1,
            pageSize: 10,
            hasTotalCount: true,
        });

    const [noticeListTotalCount, setNoticeListTotalCount] = useState(0);
    const [noticeList, setNoticeList] = useState<BoardListItemModel[]>([]);
    const [noticeSearchListCondition, setNoticeSearchListCondition] =
        useState<ArticleParams>({
            keyword: keywords,
            direction: ORDER_DIRECTION.DESC,
            pageNumber: 1,
            pageSize: 10,
            hasTotalCount: true,
        });

    const [golfCourseListTotalCount, setGolfCourseListTotalCount] = useState(0);
    const [golfCourseList, setGolfCourseList] = useState([]);

    const [searchTab, setSearchTab] = useState<tab[]>([
        { key: 'product', name: '상품', isActive: true },
        { key: 'manual', name: '매뉴얼', isActive: false },
        { key: 'notice', name: '공지사항', isActive: false },
        { key: 'golfCourse', name: '지원골프코스', isActive: false },
    ]);

    const [orderTab, setOrderTab] = useState<tab[]>([
        { key: ORDER_DIRECTION.DESC, name: '최신순', isActive: true },
        { key: ORDER_DIRECTION.ASC, name: '오래된 순', isActive: false },
    ]);

    useEffect(() => {
        setProductListSearchCondition((prev) => ({
            ...prev,
            filter: {
                keywords,
            },
        }));
        setManualListSearchCondition((prev) => ({
            ...prev,
            keyword: keywords,
        }));
        setNoticeSearchListCondition((prev) => ({
            ...prev,
            keyword: keywords,
        }));
    }, [keywords]);

    const activeTab = useMemo(() => {
        return pipe(
            searchTab,
            filter((a) => a.isActive),
            toArray,
            head,
        );
    }, [searchTab]);

    const onSearchTabClick = (key: string) => {
        setSearchTab((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isActive: a.key === key })),
                toArray,
            ),
        );
    };

    const onOrderTabClick = (key: string) => {
        setOrderTab((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isActive: a.key === key })),
                toArray,
            ),
        );

        // TODO: activeTab의 검색결과 조건을 바꿔준다
        // if (key === 'product') {
        //     setProductListSearchCondition((prev: ProductSearchParams) => ({
        //         ...prev,
        //         order: { direction: key },
        //     }));
        // }
        // if (key === 'manual') {
        //     setManualListSearchCondition((prev: ArticleParams) => ({
        //         ...prev,
        //         direction: key,
        //     }));
        // }
        // if (key === 'notice') {
        //     setNoticeSearchListCondition((prev: ArticleParams) => ({
        //         ...prev,
        //         direction: key,
        //     }));
        // }
    };

    // TODO 검색결과는 페이징여부와 상관없이 모든 카운트를 알고 있어야 한다
    const results = useQueries([
        {
            queryKey: [
                'noticeList',
                {
                    ...noticeSearchListCondition,
                },
            ],
            queryFn: async () =>
                await board.getArticlesByBoardNo(BOARD.NOTICE, {
                    ...noticeSearchListCondition,
                }),
            onSuccess: (response: any) => {
                setNoticeListTotalCount(response.data.totalCount);
                setNoticeList(response.data.items);
            },
        },
        {
            queryKey: [
                'manualList',
                {
                    ...manualListSearchCondition,
                },
            ],
            queryFn: async () =>
                await board.getArticlesByBoardNo(BOARD.MANUAL, {
                    ...manualListSearchCondition,
                }),
            onSuccess: (response: any) => {
                setManualListTotalCount(response.data.totalCount);
                setManualList(response.data.items);
            },
        },
        {
            queryKey: ['productList', { ...productListSearchCondition }],
            queryFn: async () =>
                await product.searchProducts({
                    ...productListSearchCondition,
                }),
            onSuccess: (response: any) => {
                setProductList(response.data.items);
            },
        },
    ]);

    const isLoading = useMemo(
        () => some((result) => result.isLoading, results),
        [results],
    );

    const getSearchListLength = (key?: string) => {
        switch (key) {
            case 'product':
                return productListTotalCount;
            case 'manual':
                return manualListTotalCount;
            case 'notice':
                return noticeListTotalCount;
            case 'golfCourse':
                return golfCourseListTotalCount;
            default:
                return (
                    productListTotalCount +
                    manualListTotalCount +
                    noticeListTotalCount +
                    golfCourseListTotalCount
                );
        }
    };

    const navigate = useNavigate();
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProductListSearchCondition((prev: ProductSearchParams) => ({
            ...prev,
            filter: { keywords: query },
        }));
        setManualListSearchCondition((prev) => ({
            ...prev,
            keyword: query,
        }));
        setNoticeSearchListCondition((prev) => ({
            ...prev,
            keyword: query,
        }));

        navigate(
            {
                pathname: '/search',
                search: `?keywords=${query}`,
            },
            { replace: true },
        );
    };

    const { width } = useWindowSize();

    return (
        <>
            <Header />

            <SearchContainer>
                <SearchResultSummary onSubmit={onSubmitHandler}>
                    <SearchResultTitle>
                        <SearchResultkeywords>
                            '{`${keywords}`}'
                        </SearchResultkeywords>
                        에 대한&nbsp;
                        <SearchResultCount>
                            {getSearchListLength()}
                        </SearchResultCount>
                        개의
                        {width <= BREAKPOINTS.SMALL && <br />}통합
                        검색결과입니다.
                    </SearchResultTitle>
                    <InputWithIcon
                        placeholder='검색어를 입력해주세요.'
                        name='keywords'
                        containerProps={{
                            style: {
                                borderLeft: 0,
                                borderRight: 0,
                                borderTop: 0,
                                width: '60%',
                                margin: '0 auto',
                            },
                        }}
                        onChange={onInputChange}
                    />

                    <FlexContainer style={{ display: 'none' }}>
                        <SearchFilter>
                            {searchTab?.map(({ key, name, isActive }) => {
                                return (
                                    <SearchFilterItem
                                        key={key}
                                        onClick={() => onSearchTabClick(key)}
                                        isActive={isActive}
                                    >{`${name}(${getSearchListLength(
                                        key,
                                    )})`}</SearchFilterItem>
                                );
                            })}
                        </SearchFilter>
                        <SearchFilter>
                            {orderTab?.map(({ key, name, isActive }) => {
                                return (
                                    <SearchFilterItem
                                        key={key}
                                        onClick={() => onOrderTabClick(key)}
                                        isActive={isActive}
                                    >
                                        {name}
                                    </SearchFilterItem>
                                );
                            })}
                        </SearchFilter>
                    </FlexContainer>
                </SearchResultSummary>

                <SearchResultContainer>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <SearchFilter>
                                    {searchTab?.map(
                                        ({ key, name, isActive }) => {
                                            return (
                                                <SearchFilterItem
                                                    key={key}
                                                    onClick={() =>
                                                        onSearchTabClick(key)
                                                    }
                                                    isActive={isActive}
                                                >{`${name}(${getSearchListLength(
                                                    key,
                                                )})`}</SearchFilterItem>
                                            );
                                        },
                                    )}
                                </SearchFilter>
                                <SearchFilter>
                                    {orderTab?.map(
                                        ({ key, name, isActive }) => {
                                            return (
                                                <SearchFilterItem
                                                    key={key}
                                                    onClick={() =>
                                                        onOrderTabClick(key)
                                                    }
                                                    isActive={isActive}
                                                >
                                                    {name}
                                                </SearchFilterItem>
                                            );
                                        },
                                    )}
                                </SearchFilter>
                            </div>

                            {activeTab?.key === 'product' && (
                                <ProductSearchResult />
                            )}
                            {activeTab?.key === 'manual' && (
                                <ManualSearchResult />
                            )}
                            {activeTab?.key === 'notice' && (
                                <NoticeSearchResult
                                    noticeListTotalCount={noticeListTotalCount}
                                    noticeSearchListCondition={
                                        noticeSearchListCondition
                                    }
                                    noticeList={noticeList}
                                    setNoticeList={setNoticeList}
                                    setNoticeSearchListCondition={
                                        setNoticeSearchListCondition
                                    }
                                />
                            )}
                            {activeTab?.key === 'golfCourse' && (
                                <GolfCourseSearchResult />
                            )}
                        </>
                    )}
                </SearchResultContainer>
            </SearchContainer>
        </>
    );
};

export default Search;
