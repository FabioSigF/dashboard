import { combineReducers } from "redux";
import { SidebarSlice } from "./sidebar/slice";
import { CompanyModalSlice } from "./companyModal/slice";
import { StockModalSlice } from "./stockModal/slice";
import { ScheduleModalSlice } from "./scheduleModal/slice";
import { SalesReportSlice } from "./salesReportModal/slice";
import { UniformReportModalSlice } from "./uniformReportModal/slice";

const rootReducer = combineReducers({
  sidebar: SidebarSlice.reducer,
  company: CompanyModalSlice.reducer,
  stock: StockModalSlice.reducer,
  schedule: ScheduleModalSlice.reducer,
  salesReport: SalesReportSlice.reducer,
  uniformReport: UniformReportModalSlice.reducer
})

export default rootReducer;