import { createSlice } from "@reduxjs/toolkit";
import { Sell } from "../../types/global.type";

interface StateProps {
  isOpen: boolean;
  sales: Sell[];
  reportRange: "week" | "month" | "year";
}

const initialState: StateProps = {
  isOpen: false,
  sales: [],
  reportRange: "month"
};

export const SalesReportSlice = createSlice({
  name: "salesreportmodal",
  initialState,
  reducers: {
    onOpen: (state, data) => {
      state.isOpen = true;
      state.sales = data.payload.sales;
      state.reportRange = data.payload.reportRange;
      console.log(data.payload.reportRange)
    },
    onClose: (state) => {
      state.isOpen = false;
      state.sales = [];
    },
  },
});

export const { onOpen, onClose } = SalesReportSlice.actions;

export default SalesReportSlice.reducer;
