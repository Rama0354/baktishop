import { create } from "zustand";
import { getCarts } from "../utils/action/CartsActions";

type cartType = {
  countItem: number;
  cartItems: any;
  setCartItems: (items: any) => void;
};

export const useCartStore = create<cartType>((set) => ({
  countItem: 0,
  cartItems: [],
  setCartItems(items) {
    set((state) => ({
      ...state,
      cartItems: items,
    }));
  },
}));
