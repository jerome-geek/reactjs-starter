import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { head } from '@fxts/core';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';

import { CHANNEL_TYPE } from 'models';
import { cart, guestOrder, orderSheet } from 'api/order';
import {
    OrderProductOption,
    OrderSheetBody,
    Products,
    ShoppingCartBody,
} from 'models/order';
import CartList from 'components/Cart/CartList';
import OrderSheetPrice from 'components/OrderSheet/OrderSheetPrice';
import { useAppDispatch, useTypedSelector } from 'state/reducers';
import { ReactComponent as CloseButtonIcon } from 'assets/icons/gray_close_icon.svg';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square.svg';
import currency from 'currency.js';
import { deleteCart, updateCart } from 'state/slices/cartSlice';

const CartContainer = styled.div`
    width: 1280px;
    margin: 118px auto;
    display: flex;
    justify-content: space-between;
`;

const CartListWrapper = styled.div`
    width: 836.5px;
`;

const Title = styled.h2`
    margin-bottom: 60px;
    color: #191919;
    font-size: 24px;
    font-weight: bold;
`;

const SelectWrapper = styled.div``;

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
        font-size: 16px;
        margin-left: 9.5px;
        line-height: 24px;
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
`;

const CartListContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
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
`;

const CartInformation = styled.div`
    width: 240px;
    display: flex;
    justify-content: space-around;
`;

const CartName = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > p {
        font-size: 16px;
        color: #191919;
    }
    > p:last-child {
        font-size: 12px;
        color: #999;
        margin-top: 3px;
    }
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
    width: 400px;
    position: relative;
`;

const CartPriceWrapper = styled.div`
    position: sticky;
    top: 175px;
`;

const CartOrderPurchaseButton = styled.div`
    width: 400px;
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
`;

const Cart = () => {
    const [checkList, setCheckList] = useState<number[]>([]);
    const [cartList, setCartList] = useState<{
        [id: number]: OrderProductOption & {
            deliveryAmt: number;
            productName: string;
        };
    }>({});

    const dispatch = useAppDispatch();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { cart: guestCartList } = useTypedSelector(
        ({ cart }) => ({
            cart: cart.data,
        }),
        shallowEqual,
    );

    const {
        data: guestCartOrderPriceData,
        mutate: guestCartMutate,
        isLoading: isGuestCartLoading,
    } = useMutation(
        async (cartList: ShoppingCartBody[]) =>
            await guestOrder.getCart(cartList, {
                divideInvalidProducts: true,
            }),
        {
            onSuccess: (res) => {
                setCartList((prev) => {
                    res.data.deliveryGroups.forEach((deliveryGroup) => {
                        deliveryGroup.orderProducts.forEach((orderProduct) => {
                            orderProduct.orderProductOptions.forEach(
                                (productOption) => {
                                    prev[productOption.cartNo] = {
                                        ...productOption,
                                        deliveryAmt: deliveryGroup.deliveryAmt,
                                        productName: orderProduct.productName,
                                    };
                                },
                            );
                        });
                    });
                    return { ...prev };
                });
            },
        },
    );

    const { isFetching: isCartLoading, refetch: getCartFetch } = useQuery(
        ['cart', { member: member?.memberName }],
        async () => await cart.getCart({ divideInvalidProducts: true }),
        {
            onSuccess: (res) => {
                setCartList((prev) => {
                    res.data.deliveryGroups.forEach((deliveryGroup) => {
                        deliveryGroup.orderProducts.forEach((orderProduct) => {
                            orderProduct.orderProductOptions.forEach(
                                (productOption) => {
                                    prev[productOption.cartNo] = {
                                        ...productOption,
                                        deliveryAmt: deliveryGroup.deliveryAmt,
                                        productName: orderProduct.productName,
                                    };
                                },
                            );
                        });
                    });
                    return { ...prev };
                });
            },
            enabled: false,
            refetchOnWindowFocus: false,
        },
    );

    const { data: cartOrderPriceData, refetch: getCartOrderPriceData } =
        useQuery(
            ['cart', { checkList, cartList }],
            async () =>
                await cart.getSelectedCartPrice({
                    divideInvalidProducts: true,
                    cartNo:
                        checkList.length > 1
                            ? checkList
                            : checkList.length > 0
                            ? head(checkList)!
                            : null,
                }),
            {
                select: (res) => res.data,
                refetchOnWindowFocus: false,
                enabled: false,
            },
        );

    useEffect(() => {
        if (member) {
            getCartFetch();
            getCartOrderPriceData();
        } else {
            guestCartMutate(guestCartList);
        }
    }, [member, checkList]);

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
            onError: () => {},
        },
    );

    const { mutate: purchaseMutate } = useMutation(
        async (orderSheetList: OrderSheetBody) =>
            await orderSheet.writeOrderSheet(orderSheetList),
        {
            onSuccess: (res) => {
                navigate({ pathname: `/order/sheet${res.data.orderSheetNo}` }); // TODO orderSheetNo 파라미터 주문서 페이지로 이동
            },
            onError: () => {
                alert('구매 실패 alert');
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
        guestCartMutate(guestCartList);
    }, [guestCartList]);

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

    const cartOrderPrice = member
        ? [
              ['총 주문금액', cartOrderPriceData?.standardAmt],
              ['총 할인금액', cartOrderPriceData?.discountAmt],
              ['총 배송비', cartOrderPriceData?.totalDeliveryAmt],
          ]
        : [
              ['총 주문금액', guestCartOrderPriceData?.data.price?.standardAmt],
              ['총 할인금액', guestCartOrderPriceData?.data.price?.discountAmt],
              [
                  '총 배송비',
                  guestCartOrderPriceData?.data.price?.totalDeliveryAmt,
              ],
          ];

    return (
        <>
            <CartContainer>
                <CartListWrapper>
                    <Title>장바구니</Title>
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
                                <p>전체 선택 </p>
                                <CheckCount>
                                    (<span>{checkList.length}</span>/
                                    {Object.keys(cartList).length})
                                </CheckCount>
                            </div>
                        </SelectAll>
                    </SelectWrapper>
                    <CartListContainer>
                        <CartCategoryBox>
                            <CartInformation>상품 정보</CartInformation>
                            <CartCountBox>수량</CartCountBox>
                            <CartPrice>가격</CartPrice>
                            <CartDelivery>배송비</CartDelivery>
                            <CartAmount>총 상품 금액</CartAmount>
                            <CartCloseButton></CartCloseButton>
                        </CartCategoryBox>
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
                    <DeleteSelection onClick={deleteCheckCartHandler}>
                        선택 상품 삭제
                    </DeleteSelection>
                </CartListWrapper>
                <CartPriceContainer>
                    <CartPriceWrapper>
                        <OrderSheetPrice
                            title={'주문서'}
                            cartOrderPrice={cartOrderPrice}
                            amountPrice={
                                member
                                    ? cartOrderPriceData?.totalAmt
                                    : guestCartOrderPriceData?.data.price
                                          .totalAmt
                            }
                        />
                        <CartOrderPurchaseButton onClick={purchaseHandler}>
                            {checkList.length} 개 상품 바로구매
                        </CartOrderPurchaseButton>
                    </CartPriceWrapper>
                </CartPriceContainer>
            </CartContainer>
        </>
    );
};

export default Cart;
