import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueries } from 'react-query';
import { map, pipe, some, toArray } from '@fxts/core';
import styled, { css } from 'styled-components';

import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import InputWithIcon from 'components/Input/InputWithIcon';
import { useQueryString } from 'hooks';
import { board } from 'api/manage';
import { product } from 'api/product';
import { ArticleParams, BoardListItem } from 'models/manage';
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

const NoContentTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    color: #a8a8a8;
    padding: 40px 0;
`;

const Search = () => {
    const { keywords } = useQueryString();

    const [query, setQuery] = useState('');
    const [productList, setProductList] = useState([]);
    const [manualList, setManualList] = useState<BoardListItem[]>([]);
    const [manualListSearchCondition, setManualListSearchCondition] =
        useState<ArticleParams>({
            keyword: query as string,
            direction: ORDER_DIRECTION.DESC,
            pageNumber: 1,
            pageSize: 10,
        });
    const [noticeList, setNoticeList] = useState<BoardListItem[]>([]);
    const [noticeSearchListCondition, setNoticeSearchListCondition] =
        useState<ArticleParams>({
            keyword: query as string,
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

        if (key === 'manual') {
            setManualListSearchCondition((prev: any) => {
                return { ...prev, direction: key };
            });
        }
        if (key === 'notice') {
            setNoticeSearchListCondition((prev: any) => {
                return { ...prev, direction: key };
            });
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
                }),
            onSuccess: (response: any) => {
                setNoticeList(response.data.items);
            },
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
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
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
        },
        {
            queryKey: [
                'productList',
                {
                    filter: {
                        keywords: keywords,
                        direction: ORDER_DIRECTION.DESC,
                    },
                    hasTotalCount: true,
                    pageNumber: 1,
                    pageSize: 10,
                },
            ],
            queryFn: async () =>
                await product.searchProducts({
                    filter: { keywords: keywords as string },
                    order: { direction: ORDER_DIRECTION.DESC },
                    hasTotalCount: true,
                    pageNumber: 1,
                    pageSize: 10,
                }),
            onSuccess: (response: any) => {
                setProductList(response.data.items);
            },
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
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
                                    padding: '40px 0',
                                    marginTop: '40px',
                                }}
                            >
                                {/* TODO: active된 tab에 따라 달라져야함!! */}
                                <NoContentTitle>
                                    검색된 상품이 없습니다.
                                </NoContentTitle>
                            </div>
                        </>
                    )}
                </SearchResultContainer>
            </LayoutResponsive>
        </>
    );
};

export default Search;
