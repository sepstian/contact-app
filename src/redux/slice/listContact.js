import { createSlice } from "@reduxjs/toolkit";
import { API_CALL_URL } from "../../helper";
import axios from "axios";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contact: [],
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload.data;
    },
    setContactId: (state, action) => {
      state.contact = [action.payload[0].data];
    },
    setContactSearch: (state, action) => {
      state.contact = action.payload;
    },
  },
});

export const { setContact, setContactId, setContactSearch } = contactSlice.actions;
export default contactSlice.reducer;

export const getContact = () => {
  return async (dispatch) => {
    try {
        // const getContact = await API_CALL_URL.get("/contact"); // IF USE ENV
        const getContact = await axios.get("https://contact.herokuapp.com/contact");
        dispatch(setContact(getContact.data))
    } catch (error) {
      ""
    }
  };
};
