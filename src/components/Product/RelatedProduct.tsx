import { useEffect, useState } from 'react';
import { head } from '@fxts/core';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import { product } from 'api/product';
import { useQueries } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ProductDetailResponse } from 'models/product';

const RelatedProductContainer = styled.div`
    display: flex;
    justify-content: left;
    overflow-y: hidden;
    overflow-x: auto;
    flex-wrap: nowrap;
    &::-webkit-scrollbar {
        display: block;
        background-color: #ddd;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        display: block;
        background-color: #fff;
        border: 1px solid #aaa;
        border-radius: 6px;
    }
`;

const RelatedProductBox = styled.div`
    width: 20%;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 auto;
    > img {
        display: block;
        width: 100%;
    }
`;

const RelatedProductImage = styled.div`
    background: #f8f8fa;
    > img {
        width: 70%;
        padding: 15% 0;
        display: block;
        margin: 0 auto;
    }
`;

const RelatedProductDesc = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
    > div {
        > p {
            color: #858585;
            margin-bottom: 5px;
        }
        > p:first-child {
            color: #191919;
        }
    }
`;

const RelatedProductTitle = styled.div``;

const RelatedProductPrice = styled.div``;

const RelatedProduct = ({
    productData,
}: {
    productData?: AxiosResponse<ProductDetailResponse>;
}) => {
    const navigate = useNavigate();

    const relatedProducts = useQueries(
        productData?.data.relatedProductNos?.map((productNo) => {
            return {
                queryKey: ['relatedProduct', productNo],
                queryFn: async () =>
                    await product.getProductDetail(productNo.toString()),
                refetchOnWindowFocus: false,
            };
        }) ?? [],
    );

    return (
        <RelatedProductContainer>
            {relatedProducts?.map((relatedProduct) => {
                return (
                    relatedProduct.data?.data && (
                        <RelatedProductBox
                            onClick={() =>
                                navigate(
                                    `/product/detail/${relatedProduct.data?.data.baseInfo.productNo}`,
                                )
                            }
                            key={relatedProduct.data?.data.baseInfo.productNo}
                        >
                            <RelatedProductImage>
                                <img
                                    src={head(
                                        relatedProduct.data?.data.baseInfo
                                            .imageUrls,
                                    )}
                                    alt={
                                        relatedProduct.data?.data.baseInfo
                                            .productName
                                    }
                                />
                            </RelatedProductImage>
                            <RelatedProductDesc>
                                <RelatedProductTitle>
                                    <p>
                                        {
                                            relatedProduct.data?.data.baseInfo
                                                .productName
                                        }
                                    </p>
                                    <p>
                                        {
                                            relatedProduct.data?.data.baseInfo
                                                .promotionText
                                        }
                                    </p>
                                </RelatedProductTitle>
                                <RelatedProductPrice>
                                    <p>
                                        {
                                            relatedProduct.data?.data.price
                                                .salePrice
                                        }
                                    </p>
                                    <p>
                                        {relatedProduct.data?.data.price
                                            .salePrice -
                                            relatedProduct.data?.data.price
                                                .immediateDiscountAmt}
                                    </p>
                                </RelatedProductPrice>
                            </RelatedProductDesc>
                        </RelatedProductBox>
                    )
                );
            })}
        </RelatedProductContainer>
    );
};

export default RelatedProduct;
