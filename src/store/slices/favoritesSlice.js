import { createSlice } from '@reduxjs/toolkit';
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    }
  }
});
export const { addFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
