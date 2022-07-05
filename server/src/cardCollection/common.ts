export type CardId = string;

export type CardSet =
  | "Core"
  | "Blood & Alchemy"
  | "Promo"
  | "Wolf & Rat"
  | "Shadows & Shrouds"
  | "Heart of Europe"
  | "Conclave 22";

export type Clan =
  | "brujah"
  | "gangrel"
  | "hecata"
  | "lasombra"
  | "malkavian"
  | "nosferatu"
  | "thin-blood"
  | "toreador"
  | "tremere"
  | "ventrue";

export type Discipline =
  | "animalism"
  | "auspex"
  | "blood sorcery"
  | "celerity"
  | "dominate"
  | "fortitude"
  | "obfuscate"
  | "oblivion"
  | "potence"
  | "presence"
  | "protean"
  | "thin-blood alchemy";

export type Illustrator =
  | "Adelijah Ocampo"
  | "Amy Wilkins"
  | "Anastasiia Horbunova"
  | "Darko Stojanovic"
  | "Harvey Bunda"
  | "Irene Francisco"
  | "János Orbán"
  | "Joshua Esmeralda"
  | "Mara Miranda Escota"
  | "Marco Primo"
  | "The Creation Studio";

export const md = (strings: TemplateStringsArray): string =>
  strings
    .map((str) =>
      str
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
    )
    .join("")
    .trim();
