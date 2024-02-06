import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import notificationsReducer from './notifications/notificationsSlice'
import videosSlice from './videos/videosSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    videos: videosSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch