import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import currency from 'currency.js';
import { NavHashLink } from 'react-router-hash-link';

import { useAppDispatch } from 'state/reducers';
import { setCart } from 'state/slices/cartSlice';
import Header from 'components/shared/Header';
import MainCategoryBanners from 'components/Main/MainCategoryBanners';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import ProductImageList from 'components/Common/ImageSlider';
import ProductOptionList from 'components/Product/ProductOptionList';
import RelatedProduct from 'components/Product/RelatedProduct';
import { product } from 'api/product';
import { cart, orderSheet } from 'api/order';
import { banner } from 'api/display';
import BANNER from 'const/banner';
import { CHANNEL_TYPE } from 'models';
import { ProductOption } from 'models/product';
import { OrderSheetBody, ShoppingCartBody } from 'models/order';
import { sortBanners } from 'utils/banners';
import { useMember } from 'hooks';

const ProductContainer = styled(LayoutResponsive)`
    text-align: left;
    padding-top: 0;
`;

const ProductContainerTop = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 230px;
`;

const ProductInfoBox = styled.div`
    width: 510px;
`;

const ProductTitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 45px 0;
`;

const ProductTitle = styled.h2`
    font-size: 64px;
    font-weight: bold;
    line-height: 77px;
    color: #191919;
    margin-bottom: 5px;
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

const ProductDetailTabList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
`;

const ProductDetailTabListItem = styled.li<{ isActive: boolean }>`
    border-bottom: 3px solid
        ${(props) => (props.isActive ? '#191919' : '#dbdbdb')};
    text-align: center;
    font-size: 24px;
    flex: 1 1 25%;
`;

const StyledNavHashLink = styled(NavHashLink)`
    padding: 22px 0;
    display: block;
    width: 100%;
    height: 100%;
`;

const ProductDetail = () => {
    const { productNo } = useParams() as { productNo: string };
    const [productImageData, setProductImageData] = useState<{
        [id: string]: string[];
    }>({ represent: [] });
    const [currentOptionNo, setCurrentOptionNo] =
        useState<number | string>('represent');
    const [selectOptionProducts, setSelectOptionProducts] = useState(
        new Map<number, ProductOption>(),
    );
    const [selectedTab, setSelectedTab] = useState(0);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { member } = useMember();

    const { t: productDetail } = useTranslation('productDetail');

    const { data: productData } = useQuery(
        ['productDetailData', { productNo }],
        async () => await product.getProductDetail(productNo),
        {
            onSuccess: (res) => {
                setProductImageData((prev) => {
                    return {
                        ...prev,
                        represent: res.data?.baseInfo?.imageUrls,
                    };
                });
            },
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

        const cartList: ShoppingCartBody[] = [];
        if (!member) {
            Array.from(selectOptionProducts.values()).forEach(
                (optionProduct) => {
                    const currentCart = {
                        orderCnt: optionProduct.count,
                        channelType: CHANNEL_TYPE.NAVER_EP,
                        optionInputs: [],
                        optionNo: optionProduct.optionNo,
                        productNo: parseFloat(optionProduct.productNo),
                        cartNo: optionProduct.optionNo,
                    };
                    cartList.push(currentCart);
                },
            );
            dispatch(setCart(cartList));
            alert(productDetail('successCartAlert'));
            return;
        }
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

        cartMutate(cartList);
    };

    const { mutate: purchaseMutate } = useMutation(
        async (orderSheetList: OrderSheetBody) =>
            await orderSheet.writeOrderSheet(orderSheetList),
        {
            onSuccess: (res) => {
                navigate({ pathname: `/order/sheet/${res.data.orderSheetNo}` }); // TODO orderSheetNo 파라미터 주문서 페이지로 이동
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

    const { data: mainBannerData } = useQuery(
        ['mainCategoryBanner', BANNER.mainCategoryBanner],
        async () => await banner.getBanners([BANNER.mainCategoryBanner]),
        {
            select: ({ data }) => {
                return data;
            },
        },
    );

    const productDetailTab = useMemo(
        () => [
            {
                title: 'productSummary',
                name: productDetail('productSummary'),
            },
            {
                title: 'productSpecifications',
                name: productDetail('productSpecifications'),
            },
            {
                title: 'productComparison',
                name: productDetail('productComparison'),
            },
            {
                title: 'productPolicy',
                name: productDetail('productPolicy'),
            },
        ],
        [productDetail],
    );

    return (
        <>
            <Header />

            {mainBannerData?.[0]?.accounts && (
                <MainCategoryBanners
                    banners={sortBanners(mainBannerData[0].accounts[0].banners)}
                />
            )}

            <ProductContainer type='large'>
                <ProductContainerTop>
                    <ProductImageList
                        productImageList={productImageData[currentOptionNo]}
                        productImageAlt={productData?.data.baseInfo.productName}
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
                                        currency(
                                            productData.data.price.salePrice -
                                                productData.data.price
                                                    .immediateDiscountAmt,
                                            {
                                                symbol: '',
                                                precision: 0,
                                            },
                                        ).format()}{' '}
                                    <span>원</span>
                                    <span
                                        className='basic_price'
                                        style={{
                                            textDecoration: 'line-through',
                                        }}
                                    >
                                        {productData &&
                                            `${currency(
                                                productData.data.price
                                                    .salePrice,
                                                { symbol: '', precision: 0 },
                                            ).format()}`}
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
                                        <FontAwesomeIcon
                                            icon={faBasketShopping}
                                        />
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
                    <ProductDetailTabList>
                        {productDetailTab.map(({ title, name }, index) => (
                            <ProductDetailTabListItem
                                key={title}
                                isActive={selectedTab === index}
                                onClick={() => setSelectedTab(index)}
                            >
                                <StyledNavHashLink to={`#${title}`} smooth>
                                    {name}
                                </StyledNavHashLink>
                            </ProductDetailTabListItem>
                        ))}
                    </ProductDetailTabList>
                    <ProductContentBox
                        id='productSummary'
                        dangerouslySetInnerHTML={{
                            __html: productData?.data.baseInfo.content ?? '',
                        }}
                    />
                    <ProductContentBox
                        id='productSpecifications'
                        dangerouslySetInnerHTML={{
                            __html: productData?.data.baseInfo.content ?? '',
                        }}
                    />{' '}
                    <ProductContentBox
                        id='productComparison'
                        dangerouslySetInnerHTML={{
                            __html: productData?.data.baseInfo.content ?? '',
                        }}
                    />{' '}
                    <ProductContentBox
                        id='productPolicy'
                        dangerouslySetInnerHTML={{
                            __html: productData?.data.baseInfo.content ?? '',
                        }}
                    />
                    <RelatedProduct productData={productData} />
                </ProductContainerBottom>
            </ProductContainer>
        </>
    );
};

export default ProductDetail;
