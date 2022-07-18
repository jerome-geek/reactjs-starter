import { createSlice } from '@reduxjs/toolkit';
import { ShoppingCartBody } from 'models/order';

const cartInitialState: {
    data: Omit<ShoppingCartBody, 'cartNo'>[];
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
                        ...state.data.map((base) => {
                            let addedOrderCnt: Omit<
                                ShoppingCartBody,
                                'cartNo'
                            >[] = [];
                            action.payload.forEach(
                                (now: {
                                    optionNo: number;
                                    orderCnt: number;
                                }) => {
                                    if (base?.optionNo === now.optionNo) {
                                        const orderCnt =
                                            base.orderCnt + now.orderCnt;
                                        addedOrderCnt.push({
                                            ...base,
                                            orderCnt,
                                        });
                                    }
                                },
                            );

                            if (addedOrderCnt.length > 0)
                                return addedOrderCnt[0];
                            return base;
                        }),
                        ...action.payload.filter(
                            (item: Omit<ShoppingCartBody, 'cartNo'>) => {
                                let isDuplicate = false;

                                state.data.forEach((base) => {
                                    if (item.optionNo === base.optionNo)
                                        isDuplicate = true;
                                });

                                if (isDuplicate) return;

                                return item;
                            },
                        ),
                    ],
                };
            }
            return {
                data: [...state.data, ...action.payload],
            };
        },
    },
});

export const { setCart } = cartSlice.actions;

export default cartSlice;
