import { createSlice } from "@reduxjs/toolkit";

const cartData = localStorage.getItem("apicart");

const initialState = {
  items: cartData ? JSON.parse(cartData) : [],
};

// ========  APICall slice ==========
const addToCart = createSlice({
  name: "apicart",
  initialState,
  
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("apicart", JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const cartData = state.items.filter(
        (item) => item.id != action.payload.id,
      );
      state.items = cartData;
      localStorage.setItem("apicart", JSON.stringify(cartData));
    },
    clearAllItems: (state) => {
      state.items = [];
      localStorage.removeItem("apicart");
    },
  },
});

export const { addItem, removeItem, clearAllItems } = addToCart.actions;

export default addToCart.reducer;
