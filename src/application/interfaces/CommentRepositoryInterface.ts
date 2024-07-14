import { Comment } from "@domain/entities/Comment";

export interface CommentRepositoryInterface {
  getComments(bookId: string): Promise<Comment[]>;
  addComment(bookId: string, comment: Comment): Promise<void>;
}
