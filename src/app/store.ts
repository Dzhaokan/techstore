import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productsApi';
import cartReducer, { CART_STORAGE_KEY } from '../features/cart/cartSlice';
import favoritesReducer, { FAVORITES_STORAGE_KEY } from '../features/favorites/favoritesSlice';
import { saveToStorage } from '../utils/storage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  saveToStorage(CART_STORAGE_KEY, state.cart.items);
  saveToStorage(FAVORITES_STORAGE_KEY, state.favorites.ids);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
