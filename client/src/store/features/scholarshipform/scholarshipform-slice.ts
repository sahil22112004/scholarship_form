import { createSlice } from '@reduxjs/toolkit';
import { loginWithTokenApi } from '../auth/auth-api'
import { Scholarship } from './scholarshipform-type'
import { createPersonalDetailThunk, createAddressDetailThunk,createAdditionalInformationThunk } from './scholarshipform-api';


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
                state.additionalInformation = action.payload.additionalInformation.content
                state.error = null;

            })
            .addCase(loginWithTokenApi.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createPersonalDetailThunk.fulfilled, (state, action) => {
                state.PersonalDetail = action.payload.persnolDetailData.content;
            })
            .addCase(createAddressDetailThunk.fulfilled, (state, action) => {
                state.addressDetail = action.payload.addressDetailData.content;
            })

            .addCase(createAdditionalInformationThunk.fulfilled, (state, action) => {
                console.log("additional infoqqq data is ", action.payload.additionalInformationData.content)
                state.additionalInformation = action.payload.additionalInformationData.content.content  ;
            })
    }, 
});

export const { } = ScholarShipFormSlice.actions;
export default ScholarShipFormSlice.reducer;