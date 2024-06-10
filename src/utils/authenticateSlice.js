import { createSlice } from "@reduxjs/toolkit";

const authenticateSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
    setUserNull: (state, action) => {
      return { ...state, user: null };
    },
  },
});

export const { setUser, setUserNull } = authenticateSlice.actions;
export default authenticateSlice.reducer;
