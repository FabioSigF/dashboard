import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  isOpen: boolean;
  addedSuccessfully: boolean;
}

const initialState: StateProps = {
  isOpen: false,
  addedSuccessfully: false
};

export const ScheduleModalSlice = createSlice({
  name: "schedulemodal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    onToggleAddedSuccessfully: (state) => {
      state.addedSuccessfully = !state.addedSuccessfully;
    },
  }
})

export const { onOpen, onClose, onToggleAddedSuccessfully } = ScheduleModalSlice.actions;

export default ScheduleModalSlice.reducer;