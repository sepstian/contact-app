import { createSlice } from "@reduxjs/toolkit";

const detailContactSlice = createSlice({
  name: "detailContacts",
  initialState: {
    detailContact: [],
  },
  reducers: {
    setDetailContact: (state, action) => {
      state.detailContact = action.payload;
    },
    resetDetailContact: (state, action) => {
      state.detailContact = [];
    },
  },
});

export const { setDetailContact, resetDetailContact } = detailContactSlice.actions;
export default detailContactSlice.reducer;