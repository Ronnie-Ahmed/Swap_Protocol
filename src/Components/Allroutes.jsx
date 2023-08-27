import { Routes, Route } from "react-router-dom";

import { Home } from "../Pages/Home";
import { TestNet } from "../Pages/TestNet";

import { PageNotFound } from "../Pages/PageNotFound";

export const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testnet" element={<TestNet />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
