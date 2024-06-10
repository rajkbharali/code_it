import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "allProjects",
  initialState: {},
  reducers: {
    getAllProjects: (state, action) => {
      return { ...state.projects, projects: action.payload };
    },
  },
});

export const { getAllProjects } = projectSlice.actions;
export default projectSlice.reducer;
