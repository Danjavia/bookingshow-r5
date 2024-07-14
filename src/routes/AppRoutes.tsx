import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@presentation/pages/Home";
import Bookstore from "@presentation/pages/Bookstore";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bookstore" element={<Bookstore />} />
    </Routes>
  );
};

export default AppRoutes;
