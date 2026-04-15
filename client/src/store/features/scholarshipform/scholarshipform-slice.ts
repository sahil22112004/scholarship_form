import { createSlice } from '@reduxjs/toolkit';
import { loginWithTokenApi } from '../auth/auth-api'
import { Scholarship } from './scholarshipform-type'
import { createPersonalDetailThunk, createAddressDetailThunk } from './scholarshipform-api';


const initialState: Scholarship = {
    ScholarshipForm: null,
    PersonalDetail: null,
    addressDetail: null,
    additionalInformation: null,
    loading: false,
    error: null,
};

const ScholarShipFormSlice = createSlice({
    name: 'ScholarshipForm',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithTokenApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithTokenApi.fulfilled, (state, action) => {
                console.log("data is ", action.payload)
                state.loading = false;
                state.ScholarshipForm = action.payload.applicationForm;
                state.PersonalDetail = action.payload.personalDetail.content
                state.addressDetail = action.payload.addressDetail.content
                state.error = null;

            })
            .addCase(loginWithTokenApi.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createPersonalDetailThunk.fulfilled, (state, action) => {
                state.PersonalDetail = action.payload.content;
            })
            .addCase(createAddressDetailThunk.fulfilled, (state, action) => {
                state.addressDetail = action.payload.content;
            })

    },
});

export const { } = ScholarShipFormSlice.actions;
export default ScholarShipFormSlice.reducer;