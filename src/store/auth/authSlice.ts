import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Token, User, UserData, EmailData, CustomError } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

export const login = createAsyncThunk(
  "auth/loginAsync",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${baseURL}/login`, userData)

      window.localStorage.setItem("ndb_token", response.data.token);
      const token = jwtDecode(response.data.token) as Token;

      return {
        _id: token._id,
        email: token.email,
        username: token.username,
      };
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export const register = createAsyncThunk(
  "auth/registerAsync",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users`, userData)
      return response.data.msg;
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPasswordAsync",
  async (emailData: EmailData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/forgot-password`, emailData)
      return response.data.msg;
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export default authSlice.reducer;