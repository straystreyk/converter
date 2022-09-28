import {
  configureStore,
  type PreloadedState,
  type StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { counterReducers } from "./slices/counterSlice";
import { notifyReducers } from "./slices/notifySlices";

const reducer = {
  counter: counterReducers,
  notify: notifyReducers,
};

export const initStore = (preloadedState?: PreloadedStateType) =>
  configureStore({
    reducer,
    preloadedState,
  });

export type Store = ReturnType<typeof initStore>;
export type StoreStateType = ReturnType<Store["getState"]>;
export type StoreDispatch = Store["dispatch"];
export type PreloadedStateType = PreloadedState<
  StateFromReducersMapObject<typeof reducer>
>;
