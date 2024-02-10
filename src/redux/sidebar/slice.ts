import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  isOpen: boolean;
}

const initialState: StateProps = {
  isOpen: false,
};

export const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    onToggle: (state) => {
      state.isOpen = !state.isOpen.valueOf();
    }
  }
})

export const { onToggle } = SidebarSlice.actions;

export default SidebarSlice.reducer;