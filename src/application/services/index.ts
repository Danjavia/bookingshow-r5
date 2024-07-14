import { BookService } from "./BookService";
import { CommentService } from "./CommentService";
import { googleBooksRepository } from "@infrastructure/repositories/googleBooksRepository";
import { openLibraryRepository } from "@infrastructure/repositories/openLibraryRepository";
import { commentRepository } from "@infrastructure/repositories/localStorageRepository";

export const bookService = new BookService(
  googleBooksRepository,
  openLibraryRepository,
);
export const commentService = new CommentService(commentRepository);
