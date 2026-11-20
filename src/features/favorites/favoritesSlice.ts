import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { loadFromStorage } from '../../utils/storage';

export const FAVORITES_STORAGE_KEY = 'favorites';

interface FavoritesState {
  // храним только id, сами товары и так лежат в кеше rtk query
  ids: number[];
}

const initialState: FavoritesState = {
  ids: loadFromStorage<number[]>(FAVORITES_STORAGE_KEY, []),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectFavoritesCount = (state: RootState) => state.favorites.ids.length;
export const selectIsFavorite = (id: number) => (state: RootState) =>
  state.favorites.ids.includes(id);
