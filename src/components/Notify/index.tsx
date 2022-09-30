import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { NotifyItem } from "./NotifyItem";
import { useSelector } from "../../hooks/redux/common";
import classes from "../../styles/notify.module.scss";

export const Notify = React.memo(() => {
  const items = useSelector((state) => state.notify.items);
  if (!items.length || typeof window !== "object") return null;

  return ReactDOM.createPortal(
    <TransitionGroup>
      {items.map((notify, index) => (
        <CSSTransition
          key={notify.id}
          timeout={500}
          classNames={{
            enter: classes.notifyEnter,
            enterActive: classes.notifyEnterActive,
            exit: classes.notifyExit,
            exitActive: classes.notifyExitActive,
          }}
        >
          <NotifyItem index={index} {...notify} />
        </CSSTransition>
      ))}
    </TransitionGroup>,
    document.getElementById("notify-portal") as HTMLElement
  );
});

Notify.displayName = "Notify";
