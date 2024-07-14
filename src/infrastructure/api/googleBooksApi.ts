import { z } from "zod";
import axios from "axios";
import { GOOGLE_BOOKS_API_URL } from "@config/constants";

const GoogleBookSchema = z.object({
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

const GoogleBooksResponseSchema = z.object({
  items: z.array(GoogleBookSchema),
});

export const googleBooksApi = {
  searchBooks: async (query: string) => {
    const response = await axios.get(
      `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}`,
    );
    return GoogleBooksResponseSchema.parse(response.data).items;
  },
};
