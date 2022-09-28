import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Converter } from "./Converter";
import { Notify } from "./Notify";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Converter />} />
      </Routes>
      <Notify />
    </>
  );
};
