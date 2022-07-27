import { useState } from 'react';
import { map, pipe, toArray } from '@fxts/core';
import styled, { css } from 'styled-components';

import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import InputWithIcon from 'components/Input/InputWithIcon';
import { useQueryString } from 'hooks';

interface tab {
    key: string;
    name: string;
    isActive: boolean;
}

const SearchResultSummary = styled.div`
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
    :not(:last-child) {
        margin-right: 40px;
    }
    color: ${(props) => (props.isActive ? '#191919' : '#8F8F8F')};
    ${(props) =>
        props.isActive &&
        css`
            text-decoration: underline;
            font-weight: bold;
        `};
`;

const SearchResultContainer = styled.div``;

const Search = () => {
    const { query } = useQueryString();
    const [productList, setProductList] = useState([]);
    const [manualList, setManualList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [golfCourseList, setGolfCourseList] = useState([]);

    const [searchTab, setSearchTab] = useState<tab[]>([
        { key: 'product', name: '상품', isActive: true },
        { key: 'manual', name: '매뉴얼', isActive: false },
        { key: 'notice', name: '공지사항', isActive: false },
        { key: 'golfCourse', name: '지원골프코스', isActive: false },
    ]);

    const onSearchTabClick = (
        e: React.MouseEvent<HTMLLIElement>,
        query: string,
    ) => {
        setSearchTab((prev: tab[]) =>
            pipe(
                prev,
                map((a: tab) => ({ ...a, isActive: a.key === query })),
                toArray,
            ),
        );
    };

    const getSearchListLength = (key: string) => {
        if (key === 'product') {
            return productList.length;
        }
        if (key === 'manual') {
            return manualList.length;
        }
        if (key === 'notice') {
            return noticeList.length;
        }
        if (key === 'golfCourse') {
            return golfCourseList.length;
        }
    };

    return (
        <>
            <Header />
            <LayoutResponsive type='large'>
                <SearchResultSummary>
                    <SearchResultTitle>
                        {`'${query}'에 대한 `}
                        <span>
                            {productList.length +
                                manualList.length +
                                noticeList.length +
                                golfCourseList.length}
                        </span>
                        개의 통합 검색결과입니다.
                    </SearchResultTitle>
                    <InputWithIcon
                        placeholder='검색어를 입력해주세요.'
                        containerProps={{
                            style: {
                                borderLeft: 0,
                                borderRight: 0,
                                borderTop: 0,
                            },
                        }}
                    />
                </SearchResultSummary>

                <SearchResultContainer>
                    <SearchFilter>
                        {searchTab?.map(({ key, name, isActive }) => {
                            return (
                                <SearchFilterItem
                                    key={key}
                                    onClick={(
                                        e: React.MouseEvent<HTMLLIElement>,
                                    ) => onSearchTabClick(e, key)}
                                    isActive={isActive}
                                >{`${name}(${getSearchListLength(
                                    key,
                                )})`}</SearchFilterItem>
                            );
                        })}
                    </SearchFilter>
                </SearchResultContainer>
            </LayoutResponsive>
        </>
    );
};

export default Search;
