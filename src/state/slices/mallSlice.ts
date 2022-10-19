import { createSlice } from '@reduxjs/toolkit';
import { MallResponse } from 'models/mall';

const initialState: {
    loading: boolean;
    data: Nullable<MallResponse>;
    error: any;
} = {
    loading: false,
    data: null,
    error: {},
};

export const mallSlice = createSlice({
    name: 'mall',
    initialState,
    reducers: {
        setMall: (state, action) => {
            return { ...action.payload };
        },
    },
});

export const { setMall } = mallSlice.actions;

export default mallSlice;
