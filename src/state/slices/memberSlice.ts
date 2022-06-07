import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {};

export const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        getProfile: (state, action) => {
            return { ...state, ...action.payload };
        },
        setProfile: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { getProfile, setProfile } = memberSlice.actions;

export default memberSlice;
