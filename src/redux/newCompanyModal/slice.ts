import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  isOpen: boolean;
}

const initialState: StateProps = {
  isOpen: false,
};

export const NewCompanyModalSlice = createSlice({
  name: "newcompanymodal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    }
  }
})

export const { onOpen, onClose } = NewCompanyModalSlice.actions;

export default NewCompanyModalSlice.reducer;