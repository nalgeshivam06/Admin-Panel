import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Login/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})