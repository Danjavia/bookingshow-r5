import React, { useEffect } from "react";
import CommentForm from "@presentation/components/CommentForm/CommentForm";
import BookmarkIcon from "@assets/icons/BookmarkIcon";
import { useBookStore } from "@application/store/bookStore";
import CommentList from "@presentation/components/CommentList/CommentList";
import { useParams } from "react-router-dom";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    addToFavorites,
    removeFromFavorites,
    selectedBook,
    isFavorite,
    comments,
    getBookDetails,
  } = useBookStore();

  useEffect(() => {
    getBook();
  }, []);

  const toggleFavorite = () => {
    if (isFavorite(selectedBook.id)) {
      removeFromFavorites(selectedBook.id);
    } else {
      addToFavorites(selectedBook);
    }
  };

  const getBook = () => {
    if (id) {
      getBookDetails(id, "openLibrary");
    }
  };

  if (!selectedBook) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-5 md:p-10 grid grid-cols-1 md:grid-cols-3">
      <div className="my-3">
        {selectedBook.thumbnail ? (
          <img
            src={selectedBook.thumbnail}
            alt={selectedBook.title}
            className="w-3/5 mx-auto shadow-lg shadow-purple-900/50 rounded-md"
          />
        ) : (
          <img
            src="https://placehold.co/420x600?text=E-book\nSample"
            alt={selectedBook.title}
            className="w-3/5 mx-auto shadow-lg shadow-purple-900/50 rounded-md"
          />
        )}
      </div>
      <section className="col-span-2 max-w-[640px]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{selectedBook.title}</h1>
          </div>
          <div>
            <button onClick={toggleFavorite}>
              <BookmarkIcon
                size={48}
                color={isFavorite(selectedBook.id) ? "red" : "gray"}
              />
            </button>
          </div>
        </div>

        <p className="text-lg italic font-semibold">
          By: {selectedBook.authors.join(", ")}
        </p>

        <div className="my-5">
          <p>{selectedBook.description ?? "Lorem ipsum dolor sit amet"}</p>
          <CommentList comments={comments[selectedBook.id] || []} />
          <CommentForm bookId={selectedBook.id} />
        </div>
      </section>
    </div>
  );
};

export default BookDetail;
