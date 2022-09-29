import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { ConverterPage } from "../pages/ConverterPage";

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ConverterPage />} />
      </Routes>
    </Layout>
  );
};
