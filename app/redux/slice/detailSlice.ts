import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type initialStateType = {
  variant: {
    id: number;
    item_gift_id: number;
    variant_name: string;
    variant_point: number;
    variant_quantity: number;
  };
  urldetail: string;
};
const initialState: initialStateType = Cookies.get("filtersort_detail")
  ? { ...JSON.parse(Cookies.get("filtersort_detail") as any) }
  : {
      variant: {
        id: 0,
        item_gift_id: 0,
        variant_name: "",
        variant_point: 0,
        variant_quantity: 0,
      },
      urldetail: "",
    };

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setVariant: (state, action: PayloadAction<any>) => {
      state.variant = action.payload;
      Cookies.set("filtersort_detail", JSON.stringify(state));
    },
    setUrlDetail: (state, action: PayloadAction<any>) => {
      state.urldetail = action.payload;
      Cookies.set("filtersort_detail", JSON.stringify(state));
    },
    resetDetail: (state) => {
      state.variant = {
        id: 0,
        item_gift_id: 0,
        variant_name: "",
        variant_point: 0,
        variant_quantity: 0,
      };
      state.urldetail = "";
      Cookies.remove("filtersort_detail");
    },
  },
});

export const { setVariant, setUrlDetail, resetDetail } = detailSlice.actions;

export default detailSlice.reducer;
