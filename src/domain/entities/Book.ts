import { z } from "zod";

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  thumbnail: z.string().url().optional(),
  description: z.string().optional(),
});

export type Book = z.infer<typeof BookSchema>;
