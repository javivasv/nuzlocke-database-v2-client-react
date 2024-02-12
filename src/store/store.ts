import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import notificationsReducer from './notifications/notificationsSlice'
import videosSlice from './videos/videosSlice'
import suggestionsSlice from './suggestions/suggestionsSlice'
import nuzlockesSlice from './nuzlockes/nuzlockesSlice'
import filtersSlice from './filters/filtersSlice'
import settingsSlice from './settings/settingsSlice'
import pokeapiSlice from './pokeapi/pokeapiSlice'
import pokemonSlice from './pokemon/pokemonSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    videos: videosSlice,
    suggestions: suggestionsSlice,
    nuzlockes: nuzlockesSlice,
    filters: filtersSlice,
    settings: settingsSlice,
    pokeapi: pokeapiSlice,
    pokemon: pokemonSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch