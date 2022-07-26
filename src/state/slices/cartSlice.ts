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
                data: [
                    ...state.data.map((baseCartData) => {
                        let addedOrderCnt: ShoppingCartBody = {
                            ...baseCartData,
                        };

                        if (
                            baseCartData?.optionNo === action.payload.optionNo
                        ) {
                            addedOrderCnt.orderCnt = action.payload.orderCnt;
                        }

                        return addedOrderCnt;
                    }),
                ],
            };
        },
        deleteCart: (state, action) => {
            return {
                data: [
                    ...state.data.filter((item: ShoppingCartBody) => {
                        let isDeletedCart = false;
                        action.payload.deleteList.forEach((cartNo: number) => {
                            if (item.cartNo === cartNo) isDeletedCart = true;
                        });

                        if (!isDeletedCart) return item;
                    }),
                ],
            };
        },
    },
});

export const { setCart, updateCart, deleteCart } = cartSlice.actions;

export default cartSlice;
