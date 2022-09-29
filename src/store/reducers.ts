import { counterReducers } from "./slices/counterSlice";
import { notifyReducers } from "./slices/notifySlices";
import { sidebarReducers } from "./slices/sidebarSlice";

export const reducer = {
  counter: counterReducers,
  notify: notifyReducers,
  sidebar: sidebarReducers,
};
