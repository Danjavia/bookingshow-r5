import React, { useState } from "react";
import { useBookStore } from "@application/store/bookStore";
import BookList from "@presentation/components/BookList/BookList";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const { books, searchBooks } = useBookStore();

  const handleSearch = () => {
    searchBooks(query, "google");
  };

  return (
    <div>
      <h1>Google Books Search</h1>
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
