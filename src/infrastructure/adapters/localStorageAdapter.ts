import { CommentRepositoryPort } from "@domain/ports/CommentRepositoryPort";
import { Comment, CommentSchema } from "@domain/entities/Comment";

export class LocalStorageAdapter implements CommentRepositoryPort {
  private readonly COMMENTS_KEY = "biblioteca_comments";

  async getComments(bookId: string): Promise<Comment[]> {
    const commentsJson = localStorage.getItem(this.COMMENTS_KEY);
    if (!commentsJson) return [];
    const allComments = JSON.parse(commentsJson);
    return CommentSchema.array().parse(allComments[bookId] || []);
  }

  async addComment(bookId: string, comment: Comment): Promise<void> {
    const commentsJson = localStorage.getItem(this.COMMENTS_KEY);
    const allComments = commentsJson ? JSON.parse(commentsJson) : {};
    if (!allComments[bookId]) {
      allComments[bookId] = [];
    }
    allComments[bookId].push(comment);
    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(allComments));
  }
}
