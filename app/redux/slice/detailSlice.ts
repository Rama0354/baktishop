import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type Filter = {
  init: string;
  column: string;
  text: string | number;
  operator: string;
}

type initialStateType = {
  variant: {
    id: number;
    item_gift_id: number;
    variant_name: string;
    variant_quantity: number;
    variant_point: number;
    fvariant_point: string;
    variant_weight: number;
    fvariant_weight: string;
  };
  reviewfiter:{
    filters: Filter[],
    querys: string,
    urls:string,
    sort: any,
  },
  urldetail: string;
};
const initialState: initialStateType = Cookies.get("filtersort_detail")
  ? { ...JSON.parse(Cookies.get("filtersort_detail") as any) }
  : {
      variant: {
        id: 0,
        item_gift_id: 0,
        variant_name: '',
        variant_quantity: 0,
        variant_point: 0,
        fvariant_point: '',
        variant_weight: 0,
        fvariant_weight: '',
      },
      reviewfiter:{
        filters: [],
        querys: "",
        urls:"",
        sort: null,
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
    setReviewFilter: (state, action: PayloadAction<Filter>) => {
      const indexFilter = state.reviewfiter.filters.findIndex(
        (filter: any) => filter.column === action.payload.column
      );

      if (indexFilter !== -1) {
        const updatedFilters = [...state.reviewfiter.filters];
        updatedFilters[indexFilter] = {
          ...updatedFilters[indexFilter],
          init: action.payload.init,
          text: action.payload.text,
          operator: action.payload.operator,
        };
        if (action.payload.text === "" || action.payload.text === 0) {
          state.reviewfiter.filters = [];
          Cookies.set('filtersort_detail', JSON.stringify(state));
        } else {
          state.reviewfiter.filters = updatedFilters
          Cookies.set('filtersort_detail', JSON.stringify(state))
        }
      } else {
        state.reviewfiter.filters = [...state.reviewfiter.filters, action.payload]
        Cookies.set('filtersort_detail', JSON.stringify(state))
      }
    },
    setReviewSort: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        if(action.payload.column !== ''){
          state.reviewfiter.sort= action.payload
        }else{
          state.reviewfiter.sort = null
        }
        Cookies.set('filtersort_detail', JSON.stringify(state))
      } else {
        state.reviewfiter.sort = null
        Cookies.set('filtersort_detail', JSON.stringify(state))
      }
    },
    setReviewQuery: (state, action: PayloadAction<string>) => {
      state.reviewfiter.querys = action.payload;
      Cookies.set('filtersort_detail', JSON.stringify(state))
    },
    setReviewUrls: (state, action: PayloadAction<string>) => {
      state.reviewfiter.urls = action.payload;
      Cookies.set('filtersort_detail', JSON.stringify(state))
    },
    resetDetail: (state) => {
      state.variant = {
        id: 0,
        item_gift_id: 0,
        variant_name: '',
        variant_quantity: 0,
        variant_point: 0,
        fvariant_point: '',
        variant_weight: 0,
        fvariant_weight: '',
      }
      state.reviewfiter={
        filters: [],
        querys: "",
        urls:"",
        sort: null,
      },
      state.urldetail = "";
      Cookies.remove("filtersort_detail");
    },
  },
});

export const { setVariant, setUrlDetail,setReviewFilter,setReviewSort,setReviewQuery,setReviewUrls, resetDetail } = detailSlice.actions;

export default detailSlice.reducer;
