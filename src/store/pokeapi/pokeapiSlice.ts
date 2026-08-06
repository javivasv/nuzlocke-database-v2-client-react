import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BasicDataFromApi, CustomError, Name } from "../../interfaces/interfaces";

const baseURL = "https://pokeapi.co/api/v2";

interface PokeapiState {
  pokemon: Name[];
  abilities: Name[];
  items: Name[];
  moves: Name[];
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
    setPokemonList: (state, action: PayloadAction<Name[]>) => {
      state.pokemon = action.payload;
    },
    setAbilitiesList: (state, action: PayloadAction<Name[]>) => {
      state.abilities = action.payload;
    },
    setItems: (state, action: PayloadAction<Name[]>) => {
      state.items = action.payload;
    },
    setMoves: (state, action: PayloadAction<Name[]>) => {
      state.moves = action.payload;
    },
  },
})

export const fetchPokemonList = createAsyncThunk(
  "pokeapi/fetchPokemonListAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/pokemon/?limit=1351`);

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
  "pokeapi/fetchAbilitiesListAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/ability/?limit=373`);

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
  "pokeapi/fetchPokemonAsync",
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