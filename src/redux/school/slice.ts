import { createSlice } from "@reduxjs/toolkit";
import { School } from "../../types/global.type";

interface StateProps {
  allSchools: School[] | null;
}

const initialState: StateProps = {
  allSchools: null,
}

export const SchoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    getAllSchools: (state, action) => {
      state.allSchools = action.payload;
    }
  }
})