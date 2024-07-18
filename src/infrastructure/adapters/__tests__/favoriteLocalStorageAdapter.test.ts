import { FavoriteLocalStorageAdapter } from "../favoriteLocalStorageAdapter";
import { Book } from "@domain/entities/Book";
import { z } from "zod";

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("FavoriteLocalStorageAdapter", () => {
  let adapter: FavoriteLocalStorageAdapter;
  const testBook: Book = {
    id: "1",
    title: "Test Book",
    authors: ["Test Author"],
    thumbnail: "http://example.com/thumbnail.jpg",
    description: "A test book",
  };

  beforeEach(() => {
    adapter = new FavoriteLocalStorageAdapter();
    localStorageMock.clear();
  });

  it("should get an empty array when no favorites are stored", async () => {
    const favorites = await adapter.getFavorites();
    expect(favorites).toEqual([]);
  });

  it("should add a favorite book", async () => {
    await adapter.addFavorite(testBook);
    const favorites = await adapter.getFavorites();
    expect(favorites).toContainEqual(testBook);
  });

  it("should not add duplicate favorite books", async () => {
    await adapter.addFavorite(testBook);
    await adapter.addFavorite(testBook);
    const favorites = await adapter.getFavorites();
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual(testBook);
  });

  it("should remove a favorite book", async () => {
    await adapter.addFavorite(testBook);
    await adapter.removeFavorite(testBook.id);
    const favorites = await adapter.getFavorites();
    expect(favorites).toHaveLength(0);
  });

  it("should check if a book is a favorite", async () => {
    await adapter.addFavorite(testBook);
    const isFavorite = await adapter.isFavorite(testBook.id);
    expect(isFavorite).toBe(true);
  });

  it("should handle invalid data in localStorage", async () => {
    localStorageMock.setItem("favorites", "invalid json");
    await expect(adapter.getFavorites()).rejects.toThrow(z.ZodError);
  });
});
