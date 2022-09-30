import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ISidebar } from "../../@types/sidebar";

const INITIAL_WIDTH = 0;

interface ISidebarSlice {
  sidebarOpts: ISidebar;
}

const initialState: ISidebarSlice = {
  sidebarOpts: {
    isDragging: false,
    x: 0,
    y: 0,
    width: INITIAL_WIDTH,
    isClose: true,
    isHiddenContent: true,
  },
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    updateSidebar: (state, action: PayloadAction<ISidebar>) => {
      state.sidebarOpts = action.payload;
    },
  },
});

export const { updateSidebar } = sidebarSlice.actions;

export const sidebarReducers = sidebarSlice.reducer;
