import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface SearchProductState {
  value: string;
}

const initialState: SearchProductState = {
  value: ``,
};

export const searchProductSlice = createSlice({
  name: `searchProductSlice`,
  initialState,
  reducers: {
    getSearchedProduct: (state, { payload }) => ({
      ...state,
      value: payload.charAt(0).toUpperCase() + payload.slice(1),
    }),
  },
});

export const { getSearchedProduct } = searchProductSlice.actions;

export const selectSearchedProduct = (state: RootState) =>
  state.searchedProduct.value;

export default searchProductSlice.reducer;
