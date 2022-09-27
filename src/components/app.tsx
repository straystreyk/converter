import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Test } from "./test";
import Bidon from "../assets/images/bidon.jpg";

export const App: React.FC = () => {
  return (
    <>
      <img src={Bidon} alt="Bidon" />
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </>
  );
};
