import { CommentLocalStorageAdapter } from "@infrastructure/adapters/commentLocalStorageAdapter";
import { CommentRepositoryPort } from "@domain/ports/CommentRepositoryPort";

export const commentRepository: CommentRepositoryPort =
  new CommentLocalStorageAdapter();
