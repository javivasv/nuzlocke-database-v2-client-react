import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { SuggestionData, CustomError } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

interface SuggestionsState {}

const initialState: SuggestionsState = {}

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {},
})

export const sendFeedback = createAsyncThunk(
  "auth/sendFeedbackAsync",
  async (data: SuggestionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/suggestions`, data);
      return response.data;
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue({
        msg: axiosError.response?.data.msg,
        status: axiosError.response?.status,
      });
    }
  }
);

export default suggestionsSlice.reducer;