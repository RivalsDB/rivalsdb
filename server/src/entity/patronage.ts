export const enum PatronageType {
  NOT_PATRON,
  KINDRED,
}

export function fromString(str: string): PatronageType {
  switch (str) {
    case "kindred":
      return PatronageType.KINDRED;
    default:
      return PatronageType.NOT_PATRON;
  }
}

export function toString(patronage: PatronageType): "not_patron" | "kindred" {
  switch (patronage) {
    case PatronageType.KINDRED:
      return "kindred";
    default:
      return "not_patron";
  }
}
