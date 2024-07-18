import axios from "axios";
import { BookRepositoryPort } from "@domain/ports/BookRepositoryPort";
import { Book, BookSchema } from "@domain/entities/Book";

export class GoogleBooksAdapter implements BookRepositoryPort {
  private readonly API_URL = "https://www.googleapis.com/books/v1/volumes";

  async searchBooks(query: string): Promise<Book[]> {
    const response = await axios.get(
      `${this.API_URL}?q=${encodeURIComponent(query)}`,
    );
    return response.data.items.map((item: any) =>
      BookSchema.parse({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        description: item.volumeInfo.description,
      }),
    );
  }
  async getBookById(id: string): Promise<Book> {
    const response = await axios.get(`${this.API_URL}/${id}`);
    console.log("Response ==>", response);
    return BookSchema.parse({
      id: response.data.id,
      title: response.data.volumeInfo.title,
      authors: response.data.volumeInfo.authors || [],
      thumbnail: response.data.volumeInfo.imageLinks?.thumbnail,
      description: response.data.volumeInfo.description,
    });
  }
}
