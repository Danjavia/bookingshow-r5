import { OpenLibraryAdapter } from "@infrastructure/adapters/openLibraryAdapter";
import { BookRepositoryPort } from "@domain/ports/BookRepositoryPort";

export const openLibraryRepository: BookRepositoryPort =
  new OpenLibraryAdapter();
