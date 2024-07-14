import { z } from "zod";
import { Book, BookSchema } from "@domain/entities/Book";
import { googleBooksRepository } from "@infrastructure/repositories/googleBooksRepository";
import { openLibraryRepository } from "@infrastructure/repositories/openLibraryRepository";

export const getBookDetailsUseCase = async (
  id: string,
  source: "google" | "openLibrary",
): Promise<Book> => {
  try {
    let bookDetails;
    if (source === "google") {
      bookDetails = await googleBooksRepository.getBookById(id);
    } else {
      bookDetails = await openLibraryRepository.getBookById(id);
    }

    return BookSchema.parse(bookDetails);
  } catch (error) {
    console.error(`Error in getBookDetailsUseCase for ${source}:`, error);
    throw error;
  }
};
