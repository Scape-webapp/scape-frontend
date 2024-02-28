import { createSlice } from "@reduxjs/toolkit";

type ActiveState = {
  tabValue: string;
};

const initialState: ActiveState = {
  tabValue: "chat",
};

export const activeTab = createSlice({
  name: "activeState",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      const currTab = action.payload;
      console.log("set this as new access token : ", currTab);
      state.tabValue = currTab;
    },
  },
});

export const { setActiveTab } = activeTab.actions;
export default activeTab.reducer;
