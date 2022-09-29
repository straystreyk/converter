import React from "react";
import { INotifyItem } from "../../@types/notify";
import cn from "classnames";

import styles from "../../styles/notify.module.scss";

export const NotifyItem: React.FC<INotifyItem & { index: number }> = React.memo(
  ({ text, index, id, type }) => {
    // const { removeNotify } = useNotify();

    return (
      <div
        style={{ transform: `translateY(-${index * 100}%)` }}
        className={cn(styles.notifyItem, type && type)}
      >
        <span>{text}</span>
      </div>
    );
  }
);

NotifyItem.displayName = "NotifyItem";
