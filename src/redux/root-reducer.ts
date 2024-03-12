import { combineReducers } from "redux";
import { SidebarSlice } from "./sidebar/slice";
import { NewCompanyModalSlice } from "./newCompanyModal/slice";
import { StockModalSlice } from "./stockModal/slice";

const rootReducer = combineReducers({
  sidebar: SidebarSlice.reducer,
  newcompany: NewCompanyModalSlice.reducer,
  stock: StockModalSlice.reducer,
})

export default rootReducer;