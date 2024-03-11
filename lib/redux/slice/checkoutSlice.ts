import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Checkout,
  CheckoutAddress,
  CheckoutDetails,
  CheckoutProducts,
  CheckoutShipping,
} from "@/lib/types/checkout";

const initialState: Checkout = {
  order_details: {
    note: "",
  },
  order_products_details: [],
  shipping_details: {
    destination: 0,
    courier: "",
    service: "",
    description: "",
    cost: 0,
    weight: 0,
    etd: "",
  },
  address_details: {
    id: 0,
    person_name: "",
    person_phone: "",
    province_id: 0,
    city_id: 0,
    subdistrict_id: 0,
    postal_code: "",
    street: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setOrderDetails(state, action: PayloadAction<CheckoutDetails>) {
      state.order_details.note = action.payload.note;
    },
    setOrderProductsDetails(state, action: PayloadAction<CheckoutProducts>) {
      state.order_products_details = action.payload;
    },
    setShippingDetails(state, action: PayloadAction<CheckoutShipping>) {
      state.shipping_details = action.payload;
    },
    setAddressDetails(state, action: PayloadAction<CheckoutAddress>) {
      state.address_details = action.payload;
    },
  },
});

export const {
  setOrderDetails,
  setOrderProductsDetails,
  setShippingDetails,
  setAddressDetails,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
