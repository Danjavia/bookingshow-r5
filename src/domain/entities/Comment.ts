import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  text: z.string(),
  createdAt: z.date(),
});

export type Comment = z.infer<typeof CommentSchema>;

export class CommentEntity implements Comment {
  constructor(
    public id: string,
    public bookId: string,
    public text: string,
    public createdAt: Date = new Date(),
  ) {
    CommentSchema.parse(this);
  }
}
