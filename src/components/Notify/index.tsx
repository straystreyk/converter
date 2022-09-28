import React from "react";
import ReactDOM from "react-dom";
import { NotifyItem } from "./NotifyItem";
import { useSelector } from "../../hooks/redux/common";

export const Notify = React.memo(() => {
  const items = useSelector((state) => state.notify.items);
  if (!items.length || typeof window !== "object") return null;

  return ReactDOM.createPortal(
    <>
      {items.map((notify, index) => (
        <NotifyItem key={index} index={index} {...notify} />
      ))}
    </>,
    document.getElementById("notify-portal") as HTMLElement
  );
});

Notify.displayName = "Notify";
