import React, { useEffect } from "react";
import { Book as BookType } from "@domain/entities/Book";
import Book from "@presentation/components/Book/Book";
import { BookState, useBookStore } from "@application/store/bookStore";

interface BooksProps {
  books: BookType[];
  onSelectBook?: (book: BookType) => void;
}

const BookList: React.FC<BooksProps> = ({ books, onSelectBook }) => {
  const selectBook = useBookStore((state: BookState) => state.selectBook);

  return (
    <div className="book-list container max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <Book key={book.id} book={book} onSelectBook={selectBook} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
