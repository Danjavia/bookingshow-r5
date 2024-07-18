import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  text: z.string(),
  createdAt: z.date(),
});

export type Comment = z.infer<typeof CommentSchema>;
