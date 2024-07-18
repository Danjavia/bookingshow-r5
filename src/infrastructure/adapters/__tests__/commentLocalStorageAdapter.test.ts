import { CommentLocalStorageAdapter } from "../commentLocalStorageAdapter";
import { Comment } from "src/domain/entities/Comment";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

jest.mock("src/domain/entities/Comment", () => ({
  CommentSchema: {
    array: () => ({
      parse: jest.fn((data) => data),
    }),
  },
}));

describe("CommentLocalStorageAdapter", () => {
  let adapter: CommentLocalStorageAdapter;
  const testBookId = "book1";
  const testComment: Comment = {
    id: "1",
    bookId: testBookId,
    text: "Great book!",
    createdAt: new Date("2023-01-01T00:00:00.000Z"),
  };

  beforeEach(() => {
    adapter = new CommentLocalStorageAdapter();
    jest.clearAllMocks();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  it("should return an empty array when no comments are stored", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    const comments = await adapter.getComments(testBookId);
    expect(comments).toEqual([]);
  });

  it("should add a comment and retrieve it", async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({ [testBookId]: [testComment] }),
    );
    const comments = await adapter.getComments(testBookId);
    expect(comments).toHaveLength(1);
    expect(comments[0]).toEqual(testComment);
  });

  it("should handle multiple comments for the same book", async () => {
    const comment1 = { ...testComment, id: "1" };
    const comment2 = { ...testComment, id: "2", text: "Awesome read!" };
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({ [testBookId]: [comment1, comment2] }),
    );

    const comments = await adapter.getComments(testBookId);
    expect(comments).toHaveLength(2);
    expect(comments).toContainEqual(comment1);
    expect(comments).toContainEqual(comment2);
  });

  it("should handle comments for different books", async () => {
    const book1Comment = { ...testComment, bookId: "book1" };
    const book2Comment = { ...testComment, bookId: "book2" };
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({
        book1: [book1Comment],
        book2: [book2Comment],
      }),
    );

    const book1Comments = await adapter.getComments("book1");
    const book2Comments = await adapter.getComments("book2");

    expect(book1Comments).toHaveLength(1);
    expect(book1Comments[0]).toEqual(book1Comment);
    expect(book2Comments).toHaveLength(1);
    expect(book2Comments[0]).toEqual(book2Comment);
  });

  it("should parse dates correctly when retrieving comments", async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({ [testBookId]: [testComment] }),
    );
    const comments = await adapter.getComments(testBookId);
    expect(comments[0].createdAt).toBeInstanceOf(Date);
    expect(comments[0].createdAt.toISOString()).toBe(
      testComment.createdAt.toISOString(),
    );
  });

  it("should add a new comment", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    await adapter.addComment(testBookId, testComment);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "comments",
      JSON.stringify({ [testBookId]: [testComment] }),
    );
  });

  it("should handle invalid data in localStorage", async () => {
    localStorageMock.getItem.mockReturnValue("invalid json");
    await expect(adapter.getComments(testBookId)).rejects.toThrow();
  });
});
