import { combineReducers } from "redux";
import { SidebarSlice } from "./sidebar/slice";

const rootReducer = combineReducers({
  sidebar: SidebarSlice.reducer,
})

export default rootReducer;