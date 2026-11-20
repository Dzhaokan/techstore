import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import type { CartItem } from '../../types/cart';
import type { RootState } from '../../app/store';
import { loadFromStorage } from '../../utils/storage';

export const CART_STORAGE_KEY = 'cart';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadFromStorage<CartItem[]>(CART_STORAGE_KEY, []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((item) => item.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.product.id !== action.payload);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
);

export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.product.id === id);
