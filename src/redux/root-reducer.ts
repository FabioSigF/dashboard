import { combineReducers } from "redux";
import { SidebarSlice } from "./sidebar/slice";
import { NewCompanyModalSlice } from "./newCompanyModal/slice";
import { StockModalSlice } from "./stockModal/slice";
import { ScheduleModalSlice } from "./scheduleModal/slice";

const rootReducer = combineReducers({
  sidebar: SidebarSlice.reducer,
  newcompany: NewCompanyModalSlice.reducer,
  stock: StockModalSlice.reducer,
  schedule: ScheduleModalSlice.reducer,
})

export default rootReducer;