import { FavoriteRepositoryPort } from "@domain/ports/FavoriteRepositoryPort";
import { Book, BookSchema } from "@domain/entities/Book";

export class FavoriteLocalStorageAdapter implements FavoriteRepositoryPort {
  private readonly FAVORITES_KEY = "favorites";

  async getFavorites(): Promise<Book[]> {
    const favoritesJson = localStorage.getItem(this.FAVORITES_KEY);
    if (!favoritesJson) return [];
    return BookSchema.array().parse(JSON.parse(favoritesJson));
  }

  async addFavorite(book: Book): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.some((fav) => fav.id === book.id)) {
      favorites.push(book);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  async removeFavorite(bookId: string): Promise<void> {
    const favorites = await this.getFavorites();
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updatedFavorites));
  }

  async isFavorite(bookId: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some((book) => book.id === bookId);
  }
}
