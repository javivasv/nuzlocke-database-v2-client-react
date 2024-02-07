import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Token, User, UserData, EmailData, ResetJWT, CustomError } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = window.localStorage.getItem("ndb_token");
  return config;
});

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
})

export const login = createAsyncThunk(
  "auth/loginAsync",
  async (data: UserData, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${baseURL}/login`, data)

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
  async (data: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users`, data);
      return response.data;
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export const validateSession = createAsyncThunk(
  "auth/validateSessionAsync",
  async (_, { rejectWithValue }) => {
    const token = window.localStorage.getItem("ndb_token");

    if (!token) {
      return null;
    }

    const data = {
      token,
    };

    try {
      await axios.post(`${baseURL}/session`, data);
      const decodedToken = jwtDecode(token) as Token;

      return {
        _id: decodedToken._id,
        email: decodedToken.email,
        username: decodedToken.username,
      };
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPasswordAsync",
  async (data: EmailData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/forgot-password`, data);
      return response.data;
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export const validateResetToken = createAsyncThunk(
  "auth/validateResetTokenAsync",
  async (resetToken: string, { rejectWithValue }) => {
    const data = {
      resetToken,
    };

    try {
      await axios.post(`${baseURL}/validate-reset-token`, data);
      const token = jwtDecode(resetToken) as ResetJWT;
      return token.email;
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPasswordAsync",
  async (data: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/reset-password`, data);
      return response.data;
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue(axiosError.response?.data.msg);
    }
  }
);

export const { setUser } = authSlice.actions;
export default authSlice.reducer;