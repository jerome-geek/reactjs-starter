import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { head } from '@fxts/core';

import SEOHelmet from 'components/shared/SEOHelmet';
import PrimaryButton from 'components/Button/PrimaryButton';
import Header from 'components/shared/Header';
import ManualCard from 'components/Card/ManualCard';
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
                    ? { ...searchParams, categoryNos: selectedCategory }
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
            <SEOHelmet data={{ title: manager('managerTitle') }} />
            <Header />
            <MobileView>
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
            </MobileView>
            <BrowserView>
                <div
                    style={{
                        padding: '10px',
                        width: '1280px',
                        margin: '0 auto',
                    }}
                >
                    <div style={{ marginTop: '4rem' }}>
                        <h1 style={{ fontSize: '24px' }}>
                            {manager('managerTitle')}
                        </h1>

                        <p
                            style={{
                                whiteSpace: 'pre-line',
                                fontSize: '16px',
                                margin: '10px 0 30px 0',
                            }}
                        >
                            {manager('managerDesc')}
                        </p>
                        <Link to='/etc/notice' style={{ fontSize: '16px' }}>
                            {manager('howToUse')}
                        </Link>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <ManagerCategoryList>
                            <ManagerCategoryListItem
                                isActive={selectedCategory === 0}
                                onClick={() => setSelectedCategory(0)}
                            >
                                {manager('allContents')}
                            </ManagerCategoryListItem>
                            {multiLevelCategories?.map(
                                ({ categoryNo, label }) => (
                                    <ManagerCategoryListItem
                                        isActive={
                                            selectedCategory === categoryNo
                                        }
                                        key={categoryNo}
                                        onClick={() =>
                                            setSelectedCategory(categoryNo)
                                        }
                                    >
                                        {label}
                                    </ManagerCategoryListItem>
                                ),
                            )}
                        </ManagerCategoryList>
                    </div>

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
                                {productList?.length > 0 ? (
                                    productList?.map(
                                        ({
                                            productNo,
                                            imageUrls,
                                            productName,
                                        }: ProductItem) => (
                                            <ManualCard
                                                key={productNo}
                                                title={productName}
                                                imgUrl={head<string[]>(
                                                    imageUrls,
                                                )}
                                            >
                                                <div>
                                                    <PrimaryButton
                                                        onClick={onMacDownload}
                                                    >
                                                        {manager('macDownload')}
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        onClick={
                                                            onWindowsDownload
                                                        }
                                                    >
                                                        {manager(
                                                            'windowsDownload',
                                                        )}
                                                    </PrimaryButton>
                                                </div>
                                            </ManualCard>
                                        ),
                                    )
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '100px',
                                        }}
                                    >
                                        <p>{manager('noContents')}</p>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </BrowserView>
        </>
    );
};

export default Manager;
