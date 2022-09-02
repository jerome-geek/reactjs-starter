import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { head } from '@fxts/core';
import { shallowEqual } from 'react-redux';
import { useWindowSize } from 'usehooks-ts';

import Header from 'components/shared/Header';
import GoBackButton from 'components/Button/GoBackButton';
import CartList from 'components/Cart/CartList';
import OrderSheetPrice from 'components/OrderSheet/OrderSheetPrice';
import { useAppDispatch, useTypedSelector } from 'state/reducers';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square_unchecked.svg';
import { useCart, useMember } from 'hooks';
import { deleteCart, updateCart } from 'state/slices/cartSlice';
import { cart, guestOrder, orderSheet } from 'api/order';
import { CHANNEL_TYPE } from 'models';
import {
    DeliveryGroup,
    OrderProductOption,
    OrderSheetBody,
    Products,
    ShoppingCartBody,
} from 'models/order';
import { isDesktop } from 'utils/styles/responsive';
import media from 'utils/styles/media';

const CartContainer = styled.div`
    width: 1280px;
    margin: 118px auto;
    display: flex;
    justify-content: space-between;
    ${media.custom(1280)} {
        width: 100%;
        padding: 0 24px;
    }
    ${media.medium} {
        margin-top: 25px;
        flex-direction: column;
    }
`;

const CartListWrapper = styled.div`
    width: 65%;
    ${media.medium} {
        width: 100%;
    }
`;

const TitleBox = styled.div`
    position: relative;
    > div {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Title = styled.h2`
    margin-bottom: 60px;
    width: 100%;
    color: #191919;
    font-size: 24px;
    font-weight: bold;
    ${media.medium} {
        text-align: center;
        font-size: 16px;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.medium} {
        margin-bottom: 30px;
        padding-left: 9px;
    }
`;

const SelectAll = styled.div`
    display: flex;
    margin: 0 0 14px 6px;
    > input {
        display: none;
    }
    > label {
        height: 24px;
        margin-top: 2px;
    }
    > div {
        display: flex;
        color: #191919;
        align-items: center;
        font-size: 16px;
        margin-left: 9.5px;
        line-height: 24px;
        > p {
            margin-left: 10px;
        }
    }
    ${media.medium} {
        margin: 0;
        > div {
            margin-left: 0;
            > p {
                color: #999999;
            }
        }
    }
`;

const CheckCount = styled.div`
    color: #8f8f8f;
    > span {
        color: #191919;
        font-weight: bold;
    }
`;

const DeleteSelection = styled.div`
    width: 210px;
    height: 44px;
    border: 1px solid #dbdbdb;
    margin-top: 30px;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
    ${media.medium} {
        width: auto;
        height: auto;
        margin-top: 0;
        border: none;
        color: #999999;
        font-size: 16px;
    }
`;

const CartListContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    ${media.medium} {
        margin-bottom: 24px;
    }
`;

const CartCategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    > div {
        padding: 20px 0;
        text-align: center;
        color: #191919;
        font-size: 16px;
        font-weight: bold;
    }
`;

const NoProductMessage = styled.div`
    padding: 46px 0;
    text-align: center;
    color: #ababab;
    font-size: 16px;
    ${media.medium} {
        padding: 72px 0;
    }
`;

const CartInformation = styled.div`
    width: 240px;
    display: flex;
    justify-content: space-around;
`;

const CartCountBox = styled.div`
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dbdbdb;
        width: 78px;
        > div {
            width: 26px;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }
    }
`;

const CartPrice = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
        font-size: 16px;
        color: #191919;
        position: relative;
        > span {
            display: block;
            position: absolute;
            bottom: 100%;
            text-decoration: line-through;
            font-size: 12px;
            color: #ababab;
        }
    }
`;

const CartDelivery = styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #191919;
    font: 16px;
`;

const CartAmount = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    > span {
        font-weight: 400;
    }
`;

const CartCloseButton = styled.div`
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CartPriceContainer = styled.div`
    position: relative;
    width: 31%;
    ${media.medium} {
        position: unset;
    }
    ${media.medium} {
        width: 100%;
    }
`;

const CartPriceWrapper = styled.div`
    position: sticky;
    top: 175px;
    ${media.medium} {
        top: auto;
        bottom: 0;
    }
`;

const CartOrderPurchaseButton = styled.div`
    width: 100%;
    height: 44px;
    background: #222943;
    text-align: center;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
    position: absolute;
    top: 100%;
    left: 0;
    cursor: pointer;
    ${media.medium} {
        position: fixed;
        top: auto;
        bottom: 0;
    }
`;

const ContinueShoppingButton = styled(CartOrderPurchaseButton)`
    > a {
        display: inline-block;
        width: 100%;
    }
    ${media.medium} {
        position: unset;
        height: 54px;
        line-height: 54px;
    }
`;

interface CartListType {
    [id: number]: OrderProductOption & {
        deliveryAmt: number;
        productName: string;
    };
}

export interface OrderPrice {
    [id: string]: { name: string; price: number };
}

const Cart = () => {
    const [checkList, setCheckList] = useState<number[]>([]);
    const [cartList, setCartList] = useState<CartListType>({});
    const [cartOrderPrice, setCartOrderPrice] = useState<OrderPrice>({});

    const { refetch: cartRefetch } = useCart();
    const { member } = useMember();
    const { width } = useWindowSize();

    const dispatch = useAppDispatch();

    const { cart: guestCartList } = useTypedSelector(
        ({ cart }) => ({
            cart: cart.data,
        }),
        shallowEqual,
    );

    const setCartHandler = (deliveryGroups: DeliveryGroup[]): CartListType => {
        const cartList: CartListType = {};

        deliveryGroups.forEach((deliveryGroup) => {
            deliveryGroup.orderProducts.forEach((orderProduct) => {
                orderProduct.orderProductOptions.forEach((productOption) => {
                    cartList[productOption.cartNo] = {
                        ...productOption,
                        deliveryAmt: deliveryGroup.deliveryAmt,
                        productName: orderProduct.productName,
                    };
                });
            });
        });

        return cartList;
    };

    const { mutate: guestCartMutate, isLoading: isGuestCartLoading } =
        useMutation(
            async (cartList: ShoppingCartBody[]) =>
                await guestOrder.getCart(cartList, {
                    divideInvalidProducts: true,
                }),
            {
                onSuccess: (res) => {
                    setCartList((prev) => {
                        return {
                            ...prev,
                            ...setCartHandler(res.data.deliveryGroups),
                        };
                    });
                },
            },
        );

    const { data: guestCartPriceData, mutate: guestCartPriceMutate } =
        useMutation(
            async (cartList: ShoppingCartBody[]) =>
                await guestOrder.getCart(cartList, {
                    divideInvalidProducts: true,
                }),
            {
                onSuccess: (res) => {
                    setCartOrderPrice((prev) => {
                        prev.totalOrderPrice = {
                            name: '총 주문금액',
                            price: res?.data.price?.standardAmt,
                        };
                        prev.totalDiscountPrice = {
                            name: '총 할인금액',
                            price: res.data.price.discountAmt,
                        };
                        prev.totalDeliveryPrice = {
                            name: '총 배송비',
                            price: res?.data.price?.totalDeliveryAmt,
                        };

                        return { ...prev };
                    });
                },
            },
        );

    const { isFetching: isCartLoading, refetch: getCartFetch } = useQuery(
        ['cartList', { member: member?.memberName }],
        async () => await cart.getCart({ divideInvalidProducts: true }),
        {
            onSuccess: (res) => {
                cartRefetch();
                setCartList((prev) => {
                    return {
                        ...prev,
                        ...setCartHandler(res.data.deliveryGroups),
                    };
                });
            },
            enabled: !!member,
        },
    );

    const { data: cartOrderPriceData } = useQuery(
        ['cartPrice', { member: member?.memberName, checkList, cartList }],
        async () =>
            await cart.getSelectedCartPrice({
                divideInvalidProducts: true,
                cartNo: checkList,
            }),
        {
            select: (res) => res.data,
            onSuccess: (res) =>
                setCartOrderPrice((prev) => {
                    prev.totalOrderPrice = {
                        name: '총 주문금액',
                        price: res?.standardAmt,
                    };
                    prev.totalDiscountPrice = {
                        name: '총 할인금액',
                        price: res.discountAmt,
                    };
                    prev.totalDeliveryPrice = {
                        name: '총 배송비',
                        price: res?.totalDeliveryAmt,
                    };

                    return { ...prev };
                }),
            enabled: !!member && checkList.length > 0,
        },
    );

    const { mutate: updateCartMutate } = useMutation(
        async (
            updateCartData: Pick<
                ShoppingCartBody,
                'cartNo' | 'orderCnt' | 'optionInputs'
            >,
        ) => await cart.updateCart(updateCartData),
        {
            onSuccess: () => {
                getCartFetch();
            },
        },
    );

    const { mutate: purchaseMutate } = useMutation(
        async (orderSheetList: OrderSheetBody) =>
            await orderSheet.writeOrderSheet(orderSheetList),
        {
            onSuccess: (res) => {
                navigate({ pathname: `/order/sheet/${res.data.orderSheetNo}` });
            },
            onError: () => {
                alert('구매 실패!');
            },
        },
    );

    const purchaseHandler = () => {
        if (checkList.length <= 0) {
            return;
        }

        const products: Products[] = [];

        checkList.forEach((cartNo) => {
            products.push({
                channelType: '',
                orderCnt: cartList[cartNo].orderCnt,
                optionNo: cartList[cartNo].optionNo,
                productNo: cartList[cartNo].productNo,
            });
        });

        purchaseMutate({
            trackingKey: '',
            channelType: CHANNEL_TYPE.NAVER_EP,
            products: products,
            cartNos: checkList,
            productCoupons: [],
        });
    };

    const productCountHandler = (number: number, cartNo: number) => () => {
        if (cartList[cartNo].orderCnt + number <= 0) {
            alert('1개 이상 구매하여야 합니다.');
            return;
        }

        if (member) {
            updateCartMutate({
                cartNo: cartList[cartNo].cartNo,
                orderCnt: cartList[cartNo].orderCnt + number,
                optionInputs: cartList[cartNo].optionInputs,
            });
        } else {
            dispatch(
                updateCart({
                    optionNo: cartList[cartNo].cartNo,
                    orderCnt: cartList[cartNo].orderCnt + number,
                }),
            );
        }
    };

    useEffect(() => {
        if (!member) guestCartMutate(guestCartList);
    }, [guestCartList]);

    useEffect(() => {
        guestCartPriceMutate(
            guestCartList.filter(({ optionNo }) => {
                return checkList.includes(optionNo);
            }),
        );
    }, [checkList, cartList]);

    const { mutate: deleteCartMutate } = useMutation(
        async (deleteCartNos: { cartNo: number | number[] }) =>
            await cart.deleteCart(deleteCartNos),
        {
            onSuccess: () => {
                getCartFetch();
            },
            onError: () => {},
        },
    );

    const deleteCartHandler = (cartNo: number) => () => {
        setCartList((prev) => {
            const copyCartList = { ...prev };
            delete copyCartList[cartNo];
            return { ...copyCartList };
        });
        if (member) {
            deleteCartMutate({ cartNo });
        } else {
            dispatch(deleteCart({ deleteList: [cartNo] }));
        }
    };

    const deleteCheckCartHandler = () => {
        if (checkList.length < 1) {
            return;
        }

        setCartList((prev) => {
            const copyCartList = { ...prev };
            checkList.forEach((checkedCartNo) => {
                delete copyCartList[checkedCartNo];
                return { ...copyCartList };
            });
            return { ...copyCartList };
        });

        if (member) {
            deleteCartMutate({
                cartNo: checkList.length > 1 ? checkList : head(checkList)!,
            });
        } else {
            dispatch(deleteCart({ deleteList: checkList }));
        }

        setCheckList([]);
    };

    const navigate = useNavigate();

    const agreeAllButton = (checked: boolean) => {
        if (checked) {
            const checkList: number[] = [];
            Object.keys(cartList).forEach((optionNo) => {
                checkList.push(parseFloat(optionNo));
            });
            setCheckList(checkList);
        } else {
            setCheckList([]);
        }
    };

    const agreeButton = (checked: boolean, optionNo: number) => {
        if (checked) {
            setCheckList((prev) => [...prev, optionNo]);
        } else {
            setCheckList((prev) => prev.filter((check) => check !== optionNo));
        }
    };

    const isCartListForResponsive = (
        device: 'desktop' | 'mobile' | 'mustShowDesktop',
    ) => {
        switch (device) {
            case 'desktop':
                return isDesktop(width) && Object.keys(cartList).length >= 1;

            case 'mobile':
                return !isDesktop(width) && Object.keys(cartList).length >= 1;

            case 'mustShowDesktop':
                return isDesktop(width) || Object.keys(cartList).length >= 1;

            default:
                return false;
        }
    };

    return (
        <>
            <Header />
            <CartContainer>
                <CartListWrapper>
                    <TitleBox>
                        <GoBackButton />
                        <Title>장바구니</Title>
                    </TitleBox>
                    {isCartListForResponsive('mustShowDesktop') && (
                        <SelectWrapper>
                            <SelectAll>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        agreeAllButton(e.target.checked)
                                    }
                                    checked={
                                        checkList.length ===
                                        Object.keys(cartList).length
                                    }
                                    id='agreeAll'
                                />
                                <label htmlFor='agreeAll'>
                                    {checkList.length ===
                                    Object.keys(cartList).length ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                </label>
                                <div>
                                    {' '}
                                    <p>전체 선택</p>
                                    <CheckCount>
                                        &nbsp;(<span>{checkList.length}</span>/
                                        {Object.keys(cartList).length})
                                    </CheckCount>
                                </div>
                            </SelectAll>
                            {!isDesktop(width) && (
                                <DeleteSelection
                                    onClick={deleteCheckCartHandler}
                                >
                                    선택 상품 삭제
                                </DeleteSelection>
                            )}
                        </SelectWrapper>
                    )}
                    <CartListContainer>
                        {isDesktop(width) && (
                            <CartCategoryBox>
                                <CartInformation>상품 정보</CartInformation>
                                <CartCountBox>수량</CartCountBox>
                                <CartPrice>가격</CartPrice>
                                <CartDelivery>배송비</CartDelivery>
                                <CartAmount>총 상품 금액</CartAmount>
                                <CartCloseButton></CartCloseButton>
                            </CartCategoryBox>
                        )}
                        {Object.keys(cartList).length < 1 ? (
                            <NoProductMessage>
                                장바구니에 담긴 상품이 없습니다.
                            </NoProductMessage>
                        ) : isCartLoading || isGuestCartLoading ? (
                            '장바구니 불러오는 중' //TODO 로딩
                        ) : (
                            Object.values(cartList).map((cartData) => {
                                return (
                                    <CartList
                                        cartData={cartData}
                                        checkList={checkList}
                                        agreeButton={agreeButton}
                                        productCountHandler={
                                            productCountHandler
                                        }
                                        deleteCartHandler={deleteCartHandler}
                                        key={cartData.cartNo}
                                    ></CartList>
                                );
                            })
                        )}
                    </CartListContainer>
                    {isDesktop(width) && (
                        <DeleteSelection onClick={deleteCheckCartHandler}>
                            선택 상품 삭제
                        </DeleteSelection>
                    )}
                </CartListWrapper>
                {isDesktop(width) && (
                    <CartPriceContainer>
                        <CartPriceWrapper>
                            <OrderSheetPrice
                                title={'주문서'}
                                cartOrderPrice={cartOrderPrice}
                                amountPrice={
                                    member
                                        ? cartOrderPriceData?.totalAmt
                                        : guestCartPriceData?.data.price
                                              .totalAmt
                                }
                            />
                            {isCartListForResponsive('desktop') ? (
                                <CartOrderPurchaseButton
                                    onClick={purchaseHandler}
                                >
                                    {checkList.length} 개 상품 바로구매
                                </CartOrderPurchaseButton>
                            ) : (
                                <ContinueShoppingButton>
                                    <Link to={'/'}>쇼핑 계속하기</Link>
                                </ContinueShoppingButton>
                            )}
                        </CartPriceWrapper>
                    </CartPriceContainer>
                )}
                {!isCartListForResponsive('mustShowDesktop') && (
                    <ContinueShoppingButton>
                        <Link to={'/'}>쇼핑 계속하기</Link>
                    </ContinueShoppingButton>
                )}
            </CartContainer>
            {isCartListForResponsive('mobile') && (
                <CartOrderPurchaseButton onClick={purchaseHandler}>
                    {checkList.length} 개 상품 바로구매
                </CartOrderPurchaseButton>
            )}
        </>
    );
};

export default Cart;
