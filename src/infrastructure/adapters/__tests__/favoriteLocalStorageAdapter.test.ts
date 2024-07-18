import { FavoriteLocalStorageAdapter } from "../favoriteLocalStorageAdapter";
import { Book } from "src/domain/entities/Book";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

jest.mock("src/domain/entities/Book", () => ({
  BookSchema: {
    array: () => ({
      parse: jest.fn((data) => data),
    }),
  },
}));

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
    jest.clearAllMocks();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  it("should get an empty array when no favorites are stored", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    const favorites = await adapter.getFavorites();
    expect(favorites).toEqual([]);
  });

  it("should add a favorite book", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    await adapter.addFavorite(testBook);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify([testBook]),
    );
  });

  it("should not add duplicate favorite books", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([testBook]));
    await adapter.addFavorite(testBook);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it("should remove a favorite book", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([testBook]));
    await adapter.removeFavorite(testBook.id);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify([]),
    );
  });

  it("should check if a book is a favorite", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([testBook]));
    const isFavorite = await adapter.isFavorite(testBook.id);
    expect(isFavorite).toBe(true);
  });

  it("should handle invalid data in localStorage", async () => {
    localStorageMock.getItem.mockReturnValue("invalid json");
    await expect(adapter.getFavorites()).rejects.toThrow();
  });

  it("should return false when checking if a non-existent book is a favorite", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([testBook]));
    const isFavorite = await adapter.isFavorite("non-existent-id");
    expect(isFavorite).toBe(false);
  });

  it("should not throw when removing a non-existent favorite", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([testBook]));
    await expect(
      adapter.removeFavorite("non-existent-id"),
    ).resolves.not.toThrow();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify([testBook]),
    );
  });
});
