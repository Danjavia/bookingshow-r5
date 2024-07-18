import React, { useEffect } from "react";
import { useBookStore } from "@application/store/bookStore";
import BookList from "@presentation/components/BookList/BookList";

const FavoritesPage: React.FC = () => {
  const { favorites, loadFavorites } = useBookStore();

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <section>
      <div>
        <h1 className="text-3xl text-center font-bold my-10">
          My Favorite Books
        </h1>
      </div>
      <BookList books={favorites} />
    </section>
  );
};

export default FavoritesPage;
