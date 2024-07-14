export class ISBN {
  constructor(private readonly value: string) {
    if (!ISBN.isValid(value)) {
      throw new Error("Invalid ISBN");
    }
  }

  static isValid(isbn: string): boolean {
    const cleanedISBN = isbn.replace(/[-\s]/g, "");
    return /^(\d{10}|\d{13})$/.test(cleanedISBN);
  }

  toString(): string {
    return this.value;
  }
}
