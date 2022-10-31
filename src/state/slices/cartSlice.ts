import { filter, findIndex, includes, map, pipe, toArray } from '@fxts/core';
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
                const combinedArray = [...action.payload, ...state.data];

                const cartList: initialState[] = combinedArray.reduce(
                    (prev: initialState[], current) => {
                        const overlapIndex = findIndex(
                            (a) => a.optionNo === current.optionNo,
                            prev,
                        );

                        if (overlapIndex === -1) {
                            prev.push(current);
                        } else {
                            [...prev][overlapIndex].orderCnt +=
                                current.orderCnt;
                        }
                        return prev;
                    },
                    [],
                );

                return {
                    data: cartList,
                };
            }
            return {
                data: [...action.payload, ...state.data],
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
