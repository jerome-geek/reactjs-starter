import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {};

export const mallSlice = createSlice({
    name: 'mall',
    initialState,
    reducers: {
        setMall: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setMall } = mallSlice.actions;

export default mallSlice;
