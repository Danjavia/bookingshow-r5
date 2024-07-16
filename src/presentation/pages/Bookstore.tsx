import React, { useEffect } from "react";
import { useBookStore } from "@application/store/bookStore";
import BookList from "@presentation/components/BookList/BookList";
import HeroComponent from "@presentation/components/Hero/Hero";

const Bookstore: React.FC = () => {
  const { books, searchBooks } = useBookStore();
  const fetchInitialData = async () =>
    await searchBooks("React JS", "openLibrary");

  useEffect(() => {
    void fetchInitialData();
  }, []);

  return (
    <div>
      <HeroComponent source="openLibrary" />
      <BookList books={books} />
    </div>
  );
};

export default Bookstore;
