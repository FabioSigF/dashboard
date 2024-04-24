import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  isOpen: boolean;
  idCompany: string;
}

const initialState: StateProps = {
  isOpen: false,
  idCompany: ""
};

export const StockModalSlice = createSlice({
  name: "stockmodal",
  initialState,
  reducers: {
    onOpen: (state, data) => {
      state.isOpen = true;
      state.idCompany = data.payload.idCompany;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.idCompany = "";
    }
  }
})

export const { onOpen, onClose } = StockModalSlice.actions;

export default StockModalSlice.reducer;