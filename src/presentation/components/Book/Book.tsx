import React from "react";
import { Book as BookType } from "@domain/entities/Book";
import "./book.css";
import { Link, useLocation } from "react-router-dom";
import { validPaths } from "@config/constants";

const Book = ({
  onSelectBook,
  book,
}: {
  onSelectBook: (book: BookType) => void;
  book: BookType;
}) => {
  const location = useLocation();
  const isBookstorePath = validPaths.includes(location.pathname);

  return (
    <Link
      to={isBookstorePath ? `/book/${book.id}` : "/"}
      key={book.id}
      onClick={() => onSelectBook(book)}
      className="cursor-pointer flex flex-shrink-0 justify-between flex-col m-6 relative overflow-hidden bg-gray-900 rounded-lg max-w-xs shadow-lg group"
    >
      <svg
        className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
        viewBox="0 0 375 283"
        fill="none"
        style={{ opacity: 0.1 }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
        {book.thumbnail ? (
          <img
            alt={book.title}
            src={book.thumbnail}
            className="relative w-40"
          />
        ) : (
          <img
            src="https://picsum.photos/200/260"
            className="relative w-40"
            alt="default"
          />
        )}
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
        <div className="flex justify-between">
          <span className="block font-semibold text-xl truncate overflow-ellipsis">
            {book.title}
          </span>
        </div>

        <div>
          <span className="block opacity-75 -mb-1 text-sm line-clamp-1">
            {book.authors.slice(0, 2).join(", ")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Book;
