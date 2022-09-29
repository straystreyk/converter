import { counterReducers } from "./slices/counterSlice";
import { notifyReducers } from "./slices/notifySlices";

export const reducer = {
  counter: counterReducers,
  notify: notifyReducers,
};
