import { filter, includes, map, pipe, toArray } from '@fxts/core';
import { createSlice } from '@reduxjs/toolkit';

import { ShoppingCartBody } from 'models/order';

const cartInitialState: {
    data: ShoppingCartBody[];
} = {
    data: [],
};

export const cartSlice = createSlice({
    name: 'member',
    initialState: cartInitialState,
    reducers: {
        setCart: (state, action) => {
            if (state.data.length > 0) {
                return {
                    data: [
                        ...state.data.map((baseCartData) => {
                            let addedOrderCnt: ShoppingCartBody[] = [];
                            action.payload.forEach(
                                (newCartData: {
                                    optionNo: number;
                                    orderCnt: number;
                                }) => {
                                    if (
                                        baseCartData?.optionNo ===
                                        newCartData.optionNo
                                    ) {
                                        const orderCnt =
                                            baseCartData.orderCnt +
                                            newCartData.orderCnt;
                                        addedOrderCnt.push({
                                            ...baseCartData,
                                            orderCnt,
                                        });
                                    }
                                },
                            );

                            if (addedOrderCnt.length > 0)
                                return addedOrderCnt[0];
                            return baseCartData;
                        }),
                        ...action.payload.filter((item: ShoppingCartBody) => {
                            let isDuplicate = false;

                            state.data.forEach((baseCartData) => {
                                if (item.optionNo === baseCartData.optionNo)
                                    isDuplicate = true;
                            });

                            if (!isDuplicate) return item;
                        }),
                    ],
                };
            }
            return {
                data: [...state.data, ...action.payload],
            };
        },
        updateCart: (state, action) => {
            return {
                data: pipe(
                    state.data,
                    map((a) =>
                        a.optionNo === action.payload.optionNo
                            ? {
                                  ...a,
                                  orderCnt: action.payload.orderCnt,
                              }
                            : a,
                    ),
                    toArray,
                ),
            };
        },
        deleteCart: (state, action) => {
            return {
                data: pipe(
                    state.data,
                    filter(
                        (a) => !includes(a.cartNo, action.payload.deleteList),
                    ),
                    toArray,
                ),
            };
        },
    },
});

export const { setCart, updateCart, deleteCart } = cartSlice.actions;

export default cartSlice;
