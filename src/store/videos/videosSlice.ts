import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Video, CustomError } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

interface VideosState {
  videos: Video[];
}

const initialState: VideosState = {
  videos: [],
}

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
})

export const fetchVideos = createAsyncThunk(
  "auth/fetchVideosAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/videos`);
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

export const { setVideos } = videosSlice.actions;
export default videosSlice.reducer;