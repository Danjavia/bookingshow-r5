import { z } from "zod";
import { Book, BookSchema } from "@domain/entities/Book";

export const BookSearchResultSchema = z.array(BookSchema);

export interface BookRepository {
  searchBooks(query: string): Promise<z.infer<typeof BookSearchResultSchema>>;
  getBookById(id: string): Promise<Book>;
}
