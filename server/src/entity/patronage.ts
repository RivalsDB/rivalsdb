export type PatronageType = "not_patron" | "kindred";

export function fromString(str: string): PatronageType {
  switch (str) {
    case "kindred":
      return str;
    default:
      return "not_patron";
  }
}
