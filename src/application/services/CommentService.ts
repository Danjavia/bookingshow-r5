import { CommentRepositoryPort } from "@domain/ports/CommentRepositoryPort";
import { Comment, CommentSchema } from "@domain/entities/Comment";

export class CommentService {
  constructor(private commentRepository: CommentRepositoryPort) {}

  async getComments(bookId: string): Promise<Comment[]> {
    return this.commentRepository.getComments(bookId);
  }

  async addComment(bookId: string, commentText: string): Promise<void> {
    const newComment = CommentSchema.parse({
      id: Date.now().toString(),
      bookId,
      text: commentText,
      createdAt: new Date(),
    });
    await this.commentRepository.addComment(bookId, newComment);
  }
}
