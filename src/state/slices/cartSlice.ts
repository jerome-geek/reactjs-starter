import {
    filter,
    find,
    includes,
    map,
    partition,
    pipe,
    pluck,
    toArray,
} from '@fxts/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShoppingCartBody } from 'models/order';

interface initialState extends ShoppingCartBody {
    isChecked?: boolean;
}

const cartInitialState: {
    data: initialState[];
} = {
    data: [],
};

export const cartSlice = createSlice({
    name: 'member',
    initialState: cartInitialState,
    reducers: {
        setCart: (state, action: PayloadAction<initialState[]>) => {
            if (state.data.length > 0) {
                const originOptionList = pipe(
                    state.data,
                    pluck('optionNo'),
                    toArray,
                );

                const incomingOptionList = pipe(
                    action.payload,
                    pluck('optionNo'),
                    toArray,
                );

                const [_, newCartOptionList] = pipe(
                    incomingOptionList,
                    partition((a) => originOptionList.includes(a)),
                );

                const newCartList = pipe(
                    action.payload,
                    filter((a) => newCartOptionList.includes(a.optionNo)),
                    toArray,
                );

                const originCartList = pipe(
                    state.data,
                    map((a) =>
                        Object({
                            ...a,
                            orderCnt:
                                a.orderCnt +
                                    find(
                                        (b) => b.optionNo === a.optionNo,
                                        action.payload,
                                    )?.orderCnt! || a.orderCnt,
                        }),
                    ),
                    toArray,
                );

                return {
                    data: [...newCartList, ...originCartList],
                };
            }
            return {
                data: [...action.payload],
            };
        },
        updateCart: (state, action) => {
            return {
                data: pipe(
                    state.data,
                    map((a) =>
                        a.cartNo === action.payload.cartNo
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
        checkCart: (state, action) => {
            return {
                data: pipe(
                    state.data,
                    map((a) =>
                        a.optionNo === action.payload.optionNo
                            ? { ...a, isChecked: !a.isChecked }
                            : a,
                    ),
                    toArray,
                ),
            };
        },
        checkAllCart: (state, action) => {
            return {
                data: pipe(
                    state.data,
                    map((a) => ({ ...a, isChecked: action.payload.checked })),
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

export const { setCart, updateCart, checkCart, checkAllCart, deleteCart } =
    cartSlice.actions;

export default cartSlice;
