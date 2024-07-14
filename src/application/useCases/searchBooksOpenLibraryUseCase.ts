import { z } from "zod";
import { Book, BookSchema } from "@domain/entities/Book";
import { openLibraryRepository } from "@infrastructure/repositories/openLibraryRepository";

const OpenLibraryBookResponseSchema = z.object({
  key: z.string(),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  cover_i: z.number().optional(),
  first_sentence: z.array(z.string()).optional(),
});

export const searchBooksOpenLibraryUseCase = async (
  query: string,
): Promise<Book[]> => {
  try {
    const openLibraryBooks = await openLibraryRepository.searchBooks(query);
    return openLibraryBooks.map((openLibraryBook) => {
      const validatedBook =
        OpenLibraryBookResponseSchema.parse(openLibraryBook);
      return BookSchema.parse({
        id: validatedBook.key,
        title: validatedBook.title,
        authors: validatedBook.author_name || [],
        thumbnail: validatedBook.cover_i
          ? `http://covers.openlibrary.org/b/id/${validatedBook.cover_i}-M.jpg`
          : undefined,
        description: validatedBook.first_sentence?.join(" "),
      });
    });
  } catch (error) {
    console.error("Error in searchBooksOpenLibraryUseCase:", error);
    throw error;
  }
};
