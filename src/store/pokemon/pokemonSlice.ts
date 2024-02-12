import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CreatePokemonData, CustomError } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

interface PokemonState {}

const initialState: PokemonState = {}

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
})

export const addPokemon = createAsyncThunk(
  "auth/addPokemonAsync",
  async (data: CreatePokemonData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/nuzlocke/${data.nuzlockeId}/pokemon`, data.pokemon);
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

export default pokemonSlice.reducer;