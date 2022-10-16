export type CardId = string;

export type CityCardType =
  | "title"
  | "event"
  | "ongoing"
  | "mortal"
  | "antagonist"
  | "retainer"
  | "citizen"
  | "second inquisition";

export type LibraryCardType =
  | "1 per player"
  | "2 actions"
  | "action"
  | "animal"
  | "alchemy"
  | "attack"
  | "conspiracy"
  | "event"
  | "influence modifier"
  | "ongoing"
  | "reaction"
  | "ritual"
  | "scheme"
  | "special"
  | "title"
  | "trap"
  | "unhosted action"
  | "unique";

export type AttackType = "mental" | "physical" | "ranged" | "social";

export type CardSet =
  | "Core"
  | "Blood & Alchemy"
  | "Promo"
  | "Wolf & Rat"
  | "Shadows & Shrouds"
  | "Heart of Europe"
  | "Conclave 22"
  | "Dragon & Rogue";

export type Clan =
  | "brujah"
  | "gangrel"
  | "hecata"
  | "lasombra"
  | "malkavian"
  | "nosferatu"
  | "ravnos"
  | "thin-blood"
  | "toreador"
  | "tremere"
  | "tzimisce"
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
  | ""
  | "Adelijah Ocampo"
  | "Amy Wilkins"
  | "Ana Horbunova"
  | "Anastasiia Horbunova"
  | "Cold Castle Studios"
  | "Darko Stojanovic"
  | "Dawn Nique"
  | "Drew Tucker"
  | "Felipe Gaona"
  | "Harvey Bunda"
  | "Irene Francisco"
  | "János Orbán"
  | "Joshua Esmeralda"
  | "Joyce Maureira"
  | "Krasen Maximov"
  | "Mara Miranda-Escota"
  | "Marco Primo"
  | "The Creation Studio"
  | "Timothy Terrenal and Harvey Bunda"
  | "Timothy Terrenal";

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
