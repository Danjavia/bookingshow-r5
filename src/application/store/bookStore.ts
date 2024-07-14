import create from "zustand";
import { BookService } from "@application/services/BookService";
import { CommentService } from "@application/services/CommentService";
import { Book } from "@domain/entities/Book";
import { Comment } from "@domain/entities/Comment";
import { googleBooksRepository } from "@infrastructure/repositories/googleBooksRepository";
import { openLibraryRepository } from "@infrastructure/repositories/openLibraryRepository";
import { commentRepository } from "@infrastructure/repositories/localStorageRepository";

interface BookState {
  books: Book[];
  selectedBook: Book | null;
  comments: Record<string, Comment[]>;
  searchBooks: (
    query: string,
    source: "google" | "openLibrary",
  ) => Promise<void>;
  selectBook: (book: Book | null) => void;
  addComment: (bookId: string, commentText: string) => Promise<void>;
}

export const useBookStore = create<BookState>((set, get) => {
  const bookService = new BookService(
    googleBooksRepository,
    openLibraryRepository,
  );
  const commentService = new CommentService(commentRepository);

  return {
    books: [],
    selectedBook: null,
    comments: {},
    searchBooks: async (query, source) => {
      const books = await bookService.searchBooks(query, source);
      set({ books });
    },
    selectBook: (book) => set({ selectedBook: book }),
    addComment: async (bookId, commentText) => {
      await commentService.addComment(bookId, commentText);
      const comments = await commentService.getComments(bookId);
      set((state) => ({
        comments: { ...state.comments, [bookId]: comments },
      }));
    },
  };
});
