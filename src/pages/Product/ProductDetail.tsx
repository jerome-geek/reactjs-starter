import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueries, useQuery, useMutation } from 'react-query';
import { head } from '@fxts/core';
import { AxiosResponse } from 'axios';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';

import { product } from 'api/product';
import media from 'utils/styles/media';
import { CHANNEL_TYPE } from 'models';
import { cart, orderSheet } from 'api/order';
import { OrderSheetBody, ShoppingCartBody } from 'models/order';
import { ProductDetailResponse } from 'models/product/index';
import { useAppDispatch, useTypedSelector } from 'state/reducers';
import { setCart } from 'state/slices/cartSlice';

const ProductContainer = styled.div`
    padding: 0 20px;
    margin: 50px auto;
    width: 1200px;
    ${media.large} {
        width: 100%;
    } ;
`;

const ProductContainerTop = styled.div`
    display: flex;
    width: 100%;
`;

const ProductImageBox = styled.div`
    width: 50%;
`;

const ProductImage = styled.div`
    > img {
        display: block;
        margin: 0 auto;
    }
`;

const ProductSubImageList = styled.div`
    display: flex;
    overflow-x: auto;
    flex-wrap: nowrap;
    align-items: center;
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

const ProductSubImage = styled.div`
    width: 20%;
    flex: 0 0 auto;
    > img {
        width: 100%;
        vertical-align: middle;
    }
`;

const ProductInfoBox = styled.div`
    width: 50%;
`;

const ProductTitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const ProductTitle = styled.h2`
    font-size: 64px;
    color: #191919;
`;
const ProductText = styled.div`
    font-size: 16px;
    color: #858585;
`;

const ShareButton = styled.div``;

const ProductPriceBox = styled.div``;

const ProductPrice = styled.div`
    margin-top: 40px;
    > p {
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 10px;
        > span {
            font-weight: normal;
            font-size: 24px;
            color: #191919;
        }
        > span.basic_price {
            color: #a8a8a8;
        }
    }
`;

const ProductAccumulationBox = styled.div`
    line-height: 15px;
    border-bottom: 1px solid #dbdbdb;
    padding: 5px 0 30px;
    > p {
        font-size: 12px;
    }
    > p:first-child {
        font-size: 16px;
    }
`;

const ProductOptionBox = styled.div`
    margin: 26px 0;
    border-bottom: 1px solid #000;
    padding-bottom: 26px;
    > p {
        font-size: 16px;
        color: #191919;
    }
    > select {
        margin: 22px 0;
        border: 2px solid #ababab;
        width: 100%;
        color: #ababab;
        font-size: 16px;
        padding: 15px 10px;
    }
`;

const ProductOptionCountBox = styled.div`
    background: #f9f7f7;
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    > div {
        display: flex;
        justify-content: space-between;
    }
    div:last-child {
        align-items: flex-end;
    }
`;

const ProductOptionTitle = styled.div`
    font-size: 16px;
    color: #191919;
`;

const ProductOptionClose = styled.div`
    cursor: pointer;
    color: #bdbdbd;
`;

const ProductCountBox = styled.div`
    color: #bdbdbd;
    background: #fff;
    display: flex;
    > div {
        padding: 10px;
    }
`;

const ProductCountMinus = styled.div``;

const ProductCountPlus = styled.div``;

const ProductCount = styled.div`
    color: #191919;
`;

const ProductAmount = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    > p {
        font-size: 24px;
        font-weight: bold;
        color: #191919;
        > span {
            color: #a8a8a8;
            font-size: 16px;
        }
    }
`;

const DeliveryInfoBox = styled.div`
    font-size: 16px;
    > div,
    p {
        margin-bottom: 10px;
    }
`;

const DeliveryFee = styled.div`
    font-size: 12px;
`;

const DeliveryDesc = styled.div`
    font-size: 12px;
    color: #999;
`;

const PurchaseBox = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
`;

const CartButton = styled.div`
    width: 70px;
    height: 67px;
    border: 1px solid #191919;
    > div {
        font-size: 30px;
        text-align: center;
        line-height: 67px;
        > svg {
            width: 40px;
            height: 40px;
        }
    }
`;

const BuyNow = styled.div`
    width: 80%;
    text-align: center;
    padding: 15px 0;
    background: #191919;
    color: #fff;
    font-weight: bold;
    font-size: 24px;
    > span {
        vertical-align: middle;
    }
`;

const ProductContainerBottom = styled.div``;

const ExternalLinkBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: 107px auto 148px;
    > a {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        > span {
            font-size: 24px;
        }
    }
`;

const ExternalIcon = styled.span`
    width: 57px;
    height: 57px;
    background: #000;
    border-radius: 7px;
    margin-right: 10px;
`;

const ProductDescriptionBox = styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    text-align: center;
    font-size: 24px;
    margin: 0 auto 138px;
`;

const ProductDescription = styled.div<{ isActive?: boolean }>`
    width: 33.33%;
    border-bottom: 3px solid
        ${(props) => (props.isActive ? '#191919' : '#dbdbdb')};
    padding: 22px 0;
`;

const ProductContentBox = styled.div`
    > p {
        width: fit-content;
        margin: 0 auto;
    }
    img {
        display: block;
        margin: 0 auto;
    }
`;

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

const RelatedProduct = styled.div`
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

interface ProductOption {
    label?: string;
    price?: number;
    count: number;
    optionNo: number;
    productNo: string;
    amountPrice?: number;
}

const ProductDetail = () => {
    const { productNo } = useParams() as { productNo: string };
    const [productImageList, setProductImageList] = useState<string[]>();
    const [representImage, setRepresentImage] = useState('');
    const [optionProducts, setOptionProducts] = useState(
        new Map<number, ProductOption>(),
    );
    const [relatedProducts, setRelatedProducts] = useState<
        ProductDetailResponse[]
    >([]);
    const [selectedDesc, setSelectedDesc] = useState<number>(0);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { t: productDetail } = useTranslation('productDetail');

    const { data: productData } = useQuery(
        ['productDetail', { productNo }],
        async () => await product.getProductDetail(productNo),
        {
            onSuccess: (res) => {
                setProductImageList(res.data?.baseInfo?.imageUrls);
                setRepresentImage(res.data?.baseInfo?.imageUrls?.[0]);
            },
            refetchOnWindowFocus: false,
        },
    );

    useEffect(() => {
        setRepresentImage(productImageList?.[0]!);
    }, [productImageList]);

    const { data: productOptions } = useQuery(
        ['productOptionDetail', { productNo }],
        async () => await product.getProductOption(productNo),
        {
            select: ({ data }) => {
                return data?.flatOptions;
            },
            refetchOnWindowFocus: false,
        },
    );

    useQueries(
        productData?.data.relatedProductNos?.map((productNo) => {
            return {
                queryKey: ['relatedProduct', productNo],
                queryFn: async () =>
                    await product.getProductDetail(productNo.toString()),
                onSuccess: (res: AxiosResponse<ProductDetailResponse>) => {
                    setRelatedProducts((prev) => {
                        return [...prev, res.data];
                    });
                },
                refetchOnWindowFocus: false,
            };
        }) ?? [],
    );

    const optionSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'false') {
            return;
        }
        const optionValue = JSON.parse(e.target.value);
        setProductImageList(
            optionValue.images.map((image: { url: string }) => {
                return image.url;
            }),
        );
        setOptionProducts((prev) => {
            prev.set(optionValue.optionNo, {
                label: optionValue.label,
                price: optionValue.buyPrice,
                count: 1,
                optionNo: optionValue.optionNo,
                productNo,
                amountPrice: optionValue.buyPrice,
            });
            return new Map(prev);
        });
    };

    const productCountHandler = (number: number, optionNo: number) => () => {
        if (optionProducts.get(optionNo)?.count! + number <= 0) {
            alert(productDetail('countAlert'));
            return;
        }
        setOptionProducts((prev) => {
            prev.set(optionNo, {
                label: prev.get(optionNo)?.label!,
                price: prev.get(optionNo)?.price!,
                count: prev.get(optionNo)?.count! + number,
                optionNo,
                productNo,
                amountPrice:
                    prev.get(optionNo)?.price! *
                    (prev.get(optionNo)?.count! + number),
            });
            return new Map(prev);
        });
    };

    const { mutate: cartMutate, isLoading: isCartLoading } = useMutation(
        async (cartList: Omit<ShoppingCartBody, 'cartNo'>[]) =>
            await cart.registerCart(cartList),
        {
            onSuccess: (res) => {
                alert(productDetail('successCartAlert'));
            },
            onError: () => {
                alert(productDetail('failCartAlert'));
            },
        },
    );

    const cartHandler = () => {
        if (optionProducts.size <= 0) return;

        const cartList: Omit<ShoppingCartBody, 'cartNo'>[] = [];
        Array.from(optionProducts.values()).forEach((optionProduct) => {
            const currentCart = {
                orderCnt: optionProduct.count,
                channelType: CHANNEL_TYPE.NAVER_EP,
                optionInputs: [],
                optionNo: optionProduct.optionNo,
                productNo: parseFloat(optionProduct.productNo),
            };
            cartList.push(currentCart);
        });

        if (!member) {
            dispatch(setCart(cartList));
            alert(productDetail('successCartAlert'));
            return;
        }

        cartMutate(cartList);
    };

    const { mutate: purchaseMutate } = useMutation(
        async (orderSheetList: OrderSheetBody) =>
            await orderSheet.writeOrderSheet(orderSheetList),
        {
            onSuccess: (res) => {
                navigate({ pathname: `/order/sheet${res.data}` }); // TODO orderSheetNo 파라미터 주문서 페이지로 이동
            },
            onError: () => {
                alert(productDetail('failBuyAlert'));
            },
        },
    );

    const purchaseHandler = () => {
        if (optionProducts.size <= 0) {
            return;
        }

        const orderSheet: Omit<ShoppingCartBody, 'cartNo'>[] = [];
        Array.from(optionProducts.values()).forEach((product) => {
            const currentCart = {
                orderCnt: product.count,
                channelType: CHANNEL_TYPE.NAVER_EP,
                optionInputs: [],
                optionNo: product.optionNo,
                productNo: parseFloat(product.productNo),
            };
            orderSheet.push(currentCart);
        });

        purchaseMutate({
            trackingKey: '',
            channelType: CHANNEL_TYPE.NAVER_EP,
            products: orderSheet,
        });
    };

    return (
        <ProductContainer>
            <ProductContainerTop>
                <ProductImageBox>
                    <ProductImage>
                        <img
                            src={representImage}
                            alt={productData?.data.baseInfo.productName}
                        />
                    </ProductImage>
                    <ProductSubImageList>
                        {productImageList?.map((productImage) => {
                            return (
                                <ProductSubImage
                                    onClick={() =>
                                        setRepresentImage(productImage)
                                    }
                                    key={productImage}
                                >
                                    <img
                                        src={productImage}
                                        alt={
                                            productData?.data.baseInfo
                                                .productName
                                        }
                                    />
                                </ProductSubImage>
                            );
                        })}
                    </ProductSubImageList>
                </ProductImageBox>
                <ProductInfoBox>
                    <ProductTitleBox>
                        <div>
                            <ProductTitle>
                                {productData?.data.baseInfo.productName}
                            </ProductTitle>
                            <ProductText>
                                {productData?.data.baseInfo.promotionText}
                            </ProductText>
                        </div>
                        <ShareButton>공유하기 버튼</ShareButton>
                    </ProductTitleBox>
                    <ProductPriceBox>
                        <ProductPrice>
                            <p>
                                {productData &&
                                    productData.data.price.salePrice -
                                        productData.data.price
                                            .immediateDiscountAmt}
                                <span>원 </span>
                                <span
                                    className='basic_price'
                                    style={{ textDecoration: 'line-through' }}
                                >
                                    {productData?.data.price.salePrice}
                                </span>
                            </p>
                        </ProductPrice>
                        <ProductAccumulationBox>
                            <p>{productDetail('accumulateBenefits')}</p>
                            <p>
                                {productDetail('accumulateBenefits')}{' '}
                                {
                                    productData?.data.price
                                        .accumulationAmtWhenBuyConfirm
                                }
                                원
                            </p>
                        </ProductAccumulationBox>
                    </ProductPriceBox>
                    <ProductOptionBox>
                        <p>{productDetail('chooseOption')}</p>
                        <select onChange={optionSelectHandler}>
                            <option value={'false'}>
                                {productDetail('chooseOption')}.
                            </option>
                            {productOptions?.map((productOption) => {
                                return (
                                    <option
                                        key={productOption.optionNo}
                                        value={JSON.stringify(productOption)}
                                    >
                                        {productOption.label}
                                    </option>
                                );
                            })}
                        </select>
                        <div>
                            {Array.from(optionProducts.values()).map(
                                ({ count, label, amountPrice, optionNo }) => {
                                    return (
                                        <ProductOptionCountBox key={optionNo}>
                                            <div>
                                                <ProductOptionTitle>
                                                    {label}
                                                </ProductOptionTitle>
                                                <ProductOptionClose
                                                    onClick={() =>
                                                        setOptionProducts(
                                                            (prev) => {
                                                                prev.delete(
                                                                    optionNo,
                                                                );
                                                                return new Map(
                                                                    prev,
                                                                );
                                                            },
                                                        )
                                                    }
                                                >
                                                    X
                                                </ProductOptionClose>
                                            </div>
                                            <div>
                                                <ProductCountBox>
                                                    <ProductCountMinus
                                                        onClick={productCountHandler(
                                                            -1,
                                                            optionNo,
                                                        )}
                                                    >
                                                        -
                                                    </ProductCountMinus>
                                                    <ProductCount>
                                                        {count}
                                                    </ProductCount>
                                                    <ProductCountPlus
                                                        onClick={productCountHandler(
                                                            1,
                                                            optionNo,
                                                        )}
                                                    >
                                                        +
                                                    </ProductCountPlus>
                                                </ProductCountBox>
                                                <p>{amountPrice}</p>
                                            </div>
                                        </ProductOptionCountBox>
                                    );
                                },
                            )}
                        </div>
                    </ProductOptionBox>
                    <ProductAmount>
                        <p>
                            {productDetail('amountPrice')}{' '}
                            <span>
                                {productDetail('amount')}{' '}
                                {optionProducts.size > 0 &&
                                    Array.from(optionProducts.values()).reduce(
                                        (prev, cur) => {
                                            return prev + cur.count!;
                                        },
                                        0,
                                    )}
                                {productDetail('count')}
                            </span>
                        </p>
                        <p>
                            {optionProducts.size > 0 &&
                                Array.from(optionProducts.values()).reduce(
                                    (prev, cur) => {
                                        return prev + cur.amountPrice!;
                                    },
                                    0,
                                )}
                            원
                        </p>
                    </ProductAmount>
                    <DeliveryInfoBox>
                        <p>{productDetail('shippingInformation')}</p>
                        <DeliveryFee>
                            {productDetail('shippingCost')}{' '}
                            <span>
                                {productData?.data.deliveryFee.deliveryAmt}
                            </span>
                        </DeliveryFee>
                        <DeliveryDesc>
                            {
                                productData?.data.deliveryFee
                                    .defaultDeliveryConditionLabel
                            }
                        </DeliveryDesc>
                    </DeliveryInfoBox>
                    <PurchaseBox>
                        <CartButton onClick={cartHandler}>
                            {isCartLoading ? (
                                <div>'등록중'</div>
                            ) : (
                                <div>
                                    <FontAwesomeIcon icon={faBasketShopping} />
                                </div>
                            )}
                        </CartButton>
                        <BuyNow onClick={purchaseHandler}>
                            <span>{productDetail('buyNow')}</span>
                        </BuyNow>
                    </PurchaseBox>
                </ProductInfoBox>
            </ProductContainerTop>
            <ProductContainerBottom>
                <ExternalLinkBox>
                    <a href=''>
                        <ExternalIcon></ExternalIcon>{' '}
                        <span>{productDetail('goToManual')} &gt;</span>
                    </a>
                    <a href=''>
                        <ExternalIcon></ExternalIcon>{' '}
                        <span>{productDetail('voiceCaddieManager')} &gt;</span>
                    </a>
                    <a href=''>
                        <ExternalIcon></ExternalIcon>
                        <span>{productDetail('voiceCaddieManual')} &gt;</span>
                    </a>
                </ExternalLinkBox>
                <ProductDescriptionBox>
                    <ProductDescription
                        isActive={selectedDesc === 0}
                        onClick={() => setSelectedDesc(0)}
                    >
                        <a href='#productContent'>
                            {productDetail('productDetail')}
                        </a>
                    </ProductDescription>
                    <ProductDescription
                        isActive={selectedDesc === 1}
                        onClick={() => setSelectedDesc(1)}
                    >
                        <a href='#productContent'>
                            {productDetail('productSpecifications')}
                        </a>
                    </ProductDescription>
                    <ProductDescription
                        isActive={selectedDesc === 2}
                        onClick={() => setSelectedDesc(2)}
                    >
                        <a href='#productContent'>{productDetail('notice')}</a>
                    </ProductDescription>
                </ProductDescriptionBox>
                <ProductContentBox
                    id='productContent'
                    dangerouslySetInnerHTML={{
                        __html: productData?.data.baseInfo.content ?? '',
                    }}
                ></ProductContentBox>
                <RelatedProductContainer>
                    {relatedProducts.map(({ baseInfo, price }) => {
                        return (
                            <RelatedProduct
                                onClick={() =>
                                    navigate(
                                        `/product/detail/${baseInfo.productNo}`,
                                    )
                                }
                                key={baseInfo.productNo}
                            >
                                <RelatedProductImage>
                                    <img
                                        src={head(baseInfo.imageUrls)}
                                        alt={baseInfo.productName}
                                    />
                                </RelatedProductImage>
                                <RelatedProductDesc>
                                    <RelatedProductTitle>
                                        <p>{baseInfo.productName}</p>
                                        <p>{baseInfo.promotionText}</p>
                                    </RelatedProductTitle>
                                    <RelatedProductPrice>
                                        <p>{price.salePrice}</p>
                                        <p>
                                            {price.salePrice -
                                                price.immediateDiscountAmt}
                                        </p>
                                    </RelatedProductPrice>
                                </RelatedProductDesc>
                            </RelatedProduct>
                        );
                    })}
                </RelatedProductContainer>
            </ProductContainerBottom>
        </ProductContainer>
    );
};

export default ProductDetail;
