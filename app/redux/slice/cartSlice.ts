import { CartType } from "@/app/types/cart";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

type Cart ={
    id: number,
    item_gifts: {
        id: number,
        item_gift_name: string,
        category: {
            category_name: string,
            category_slug: string,
        },
        brand: {
            brand_name: string,
            brand_slug: string,
        },
        item_gift_point: number,
        item_gift_weight: number,
        fitem_gift_weight: string,
    },
    variants: {
        id: number,
        variant_name: string,
        variant_quantity: number,
        variant_point: number,
        fvariant_point: string
    },
    cart_quantity: number,
}


export const getCart = createAsyncThunk('cart/get', async () => {
  try {
    const res = await axios.get('/api/cart')
    return res.data.data
  } catch (err:any) {
    if (!err) {
      throw err
    }
    return err.response.data
  }
})

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
    },
    extraReducers: (builder) => {
      builder.addCase(getCart.fulfilled, (state, action) => {
        const cartItems = action.payload && action.payload.length !== 0 ? action.payload.map((item:any) => {
          const findVarImage = item.variants !== null ? item.item_gifts.item_gift_images.find((f: any) => f.variant_id === item.variants.id) : undefined
          return item.variants !== null ? {
          cart_id: item.id,
          product_id: item.item_gifts.id,
          product_name: item.item_gifts.item_gift_name,
          product_image: findVarImage !== undefined ? findVarImage.item_gift_image_url : item.item_gifts.item_gift_images[0].item_gift_image_url,
          varian_id:item.variants.id,
          varian_name: item.variants.variant_name,
          product_weight: item.item_gifts.item_gift_weight,
          product_quantity: item.cart_quantity,
          product_price: item.variants.variant_point
        }:{
          cart_id: item.id,
          product_id: item.item_gifts.id,
          product_name: item.item_gifts.item_gift_name,
          product_image: item.item_gifts.item_gift_images[0].item_gift_image_url,
          product_weight: item.item_gifts.item_gift_weight,
          product_quantity: item.cart_quantity,
          product_price: item.item_gifts.item_gift_point
        }
      }): []
        state.cartItems = cartItems;
      })
    },
})

export const { setCartItems,changeCartItems,removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;