import { configureStore } from '@reduxjs/toolkit';
import searchProductsSlice from './searchProductsSlice';

export const store = configureStore({
  reducer: {
    searchedProduct: searchProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
