import { BookRepository } from "@application/interfaces/BookRepository";
import { Book, BookEntity } from "@domain/entities/Book";

export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async searchBooks(query: string): Promise<Book[]> {
    const books = await this.bookRepository.searchBooks(query);
    return books.map(
      (book) =>
        new BookEntity(
          book.id,
          book.title,
          book.authors,
          book.thumbnail,
          book.description,
        ),
    );
  }

  async getBookDetails(id: string): Promise<Book> {
    const book = await this.bookRepository.getBookById(id);
    return new BookEntity(
      book.id,
      book.title,
      book.authors,
      book.thumbnail,
      book.description,
    );
  }
}
