import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
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
import { useAppDispatch, useTypedSelector } from 'state/reducers';
import { ReactComponent as CloseButtonIcon } from 'assets/icons/gray_close_icon.svg';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square.svg';
import currency from 'currency.js';

const CartListBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    height: 164px;
`;

const CartInformation = styled.div`
    width: 240px;
    display: flex;
    justify-content: space-around;
`;

const CartImage = styled.div`
    background: #f8f8fa;
    width: 50%;
    > img {
        display: block;
        width: 60%;
        margin: 0 auto;
    }
`;

const CartSelect = styled.div`
    > input {
        display: none;
    }
    > label {
    }
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

const CartCountMinus = styled.div`
    cursor: pointer;
`;

const CartCount = styled.div``;

const CartCountPlus = styled.div`
    cursor: pointer;
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

const CartList = ({
    cartData,
    checkList,
    agreeButton,
    productCountHandler,
    deleteCartHandler,
}: {
    cartData: OrderProductOption & {
        deliveryAmt: number;
        productName: string;
    };
    checkList: number[];
    agreeButton: (checked: boolean, cartNo: number) => void;
    productCountHandler: (number: number, cartNo: number) => () => void;
    deleteCartHandler: (cartNo: number) => () => void;
}) => {
    return (
        <CartListBox>
            <CartInformation>
                <CartImage>
                    <CartSelect>
                        <input
                            type='checkbox'
                            onChange={(e) =>
                                agreeButton(e.target.checked, cartData.cartNo)
                            }
                            checked={checkList.includes(cartData.cartNo)}
                            id={cartData.cartNo.toString()}
                        />
                        <label htmlFor={cartData.cartNo.toString()}>
                            {checkList.includes(cartData.cartNo) ? (
                                <Checked />
                            ) : (
                                <UnChecked />
                            )}
                        </label>
                    </CartSelect>
                    <img src={cartData.imageUrl} alt={cartData.optionName} />
                </CartImage>
                <CartName>
                    <p>{cartData.productName}</p>
                    <p>{cartData.optionName}</p>
                </CartName>
            </CartInformation>
            <CartCountBox>
                <div>
                    <CartCountMinus
                        onClick={productCountHandler(-1, cartData.cartNo)}
                    >
                        -
                    </CartCountMinus>
                    <CartCount>{cartData.orderCnt}</CartCount>
                    <CartCountPlus
                        onClick={productCountHandler(+1, cartData.cartNo)}
                    >
                        +
                    </CartCountPlus>
                </div>
            </CartCountBox>
            <CartPrice>
                <p>
                    <span>
                        {currency(
                            cartData.price.salePrice + cartData.price.addPrice,
                            {
                                symbol: '',
                                precision: 0,
                            },
                        ).format()}
                    </span>
                    {currency(
                        cartData.price.salePrice +
                            cartData.price.addPrice -
                            cartData.price.immediateDiscountAmt -
                            cartData.price.additionalDiscountAmt,
                        {
                            symbol: '',
                            precision: 0,
                        },
                    ).format()}{' '}
                    원
                </p>
            </CartPrice>
            <CartDelivery>
                {currency(cartData.deliveryAmt, {
                    symbol: '',
                    precision: 0,
                }).format()}{' '}
                원
            </CartDelivery>
            <CartAmount>
                {currency(cartData.price.buyAmt, {
                    symbol: '',
                    precision: 0,
                }).format()}
                <span>&nbsp;원</span>
            </CartAmount>
            <CartCloseButton onClick={deleteCartHandler(cartData.cartNo)}>
                <CloseButtonIcon />
            </CartCloseButton>
        </CartListBox>
    );
};

export default CartList;
