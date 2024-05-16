import { createSlice } from "@reduxjs/toolkit";
import { SellItem } from "../../types/global.type";

interface StateProps {
  isOpen: boolean;
  list: SellItem[];
}

const initialState: StateProps = {
  isOpen: false,
  list: [],
};

export const UniformReportModalSlice = createSlice({
  name: "uniformreportmodal",
  initialState,
  reducers: {
    onOpen: (state, data) => {
      state.isOpen = true;
      state.list = data.payload.list;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.list = [];
    },
  },
});

export const { onOpen, onClose } = UniformReportModalSlice.actions;

export default UniformReportModalSlice.reducer;
