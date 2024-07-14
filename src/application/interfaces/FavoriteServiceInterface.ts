import { Book } from "@domain/entities/Book";

export interface FavoriteServiceInterface {
  getFavorites(): Promise<Book[]>;
  addFavorite(book: Book): Promise<void>;
  removeFavorite(bookId: string): Promise<void>;
}
