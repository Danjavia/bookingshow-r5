import { Book } from "@domain/entities/Book";

export interface FavoriteRepositoryPort {
  getFavorites(): Promise<Book[]>;
  addFavorite(book: Book): Promise<void>;
  removeFavorite(bookId: string): Promise<void>;
  isFavorite(bookId: string): Promise<boolean>;
}
