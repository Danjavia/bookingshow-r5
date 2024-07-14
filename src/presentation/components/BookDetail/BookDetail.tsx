import React from "react";
import { Book } from "@domain/entities/Book";
import CommentForm from "@presentation/components/CommentForm/CommentForm";

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>By: {book.authors.join(", ")}</p>
      {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
      <p>{book.description}</p>
      <button
        onClick={() => {
          /* Implementar lógica para agregar a favoritos */
        }}
      >
        Add to Favorites
      </button>
      <CommentForm bookId={book.id} />
    </div>
  );
};

export default BookDetail;
