import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { head } from '@fxts/core';

import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import InputWithIcon from 'components/Input/InputWithIcon';
import ManualCard from 'components/Card/ManualCard';
import Loader from 'components/shared/Loader';
import { category } from 'api/display';
import { product } from 'api/product';
import { ORDER_DIRECTION, PRODUCT_BY, PRODUCT_SALE_STATUS } from 'models';
import { ProductItem, ProductSearchParams } from 'models/product';

const ManagerCategoryList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ManagerCategoryListItem = styled.li<{ isActive?: boolean }>`
    margin: 0 10px;
    padding-bottom: 3px;
    font-size: 16px;
    color: ${(props) =>
        props.isActive ? props.theme.text1 : props.theme.text2};
    text-decoration: ${(props) => props.isActive && 'underline'};

    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
`;

const ManualList = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const { t: manual } = useTranslation('manual');
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState('');
    const [searchParams, setSearchParams] = useState<ProductSearchParams>(
        () => {
            return {
                pageNumber: 1,
                pageSize: 10,
                hasOptionValues: true,
                filter: {
                    saleStatus: PRODUCT_SALE_STATUS.ALL_CONDITIONS,
                    soldout: true,
                },
                order: {
                    by: PRODUCT_BY.MD_RECOMMEND,
                    direction: ORDER_DIRECTION.DESC,
                },
            };
        },
    );

    const { data: multiLevelCategories } = useQuery(
        ['categories'],
        async () => await category.getCategories(),
        {
            refetchOnWindowFocus: false,
            select: ({ data }) => {
                return data.multiLevelCategories;
            },
        },
    );

    const onKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setKeywords(e.target.value);

    const { data: productList, isFetching } = useQuery(
        ['category_products', searchParams],
        async () => await product.searchProducts(searchParams),
        {
            refetchOnWindowFocus: false,
            staleTime: 10000,
            cacheTime: 10000,
            select: ({ data: { items } }) => {
                return items;
            },
        },
    );

    const onCategoryClick = (categoryNo: number) => {
        if (categoryNo === 0) {
            setSelectedCategory(0);
            setSearchParams((prev: any) => {
                delete prev.categoryNos;
                return {
                    ...prev,
                };
            });
        } else {
            setSelectedCategory(categoryNo);
            setSearchParams((prev: any) => {
                return {
                    ...prev,
                    categoryNos: categoryNo,
                };
            });
        }
    };

    const onSearchClick = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams((prev: ProductSearchParams) => ({
            ...prev,
            filter: {
                keywords,
            },
        }));
    };

    return (
        <>
            <SEOHelmet
                data={{
                    title: manual('manualTitle'),
                }}
            />
            <Header />
            <div style={{ padding: '10px', width: '1280px', margin: '0 auto' }}>
                <div style={{ marginTop: '4rem' }}>
                    <h1 style={{ fontSize: '24px' }}>
                        {manual('manualTitle')}
                    </h1>
                </div>

                <form
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '1.5rem',
                    }}
                    onSubmit={onSearchClick}
                >
                    <ManagerCategoryList>
                        <ManagerCategoryListItem
                            isActive={selectedCategory === 0}
                            onClick={() => onCategoryClick(0)}
                        >
                            전체보기
                        </ManagerCategoryListItem>

                        {multiLevelCategories?.map(({ categoryNo, label }) => (
                            <ManagerCategoryListItem
                                isActive={selectedCategory === categoryNo}
                                key={categoryNo}
                                onClick={() => onCategoryClick(categoryNo)}
                            >
                                {label}
                            </ManagerCategoryListItem>
                        ))}
                    </ManagerCategoryList>

                    <InputWithIcon
                        placeholder='상품명을 검색하세요.'
                        value={keywords}
                        onChange={onKeywordsChange}
                    />
                </form>

                <div style={{ display: 'flex', marginTop: '2rem' }}>
                    <main style={{ flex: '1 1 0%' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: '-1rem',
                            }}
                        >
                            {isFetching ? (
                                <Loader />
                            ) : (
                                productList?.map(
                                    ({
                                        productNo,
                                        productName,
                                        imageUrls,
                                    }: ProductItem) => (
                                        <ManualCard
                                            key={productNo}
                                            title={productName}
                                            imgUrl={head<string[]>(imageUrls)}
                                            onClick={() =>
                                                navigate(
                                                    `/manual/detail/${productNo}`,
                                                )
                                            }
                                        />
                                    ),
                                )
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ManualList;
