import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productsApi';
import cartReducer, { CART_STORAGE_KEY } from '../features/cart/cartSlice';
import { saveToStorage } from '../utils/storage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

// корзина должна переживать перезагрузку
store.subscribe(() => {
  saveToStorage(CART_STORAGE_KEY, store.getState().cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
