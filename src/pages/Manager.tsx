import { useState, useMemo, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { concat, head, map, omit, pipe, tap, toArray } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';

import SEOHelmet from 'components/shared/SEOHelmet';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import PrimaryButton from 'components/Button/PrimaryButton';
import ManualCard from 'components/Card/ManualCard';
import { ORDER_DIRECTION, PRODUCT_BY, PRODUCT_SALE_STATUS } from 'models';
import { ProductItem, ProductSearchParams } from 'models/product';
import PATHS from 'const/paths';
import { isDesktop } from 'utils/styles/responsive';
import { useCategories, useProductList } from 'hooks/queries';
import { ReactComponent as Mac } from 'assets/icons/mac.svg';
import { ReactComponent as Windows } from 'assets/icons/windows.svg';

interface ProductCategory {
    categoryNo: number;
    label: string;
    isSelected: boolean;
}

const MobileTitle = styled.h2`
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -1px;
    color: #191919;
    text-align: center;
`;

const StyledLink = styled(Link)`
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    white-space: nowrap;
    letter-spacing: -0.98px;
    color: #191919;
    border: 1px solid #dbdbdb;
    text-align: center;
    line-height: 54px;
    min-height: 54px;
    position: absolute;
    bottom: 0;
`;

const CategoriyListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 40px;

    p {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #858585;
    }
`;

const CategoryList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CategoryListItem = styled.li<{ isSelected?: boolean }>`
    margin: 0 5px;
    padding: 10px;
    color: ${(props) => (props.isSelected ? '#fff' : '#000')};
    font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
    text-decoration: ${(props) => (props.isSelected ? 'underline' : 'none')};
    color: ${(props) => (props.isSelected ? '#191919' : '#767676')};
`;

const DownloadButton = styled(PrimaryButton)`
    svg {
        margin-right: 16px;
    }
`;

const Manager = () => {
    const [categoryList, setCategoryList] = useState<ProductCategory[]>([
        {
            categoryNo: 0,
            label: '전체보기',
            isSelected: true,
        },
    ]);
    const [searchParams, setSearchParams] = useState<ProductSearchParams>({
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
    });

    const { width } = useWindowSize();

    const isPageAvailable = useMemo(() => isDesktop(width), [width]);

    const { t: manager } = useTranslation('manager');

    const onMacDownload = () => {
        if (isPageAvailable) {
            alert('맥 OS 다운로드입니다');
        }
    };

    const onWindowsDownload = () => {
        if (isPageAvailable) {
            alert('윈도우 OS 다운로드입니다');
        }
    };

    const categories = useCategories({
        options: {
            enabled: isPageAvailable,
        },
    });

    useLayoutEffect(() => {
        if (categories.data) {
            setCategoryList((prev) =>
                pipe(
                    categories.data.multiLevelCategories,
                    map((a) => ({
                        categoryNo: a.categoryNo,
                        label: a.label,
                        isSelected: false,
                    })),
                    concat(prev),
                    toArray,
                    tap(console.log),
                ),
            );
        }

        return () => {
            setCategoryList([
                {
                    categoryNo: 0,
                    label: '전체보기',
                    isSelected: true,
                },
            ]);
        };
    }, [categories.data]);

    const productList = useProductList({
        searchParams,
        options: {
            staleTime: 10000,
            cacheTime: 10000,
        },
    });

    const onCategoryClick = (categoryNo: number) => {
        setCategoryList((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isSelected: a.categoryNo === categoryNo })),
                toArray,
            ),
        );

        setSearchParams((prev) =>
            categoryNo === 0
                ? omit(['categoryNos'] as const, prev)
                : {
                      ...prev,
                      categoryNos: categoryNo.toString(),
                  },
        );
    };

    return (
        <>
            <SEOHelmet data={{ title: manager('managerTitle') }} />

            <LayoutResponsive>
                {isDesktop(width) ? (
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

                        <CategoriyListContainer>
                            <CategoryList>
                                {categoryList.map(
                                    ({ categoryNo, label, isSelected }) => (
                                        <CategoryListItem
                                            key={categoryNo}
                                            isSelected={isSelected}
                                            onClick={() =>
                                                onCategoryClick(categoryNo)
                                            }
                                        >
                                            {label}
                                        </CategoryListItem>
                                    ),
                                )}
                            </CategoryList>

                            <p>{manager('downloadDesc')}</p>
                        </CategoriyListContainer>

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
                                    {productList.data &&
                                    productList?.data?.items?.length > 0 ? (
                                        productList.data.items.map(
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
                                                        <DownloadButton
                                                            onClick={
                                                                onMacDownload
                                                            }
                                                        >
                                                            <Mac />
                                                            <span>
                                                                {manager(
                                                                    'macDownload',
                                                                )}
                                                            </span>
                                                        </DownloadButton>
                                                        <DownloadButton
                                                            onClick={
                                                                onWindowsDownload
                                                            }
                                                        >
                                                            <Windows />
                                                            <span>
                                                                {manager(
                                                                    'windowsDownload',
                                                                )}
                                                            </span>
                                                        </DownloadButton>
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
                ) : (
                    <div
                        style={{
                            whiteSpace: 'pre-line',
                            height: '60vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            position: 'relative',
                        }}
                    >
                        <MobileTitle>{manager('onlyPc')}</MobileTitle>
                        <StyledLink to={PATHS.MAIN}>
                            메인으로 돌아가기
                        </StyledLink>
                    </div>
                )}
            </LayoutResponsive>
        </>
    );
};

export default Manager;
