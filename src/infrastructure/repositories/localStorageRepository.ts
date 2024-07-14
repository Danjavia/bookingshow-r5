import { LocalStorageAdapter } from "@infrastructure/adapters/localStorageAdapter";
import { CommentRepositoryPort } from "@domain/ports/CommentRepositoryPort";

export const commentRepository: CommentRepositoryPort =
  new LocalStorageAdapter();
