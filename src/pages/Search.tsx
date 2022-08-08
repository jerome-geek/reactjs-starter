import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueries } from 'react-query';
import { filter, head, map, pipe, some, toArray } from '@fxts/core';
import styled, { css } from 'styled-components';

import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import InputWithIcon from 'components/Input/InputWithIcon';
import ProductSearchResult from 'components/Search/ProductSearchResult';
import ManualSearchResult from 'components/Search/ManualSearchResult';
import NoticeSearchResult from 'components/Search/NoticeSearchResult';
import GolfCourseSearchResult from 'components/Search/GolfCourseSearchResult';
import { useQueryString } from 'hooks';
import { board } from 'api/manage';
import { product } from 'api/product';
import {
    ArticleParams,
    BoardListItem as BoardListItemModel,
} from 'models/manage';
import { ProductSearchParams } from 'models/product';
import { ORDER_DIRECTION } from 'models';
import BOARD from 'const/board';

interface tab {
    key: string;
    name: string;
    isActive: boolean;
}

const SearchResultSummary = styled.form`
    width: 100%;
    background-color: #f8f8fa;
    padding: 60px 0;
    margin-bottom: 40px;
`;
const SearchResultTitle = styled.p`
    font-size: 32px;
    line-height: 47px;

    & > span {
        color: #c00020;
    }
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
    const { keywords } = useQueryString();

    const [query, setQuery] = useState('');
    const [productList, setProductList] = useState([]);
    const [productListSearchCondition, setProductListSearchCondition] =
        useState<ProductSearchParams>({
            filter: {
                keywords: keywords as string,
            },
            order: {
                direction: ORDER_DIRECTION.DESC,
            },
            hasTotalCount: true,
            pageNumber: 1,
            pageSize: 10,
        });
    const [manualList, setManualList] = useState<BoardListItemModel[]>([]);
    const [manualListSearchCondition, setManualListSearchCondition] =
        useState<ArticleParams>({
            keyword: keywords as string,
            direction: ORDER_DIRECTION.DESC,
            pageNumber: 1,
            pageSize: 10,
        });
    const [noticeList, setNoticeList] = useState<BoardListItemModel[]>([]);
    const [noticeSearchListCondition, setNoticeSearchListCondition] =
        useState<ArticleParams>({
            keyword: keywords as string,
            direction: ORDER_DIRECTION.DESC,
            pageNumber: 1,
            pageSize: 10,
        });
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

    const activeTab = useMemo(() => {
        return pipe(
            searchTab,
            filter((a: tab) => a.isActive),
            toArray,
            head,
        );
    }, [searchTab]);

    const onSearchTabClick = (
        e: React.MouseEvent<HTMLLIElement>,
        key: string,
    ) => {
        setSearchTab((prev: tab[]) =>
            pipe(
                prev,
                map((a: tab) => ({ ...a, isActive: a.key === key })),
                toArray,
            ),
        );
    };

    const onOrderTabClick = (
        e: React.MouseEvent<HTMLLIElement>,
        key: string,
    ) => {
        setOrderTab((prev: tab[]) =>
            pipe(
                prev,
                map((a: tab) => ({ ...a, isActive: a.key === key })),
                toArray,
            ),
        );

        if (key === 'product') {
            setProductListSearchCondition((prev: any) => ({
                ...prev,
                order: { direction: key },
            }));
        }
        if (key === 'manual') {
            setManualListSearchCondition((prev: any) => ({
                ...prev,
                direction: key,
            }));
        }
        if (key === 'notice') {
            setNoticeSearchListCondition((prev: any) => ({
                ...prev,
                direction: key,
            }));
        }
    };

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
                    hasTotalCount: true,
                }),
            onSuccess: (response: any) => {
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

    const isLoading = some((result) => result.isLoading, results);

    const getSearchListLength = (key?: string) => {
        switch (key) {
            case 'product':
                return productList.length;
            case 'manual':
                return manualList.length;
            case 'notice':
                return noticeList.length;
            case 'golfCourse':
                return golfCourseList.length;
            default:
                return (
                    productList.length +
                    manualList.length +
                    noticeList.length +
                    golfCourseList.length
                );
        }
    };

    const onInputChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => setQuery(value);

    const navigate = useNavigate();
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProductListSearchCondition((prev: ProductSearchParams) => ({
            ...prev,
            filter: { keywords: query },
        }));
        setManualListSearchCondition((prev: ArticleParams) => ({
            ...prev,
            keyword: query,
        }));
        setNoticeSearchListCondition((prev: ArticleParams) => ({
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

    return (
        <>
            <Header />
            <LayoutResponsive type='large'>
                <SearchResultSummary onSubmit={onSubmitHandler}>
                    <SearchResultTitle>
                        {`'${keywords}'에 대한 `}
                        <span>{getSearchListLength()}</span>
                        개의 통합 검색결과입니다.
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
                                                    onClick={(
                                                        e: React.MouseEvent<HTMLLIElement>,
                                                    ) =>
                                                        onSearchTabClick(e, key)
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
                                                    onClick={(
                                                        e: React.MouseEvent<HTMLLIElement>,
                                                    ) =>
                                                        onOrderTabClick(e, key)
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

                            <div
                                style={{
                                    borderTop: '2px solid #222943',
                                    borderBottom: '1px solid #222943',
                                    margin: '40px 0',
                                }}
                            >
                                {activeTab?.key === 'product' && (
                                    <ProductSearchResult />
                                )}
                                {activeTab?.key === 'manual' && (
                                    <ManualSearchResult />
                                )}
                                {activeTab?.key === 'notice' && (
                                    <NoticeSearchResult />
                                )}
                                {activeTab?.key === 'golfCourse' && (
                                    <GolfCourseSearchResult />
                                )}
                            </div>
                        </>
                    )}
                </SearchResultContainer>
            </LayoutResponsive>
        </>
    );
};

export default Search;
