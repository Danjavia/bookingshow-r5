import React, { useEffect } from "react";
import { useBookStore } from "@application/store/bookStore";
import BookList from "@presentation/components/BookList/BookList";
import HeroComponent from "@presentation/components/Hero/Hero";

const Home: React.FC = () => {
  const { books, searchBooks } = useBookStore();
  const fetchInitialData = async () => await searchBooks("React JS", "google");

  useEffect(() => {
    void fetchInitialData();
  }, []);

  return (
    <div>
      <HeroComponent />
      <BookList books={books} />
    </div>
  );
};

export default Home;
