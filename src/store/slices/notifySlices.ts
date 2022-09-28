import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { INotifyItem, INotifyProps } from "../../@types/notify";

const initialState: INotifyProps = {
  items: [],
};

export const notifySlices = createSlice({
  name: "notify",
  initialState,
  reducers: {
    addNewNotify: (state, action: PayloadAction<INotifyItem>) => {
      state.items = [...state.items, action.payload];
    },
    removeNotify: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNewNotify, removeNotify } = notifySlices.actions;

export const notifyReducers = notifySlices.reducer;
