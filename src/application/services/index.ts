import { BookService } from "./BookService";
import { CommentService } from "./CommentService";
import { googleBooksRepository } from "@infrastructure/repositories/googleBooksRepository";
import { openLibraryRepository } from "@infrastructure/repositories/openLibraryRepository";
import { commentRepository } from "@infrastructure/repositories/localStorageCommentsRepository";
import { FavoriteService } from "@application/services/FavoriteService";
import { favoriteRepository } from "@infrastructure/repositories/localStorageFavoritesRepository";

export const bookService = new BookService(
  googleBooksRepository,
  openLibraryRepository,
);
export const commentService = new CommentService(commentRepository);
export const favoriteService = new FavoriteService(favoriteRepository);
