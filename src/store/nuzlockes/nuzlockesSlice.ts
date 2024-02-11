import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Nuzlocke, NuzlockeData, UpdateNuzlockeData, UpdateNuzlockeStatus, CustomError } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

interface NuzlockesState {
  nuzlockes: Nuzlocke[];
  nuzlocke: Nuzlocke | null;
}

const initialState: NuzlockesState = {
  nuzlockes: [],
  nuzlocke: null,
}

const nuzlockesSlice = createSlice({
  name: "nuzlockes",
  initialState,
  reducers: {
    setNuzlockes: (state, action) => {
      state.nuzlockes = action.payload;
    },
    setNuzlocke: (state, action) => {
      state.nuzlocke = action.payload;
    },
  },
})

export const fetchNuzlockes = createAsyncThunk(
  "auth/fetchNuzlockesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/nuzlockes`);
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

export const createNuzlocke = createAsyncThunk(
  "auth/createNuzlockeAsync",
  async (data: NuzlockeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/nuzlocke`, data);
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

export const fetchNuzlocke = createAsyncThunk(
  "auth/fetchNuzlockeAsync",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/nuzlocke/${data}`);
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

export const updateNuzlocke = createAsyncThunk(
  "auth/updateNuzlockeAsync",
  async (data: UpdateNuzlockeData | UpdateNuzlockeStatus, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/nuzlocke/${data.nuzlockeId}`, data.nuzlocke);
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

export const deleteNuzlocke = createAsyncThunk(
  "auth/deleteNuzlockeAsync",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseURL}/nuzlocke/${data}`);
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

export const { setNuzlockes, setNuzlocke } = nuzlockesSlice.actions;
export default nuzlockesSlice.reducer;