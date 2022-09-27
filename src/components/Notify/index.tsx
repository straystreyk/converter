import React from "react";
import ReactDOM from "react-dom";
import { NotifyProps } from "../../@types/notify";
import { NotifyItem } from "./NotifyItem";

export const Notify: React.FC<NotifyProps> = ({ isOpen }) => {
  if (!isOpen || typeof window !== "object") return null;

  return ReactDOM.createPortal(
    <>
      <NotifyItem />
    </>,
    document.getElementById("notify-portal") as HTMLElement
  );
};
