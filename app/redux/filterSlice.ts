import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial state
interface Filter {
  column: string;
  text: string | number;
  operator?: string;
}

interface FilterState {
  filters: Filter[];
  querys: string;
  sort: any; // Change this type according to your actual data structure
}

// Define initial state
const initialState: FilterState = {
  filters: [],
  querys: "",
  sort: null,
};

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
          return {
            ...state,
            filters: [],
          };
        } else if (action.payload.column === "item_gift_slug") {
          return {
            ...state,
            filters: [action.payload],
          };
        } else {
          return {
            ...state,
            filters: updatedFilters,
          };
        }
      } else {
        // Jika belum ada, tambahkan filter baru

        return {
          ...state,
          filters: [...state.filters, action.payload],
        };
      }
    },
    setSort: (state, action: PayloadAction<any>) => {
      if (action.payload.column) {
        return {
          ...state,
          sort: action.payload,
        };
      } else {
        return {
          ...state,
          sort: null,
        };
      }
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.querys = action.payload;
    },
    resetAll: (state) => {
      state.filters = [];
      state.sort = null;
    },
  },
});

export const { setFilter, setSort, setQuery, resetAll } = filterSlice.actions;

export default filterSlice.reducer;
