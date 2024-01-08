// ref : https://dev.to/juniorbatistadev/how-to-use-nextjs-13-with-redux-toolkit-and-typescript-2anb

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { root } from "./rootReducer";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "Scape",
  storage,
};

const reducer = persistReducer(persistConfig, root);

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
