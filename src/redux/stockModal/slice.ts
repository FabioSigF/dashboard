import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  isOpen: boolean;
}

const initialState: StateProps = {
  isOpen: false,
};

export const StockModalSlice = createSlice({
  name: "stockmodal",
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

export const { onOpen, onClose } = StockModalSlice.actions;

export default StockModalSlice.reducer;