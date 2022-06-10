type CardId = string;

type CardSet =
  | "Core"
  | "Blood & Alchemy"
  | "Promo"
  | "Wolf & Rat"
  | "Shadows & Shrouds";

type Agenda = {
  stack: "agenda";
  name: string;
  text: string;
  illustrator: string;
  set: CardSet;
};

const agendas: Record<CardId, Agenda> = {
  "sas-most-impressive": {
    name: "Most Impressive",
    text: "At the start of your turn, if your [blood-potency] in The Streets is higher than each individual foes' [blood-potency] in The Streets, gain 1 [agenda].\n\nIf you reach 13 [agenda], you win!",
    illustrator: "Mara Miranda Escota",
    set: "Shadows & Shrouds",
    stack: "agenda",
  },
  "sas-wake-the-dead": {
    name: "Wake the Dead",
    text: "**Exhaust:** If you control 1+ wraiths, gain 1 [agenda]. If you control 3+ [wraiths], gain 2 [agenda] instead.\n\nIf you reach 13 [agenda], you win!",
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    stack: "agenda",
  },
  "sas-death-is-only-the-beginning": {
    name: "Death is Only the Beginning",
    text: "**Exhaust:** If you have 1+ characters in torpor, gain 1 [agenda]. If you have 3+, gain 2 [agenda] instead. If you reach 13 [agenda], you win!",
    illustrator: "Irene Francisco",
    set: "Shadows & Shrouds",
    stack: "agenda",
  },
  "sas-prizefighter": {
    name: "Prizefighter",
    text: "As you attack a character, put 1 [agenda] on your attacker. At the end of your turn, put 1 [agenda] from a character in your coterie on your Agenda card. If you reach 13 [agenda], you win!",
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    stack: "agenda",
  },
  "core-base-of-power": {
    name: "Base of Power",
    text: "When a character in your coterie attaches a Title, gain 2 Agenda. If you reach 13 Agenda, you win!",
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
  },
  "core-drain-them-slowly": {
    name: "Drain Them Slowly",
    text: "When a character you attack takes 1+ non-Aggravated damage but is not defeated, gain 1 Agenda. If you reach 13 Agenda, you win!",
    illustrator: "Marco Primo",
    set: "Core",
    stack: "agenda",
  },
  "core-hunt-the-hunters": {
    name: "Hunt the Hunters",
    text: "The first time you defeat a Second Inquisition during each of your turns, gain 1 [prestige] and 1 [agenda], then shuffle it and any cards in the City Deck discard pile into the City Deck. If you reach 13 ]agenda], you win!",
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
  },
  "baa-knowledge-is-power": {
    name: "Knowledge is Power",
    text: "The first time your Leader exhausts in The Streets during each of your turns, if you have 6+ Library cards in your hand, gain 1 Agenda. If exactly 10 Library cards, gain 2 Agenda instead. If you reach 13 Agenda, you win!",
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    stack: "agenda",
  },
  "core-manipulate-the-masses": {
    name: "Manipulate the Masses",
    text: "WHen a Scheme you play suceeds, gain 1 Agenda. If you reach 13 Agenda, you win!",
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
  },
  "core-playthings": {
    name: "Playthings",
    text: "When a character in your coterie attaches a Citizen Retainer, gain 1 Agenda. If you reach 13 Agenda, you win!",
    illustrator: "Amy Wilkins",
    set: "Core",
    stack: "agenda",
  },
  "baa-recruitment-drive": {
    name: "Recruitment Drive",
    text: "When you recruit a character, gain 1 Agenda.",
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    stack: "agenda",
  },
  "baa-rites-of-the-blood": {
    name: "Rites of the Blood",
    text: "The first time you play a Ritual during each of your turns, gain 1 Agenda. If you put 3+ Blood on that Ritual, gain 2 Agenda instead. If you reach 13 Agenda, you win!",
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    stack: "agenda",
  },
  "baa-street-brew": {
    name: "Street Brew",
    text: "At the start of your turn, if you have a character with Alchemy in your coterie, gain 1 Agenda. If 3+ characters in your coterie have Alchemy, gain 2 Agenda instead. If you reach 13 Agenda, you win!.",
    illustrator: "",
    set: "Blood & Alchemy",
    stack: "agenda",
  },
  "core-strength-in-numbers": {
    name: "Strength in Numbers",
    text: "At the start of your turn, if you control 3 characters in The Streets, gain 1 Agenda. If you control 4+ characters each with 2+ Blood in The Streets, gain 2 Agenda instead. If you reach 13 agenda, you win!",
    illustrator: "Felipe Gaona",
    set: "Core",
    stack: "agenda",
  },
  "core-the-end-is-nigh": {
    name: "The End is Nigh",
    text: "The first time you resolve a Conspiracy during each of your turns, gain 1 Prestige and 2 Agenda. If you reach 13 Agenda, you win!",
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
  },
  "core-turf-war": {
    name: "Turf War",
    text: "When you defeat a non-Rival character, gain 1 Agenda. When you defeat a character with 5+ Blood, gain 1 Agenda. If you reach 13 agenda, you win!",
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
  },
  "war-animal-kingdom": {
    name: "Animal Kingdom",
    text: "At the start of your turn, gain 1 [agenda] if you control 1+ Animals. If you control 3+ different Animals, gain 2 [agenda] instead. If you reach 13 [agenda], you win!",
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
    stack: "agenda",
  },
  "war-call-of-the-wild": {
    name: "Call of the Wild",
    text: "When you attach an Animal to a character in your coterie in The Streets who has no Animals attached, gain 1 [agenda]. If you control 3+ different Animals, gain 2 [agenda] instead. If you reach 13 [agenda], you win!",
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
    stack: "agenda",
  },
  "war-hoard-the-herd": {
    name: "Hoard the Herd",
    text: "At the end of your turn, if there are no unattached City Deck Citizens or Vagrants in The Streets, gain 1 [agenda]. If there are no unattached City Deck Mortals, gain 2 [agenda] instead. If you reach 13 [agenda], you win!",
    illustrator: "Mara Miranda-Escota",
    set: "Wolf & Rat",
    stack: "agenda",
  },
  "war-invisible-army": {
    name: "Invisible Army",
    text: "When a character in your coterie attaches a Vagrant as a Retainer, gain 2 [agenda]. When you defeat a character with an attached Vagrant, gain 1 [agenda]. If you reach 13 [agenda], you win!",
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
    stack: "agenda",
  },
};

type Haven = {
  stack: "haven";
  name: string;
  text: string;
  illustrator: string;
  set: CardSet;
};
const havens: Record<CardId, Haven> = {
  "sas-mission-cemetery": {
    stack: "haven",
    name: "Mission Cemetery",
    text: text(`
    Characters in your Haven have +1 Secrecy.

    **Leader Ability**

    **Burn a Retainer in your coterie:** Create a wraith and attach it to a character in your coterie.
    `),
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
  },
  "sas-the-big-house": {
    stack: "haven",
    name: "The Big House",
    text: text(`
    _Start of Game - Put 1 [prestige] from each foe's general supply on this._

    Characters in your Haven ha Secrecy.

    **Leader Ability**

    Character in your coterie ha [blood-potency].

    **Give a foe 1 [prestige] of their color from this:** Diablerize a vampire in that foe's coterie that your Leader just defeated.
    `),
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
  },
  "sas-eternal-life-mortuary": {
    stack: "haven",
    name: "Eternal Life Mortuary",
    text: text(`
      Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      **Remove 2 [blood] from a character in your coterie (this may reduce them to 0):** Burn target unattached City Deck Vagrant or Citizen in The Streets.
    `),
    illustrator: "Marco Primo",
    set: "Shadows & Shrouds",
  },
  "sas-the-tenderloin": {
    stack: "haven",
    name: "The Tenderloin",
    text: text(`
      Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      **Remove 1 [agenda] from X different sources you control:** You pay X less [prestige] to recruit your next character this turn. (Add the remaining [blood] from the general supply.)
    `),
    illustrator: "Marco Primo",
    set: "Shadows & Shrouds",
  },
  "core-artist-lofts": {
    stack: "haven",
    name: "Artist Lofts",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      At the end of your turn, if your Leader is exhausted, you may draw 1 card, the discard 1 card.`
    ),
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-dragons-roost": {
    stack: "haven",
    name: "Dragon's Roost",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      If ready, you may move your Leader to The Streets to Block any attack and gain 1 [prestige].`
    ),
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-house-of-pain": {
    stack: "haven",
    name: "House of Pain",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Attacker - Discard 1 card: Your Leader deals +1 Damage to the target.`
    ),
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-old-post-office": {
    stack: "haven",
    name: "Old Post Office",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Once during each player's turn, you may place a card fro your hand with 1-3 Blood Potence as an Influence Modifier. When revealed, gain Influence equal to the card's Blood Potence value.`
    ),
    illustrator: "Cold Castle Studios",
    set: "Core",
  },
  "core-royal-retreat": {
    stack: "haven",
    name: "Royal Retreat",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Characters with a Title in your coterie have +1 Influence. Discard an unattached City Deck Mortal in The Streets: Add a new card to The Streets.`
    ),
    illustrator: "Cold Castle Studios",
    set: "Core",
  },
  "baa-the-chantry": {
    stack: "haven",
    name: "The Chantry",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      When your Leader plays a Ritual, gain 1 Unhosted Action.`
    ),
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
  },
  "core-the-dockyards": {
    stack: "haven",
    name: "The Dockyards",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Each time your Leader would take +1 Damage, you may discard 1 card to prevent 1 Damage.`
    ),
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-the-madhouse": {
    stack: "haven",
    name: "The Madhouse",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Discard 1 card: Add 1 [prestige] from the general supply to a face-down card you control.`
    ),
    illustrator: "Cold Castle Studios",
    set: "Core",
  },
  "core-the-penthouse": {
    stack: "haven",
    name: "The Penthouse",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      When a character in your coterie attaches a Retainer, that character mends 1 Blood.`
    ),
    illustrator: "The Creation Studio",
    set: "Core",
  },
  "baa-the-pit": {
    stack: "haven",
    name: "The Pit",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      The first time you recruit a character during each of your turns, gain 1 Action.`
    ),
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
  },
  "baa-thrift-store": {
    stack: "haven",
    name: "Thrift Store",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Your Library cards have -1 Blood Potence. When your Leader is defeated, put a '-1 Blood Potence' token on target character.`
    ),
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
  },
  "baa-university-library": {
    stack: "haven",
    name: "University Library",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Relentless, pay 1 Blood: Draw 1 card.`
    ),
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
  },
  "war-city-park": {
    stack: "haven",
    name: "City Park",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      When your Leader exhausts, reveal the top card of your Library. If it's an Animal, draw it. Otherwise, leave it or discard it.`
    ),
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
  },
  "war-the-outskirts": {
    stack: "haven",
    name: "The Outskirts",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Once during each of your turns, you may Discard an Animal: Mend 2 [blood] on any character in your coterie or in torpor.`
    ),
    illustrator: "Adelijah Ocampo",
    set: "Wolf & Rat",
  },
  "war-the-sewers": {
    stack: "haven",
    name: "The Sewers",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Your Leader may attack City Deck Mortals in The Streets without leaving your Haven.`
    ),
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
  },
  "war-the-shelter": {
    stack: "haven",
    name: "The Shelter",
    text: text(
      `Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Character in your coterie with 1+ Vagrants attached have +1 Secrecy in The Streets.`
    ),
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
  },
};

type Clan =
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

type Discipline =
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

type Faction = {
  stack: "faction";
  name: string;
  clan: Clan;
  bloodPotency: number;
  physical: number;
  social: number;
  mental: number;
  disciplines?: Discipline[];
  text: string;
  illustrator: string;
  set: CardSet;
};

const factions: Record<CardId, Faction> = {
  "baa-april-smith": {
    stack: "faction",
    name: "April Smith",
    clan: "thin-blood",
    text: text(
      `Party - Attackers with [thin-blood alchemy] in this party gain +1 [blood-potency] and [fortitude] this attack.

      **Pay 1 [prestige]:** Each 1 [blood-potency] character in your coterie has +1 [shield] this turn.
      `
    ),
    bloodPotency: 1,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
  },
  "baa-aurora-nix": {
    stack: "faction",
    name: "Aurora Nix",
    clan: "tremere",
    text: text(
      `Attacker - If this attack deals 1+ [damage] to the target, put a Fear token on the target.`
    ),
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    disciplines: ["auspex", "auspex"],
  },
  "sas-markus-kumnyama": {
    stack: "faction",
    clan: "lasombra",
    name: "Markus Kumnyama",
    text: text(
      `**Reach** _(May attack characters in The Streets from your Haven.)_

      As this character performs an Action, place 1 [agenda] from the general supply on them.`
    ),
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    illustrator: "Ana Horbunova",
    set: "Shadows & Shrouds",
    disciplines: ["dominate", "oblivion", "potence"],
  },
};

type LibraryCardType =
  | "1 per player"
  | "2 actions"
  | "action"
  | "animal"
  | "alchemy"
  | "attack"
  | "conspiracy"
  | "influence modifier"
  | "ongoing"
  | "reaction"
  | "ritual"
  | "scheme"
  | "special"
  | "title"
  | "unhosted action"
  | "unique";

type AttackType = "mental" | "physical" | "ranged" | "social";

type Library = {
  stack: "library";
  name: string;
  clan?: Clan;
  bloodPotencyRequirement?: number;
  damage?: number;
  shield?: number;
  types: LibraryCardType[];
  attack?: AttackType;
  reactions?: AttackType[];
  text: string;
  disciplines?: Discipline[];
  illustrator: string;
  set: CardSet;
};

const libraries: Record<CardId, Library> = {
  "sas-winning": {
    stack: "library",
    name: "Winning",
    types: ["action"],
    text: text(
      `Put 1 [agenda] from the general supply on each character in your coterie.`
    ),
    illustrator: "Marco Primo",
    set: "Shadows & Shrouds",
  },
  "core-seneschal": {
    stack: "library",
    name: "Seneschal",
    bloodPotencyRequirement: 5,
    types: ["action", "title", "unique"],
    text: text(
      `**Exert 5 Influence:** Attach to the acting character.

      **Action:** Target foe loses 1 [prestige]. If no one controls the Prince of the City, they lose 2 instead.`
    ),
    illustrator: "The Creation Studio",
    set: "Core",
  },
  "core-insanity-defense": {
    stack: "library",
    name: "Insanity Defense",
    clan: "malkavian",
    bloodPotencyRequirement: 0,
    shield: 2,
    types: ["reaction"],
    text: text(`Additional +1 [shield] against [mental] attacks.`),
    reactions: ["physical", "social", "mental"],
    illustrator: "The Creation Studio",
    set: "Core",
  },
  "war-cornered-rat": {
    stack: "library",
    name: "Cornered Rat",
    clan: "nosferatu",
    bloodPotencyRequirement: 3,
    damage: 0,
    types: ["attack", "reaction"],
    attack: "physical",
    reactions: ["physical", "mental"],
    text: text(
      `Attacker - Deal [damage] equal to this character's [blood] minus their current [blood].

      Reaction - Deal 1 [physical] [damage] to the attacker for every 2 [damage] they are dealing to you (prior to damage prevention).`
    ),
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
  } as Library,
};

function text(str: string): string {
  return str
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}
