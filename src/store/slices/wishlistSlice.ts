import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/store.types";

type WishlistState = {
  items: Product[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toogleWishlist: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toogleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
