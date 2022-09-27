import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Converter } from "./Converter";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Converter />} />
      </Routes>
    </>
  );
};
