import { OpenLibraryAdapter } from "../openLibraryAdapter";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("src/domain/entities/Book", () => ({
  BookSchema: {
    parse: jest.fn((data) => data),
  },
}));

describe("OpenLibraryAdapter", () => {
  let adapter: OpenLibraryAdapter;

  beforeEach(() => {
    adapter = new OpenLibraryAdapter();
    jest.clearAllMocks();
  });

  describe("searchBooks", () => {
    it("should return an array of books", async () => {
      const mockResponse = {
        data: {
          docs: [
            {
              key: "/works/OL1234W",
              title: "Test Book",
              author_name: ["Test Author"],
              cover_i: 1234,
              first_sentence: ["This is a test book."],
            },
          ],
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await adapter.searchBooks("test query");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://openlibrary.org/search.json?q=test%20query",
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: "OL1234W",
        title: "Test Book",
        authors: ["Test Author"],
        thumbnail: "https://covers.openlibrary.org/b/id/1234-M.jpg",
        description: "This is a test book.",
      });
    });

    it("should handle books without cover or first sentence", async () => {
      const mockResponse = {
        data: {
          docs: [
            {
              key: "/works/OL1234W",
              title: "Test Book",
              author_name: ["Test Author"],
            },
          ],
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await adapter.searchBooks("test query");

      expect(result[0].thumbnail).toBeUndefined();
      expect(result[0].description).toBeUndefined();
    });

    it("should throw an error if the API request fails", async () => {
      mockedAxios.get.mockRejectedValue(new Error("API error"));

      await expect(adapter.searchBooks("test query")).rejects.toThrow(
        "API error",
      );
    });
  });

  describe("getBookById", () => {
    it("should return a book by id", async () => {
      const mockBookResponse = {
        data: {
          key: "/works/OL1234W",
          title: "Test Book",
          authors: [{ author: { key: "/authors/OL1A" } }],
          covers: [1234],
        },
      };
      const mockAuthorResponse = {
        data: { name: "Test Author" },
      };
      const mockDescriptionResponse = {
        data: { description: { value: "This is a test book." } },
      };

      mockedAxios.get
        .mockResolvedValueOnce(mockBookResponse)
        .mockResolvedValueOnce(mockAuthorResponse)
        .mockResolvedValueOnce(mockDescriptionResponse);

      const result = await adapter.getBookById("OL1234W");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://openlibrary.org/works/OL1234W.json",
      );
      expect(result).toEqual({
        id: "OL1234W",
        title: "Test Book",
        authors: ["Test Author"],
        thumbnail: "https://covers.openlibrary.org/b/id/1234-L.jpg",
        description: "This is a test book.",
      });
    });

    it("should handle a book without authors, cover, or description", async () => {
      const mockBookResponse = {
        data: {
          key: "/works/OL1234W",
          title: "Test Book",
        },
      };
      mockedAxios.get.mockResolvedValue(mockBookResponse);

      const result = await adapter.getBookById("OL1234W");

      expect(result.authors).toEqual(["Unknown Author"]);
      expect(result.thumbnail).toBe(
        "https://placehold.co/420x600?text=E-book\\nSample",
      );
      expect(result.description).toBe("No description available");
    });

    it("should throw an error if the API request fails", async () => {
      mockedAxios.get.mockRejectedValue(new Error("API error"));

      await expect(adapter.getBookById("OL1234W")).rejects.toThrow("API error");
    });
  });
});
