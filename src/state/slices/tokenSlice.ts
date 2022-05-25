import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: '',
    daysFromLastPasswordChange: 0,
    dormantMemberResponse: {
        memberName: '',
        mobileNo: '',
        email: '',
    },
    expireIn: 0,
    passwordChangeRequired: false,
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            return { ...state, ...action.payload };
        },
        deleteAccessToken: (state, action) => {},
        setGuestToken: (state, action) => {},
        deleteGuestToken: (state, action) => {},
    },
});

export const {
    setAccessToken,
    deleteAccessToken,
    setGuestToken,
    deleteGuestToken,
} = tokenSlice.actions;

export default tokenSlice;
