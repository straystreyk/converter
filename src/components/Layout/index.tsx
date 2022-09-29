import React from "react";
import { Notify } from "../Notify";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Notify />
    </>
  );
};
