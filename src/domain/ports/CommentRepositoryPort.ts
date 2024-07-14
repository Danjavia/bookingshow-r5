import { Comment } from "@domain/entities/Comment";

export interface CommentRepositoryPort {
  getComments(bookId: string): Promise<Comment[]>;
  addComment(bookId: string, comment: Comment): Promise<void>;
}
