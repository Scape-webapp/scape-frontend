// ref : https://dev.to/juniorbatistadev/how-to-use-nextjs-13-with-redux-toolkit-and-typescript-2anb

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
