import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Nuzlocke, CustomError } from "../../interfaces/interfaces";

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

export const { setNuzlockes, setNuzlocke } = nuzlockesSlice.actions;
export default nuzlockesSlice.reducer;