import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: localStorage.getItem("apicart")
//     ? JSON.parse(localStorage.getItem("apicart"))
//     : [],
// };

//✅Batter
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
      console.log(action.payload);
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
    },
  },
});

export const { addItem, removeItem, clearAllItems } = addToCart.actions;

export default addToCart.reducer;
