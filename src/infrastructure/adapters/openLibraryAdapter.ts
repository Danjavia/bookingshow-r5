import axios from "axios";
import { BookRepositoryPort } from "@domain/ports/BookRepositoryPort";
import { Book, BookSchema } from "@domain/entities/Book";

export class OpenLibraryAdapter implements BookRepositoryPort {
  private readonly SEARCH_API_URL = "http://openlibrary.org/search.json";
  private readonly BOOK_API_URL = "https://openlibrary.org/works/";

  async searchBooks(query: string): Promise<Book[]> {
    const response = await axios.get(
      `${this.SEARCH_API_URL}?q=${encodeURIComponent(query)}`,
    );
    return response.data.docs.map((book: any) =>
      BookSchema.parse({
        id: book.key.replace("/works/", ""),
        title: book.title,
        authors: book.author_name || [],
        thumbnail: book.cover_i
          ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : undefined,
        description: book.first_sentence?.join(" "),
      }),
    );
  }

  async getBookById(id: string): Promise<Book> {
    const response = await axios.get(`${this.BOOK_API_URL}${id}.json`);
    return BookSchema.parse({
      id: response.data.key.replace("/works/", ""),
      title: response.data.title,
      authors: response.data.authors?.map((author: any) => author.name) || [],
      thumbnail: response.data.covers
        ? `http://covers.openlibrary.org/b/id/${response.data.covers[0]}-M.jpg`
        : undefined,
      description:
        response.data.description?.value || response.data.description,
    });
  }
}
