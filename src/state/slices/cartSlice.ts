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
                    (accumulatedCartList: initialState[], currentCartData) => {
                        const overlapIndex = findIndex(
                            (a) => a.optionNo === currentCartData.optionNo,
                            accumulatedCartList,
                        );

                        if (overlapIndex === -1) {
                            accumulatedCartList.push(currentCartData);
                        } else {
                            accumulatedCartList[overlapIndex].orderCnt +=
                                currentCartData.orderCnt;
                        }
                        return accumulatedCartList;
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
                        (a) => !includes(a.optionNo, action.payload.deleteList),
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
