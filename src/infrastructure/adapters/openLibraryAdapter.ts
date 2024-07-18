import axios from "axios";
import { BookRepositoryPort } from "@domain/ports/BookRepositoryPort";
import { Book, BookSchema } from "@domain/entities/Book";

export class OpenLibraryAdapter implements BookRepositoryPort {
  private readonly SEARCH_API_URL = "https://openlibrary.org/search.json";
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
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : undefined,
        description: book.first_sentence?.join(" "),
      }),
    );
  }

  async getBookById(id: string): Promise<Book> {
    const response = await axios.get(`${this.BOOK_API_URL}${id}.json`);

    const getAuthorNames = async (authorsData: any): Promise<string[]> => {
      if (!authorsData || !Array.isArray(authorsData))
        return ["Unknown Author"];

      const authorPromises = authorsData.map(async (authorData) => {
        if (authorData.author && authorData.author.key) {
          const authorResponse = await axios.get(
            `https://openlibrary.org${authorData.author.key}.json`,
          );
          return authorResponse.data.name || "Unknown Author";
        }
        return "Unknown Author";
      });

      return Promise.all(authorPromises);
    };

    const getDescription = async (workId: string): Promise<string> => {
      try {
        const descriptionResponse = await axios.get(
          `https://openlibrary.org${workId}.json`,
        );
        return (
          descriptionResponse.data?.description?.value ||
          "No description available"
        );
      } catch (error) {
        console.error("Error fetching book description:", error);
        return "No description available";
      }
    };

    const getCoverUrl = (): string => {
      const coverId = response?.data?.covers ? response?.data?.covers[0] : null;
      if (coverId)
        return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
      return "https://placehold.co/420x600?text=E-book\\nSample";
    };

    const authors = await getAuthorNames(response.data.authors);
    const description = await getDescription(response.data.key);

    return BookSchema.parse({
      id: response.data.key.replace("/works/", ""),
      title: response.data.title || "Untitled",
      authors: authors,
      thumbnail: getCoverUrl(),
      description: description,
    });
  }
}
