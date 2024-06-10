import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
  },
  reducers: {
    searchProject: (state, action) => {
      return {
        ...state,
        searchTerm: action.payload,
      };
    },
  },
});

export const { searchProject } = searchSlice.actions;
export default searchSlice.reducer;
