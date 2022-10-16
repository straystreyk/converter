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
      e.stopPropagation();

      updateSidebar({
        ...sidebarOpts,
        isDragging: true,
        x: e.clientX,
        y: e.clientY,
        isClose: sidebarOpts.width === 0,
        isHiddenContent: sidebarOpts.width < LIMIT_BEFORE_EXIT,
      });
    },
    [sidebarOpts, updateSidebar]
  );

  const resizeFrame = React.useCallback(
    (e: React.MouseEvent) => {
      const { isDragging, x, width: initialWidth } = sidebarOpts;
      if (isDragging && x) {
        const xDiff = Math.abs(x - e.clientX);
        const width =
          x < e.clientX ? initialWidth - xDiff : initialWidth + xDiff;

        if (typeof window !== "undefined" && width >= window.innerWidth / 2)
          return;

        updateSidebar({
          ...sidebarOpts,
          x: e.clientX,
          y: e.clientY,
          width,
          isClose: sidebarOpts.width === 0,
          isHiddenContent: sidebarOpts.width < LIMIT_BEFORE_EXIT,
        });
      }
    },
    [updateSidebar, sidebarOpts]
  );

  const stopResize = React.useCallback(() => {
    const currentWidth =
      sidebarOpts.width < LIMIT_BEFORE_EXIT ? 0 : sidebarOpts.width;
    const newOpts = {
      ...sidebarOpts,
      isDragging: false,
      width: currentWidth,
      isHiddenContent: sidebarOpts.width < LIMIT_BEFORE_EXIT,
      isClose: currentWidth === 0,
    };

    localStorage.setItem("sidebar", JSON.stringify(newOpts));

    updateSidebar(newOpts);
  }, [sidebarOpts, updateSidebar]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("sidebar")) {
      updateSidebar(JSON.parse(localStorage.getItem("sidebar") as string));
    }
  }, []);

  return (
    <div
      style={{
        ...styles,
        width: `${sidebarOpts.width}px`,
      }}
      className={cn(classes.sidebar, `sidebar-close_${sidebarOpts.isClose}`)}
      onMouseMove={resizeFrame}
      onMouseUp={stopResize}
    >
      <div
        onMouseDown={onMouseDown}
        className={cn(
          classes.resizer,
          sidebarOpts.isDragging && "resizer-fullwidth"
        )}
      />
      <div
        className={cn(
          classes.sidebarContent,
          (sidebarOpts.width < LIMIT_BEFORE_EXIT && sidebarOpts.isDragging) ||
            sidebarOpts.isHiddenContent
            ? "sidebar-content-hidden_true"
            : "sidebar-content-hidden_false"
        )}
      >
        SIDEBAR
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";
