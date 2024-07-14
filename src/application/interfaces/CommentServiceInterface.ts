import { Comment } from "@domain/entities/Comment";

export interface CommentServiceInterface {
  getComments(bookId: string): Promise<Comment[]>;
  addComment(bookId: string, commentText: string): Promise<void>;
}
