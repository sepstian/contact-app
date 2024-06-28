import { configureStore } from "@reduxjs/toolkit";
import listContact from "./slice/listContact";
import detailContact from "./slice/detailContact";

export const globalState = configureStore({
  reducer: {
    listContact,
    detailContact
  },
});
