import React from "react";
import { INotifyItem } from "../../@types/notify";

import styles from "../../styles/notify.module.scss";
import { useNotify } from "../../hooks/notify";

export const NotifyItem: React.FC<INotifyItem & { index: number }> = React.memo(
  ({ text, index, id }) => {
    const { removeNotify } = useNotify();

    return (
      <div
        style={{ transform: `translateY(-${index * 100}%)` }}
        className={styles.notifyItem}
      >
        <span>{text}</span>
        <button onClick={() => removeNotify(id)}>Close</button>
      </div>
    );
  }
);

NotifyItem.displayName = "NotifyItem";
