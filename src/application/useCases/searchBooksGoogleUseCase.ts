import { z } from "zod";
import { Book, BookSchema } from "@domain/entities/Book";
import { googleBooksRepository } from "@infrastructure/repositories/googleBooksRepository";

const GoogleBookResponseSchema = z.object({
  id: z.string(),
  volumeInfo: z.object({
    title: z.string(),
    authors: z.array(z.string()).optional(),
    description: z.string().optional(),
    imageLinks: z
      .object({
        thumbnail: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const searchBooksGoogleUseCase = async (
  query: string,
): Promise<Book[]> => {
  try {
    const googleBooks = await googleBooksRepository.searchBooks(query);
    return googleBooks.map((googleBook) => {
      const validatedBook = GoogleBookResponseSchema.parse(googleBook);
      return BookSchema.parse({
        id: validatedBook.id,
        title: validatedBook.volumeInfo.title,
        authors: validatedBook.volumeInfo.authors || [],
        thumbnail: validatedBook.volumeInfo.imageLinks?.thumbnail,
        description: validatedBook.volumeInfo.description,
      });
    });
  } catch (error) {
    console.error("Error in searchBooksGoogleUseCase:", error);
    throw error;
  }
};
