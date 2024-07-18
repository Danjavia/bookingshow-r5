import React from "react";
import { useBookStore } from "@application/store/bookStore";
import BookList from "@presentation/components/BookList/BookList";

const FavoritesPage: React.FC = () => {
  const { favorites } = useBookStore();

  return (
    <div>
      <h1>Favorites</h1>
      <BookList books={favorites} />
    </div>
  );
};

export default FavoritesPage;
