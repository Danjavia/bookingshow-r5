import { FavoriteRepositoryPort } from "@domain/ports/FavoriteRepositoryPort";
import { FavoriteLocalStorageAdapter } from "@infrastructure/adapters/favoriteLocalStorageAdapter";

export const favoriteRepository: FavoriteRepositoryPort =
  new FavoriteLocalStorageAdapter();
