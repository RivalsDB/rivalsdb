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
  | "alchemy"
  | "animal"
  | "attack"
  | "conspiracy"
  | "event"
  | "form"
  | "gift"
  | "ghoul"
  | "influence modifier"
  | "ongoing"
  | "reaction"
  | "relic"
  | "rite"
  | "ritual"
  | "scheme"
  | "special"
  | "title"
  | "trap"
  | "unhosted action"
  | "unique"
  | "vehicle";

export type AttackType = "mental" | "physical" | "ranged" | "social";

export type CardSet =
  | "Core"
  | "Blood & Alchemy"
  | "Promo"
  | "Wolf & Rat"
  | "Shadows & Shrouds"
  | "Heart of Europe"
  | "Conclave 22"
  | "Dragon & Rogue"
  | "Justice & Mercy"
  | "Hunters & Hunted"
  | "Prince Pack 1"
  | "Martial Law"
  | "Fang & Talon";

export type Clan =
  | "banu haqim"
  | "brujah"
  | "caitiff"
  | "faithful"
  | "gangrel"
  | "hecata"
  | "inquisitive"
  | "lasombra"
  | "malkavian"
  | "martial"
  | "ministry"
  | "nosferatu"
  | "ravnos"
  | "salubri"
  | "thin-blood"
  | "toreador"
  | "tremere"
  | "tzimisce"
  | "ventrue"
  | "martial"
  | "red talons"
  | "silverfangs";

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
  | "thin-blood alchemy"
  | "beast whisperer"
  | "library"
  | "sense the unnatural"
  | "repel the unnatural"
  | "thwart the unnatural"
  | "global"
  | "drone jockey"
  | "arsenal"
  | "fleet"
  | "ordnance"
  | "ahroun"
  | "galliard"
  | "philodox"
  | "ragabash"
  | "theurge";

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
  | "Elif Aydin"
  | "Felipe Gaona"
  | "Harvey Bunda"
  | "Irene Francisco"
  | "János Orbán"
  | "Joshua Esmeralda"
  | "Joyce Maureira"
  | "Krasen Maximov"
  | "Mara Miranda-Escota"
  | "Mara Miranda"
  | "Marco Primo"
  | "Mico Dimagiba"
  | "Nevzat Aydin"
  | "Patsy Lascano"
  | "The Creation Studio"
  | "Timothy Terrenal and Harvey Bunda"
  | "Timothy Terrenal";

export type Cardpool =
  | "hunter"
  | "vampire"
  | "hunter and vampire"
  | "hunter and werewolf"
  | "werewolf";

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
