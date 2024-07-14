import { z } from "zod";

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  thumbnail: z.string().url().optional(),
  description: z.string().optional(),
});

export type Book = z.infer<typeof BookSchema>;

export class BookEntity implements Book {
  constructor(
    public id: string,
    public title: string,
    public authors: string[],
    public thumbnail?: string,
    public description?: string,
  ) {
    BookSchema.parse(this);
  }

  static fromGoogleBook(googleBook: any): BookEntity {
    return new BookEntity(
      googleBook.id,
      googleBook.volumeInfo.title,
      googleBook.volumeInfo.authors || [],
      googleBook.volumeInfo.imageLinks?.thumbnail,
      googleBook.volumeInfo.description,
    );
  }

  static fromOpenLibraryBook(openLibraryBook: any): BookEntity {
    return new BookEntity(
      openLibraryBook.key,
      openLibraryBook.title,
      openLibraryBook.author_name || [],
      `http://covers.openlibrary.org/b/id/${openLibraryBook.cover_i}-M.jpg`,
      openLibraryBook.first_sentence?.join(" "),
    );
  }
}
