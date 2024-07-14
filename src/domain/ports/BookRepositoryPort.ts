import { Book } from "@domain/entities/Book";

export interface BookRepositoryPort {
  searchBooks(query: string): Promise<Book[]>;
  getBookById(id: string): Promise<Book>;
}
