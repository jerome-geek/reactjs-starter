import { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';

import { product } from 'api/product';
import media from 'utils/styles/media';
import { CHANNEL_TYPE } from 'models';
import { cart, orderSheet } from 'api/order';
import { OrderSheetBody, ShoppingCartBody } from 'models/order';
import { useAppDispatch, useTypedSelector } from 'state/reducers';
import { setCart } from 'state/slices/cartSlice';
import ProductImageList from 'components/Product/ProductImageList';
import ProductOptionList from 'components/Product/ProductOptionList';
import RelatedProduct from 'components/Product/RelatedProduct';
import { ProductOption } from 'models/product';

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

const ProductDetail = () => {
    const { productNo } = useParams() as { productNo: string };
    const [productImageData, setProductImageData] = useState<{
        [id: number]: string[];
    }>({ 0: [] });
    const [currentOptionNo, setCurrentOptionNo] = useState<number>(0);
    const [selectOptionProducts, setSelectOptionProducts] = useState(
        new Map<number, ProductOption>(),
    );
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
                setProductImageData((prev) => {
                    prev[0] = res.data?.baseInfo?.imageUrls;
                    return prev;
                });
            },
            refetchOnWindowFocus: false,
        },
    );

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

    const addCartHandler = () => {
        if (selectOptionProducts.size <= 0) return;

        const cartList: Omit<ShoppingCartBody, 'cartNo'>[] = [];
        Array.from(selectOptionProducts.values()).forEach((optionProduct) => {
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
        if (selectOptionProducts.size <= 0) {
            return;
        }

        const orderSheet: Omit<ShoppingCartBody, 'cartNo'>[] = [];
        Array.from(selectOptionProducts.values()).forEach((product) => {
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
                <ProductImageList
                    productImageData={productImageData}
                    setProductImageData={setProductImageData}
                    productImageAlt={productData?.data.baseInfo.productName}
                    currentOptionNo={currentOptionNo}
                    productNo={productNo}
                />
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
                    <ProductOptionList
                        setCurrentOptionNo={setCurrentOptionNo}
                        setSelectOptionProducts={setSelectOptionProducts}
                        productNo={productNo}
                        selectOptionProducts={selectOptionProducts}
                        setProductImageData={setProductImageData}
                    />
                    <ProductAmount>
                        <p>
                            {productDetail('amountPrice')}{' '}
                            <span>
                                {productDetail('amount')}{' '}
                                {selectOptionProducts.size > 0 &&
                                    Array.from(
                                        selectOptionProducts.values(),
                                    ).reduce((prev, cur) => {
                                        return prev + cur.count!;
                                    }, 0)}
                                {productDetail('count')}
                            </span>
                        </p>
                        <p>
                            {selectOptionProducts.size > 0 &&
                                Array.from(
                                    selectOptionProducts.values(),
                                ).reduce((prev, cur) => {
                                    return prev + cur.amountPrice!;
                                }, 0)}
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
                        <CartButton onClick={addCartHandler}>
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
                {/* <ProductContentBox
                    id='productContent'
                    dangerouslySetInnerHTML={{
                        __html: productData?.data.baseInfo.content ?? '',
                    }}
                ></ProductContentBox> */}
                <RelatedProduct productData={productData} />
            </ProductContainerBottom>
        </ProductContainer>
    );
};

export default ProductDetail;
