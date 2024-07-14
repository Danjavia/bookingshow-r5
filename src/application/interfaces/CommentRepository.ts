import { z } from "zod";
import { Comment, CommentSchema } from "@domain/entities/Comment";

export const CommentListSchema = z.array(CommentSchema);

export interface CommentRepository {
  addComment(comment: Comment): Promise<Comment>;
  getCommentsByBookId(
    bookId: string,
  ): Promise<z.infer<typeof CommentListSchema>>;
}
