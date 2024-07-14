import { z } from "zod";
import axios from "axios";
import { OPEN_LIBRARY_API_URL } from "@config/constants";

const OpenLibraryBookSchema = z.object({
  key: z.string(),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  description: z.string().optional(),
  cover_i: z.number().optional(),
});

const OpenLibraryResponseSchema = z.object({
  docs: z.array(OpenLibraryBookSchema),
});

export const openLibraryApi = {
  searchBooks: async (query: string) => {
    const response = await axios.get(
      `${OPEN_LIBRARY_API_URL}?q=${encodeURIComponent(query)}`,
    );
    return OpenLibraryResponseSchema.parse(response.data).docs;
  },
};
