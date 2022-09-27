import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/counterSlice";
import { StoreStateType } from "../store/store";

import classes from "./comp.module.scss"

export const Test = () => {
  const count = useSelector((state: StoreStateType) => state.counter.value);
  const dispatch = useDispatch();


  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className={classes.test}>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};
