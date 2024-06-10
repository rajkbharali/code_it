import { configureStore } from "@reduxjs/toolkit";
import authenticateSlice from "./authenticateSlice";
import projectSlice from "./projectSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    auth: authenticateSlice,
    projects: projectSlice,
    search: searchSlice,
  },
});

export default store;
