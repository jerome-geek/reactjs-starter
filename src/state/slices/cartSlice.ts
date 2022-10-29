import { filter, includes, map, pipe, toArray } from '@fxts/core';
import { createSlice } from '@reduxjs/toolkit';

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
        setCart: (state, action) => {
            if (state.data.length > 0) {
                return {
                    data: [
                        ...state.data.map((baseCartData) => {
                            let addedOrderCnt: initialState[] = [];
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
                                            isChecked: true,
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
