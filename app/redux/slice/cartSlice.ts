import { CartType } from "@/app/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface initialStateProps {
    cartItems:CartType[],
    totalQty:number
    subtotal:number
}
const initialState:initialStateProps ={
    cartItems:[],
    totalQty:0,
    subtotal:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCartItems(state,action:PayloadAction<CartType>){
            const indexItem = state.cartItems.findIndex((item) => {
                if (item.varian_id) {
                  return item.product_id === action.payload.product_id && item.varian_id === action.payload.varian_id;
                } else {
                  return item.product_id === action.payload.product_id;
                }
              });
        
              if (indexItem !== -1) {
                const updatedItems = [...state.cartItems];
                if (updatedItems[indexItem].varian_id) {
                  updatedItems[indexItem] = {
                    ...updatedItems[indexItem],
                    product_quantity: updatedItems[indexItem].product_quantity + action.payload.product_quantity,
                  };
                } else {
                  updatedItems[indexItem] = {
                    ...updatedItems[indexItem],
                    product_quantity: updatedItems[indexItem].product_quantity + action.payload.product_quantity,
                  };
                }
                state.cartItems = updatedItems;
              } else {
                state.cartItems = [...state.cartItems, action.payload];
              }
        },
        changeCartItems(state,action:PayloadAction<CartType>){
            const indexItem = state.cartItems.findIndex((item) => {
                if (item.varian_id) {
                  return item.product_id === action.payload.product_id && item.varian_id === action.payload.varian_id;
                } else {
                  return item.product_id === action.payload.product_id;
                }
            });
        
            if (indexItem !== -1) {
                const updatedItems = [...state.cartItems];
                if (updatedItems[indexItem].varian_id) {
                  updatedItems[indexItem] = {
                    ...updatedItems[indexItem],
                    product_quantity: updatedItems[indexItem].product_quantity = action.payload.product_quantity,
                  };
                } else {
                  updatedItems[indexItem] = {
                    ...updatedItems[indexItem],
                    product_quantity: updatedItems[indexItem].product_quantity = action.payload.product_quantity,
                  };
                }
                if (updatedItems[indexItem].product_quantity === 0) {
                  updatedItems.splice(indexItem, 1);
                }
                state.cartItems = updatedItems;
            }
        },
        removeCartItem(state, action: PayloadAction<any>) {
          const indexItem = state.cartItems.findIndex((item) => {
              if (item.varian_id) {
                  return item.product_id === action.payload.product_id && item.varian_id === action.payload.varian_id;
              } else {
                  return item.product_id === action.payload.product_id;
              }
          });

          if (indexItem !== -1) {
              const updatedItems = [...state.cartItems];
              updatedItems.splice(indexItem, 1);
              state.cartItems = updatedItems;
          }
      }
    }
})

export const { setCartItems,changeCartItems,removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;