import { BookService } from "@application/services/BookService";
import { Book } from "@domain/entities/Book";

export const searchBooksUseCase =
  (bookService: BookService) =>
  async (query: string, source: "google" | "openLibrary"): Promise<Book[]> => {
    try {
      return await bookService.searchBooks(query, source);
    } catch (error) {
      console.error("Error in searchBooksUseCase:", error);
      throw error;
    }
  };
