import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Checkout, CheckoutAddress, CheckoutDetails, CheckoutGifts, CheckoutShipping } from "../../types/checkout";

const initialState:Checkout = {
    redeem_details:{
        note:''
    },
    redeem_item_gifts_details:[],
    shipping_details:{
        shipping_destination:0,
        shipping_courier:'',
        shipping_service:'',
        shipping_description:'',
        shipping_cost:0,
        shipping_weight:0,
        shipping_etd:''
    },
    address_details:{
        id:0,
        person_name:'',
        person_phone:'',
        province_id:0,
        city_id:0,
        subdistrict_id:0,
        postal_code:'',
        address:''
    }
}

const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        setRedeemDetails(state,action:PayloadAction<CheckoutDetails>){
            state.redeem_details.note = action.payload.note
        },
        setRedeemItemGiftsDetails(state,action:PayloadAction<CheckoutGifts>){
            state.redeem_item_gifts_details = action.payload
        },
        setShippingDetails(state,action:PayloadAction<CheckoutShipping>){
            state.shipping_details = action.payload
        },
        setAddressDetails(state,action:PayloadAction<CheckoutAddress>){
            state.address_details = action.payload
        }
    }
})

export const { setRedeemDetails,setRedeemItemGiftsDetails,setShippingDetails,setAddressDetails } = checkoutSlice.actions;

export default checkoutSlice.reducer;