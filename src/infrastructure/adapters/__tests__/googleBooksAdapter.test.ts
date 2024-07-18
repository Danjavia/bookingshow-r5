import { GoogleBooksAdapter } from "../googleBooksAdapter";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("src/domain/entities/Book", () => ({
  BookSchema: {
    parse: jest.fn((data) => data),
  },
}));

describe("GoogleBooksAdapter", () => {
  let adapter: GoogleBooksAdapter;

  beforeEach(() => {
    adapter = new GoogleBooksAdapter();
    jest.clearAllMocks();
  });

  describe("searchBooks", () => {
    it("should return an array of books", async () => {
      const mockResponse = {
        data: {
          items: [
            {
              id: "1",
              volumeInfo: {
                title: "Test Book",
                authors: ["Test Author"],
                description: "A test book",
                imageLinks: { thumbnail: "http://example.com/thumbnail.jpg" },
              },
            },
          ],
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await adapter.searchBooks("test query");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://www.googleapis.com/books/v1/volumes?q=test%20query",
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: "1",
        title: "Test Book",
        authors: ["Test Author"],
        description: "A test book",
        thumbnail: "http://example.com/thumbnail.jpg",
      });
    });

    it("should handle books without authors or thumbnail", async () => {
      const mockResponse = {
        data: {
          items: [
            {
              id: "1",
              volumeInfo: {
                title: "Test Book",
                description: "A test book",
              },
            },
          ],
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await adapter.searchBooks("test query");

      expect(result[0].authors).toEqual([]);
      expect(result[0].thumbnail).toBeUndefined();
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
      const mockResponse = {
        data: {
          id: "1",
          volumeInfo: {
            title: "Test Book",
            authors: ["Test Author"],
            description: "A test book",
            imageLinks: { thumbnail: "http://example.com/thumbnail.jpg" },
          },
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await adapter.getBookById("1");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://www.googleapis.com/books/v1/volumes/1",
      );
      expect(result).toEqual({
        id: "1",
        title: "Test Book",
        authors: ["Test Author"],
        description: "A test book",
        thumbnail: "http://example.com/thumbnail.jpg",
      });
    });

    it("should handle a book without authors or thumbnail", async () => {
      const mockResponse = {
        data: {
          id: "1",
          volumeInfo: {
            title: "Test Book",
            description: "A test book",
          },
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await adapter.getBookById("1");

      expect(result.authors).toEqual([]);
      expect(result.thumbnail).toBeUndefined();
    });

    it("should throw an error if the API request fails", async () => {
      mockedAxios.get.mockRejectedValue(new Error("API error"));

      await expect(adapter.getBookById("1")).rejects.toThrow("API error");
    });
  });
});
