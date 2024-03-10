import { combineReducers } from "redux";
import userReducer from "./features/user-slice";
import activeTabReducer from "./features/activeTab-slice";

export const root = combineReducers({
  user: userReducer,
  activeTab: activeTabReducer
});
