import { Book } from "@domain/entities/Book";

export interface BookRepositoryInterface {
  searchBooks(query: string): Promise<Book[]>;
  getBookById(id: string): Promise<Book>;
}
