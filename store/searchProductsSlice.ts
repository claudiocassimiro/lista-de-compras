import { createSlice } from '@reduxjs/toolkit';

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
      value: payload,
    }),
  },
});

export const { getSearchedProduct } = searchProductSlice.actions;

export default searchProductSlice.reducer;
