import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PersonalDetailType } from "./scholarshipform-type";

interface createPersonalDetail{
    content :PersonalDetailType,
    application_uuid:number

}

export const createPersonalDetailThunk = createAsyncThunk(
  "scholarshipform/createPersonalDetail",
  async (PersonalDetail: createPersonalDetail, thunkAPI) => {
    const {content,application_uuid}= PersonalDetail
    try {
      const response = await axios.post(
        `/api/personalDetail/${application_uuid}`,
        { content },
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

interface createAddressDetail{
    content :any,
    application_uuid:number

}

export const createAddressDetailThunk = createAsyncThunk(
  "scholarshipform/createAddressDetail",
  async (PersonalDetail: createAddressDetail, thunkAPI) => {
    const {content,application_uuid}= PersonalDetail
    try {
      const response = await axios.post(
        `/api/addressDetail/${application_uuid}`,
        { content },
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