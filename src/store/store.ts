import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import notificationsReducer from './notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch