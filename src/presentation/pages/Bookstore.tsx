import React, { useState } from "react";
import { useBookStore } from "@application/store/bookStore";
import BookList from "@presentation/components/BookList/BookList";
import BookDetail from "@presentation/components/BookDetail/BookDetail";

const Bookstore: React.FC = () => {
  const [query, setQuery] = useState("");
  const { books, searchBooks, selectedBook } = useBookStore();

  const handleSearch = () => {
    searchBooks(query, "openLibrary");
  };

  return (
    <div>
      <h1>Open Library Bookstore</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ display: "flex" }}>
        <BookList books={books} />
        {selectedBook && <BookDetail book={selectedBook} />}
      </div>
    </div>
  );
};

export default Bookstore;
