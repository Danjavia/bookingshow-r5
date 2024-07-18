import { CommentRepositoryPort } from "@domain/ports/CommentRepositoryPort";
import { Comment, CommentSchema } from "@domain/entities/Comment";

export class CommentLocalStorageAdapter implements CommentRepositoryPort {
  private readonly COMMENTS_KEY = "comments";

  async getComments(bookId: string): Promise<Comment[]> {
    const commentsJson = localStorage.getItem(this.COMMENTS_KEY);
    if (!commentsJson) return [];
    const allComments = JSON.parse(commentsJson) ?? [];
    const bookComments =
      allComments && allComments[bookId]
        ? allComments[bookId].map((comment: Comment) => ({
            ...comment,
            createdAt: new Date(comment.createdAt),
          }))
        : [];
    return CommentSchema.array().parse(bookComments || []);
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
