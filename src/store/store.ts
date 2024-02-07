import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import notificationsReducer from './notifications/notificationsSlice'
import videosSlice from './videos/videosSlice'
import suggestionsSlice from './suggestions/suggestionsSlice'
import nuzlockesSlice from './nuzlockes/nuzlockesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    videos: videosSlice,
    suggestions: suggestionsSlice,
    nuzlockes: nuzlockesSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch