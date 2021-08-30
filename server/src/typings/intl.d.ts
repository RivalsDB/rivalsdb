declare namespace Intl {
  class ListFormat {
    constructor(
      locales: string | string[],
      options?: Partial<
        | {
            localeMatcher: "lookup" | "best fit";
            style: "long";
            type: "conjunction" | "disjunction" | "unit";
          }
        | {
            localeMatcher: "lookup" | "best fit";
            style: "short" | "narrow";
            type: "unit";
          }
      >
    );
    public format: (items: string[]) => string;
  }
}
