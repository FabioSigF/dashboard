import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  isOpen: boolean;
  addedSuccessfully: boolean;
  updatedSuccessfully: boolean;
  isAnUpdate: boolean;
  updatedId: string;
  updatedTitle: string;
  updatedType: string;
  updatedDate: string;
}

const initialState: StateProps = {
  isOpen: false,
  addedSuccessfully: false,
  updatedSuccessfully: false,
  isAnUpdate: false,
  updatedId: "",
  updatedTitle: "",
  updatedType: "",
  updatedDate: "",
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
    onToggleUpdate: (state, data) => {
      if(state.isAnUpdate === true) {
        state.isAnUpdate = false;
        state.updatedId = "";
        state.updatedTitle = "";
        state.updatedType = "";
        state.updatedDate = "";
      } else {
        console.log(data.payload);
        state.isAnUpdate = true;
        state.updatedId = data.payload.id;
        state.updatedTitle = data.payload.title;
        state.updatedType = data.payload.type;
        state.updatedDate = data.payload.date;
      }
    },
    onToggleUpdatedSuccessfully: (state) => {
      state.updatedSuccessfully = !state.updatedSuccessfully;
    }
  }
})

export const { onOpen, onClose, onToggleAddedSuccessfully, onToggleUpdate, onToggleUpdatedSuccessfully } = ScheduleModalSlice.actions;

export default ScheduleModalSlice.reducer;