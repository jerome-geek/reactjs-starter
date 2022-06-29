import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { category } from 'api/display';
import { product } from 'api/product';
import Header from 'components/shared/Header';
import { Item } from 'api/product/product';
import { filter } from 'const/filter';
import { PRODUCT_BY, ORDER_DIRECTION } from 'models';

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
    const { categoryNo } = useParams() as { categoryNo: string };
    const [orderBy, setOrderBy] = useState(PRODUCT_BY.RECENT_PRODUCT);
    const [direction, setDirection] = useState(ORDER_DIRECTION.DESC);
    const [currentCategoryNo, setCurrentCategoryNo] = useState('');
    const [secondaryCategory, setSecondaryCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentCategoryNo(categoryNo);
        setSecondaryCategory(categoryNo);
    }, [categoryNo]);

    const { data: productCategoryList } = useQuery(
        ['productCategoryList', { currentCategoryNo }],
        async () => await category.getCategory(currentCategoryNo),
        {
            select: ({ data }) => {
                return data?.multiLevelCategories;
            },
        },
    );

    const { data: items } = useQuery(
        ['productList', { secondaryCategory, orderBy, direction }],
        async () =>
            await product.searchProducts({
                categoryNos: secondaryCategory?.toString(),
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
        const valueList = e.target.value.split(',');
        setOrderBy(valueList[0] as PRODUCT_BY);
        setDirection(valueList[1] as ORDER_DIRECTION);
    };

    return (
        <div>
            <Header />
            <ProductListContainer>
                <ProductListTop>
                    <ProductListTitle>
                        {productCategoryList?.[0].label}
                    </ProductListTitle>
                    <ProductListCategoryBox>
                        {productCategoryList?.[0]?.children?.length! > 0 && (
                            <ProductListCategory
                                key={categoryNo}
                                onClick={() => setSecondaryCategory(categoryNo)}
                            >
                                전체보기
                            </ProductListCategory>
                        )}
                        {productCategoryList?.[0]?.children?.map(
                            ({ categoryNo, label }) => {
                                return (
                                    <ProductListCategory
                                        key={categoryNo}
                                        onClick={() =>
                                            setSecondaryCategory(
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
                    <ProductListFilterBox onChange={filterChangeHandler}>
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
                <ProductContainer>
                    {items?.map(
                        ({
                            productNo,
                            listImageUrls,
                            productName,
                            promotionText,
                            salePrice,
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
                                        src={listImageUrls[0]}
                                        alt={productName}
                                    />
                                    <p>{productName}</p>
                                    <p>{promotionText}</p>
                                    <p>
                                        {salePrice}
                                        <span>원</span>
                                    </p>
                                </ProductBox>
                            );
                        },
                    )}
                </ProductContainer>
            </ProductListContainer>
        </div>
    );
};

export default ProductList;
