import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Product/productSlice';
import authReducer from './Login/authSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
})