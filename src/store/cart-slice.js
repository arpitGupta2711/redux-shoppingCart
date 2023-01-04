import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed:false
  },
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = (action && action.payload && action.payload.totalQuantity) || 0;
      state.totalPrice = (action && action.payload && action.payload.totalPrice) || 0;
      state.itemsList = (action && action.payload && action.payload.itemsList) || [];
    },
    addToCart(state, action) {
        state.changed= true;
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
        state.changed= true;
      const id = action.payload;
      const toRemove = state.itemsList.find((item) => item.id === id);
      if (toRemove.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => id !== item.id);
        state.totalQuantity--;
      } else {
        toRemove.quantity--;
        toRemove.totalPrice -= toRemove.price;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
