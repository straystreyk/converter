import React from "react";
import cn from "classnames";

import classes from "../../styles/sidebar.module.scss";
import { useSelector } from "../../hooks/redux/common";
import { useSidebar } from "../../hooks/useSidebar";

const styles = {};
const LIMIT_BEFORE_EXIT = 150;

export const Sidebar: React.FC = React.memo(() => {
  const { update: updateSidebar } = useSidebar();
  const sidebarOpts = useSelector((state) => state.sidebar.sidebarOpts);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      updateSidebar({
        ...sidebarOpts,
        isDragging: true,
        x: e.clientX,
        y: e.clientY,
        isClose: sidebarOpts.width < LIMIT_BEFORE_EXIT,
      });
    },
    [sidebarOpts, updateSidebar]
  );

  const resizeFrame = React.useCallback(
    (e: React.MouseEvent) => {
      const { isDragging, x, width: initialWidth } = sidebarOpts;
      if (isDragging) {
        const xDiff = Math.abs(x - e.clientX);
        const width =
          x < e.clientX ? +initialWidth - xDiff : initialWidth + xDiff;

        if (typeof window !== "undefined" && width >= window.innerWidth / 2)
          return;

        updateSidebar({ ...sidebarOpts, x: e.clientX, y: e.clientY, width });
      }
    },
    [updateSidebar, sidebarOpts]
  );

  const stopResize = React.useCallback(() => {
    updateSidebar({
      ...sidebarOpts,
      isDragging: false,
      width: sidebarOpts.width < LIMIT_BEFORE_EXIT ? 0 : sidebarOpts.width,
      isClose: sidebarOpts.width < LIMIT_BEFORE_EXIT,
    });
  }, [sidebarOpts, updateSidebar]);

  return (
    <div
      role="toolbar"
      style={{
        ...styles,
        width: `${sidebarOpts.width}px`,
      }}
      className={classes.sidebar}
      onMouseMove={resizeFrame}
      onMouseUp={stopResize}
    >
      <div
        role="toolbar"
        onMouseDown={onMouseDown}
        className={cn(
          classes.resizer,
          sidebarOpts.isDragging && "resizer-fullwidth"
        )}
      />
      <div
        className={cn(
          classes.sidebarContent,
          `sidebar-hidden_${sidebarOpts.isClose}`
        )}
      >
        SIDEBAR
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";
