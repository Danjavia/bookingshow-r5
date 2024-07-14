import React from "react";
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
    <div>
      {books.map((book) => (
        <Book key={book.id} book={book} onSelectBook={selectBook} />
      ))}
    </div>
  );
};

export default BookList;
