import { FavoriteServiceInterface } from "@application/interfaces/FavoriteServiceInterface";
import { FavoriteRepositoryInterface } from "@application/interfaces/FavoriteRepositoryInterface";
import { Book } from "@domain/entities/Book";

export class FavoriteService implements FavoriteServiceInterface {
  constructor(private favoriteRepository: FavoriteRepositoryInterface) {}

  async getFavorites(): Promise<Book[]> {
    return this.favoriteRepository.getFavorites();
  }

  async addFavorite(book: Book): Promise<void> {
    await this.favoriteRepository.addFavorite(book);
  }

  async removeFavorite(bookId: string): Promise<void> {
    await this.favoriteRepository.removeFavorite(bookId);
  }
}
