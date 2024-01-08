import { combineReducers } from "redux";
import userReducer from "./features/user-slice";

export const root = combineReducers({
  user: userReducer,
});
