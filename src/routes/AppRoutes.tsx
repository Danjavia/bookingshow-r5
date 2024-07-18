import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@presentation/pages/Home";
import BookstorePage from "@presentation/pages/Bookstore";
import BookDetailPage from "@presentation/pages/BookDetail";
import FavoritesPage from "@presentation/pages/Favorites";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bookstore" element={<BookstorePage />} />
      <Route path="/book/:id" element={<BookDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};

export default AppRoutes;
