import React, { useState } from "react";
import { useBookStore } from "@application/store/bookStore";
import BookList from "@presentation/components/BookList/BookList";
import HeroComponent from "@presentation/components/Hero/Hero";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const { books, searchBooks } = useBookStore();

  const handleSearch = () => {
    searchBooks(query, "google");
  };

  return (
    <div>
      <HeroComponent />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleSearch}>Search</button>
      <BookList books={books} />
    </div>
  );
};

export default Home;
