import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profile } from 'api/member';
import { ProfileBody } from 'models/member';

export const fetchProfile = createAsyncThunk('member/profile', async () => {
    try {
        const response = await profile.getProfile();
        return response.data;
    } catch (error) {
        return error;
    }
});

const memberInitialState: {
    loading: boolean;
    data: Nullable<ProfileBody>;
    error: any;
} = {
    loading: false,
    data: null,
    error: {},
};

export const memberSlice = createSlice({
    name: 'member',
    initialState: memberInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export default memberSlice;
