import { Book, BookSchema } from "@domain/entities/Book";

export const addToFavoritesUseCase = (
  favorites: Book[],
  newFavorite: Book,
): Book[] => {
  const validatedNewFavorite = BookSchema.parse(newFavorite);
  const existingFavorite = favorites.find(
    (book) => book.id === validatedNewFavorite.id,
  );

  if (existingFavorite) {
    return favorites; // Book is already in favorites
  }

  return [...favorites, validatedNewFavorite];
};
