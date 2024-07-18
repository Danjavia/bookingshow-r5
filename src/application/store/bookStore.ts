import create from "zustand";
import { Book } from "@domain/entities/Book";
import { Comment } from "@domain/entities/Comment";
import {
  bookService,
  commentService,
  favoriteService,
} from "@application/services";

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
  favorites: Book[];
  comments: Record<string, Comment[]>;
  searchBooks: (
    query: string,
    source: "google" | "openLibrary",
  ) => Promise<void>;
  getBookDetails: (
    id: string,
    source: "google" | "openLibrary",
  ) => Promise<void>;
  selectBook: (book: Book | null) => void;
  addComment: (bookId: string, commentText: string) => Promise<void>;
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  loadFavorites: () => void;
}

export const useBookStore = create<BookState>((set, get) => {
  return {
    books: [],
    selectedBook: null,
    favorites: [],
    comments: {},
    searchBooks: async (query, source) => {
      const books = await bookService.searchBooks(query, source);
      set({ books });
    },
    getBookDetails: async (id, source) => {
      const book = await bookService.getBookDetails(id, source);
      console.log("THE BOOK ==>", book);
      set({ selectedBook: book });
    },
    selectBook: (book) => set({ selectedBook: book }),
    addComment: async (bookId, commentText) => {
      await commentService.addComment(bookId, commentText);
      const comments = await commentService.getComments(bookId);
      set((state: BookState) => ({
        comments: { ...state.comments, [bookId]: comments },
      }));
    },
    isFavorite: (id) => {
      const state = get();
      return state.favorites.some((book: Book) => book.id === id);
    },
    addToFavorites: async (book) => {
      await favoriteService.addFavorite(book);
      const favorites = await favoriteService.getFavorites();
      set(() => ({
        favorites,
      }));
    },
    removeFromFavorites: async (id) => {
      await favoriteService.removeFavorite(id);
      const favorites = await favoriteService.getFavorites();
      set(() => ({
        favorites,
      }));
    },
    loadFavorites: async () => {
      const favorites = await favoriteService.getFavorites();
      set({ favorites });
    },
  };
});
