import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginWithTokenApi = createAsyncThunk(
  "auth/loginWithToken",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/login`,
        { token },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data || error?.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);