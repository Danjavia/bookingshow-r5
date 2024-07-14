import { CommentService } from "@application/services/CommentService";

export const addCommentUseCase =
  (commentService: CommentService) =>
  async (bookId: string, commentText: string): Promise<void> => {
    try {
      await commentService.addComment(bookId, commentText);
    } catch (error) {
      console.error("Error in addCommentUseCase:", error);
      throw error;
    }
  };
