import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BasicDataFromApi, CustomError } from "../../interfaces/interfaces";

const baseURL = "https://pokeapi.co/api/v2";

interface PokeapiState {
  pokemon: [];
  abilities: [];
  items: [];
  moves: [];
}

const initialState: PokeapiState = {
  pokemon: [],
  abilities: [],
  items: [],
  moves: [],
}

const pokeapiSlice = createSlice({
  name: "pokeapi",
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      state.pokemon = action.payload;
    },
    setAbilitiesList: (state, action) => {
      state.abilities = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setMoves: (state, action) => {
      state.moves = action.payload;
    },
  },
})

export const fetchPokemonList = createAsyncThunk(
  "auth/fetchPokemonListAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/pokemon/?limit=1281`);

      const list = response.data.results.map((pokemon: BasicDataFromApi) => {
        let unformattedName = pokemon.name.split("-");

        unformattedName = unformattedName.map((word: string) => {
          return word.replace(word[0], word[0].toUpperCase());
        });

        return {
          codedName: pokemon.name,
          formattedName: unformattedName.join(" "),
        };
      });

      return { list };
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue({
        msg: axiosError.response?.data.msg,
        status: axiosError.response?.status,
      });
    }
  }
);

export const fetchAbilitiesList = createAsyncThunk(
  "auth/fetchAbilitiesListAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/ability/?limit=358`);

      const list = response.data.results.map((ability: BasicDataFromApi) => {
        let unformattedName = ability.name.split("-");

        unformattedName = unformattedName.map((word: string) => {
          return word[0]
            ? word.replace(word[0], word[0].toUpperCase())
            : word;
        });

        return {
          codedName: ability.name,
          formattedName: unformattedName.join(" "),
        };
      });

      return { list };
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue({
        msg: axiosError.response?.data.msg,
        status: axiosError.response?.status,
      });
    }
  }
);

export const fetchPokemon = createAsyncThunk(
  "auth/fetchPokemonAsync",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/pokemon/${data}`);
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

export const { setPokemonList, setAbilitiesList } = pokeapiSlice.actions;
export default pokeapiSlice.reducer;