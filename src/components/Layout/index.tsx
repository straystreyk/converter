import React from "react";
import { Notify } from "../Notify";
import { Header } from "./Header";
import { Footer } from "./Footer";

import classes from "../../styles/layout.module.scss";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={classes.content}>
      <div className={classes.mainContent}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Notify />
      </div>
      <Sidebar />
    </div>
  );
};
