import { createSlice } from '@reduxjs/toolkit';
import { loginWithTokenApi } from '../auth/auth-api'
import { Scholarship } from './scholarshipform-type'



const initialState: Scholarship = {
    ScholarshipForm: null,
    PersonalDetail: null,
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
                state.error = null;

            })
            .addCase(loginWithTokenApi.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { } = ScholarShipFormSlice.actions;
export default ScholarShipFormSlice.reducer;