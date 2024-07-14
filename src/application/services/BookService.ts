import { BookRepositoryPort } from "@domain/ports/BookRepositoryPort";
import { Book } from "@domain/entities/Book";

export class BookService {
  constructor(
    private googleBooksRepository: BookRepositoryPort,
    private openLibraryRepository: BookRepositoryPort,
  ) {}

  async searchBooks(
    query: string,
    source: "google" | "openLibrary",
  ): Promise<Book[]> {
    if (source === "google") {
      return this.googleBooksRepository.searchBooks(query);
    } else {
      return this.openLibraryRepository.searchBooks(query);
    }
  }

  async getBookDetails(
    id: string,
    source: "google" | "openLibrary",
  ): Promise<Book> {
    if (source === "google") {
      return this.googleBooksRepository.getBookById(id);
    } else {
      return this.openLibraryRepository.getBookById(id);
    }
  }
}
