import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

// Define initial state
interface Filter {
  column: string;
  text: string | number;
  operator?: string;
}

interface FilterState {
  filters: Filter[];
  querys: string;
  urls:string;
  sort: any; // Change this type according to your actual data structure
}

// Define initial state
const initialState: FilterState = Cookies.get('filtersort_search')
  ? { ...JSON.parse(Cookies.get('filtersort_search') as any)}
  : {
    filters: [],
    querys: "",
    urls:"",
    sort: null,
}
// const initialState: FilterState ={
//     filters: [],
//     querys: "",
//     urls:"",
//     sort: null,
// }

// Create a slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      const indexFilter = state.filters.findIndex(
        (filter: any) => filter.column === action.payload.column
      );

      if (indexFilter !== -1) {
        // Jika sudah ada, update search_text dan search_operator
        const updatedFilters = [...state.filters];
        updatedFilters[indexFilter] = {
          ...updatedFilters[indexFilter],
          text: action.payload.text,
          operator: action.payload.operator,
        };
        if (action.payload.text === "" || action.payload.text === 0) {
          state.filters = [];
          Cookies.set('filtersort_search', JSON.stringify(state));
        } else if (action.payload.column === "item_gift_slug") {
          state.filters = [action.payload]
        Cookies.set('filtersort_search', JSON.stringify(state))
        } else {
          state.filters = updatedFilters
          Cookies.set('filtersort_search', JSON.stringify(state))
        }
      } else {
        // Jika belum ada, tambahkan filter baru
        state.filters = [...state.filters, action.payload]
        Cookies.set('filtersort_search', JSON.stringify(state))
      }
    },
    setSort: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        if(action.payload.column !== ''){
          state.sort= action.payload
        }else{
          state.sort = null
        }
        Cookies.set('filtersort_search', JSON.stringify(state))
      } else {
        state.sort = null
        Cookies.set('filtersort_search', JSON.stringify(state))
      }
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.querys = action.payload;
      Cookies.set('filtersort_search', JSON.stringify(state))
    },
    setUrls: (state, action: PayloadAction<string>) => {
      state.urls = action.payload;
      Cookies.set('filtersort_search', JSON.stringify(state))
    },
    resetAllSearch: (state) => {
      state.filters = [];
      state.sort = null;
      Cookies.remove('filtersort_search')
    },
  },
});

export const { setFilter, setSort, setQuery, setUrls, resetAllSearch } = filterSlice.actions;

export default filterSlice.reducer;
