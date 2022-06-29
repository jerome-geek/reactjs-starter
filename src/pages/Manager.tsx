import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { head } from '@fxts/core';

import SEOHelmet from 'components/shared/SEOHelmet';
import PrimaryButton from 'components/Button/PrimaryButton';
import SecondaryButton from 'components/Button/SecondaryButton';
import Header from 'components/shared/Header';
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
    margin: 0 5px;
    padding: 10px;
    color: ${(props) => (props.isActive ? '#fff' : '#000')};
    border: 1px solid ${(props) => (props.isActive ? '#000' : '#999')};
    background-color: ${(props) => (props.isActive ? '#000' : '#fff')};
`;

const Manager = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const { t: manager } = useTranslation('manager');
    const navigate = useNavigate();

    const onMacDownload = () => {};

    const onWindowsDownload = () => {};

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

    const { data: productList } = useQuery(
        ['category_products', { selectedCategory }],
        async () => {
            const searchParams: ProductSearchParams = {
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

            return await product.searchProducts(
                selectedCategory
                    ? {
                          ...searchParams,
                          categoryNos: selectedCategory.toString(),
                      }
                    : { ...searchParams },
            );
        },
        {
            refetchOnWindowFocus: false,
            staleTime: 10000,
            cacheTime: 10000,
            select: ({ data: { items } }) => {
                return items;
            },
        },
    );

    return (
        <>
            <SEOHelmet data={{ title: manager('title') }} />
            <Header />
            {isMobile ? (
                <div
                    style={{
                        whiteSpace: 'pre-line',
                        height: '60vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <p>{manager('onlyPc')}</p>
                </div>
            ) : (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <h1>{manager('title')}</h1>
                            <p>{manager('desc')}</p>
                        </div>

                        <div>
                            <PrimaryButton
                                style={{
                                    width: '100%',
                                    borderRadius: '40px',
                                    padding: '10px 40px',
                                }}
                                onClick={() => navigate('/etc/notice')}
                            >
                                {manager('howToUse')}
                            </PrimaryButton>
                        </div>
                    </div>

                    <ManagerCategoryList>
                        <ManagerCategoryListItem
                            isActive={selectedCategory === 0}
                            onClick={() => setSelectedCategory(0)}
                        >
                            전체보기
                        </ManagerCategoryListItem>
                        {multiLevelCategories?.map(({ categoryNo, label }) => (
                            <ManagerCategoryListItem
                                isActive={selectedCategory === categoryNo}
                                key={categoryNo}
                                onClick={() => setSelectedCategory(categoryNo)}
                            >
                                {label}
                            </ManagerCategoryListItem>
                        ))}
                    </ManagerCategoryList>

                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {productList?.length > 0 ? (
                            productList?.map(
                                ({
                                    productNo,
                                    imageUrls,
                                    productName,
                                }: ProductItem) => (
                                    <div
                                        style={{
                                            flex: '0 0 25%',
                                            padding: '10px',
                                        }}
                                        key={productNo}
                                    >
                                        <div
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                border: '1px solid black',
                                            }}
                                        >
                                            <img
                                                src={head<string[]>(imageUrls)}
                                                width='100%'
                                                height='100%'
                                                alt={productName}
                                            />
                                        </div>
                                        <p style={{ padding: '10px' }}>
                                            {productName}
                                        </p>
                                        <div>
                                            <SecondaryButton
                                                style={{ borderRadius: '40px' }}
                                                onClick={onMacDownload}
                                            >
                                                {manager('macDownload')}
                                            </SecondaryButton>
                                            <SecondaryButton
                                                style={{ borderRadius: '40px' }}
                                                onClick={onWindowsDownload}
                                            >
                                                {manager('windowsDownload')}
                                            </SecondaryButton>
                                        </div>
                                    </div>
                                ),
                            )
                        ) : (
                            <div>해당 카테고리에 등록된 상품이 없습니다.</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Manager;
