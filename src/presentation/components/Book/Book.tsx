import React from "react";
import { Book as BookType } from "@domain/entities/Book";
import "./book.css";

const Book = ({
  onSelectBook,
  book,
}: {
  onSelectBook: (book: BookType) => void;
  book: BookType;
}) => (
  <div className="book">
    <div key={book.id} onClick={() => onSelectBook(book)}>
      <div className="book-image">
        {book.thumbnail ? (
          <img alt={book.title} src={book.thumbnail} />
        ) : (
          <img src="https://picsum.photos/200/260" alt="default" />
        )}
      </div>
      <h3 className="book-title">{book.title}</h3>

      <p>{book.authors.join(", ")}</p>
    </div>
  </div>
);

export default Book;
