import { Book } from "@domain/entities/Book";

export interface BookServiceInterface {
  searchBooks(query: string, source: "google" | "openLibrary"): Promise<Book[]>;
  getBookDetails(id: string, source: "google" | "openLibrary"): Promise<Book>;
}
