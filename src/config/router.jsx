import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Layout from "../pages/_Layout";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:category" element={<Catalog />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/:category/search/:keyword" element={<Catalog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
