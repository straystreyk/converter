import React from "react";
import cn from "classnames";

import { INotifyItem } from "../../@types/notify";
import classes from "../../styles/notify.module.scss";

export const NotifyItem: React.FC<INotifyItem & { index: number }> = React.memo(
  ({ text, index, id, type }) => {
    // const { removeNotify } = useNotify();

    return (
      <div
        style={{
          zIndex: index + 2,
          transform: `translateY(${index * 10}px)`,
        }}
        className={cn(classes.notifyItem, type && type)}
      >
        <span>{text}</span>
      </div>
    );
  }
);

NotifyItem.displayName = "NotifyItem";
