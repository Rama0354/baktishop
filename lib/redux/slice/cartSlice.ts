import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCarts } from "@/lib/utils/action/CartsActions";
import {
  CarstData,
  CartData,
  cartListSort,
  FormAddCartData,
} from "@/lib/types/cart";
import { auth } from "@/lib/auth";

interface initialStateProps {
  cartItems: CarstData;
  singleCart: CarstData;
  totalQty: number;
  subtotal: number;
}
const initialState: initialStateProps = {
  cartItems: [],
  singleCart: [],
  totalQty: 0,
  subtotal: 0,
};

export const getCart = createAsyncThunk("cart/get", async () => {
  // const session = await auth();
  // if (!session) {
  //   return;
  // }
  const res = await getCarts();
  const data: cartListSort | undefined = res?.data;
  const parse = cartListSort.safeParse(data);
  if (parse.success) {
    return parse.data;
  }
  console.log(parse.error);
  return;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<FormAddCartData>) {
      const indexItem = state.cartItems.findIndex((item) => {
        if (item.variant_id !== undefined && item.variant_id) {
          return (
            item.product_id === action.payload.product_id &&
            item.variant_id === action.payload.variant_id
          );
        } else {
          return item.product_id === action.payload.product_id;
        }
      });

      if (indexItem !== -1) {
        const updatedItems = [...state.cartItems];
        if (updatedItems[indexItem].variant_id) {
          updatedItems[indexItem] = {
            ...updatedItems[indexItem],
            quantity:
              updatedItems[indexItem].quantity + action.payload.quantity,
          };
        } else {
          updatedItems[indexItem] = {
            ...updatedItems[indexItem],
            quantity:
              updatedItems[indexItem].quantity + action.payload.quantity,
          };
        }
        state.cartItems = updatedItems;
      }
    },
    changeCartItems(state, action: PayloadAction<CartData>) {
      const indexItem = state.cartItems.findIndex((item) => {
        if (item.variant_id) {
          return (
            item.product_id === action.payload.product_id &&
            item.variant_id === action.payload.variant_id
          );
        } else {
          return item.product_id === action.payload.product_id;
        }
      });

      if (indexItem !== -1) {
        const updatedItems = [...state.cartItems];
        if (updatedItems[indexItem].variant_id) {
          updatedItems[indexItem] = {
            ...updatedItems[indexItem],
            quantity: (updatedItems[indexItem].quantity =
              action.payload.quantity),
          };
        } else {
          updatedItems[indexItem] = {
            ...updatedItems[indexItem],
            quantity: (updatedItems[indexItem].quantity =
              action.payload.quantity),
          };
        }
        if (updatedItems[indexItem].quantity === 0) {
          updatedItems.splice(indexItem, 1);
        }
        state.cartItems = updatedItems;
      }
    },
    removeCartItem(state, action: PayloadAction<any>) {
      const indexItem = state.cartItems.findIndex((item) => {
        if (item.variant_id) {
          return (
            item.product_id === action.payload.product_id &&
            item.variant_id === action.payload.variant_id
          );
        } else {
          return item.product_id === action.payload.product_id;
        }
      });

      if (indexItem !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems.splice(indexItem, 1);
        state.cartItems = updatedItems;
      }
    },
    setSingleCart(state, action: PayloadAction<CartData>) {
      const indexItem = state.singleCart.findIndex((item) => {
        if (item.variant_id) {
          return (
            item.product_id === action.payload.product_id &&
            item.variant_id === action.payload.variant_id
          );
        } else {
          return item.product_id === action.payload.product_id;
        }
      });

      if (indexItem !== -1) {
        const updatedItems = [...state.singleCart];
        if (updatedItems[indexItem].variant_id) {
          updatedItems[indexItem] = {
            ...updatedItems[indexItem],
            quantity:
              updatedItems[indexItem].quantity + action.payload.quantity,
          };
        } else {
          updatedItems[indexItem] = {
            ...updatedItems[indexItem],
            quantity:
              updatedItems[indexItem].quantity + action.payload.quantity,
          };
        }
        state.singleCart = updatedItems;
      } else {
        state.singleCart = [...state.singleCart, action.payload];
      }
    },
    removeSingleCart(state) {
      state.singleCart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      const cartItems =
        action.payload && action.payload.length !== 0
          ? action.payload.map((item) => {
              if (item.variants !== null) {
                const varId = item.variants.id;
                const findVarImage = item.products.product_images.find(
                  (f: any) => f.variant_id === varId
                );
                return {
                  id: item.id,
                  product_id: item.products.id,
                  product_name: item.products.name,
                  product_image:
                    findVarImage !== undefined
                      ? findVarImage.image_url !== null
                        ? findVarImage.image_url
                        : item.products.product_images[0].image_url
                      : item.products.product_images.length
                      ? item.products.product_images[0].image_url
                      : "/assets/img/no-image.jpg",
                  varian_id: item.variants.id,
                  varian_name: item.variants.name,
                  product_weight: item.products.weight,
                  product_point: item.variants.point,
                  quantity: item.quantity,
                };
              } else {
                return {
                  id: item.id,
                  product_id: item.products.id,
                  product_name: item.products.name,
                  product_image:
                    item.products.product_images.length !== 0
                      ? item.products.product_images[0].image_url
                      : "/assets/img/no-image.jpg",
                  product_weight: item.products.weight,
                  product_point: item.products.point,
                  quantity: item.quantity,
                };
              }
            })
          : [];
      state.cartItems = cartItems;
    });
  },
});

export const {
  setCartItems,
  changeCartItems,
  removeCartItem,
  setSingleCart,
  removeSingleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
