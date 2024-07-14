import { GoogleBooksAdapter } from "@infrastructure/adapters/googleBooksAdapter";
import { BookRepositoryPort } from "@domain/ports/BookRepositoryPort";

export const googleBooksRepository: BookRepositoryPort =
  new GoogleBooksAdapter();
