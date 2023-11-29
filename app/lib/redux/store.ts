import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slice/filterSlice";
import detailSlice from "./slice/detailSlice";
import cartSlice from "./slice/cartSlice";
import checkoutSlice from "./slice/checkoutSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    detail: detailSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
