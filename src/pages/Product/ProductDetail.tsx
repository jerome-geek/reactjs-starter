import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { isNil, pipe, map, sum, toArray } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';
import { AxiosError } from 'axios';

import { useAppDispatch } from 'state/reducers';
import { setCart } from 'state/slices/cartSlice';
import MainCategoryBanners from 'components/Main/MainCategoryBanners';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import ProductOptionList from 'components/Product/ProductOptionList';
import RelatedProduct from 'components/Product/RelatedProduct';
import DeliveryInfo from 'components/Product/DeliveryInfo';
import AccumulationInfo from 'components/Product/AccumulationInfo';
import TotalPriceInfo from 'components/Product/TotalPriceInfo';
import ProductImageSlider from 'components/Product/ProductImageSlider';
import PrimaryButton from 'components/Button/PrimaryButton';
import ShareModal from 'components/Modal/ShareModal';
import { cart, orderSheet } from 'api/order';
import { banner } from 'api/display';
import { CHANNEL_TYPE } from 'models';
import { ProductOption, FlatOption } from 'models/product';
import { OrderSheetBody, ShoppingCartBody } from 'models/order';
import { useMember } from 'hooks';
import useProductOptionList from 'hooks/queries/useProductOptionList';
import useProductDetail from 'hooks/queries/useProductDetail';
import { isMobile } from 'utils/styles/responsive';
import { sortBanners } from 'utils/banners';
import media from 'utils/styles/media';
import { KRW } from 'utils/currency';
import BANNER from 'const/banner';
import PATHS from 'const/paths';
import { ReactComponent as ShareIcon } from 'assets/icons/share.svg';
import { ReactComponent as AddCartIcon } from 'assets/icons/add_cart.svg';
import { ReactComponent as NewIcon } from 'assets/icons/new.svg';
import HTTP_RESPONSE from 'const/http';
import { isLogin } from 'utils/users';

const ProductContainer = styled(LayoutResponsive)`
    max-width: 1280px;
    text-align: left;
    padding-top: 0;
`;

const ProductContainerTop = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 230px;

    ${media.medium} {
        flex-direction: column;
    }
`;

const ProductInfoContainer = styled.div`
    width: 510px;

    ${media.medium} {
        width: 100%;
    }
`;

const ProductInfoIconContainer = styled.div<{ isNew?: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.isNew ? 'space-between' : 'flex-end')};
    align-items: center;
    margin-bottom: 10px;
`;

const ProductTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const ProductTitle = styled.h2`
    font-size: 64px;
    font-weight: bold;
    line-height: 77px;
    letter-spacing: 0;
    color: #191919;
    margin-bottom: 5px;

    ${media.medium} {
        font-size: 38px;
        line-height: 46px;
    }
`;

const ProductText = styled.div`
    font-size: 16px;
    color: #858585;
`;

const ProductPriceContainer = styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 16px;
    border-bottom: 2px solid #222943;
    margin-bottom: 30px;
`;

const SalePrice = styled.p`
    font-weight: bold;
    font-size: 40px;
    line-height: 36px;
    letter-spacing: 0;
    color: #191919;
    margin-right: 10px;

    > sub {
        font-size: 24px;
        font-weight: normal;
    }
`;

const ProductPrice = styled.span`
    font-weight: normal;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0;
    color: #a8a8a8;
    text-decoration: line-through;

    > sub {
        text-decoration: line-through;
        font-size: 16px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-height: 68px;

    ${media.medium} {
        max-height: 54px;
    }
`;

const CartButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #191919;
    padding: 14px;
    height: 100%;
    margin-right: 20px;

    ${media.medium} {
        margin-right: 6px;
    }
`;

const StyledAddCartIcon = styled(AddCartIcon)`
    width: 40px;
    height: 40px;

    ${media.medium} {
        width: 24px;
        height: 24px;
    }
`;

const BuyNowButton = styled(PrimaryButton)`
    width: 100%;
    height: 100%;
    font-weight: bold;
    font-size: 24px;
    line-height: 68px;
    letter-spacing: 0;
    padding: 0;

    ${media.medium} {
        font-size: 14px;
        line-height: 54px;
    }
`;

const ProductContainerBottom = styled.div``;

const ProductContentContainer = styled.section`
    & img {
        max-width: 100%;
    }
`;

const ProductDetailTabList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
`;

const ProductDetailTabListItem = styled.li<{ selected: boolean }>`
    border-bottom: 3px solid
        ${(props) => (props.selected ? '#191919' : '#dbdbdb')};
    text-align: center;
    font-size: 24px;
    flex: 1 1 25%;
    padding: 22px 0;
    color: #191919;

    ${media.medium} {
        font-size: 16px;
        padding: 10px 0;
    }
`;

const ProductDetail = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { t: productDetail } = useTranslation('productDetail');

    const { productNo } = useParams() as { productNo: string };

    if (isNil(productNo)) {
        navigate(PATHS.MAIN);
    }

    const { width } = useWindowSize();

    // TODO: 제거 예정
    const [productImageData, setProductImageData] = useState<{
        [id: string]: string[];
    }>({ represent: [] });

    const [productOptionList, setProductOptionList] = useState<FlatOption[]>(
        [],
    );
    const [selectedOptionList, setSelectedOptionList] = useState<
        ProductOption[]
    >([]);
    const [selectedTab, setSelectedTab] = useState('productSummary');

    const [isModalVisible, setIsModalVisible] = useState(false);

    const productDetailData = useProductDetail({
        productNo,
        options: {
            onSuccess: (data) => {
                setProductImageData((prev) => ({
                    ...prev,
                    represent: data?.baseInfo?.imageUrls,
                }));
            },
        },
    });

    useProductOptionList({
        productNo,
        options: {
            onSuccess: (data) => {
                setProductOptionList(data.flatOptions);
            },
        },
    });

    const cartMutate = useMutation(
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
        if (selectedOptionList.length <= 0) {
            alert('옵션을 선택해주세요.');
            return;
        }

        if (isLogin()) {
            cartMutate.mutate(
                pipe(
                    selectedOptionList,
                    map((a) => ({
                        orderCnt: a.count,
                        channelType: CHANNEL_TYPE.NAVER_EP,
                        optionInputs: [],
                        optionNo: a.optionNo,
                        productNo: parseInt(a.productNo),
                    })),
                    toArray,
                ),
            );
        } else {
            dispatch(
                setCart(
                    pipe(
                        selectedOptionList,
                        map((a) => ({
                            orderCnt: a.count,
                            channelType: CHANNEL_TYPE.NAVER_EP,
                            optionInputs: [],
                            optionNo: a.optionNo,
                            productNo: parseInt(a.productNo),
                        })),
                        toArray,
                    ),
                ),
            );
            alert(productDetail('successCartAlert'));
        }
    };

    const purchaseMutate = useMutation(
        async (orderSheetList: OrderSheetBody) =>
            await orderSheet.writeOrderSheet(orderSheetList),
        {
            onSuccess: (res) => {
                if (res.status === HTTP_RESPONSE.HTTP_OK) {
                    navigate({
                        pathname: `/order/sheet/${res.data.orderSheetNo}`,
                    });
                }
            },
            onError: (error) => {
                const err = error as AxiosError<ShopByErrorResponse>;
                alert(err?.response?.data?.message);
            },
        },
    );

    const purchaseHandler = async () => {
        if (selectedOptionList.length <= 0) {
            alert('옵션을 선택해주세요.');
            return;
        }

        purchaseMutate.mutateAsync({
            trackingKey: '',
            channelType: CHANNEL_TYPE.NAVER_EP,
            products: pipe(
                selectedOptionList,
                map((a) => ({
                    orderCnt: a.count,
                    channelType: CHANNEL_TYPE.NAVER_EP,
                    optionInputs: [],
                    optionNo: a.optionNo,
                    productNo: parseInt(a.productNo),
                })),
                toArray,
            ),
        });
    };

    const { data: mainBannerData } = useQuery(
        ['mainCategoryBanner', BANNER.MAIN_CATEGORY_BANNER],
        async () => await banner.getBanners([BANNER.MAIN_CATEGORY_BANNER]),
        {
            select: ({ data }) => data,
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

    const onShareButtonClick = () => {
        setIsModalVisible(true);
    };

    const totalAmount = useMemo(
        () =>
            pipe(
                selectedOptionList,
                map((a) => a.count),
                sum,
            ),
        [selectedOptionList],
    );

    const totalPrice = useMemo(
        () =>
            pipe(
                selectedOptionList,
                map((a) => a.amountPrice),
                sum,
            ),
        [selectedOptionList],
    );

    return (
        <>
            {isModalVisible && (
                <ShareModal
                    width={isMobile(width) ? 'calc(100% - 48px)' : '700px'}
                    onClickToggleModal={() => setIsModalVisible(false)}
                />
            )}

            {mainBannerData?.[0]?.accounts && (
                <MainCategoryBanners
                    banners={sortBanners(mainBannerData[0].accounts[0].banners)}
                />
            )}

            <ProductContainer>
                <ProductContainerTop>
                    <ProductImageSlider
                        imageList={productDetailData.data?.baseInfo.imageUrls}
                    />
                    <ProductInfoContainer>
                        <ProductInfoIconContainer isNew>
                            {/* TODO: NewIcon은 conditional */}
                            <NewIcon />
                            <ShareIcon onClick={() => onShareButtonClick()} />
                        </ProductInfoIconContainer>

                        <ProductTitleBox>
                            <ProductTitle>
                                {productDetailData.data?.baseInfo.productName}
                            </ProductTitle>
                            <ProductText>
                                {productDetailData.data?.baseInfo.promotionText}
                            </ProductText>
                        </ProductTitleBox>

                        {productDetailData.data && (
                            <ProductPriceContainer>
                                <SalePrice
                                    dangerouslySetInnerHTML={{
                                        __html: KRW(
                                            productDetailData.data.price
                                                .salePrice -
                                                productDetailData.data.price
                                                    .immediateDiscountAmt,
                                            {
                                                symbol: '<sub>원</sub>',
                                                precision: 0,
                                                pattern: `# !`,
                                                negativePattern: `- # !`,
                                            },
                                        ).format(),
                                    }}
                                />

                                <ProductPrice
                                    dangerouslySetInnerHTML={{
                                        __html: KRW(
                                            productDetailData.data.price
                                                .salePrice,
                                            {
                                                symbol: '<sub>원</sub>',
                                                precision: 0,
                                                pattern: `# !`,
                                                negativePattern: `- # !`,
                                            },
                                        ).format(),
                                    }}
                                />
                            </ProductPriceContainer>
                        )}

                        {productDetailData.data?.deliveryFee && (
                            <DeliveryInfo
                                deliveryFee={
                                    productDetailData.data.deliveryFee
                                        .deliveryAmt
                                }
                            />
                        )}

                        <AccumulationInfo
                            accumulationAmtWhenBuyConfirm={
                                productDetailData.data?.price
                                    .accumulationAmtWhenBuyConfirm
                            }
                        />

                        <ProductOptionList
                            productNo={productNo}
                            productOptionList={productOptionList}
                            selectedOptionList={selectedOptionList}
                            setSelectedOptionList={setSelectedOptionList}
                        />

                        <TotalPriceInfo
                            totalAmount={totalAmount}
                            totalPrice={totalPrice}
                        />

                        <ButtonContainer>
                            <CartButton onClick={addCartHandler}>
                                <StyledAddCartIcon />
                            </CartButton>
                            <BuyNowButton
                                disabled={purchaseMutate.isLoading}
                                onClick={purchaseHandler}
                            >
                                {purchaseMutate.isLoading
                                    ? 'loading...'
                                    : productDetail('buyNow')}
                            </BuyNowButton>
                        </ButtonContainer>
                    </ProductInfoContainer>
                </ProductContainerTop>

                <ProductContainerBottom>
                    <ProductDetailTabList>
                        {productDetailTab.map(({ title, name }) => (
                            <ProductDetailTabListItem
                                key={title}
                                selected={selectedTab === title}
                                onClick={() => setSelectedTab(title)}
                            >
                                {name}
                            </ProductDetailTabListItem>
                        ))}
                    </ProductDetailTabList>

                    {selectedTab === 'productSummary' && (
                        <ProductContentContainer
                            id='productSummary'
                            dangerouslySetInnerHTML={{
                                __html:
                                    productDetailData.data?.baseInfo.content ??
                                    '',
                            }}
                        />
                    )}

                    {selectedTab === 'productSpecification' && (
                        <ProductContentContainer
                            id='productSpecifications'
                            dangerouslySetInnerHTML={{
                                __html:
                                    productDetailData.data?.baseInfo.content ??
                                    '',
                            }}
                        />
                    )}

                    {selectedTab === 'productComparison' && (
                        <ProductContentContainer
                            id='productComparison'
                            dangerouslySetInnerHTML={{
                                __html:
                                    productDetailData.data?.baseInfo.content ??
                                    '',
                            }}
                        />
                    )}

                    {selectedTab === 'productPolicy' && (
                        <ProductContentContainer
                            id='productPolicy'
                            dangerouslySetInnerHTML={{
                                __html:
                                    productDetailData.data?.baseInfo.content ??
                                    '',
                            }}
                        />
                    )}

                    <RelatedProduct
                        relatedProductNos={
                            productDetailData.data?.relatedProductNos || []
                        }
                    />
                </ProductContainerBottom>
            </ProductContainer>
        </>
    );
};

export default ProductDetail;
