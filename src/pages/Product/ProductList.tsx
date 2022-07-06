import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { head } from '@fxts/core';

import { category } from 'api/display';
import { product } from 'api/product';
import Header from 'components/shared/Header';
import { Item } from 'models/product';
import { filter } from 'const/filter';
import { PRODUCT_BY, ORDER_DIRECTION } from 'models';
import SEOHelmet from 'components/shared/SEOHelmet';
import Loader from 'components/shared/Loader';
import currency from 'currency.js';

const ProductListContainer = styled.div`
    padding: 0 20px;
`;

const ProductListTop = styled.div``;

const ProductListTitle = styled.h2``;

const ProductListCategoryBox = styled.div`
    display: flex;
`;

const ProductListCategory = styled.div``;

const ProductListFilterBox = styled.select``;

const ProductListFilter = styled.option``;

const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
`;

const ProductBox = styled.div`
    width: 25%;
    padding: 15px;
    > img {
        display: block;
        width: 100%;
    }
`;

const ProductList = () => {
    const { categoryNo } = useParams<{ categoryNo: string }>();
    const [orderBy, setOrderBy] = useState(PRODUCT_BY.RECENT_PRODUCT);
    const [direction, setDirection] = useState(ORDER_DIRECTION.DESC);
    const [currentCategoryNo, setCurrentCategoryNo] =
        useState<string | undefined>(categoryNo);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentCategoryNo(categoryNo);
    }, [categoryNo]);

    const { data: productCategoryList, isFetching: categoryFetching } =
        useQuery(
            ['productCategoryList', { categoryNo }],
            async () => await category.getCategory(categoryNo!),
            {
                select: ({ data }) => {
                    return data?.multiLevelCategories;
                },
                refetchOnWindowFocus: false,
            },
        );

    const { data: productItems, isFetching: productFetching } = useQuery(
        ['productList', { currentCategoryNo, orderBy, direction }],
        async () =>
            await product.searchProducts({
                categoryNos: currentCategoryNo,
                hasOptionValues: true,
                order: { by: orderBy, direction: direction },
            }),
        {
            select: (res) => {
                return res.data.items;
            },
            refetchOnWindowFocus: false,
        },
    );

    const filterChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [orderBy, orderDirection] = e.target.value.split(',');
        setOrderBy(orderBy as PRODUCT_BY);
        setDirection(orderDirection as ORDER_DIRECTION);
    };

    return (
        <>
            <SEOHelmet
                data={{
                    title:
                        productCategoryList && head(productCategoryList)?.label,
                }}
            />
            <Header />
            {categoryFetching ? (
                <Loader />
            ) : (
                productCategoryList && (
                    <ProductListContainer>
                        <ProductListTop>
                            <ProductListTitle>
                                {head(productCategoryList)?.label}
                            </ProductListTitle>
                            <ProductListCategoryBox>
                                {head(productCategoryList)?.children?.length! >
                                    0 && (
                                    <ProductListCategory
                                        key={categoryNo}
                                        onClick={() =>
                                            setCurrentCategoryNo(categoryNo)
                                        }
                                    >
                                        전체보기
                                    </ProductListCategory>
                                )}
                                {head(productCategoryList)?.children?.map(
                                    ({ categoryNo, label }) => {
                                        return (
                                            <ProductListCategory
                                                key={categoryNo}
                                                onClick={() =>
                                                    setCurrentCategoryNo(
                                                        categoryNo.toString(),
                                                    )
                                                }
                                            >
                                                {label}
                                            </ProductListCategory>
                                        );
                                    },
                                )}
                            </ProductListCategoryBox>
                            <ProductListFilterBox
                                onChange={filterChangeHandler}
                            >
                                {filter.map(({ title, orderBy, direction }) => {
                                    return (
                                        <ProductListFilter
                                            key={title}
                                            value={[orderBy, direction]}
                                        >
                                            {title}
                                        </ProductListFilter>
                                    );
                                })}
                            </ProductListFilterBox>
                        </ProductListTop>
                        {productFetching ? (
                            <Loader />
                        ) : (
                            <ProductContainer>
                                {productItems?.map(
                                    ({
                                        productNo,
                                        listImageUrls,
                                        productName,
                                        promotionText,
                                        salePrice,
                                        immediateDiscountAmt,
                                    }: Item) => {
                                        return (
                                            <ProductBox
                                                key={productNo}
                                                onClick={() => {
                                                    navigate(
                                                        `/product/detail/${productNo}`,
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={head(listImageUrls)}
                                                    alt={productName}
                                                />
                                                <p>{productName}</p>
                                                <p>{promotionText}</p>
                                                <p>
                                                    {currency(
                                                        salePrice -
                                                            immediateDiscountAmt,
                                                        {
                                                            symbol: '',
                                                            precision: 0,
                                                        },
                                                    ).format()}
                                                    <span>원</span>
                                                </p>
                                            </ProductBox>
                                        );
                                    },
                                )}
                            </ProductContainer>
                        )}
                    </ProductListContainer>
                )
            )}
        </>
    );
};

export default ProductList;
