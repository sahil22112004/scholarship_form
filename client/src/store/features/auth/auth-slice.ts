import { createSlice } from '@reduxjs/toolkit';
import { loginWithTokenApi } from './auth-api'
import { AuthState } from './auth-type'



const initialState: AuthState = {
    currentUser: null,
    loading: false,
    error: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },

        handleCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithTokenApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithTokenApi.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.currentUser = action.payload.applicant;
                state.error = null;

            })
            .addCase(loginWithTokenApi.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;