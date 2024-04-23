import { createSlice } from "@reduxjs/toolkit";
import { Company } from "../../types/global.type";

interface StateProps {
  isOpen: boolean;
  itsAnEdit: boolean;
  editedCompany: Company | undefined;
}

const initialState: StateProps = {
  isOpen: false,
  itsAnEdit: false,
  editedCompany: undefined,
};

export const CompanyModalSlice = createSlice({
  name: "companymodal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    onOpenEdit: (state, data) => {
        state.itsAnEdit = true;
        state.editedCompany = data.payload;
    },
    onCloseEdit: (state) => {
      state.itsAnEdit = false;
        state.editedCompany = undefined;
    }
  },
});

export const { onOpen, onClose, onOpenEdit, onCloseEdit } = CompanyModalSlice.actions;

export default CompanyModalSlice.reducer;
