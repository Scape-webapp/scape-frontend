import { createSlice } from "@reduxjs/toolkit";

type User = {
  createdAt: string;
  email: string;
  is_online: boolean;
  updatedAt: string;
  user_name: string;
  _id: string;
  profile_image:string;
};

type UserState = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

const initialState: UserState = {
  user: {
    createdAt: "",
    email: "",
    is_online: false,
    updatedAt: "",
    user_name: "",
    _id: "",
    profile_image:"",
  },
  accessToken: "",
  refreshToken: "",
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.user = {
        createdAt: "",
        email: "",
        is_online: false,
        updatedAt: "",
        user_name: "",
        _id: "",
        profile_image: "",
      };
      state.accessToken = "";
      state.refreshToken = "";
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload;
      state.accessToken = accessToken;
    },
  },
});

export const { login, logout,setAccessToken } = user.actions;
export default user.reducer;
