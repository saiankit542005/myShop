import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductSlice";
import apiCartReducer from "./Slice";

const store = configureStore({
  reducer: {
    apicart: apiCartReducer,
    products: productsReducer,
  },
});

export default store;