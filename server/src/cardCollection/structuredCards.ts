const md = (strings: TemplateStringsArray): string =>
  strings
    .map((str) =>
      str
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
    )
    .join("")
    .trim();

type CardId = string;

type CardSet =
  | "Core"
  | "Blood & Alchemy"
  | "Promo"
  | "Wolf & Rat"
  | "Shadows & Shrouds"
  | "Heart of Europe";

export type Agenda = {
  stack: "agenda";
  name: string;
  text: string;
  illustrator: string;
  set: CardSet;
};

export const agendas: Record<CardId, Agenda> = {
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
  "hoe-disheveled-shelves": {
    name: "Disheveled Shelves",
    text: "If your Rival's Library has no cards in it, you win the game. If you would cause a foe to discard cards, you may have that foe draw that many cards instead.",
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    stack: "agenda",
  },
  "hoe-full-of-surprises": {
    name: "Full of Surprises",
    text: "The first time you resolve a Trap during each player's turn, gain 1 [prestige] or 1 [agenda]. If you reach 13 [agenda], you win!",
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    stack: "agenda",
  },
};

export type Haven = {
  stack: "haven";
  name: string;
  text: string;
  illustrator: string;
  set: CardSet;
};
export const havens: Record<CardId, Haven> = {
  "sas-mission-cemetery": {
    stack: "haven",
    name: "Mission Cemetery",
    text: md`
      Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      **Burn a Retainer in your coterie:** Create a wraith and attach it to a character in your coterie.
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
  },
  "sas-the-big-house": {
    stack: "haven",
    name: "The Big House",
    text: md`
      _Start of Game - Put 1 [prestige] from each foe's general supply on this._

      Characters in your Haven ha Secrecy.

      **Leader Ability**

      Character in your coterie ha [blood-potency].

      **Give a foe 1 [prestige] of their color from this:** Diablerize a vampire in that foe's coterie that your Leader just defeated.
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
  },
  "sas-eternal-life-mortuary": {
    stack: "haven",
    name: "Eternal Life Mortuary",
    text: md`
      Characters in your Haven have +1 Secrecy.

           **Leader Ability**

           **Remove 2 [blood] from a character in your coterie (this may reduce them to 0):** Burn target unattached City Deck Vagrant or Citizen in The Streets.
    `,
    illustrator: "Marco Primo",
    set: "Shadows & Shrouds",
  },
  "sas-the-tenderloin": {
    stack: "haven",
    name: "The Tenderloin",
    text: md`
      Characters in your Haven have +1 Secrecy.

           **Leader Ability**

           **Remove 1 [agenda] from X different sources you control:** You pay X less [prestige] to recruit your next character this turn. (Add the remaining [blood] from the general supply.)
    `,
    illustrator: "Marco Primo",
    set: "Shadows & Shrouds",
  },
  "core-artist-lofts": {
    stack: "haven",
    name: "Artist Lofts",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      At the end of your turn, if your Leader is exhausted, you may draw 1 card, the discard 1 card.
    `,
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-dragons-roost": {
    stack: "haven",
    name: "Dragon's Roost",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      If ready, you may move your Leader to The Streets to Block any attack and gain 1 [prestige].
    `,
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-house-of-pain": {
    stack: "haven",
    name: "House of Pain",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Attacker - Discard 1 card: Your Leader deals +1 Damage to the target.
    `,
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-old-post-office": {
    stack: "haven",
    name: "Old Post Office",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Once during each player's turn, you may place a card fro your hand with 1-3 Blood Potence as an Influence Modifier. When revealed, gain Influence equal to the card's Blood Potence value.
    `,
    illustrator: "Cold Castle Studios",
    set: "Core",
  },
  "core-royal-retreat": {
    stack: "haven",
    name: "Royal Retreat",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Characters with a Title in your coterie have +1 Influence. Discard an unattached City Deck Mortal in The Streets: Add a new card to The Streets.
    `,
    illustrator: "Cold Castle Studios",
    set: "Core",
  },
  "baa-the-chantry": {
    stack: "haven",
    name: "The Chantry",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      When your Leader plays a Ritual, gain 1 Unhosted Action.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
  },
  "core-the-dockyards": {
    stack: "haven",
    name: "The Dockyards",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Each time your Leader would take +1 Damage, you may discard 1 card to prevent 1 Damage.
    `,
    illustrator: "Felipe Gaona",
    set: "Core",
  },
  "core-the-madhouse": {
    stack: "haven",
    name: "The Madhouse",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Discard 1 card: Add 1 [prestige] from the general supply to a face-down card you control.
    `,
    illustrator: "Cold Castle Studios",
    set: "Core",
  },
  "core-the-penthouse": {
    stack: "haven",
    name: "The Penthouse",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      When a character in your coterie attaches a Retainer, that character mends 1 Blood.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
  },
  "baa-the-pit": {
    stack: "haven",
    name: "The Pit",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      The first time you recruit a character during each of your turns, gain 1 Action.
    `,
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
  },
  "baa-thrift-store": {
    stack: "haven",
    name: "Thrift Store",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Your Library cards have -1 Blood Potence. When your Leader is defeated, put a '-1 Blood Potence' token on target character.
    `,
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
  },
  "baa-university-library": {
    stack: "haven",
    name: "University Library",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Relentless, pay 1 Blood: Draw 1 card.
    `,
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
  },
  "war-city-park": {
    stack: "haven",
    name: "City Park",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      When your Leader exhausts, reveal the top card of your Library. If it's an Animal, draw it. Otherwise, leave it or discard it.
    `,
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
  },
  "war-the-outskirts": {
    stack: "haven",
    name: "The Outskirts",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Once during each of your turns, you may Discard an Animal: Mend 2 [blood] on any character in your coterie or in torpor.
    `,
    illustrator: "Adelijah Ocampo",
    set: "Wolf & Rat",
  },
  "war-the-sewers": {
    stack: "haven",
    name: "The Sewers",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Your Leader may attack City Deck Mortals in The Streets without leaving your Haven.
    `,
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
  },
  "war-the-shelter": {
    stack: "haven",
    name: "The Shelter",
    text: md`
Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Character in your coterie with 1+ Vagrants attached have +1 Secrecy in The Streets.
    `,
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
  },
  "hoe-old-rail-station": {
    stack: "haven",
    name: "Old Rail Station",
    text: md`
      Characters in your Haven have +1 Secrecy.

      **Leader Ability**

      Characters attacking your coterie deal -1 [damage] for each '-1 [Blood Potency]' token on them.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-guard-tower": {
    stack: "haven",
    name: "The Guard Tower",
    text: md`
      Guards in your coterie have +1 [Shield] while Blocking.

      **Leader Ability**

      Guards in your coterie deal +1 [damage] to Blockers. At the end of your turn, ready 1 character in your coterie.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
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

export type Faction = {
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

export const factions: Record<CardId, Faction> = {
  "hoe-aleister": {
    stack: "faction",
    clan: "tremere",
    name: "Aleister",
    text: md`
Attacker - **Discard 2 cards:** This attack deals +4 **Superficial** [Damage] to the target. (This attack cannot reduce the target's [blood] below 1.)
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["auspex", "blood sorcery"],
  },
  "hoe-anjali-the-samedi": {
    stack: "faction",
    clan: "hecata",
    name: "Anjali the Samedi",
    text: md`
Torpor - Attach the top card of target player's Library face down to a character in their coterie with 2 or fewer attachments. If this is its first attachment, draw 1 card.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["auspex"],
  },
  "hoe-borek-wagner": {
    stack: "faction",
    clan: "ventrue",
    name: "Borek Wagner",
    text: md`
At the start of your first turn of the game, reveal 2 different Havens from your collection. Your Rival chooses 1 and you attach that Haven to this character, who gains the Leader Ability of that Haven.
    `,
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["dominate", "fortitude", "presence"],
  },
  "hoe-camila": {
    stack: "faction",
    clan: "lasombra",
    name: "Camila",
    text: md`
Attacker - Put a "No Influence" token on the target.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["oblivion"],
  },
  "hoe-dien": {
    stack: "faction",
    clan: "gangrel",
    name: "Dien",
    text: md`
Solo Attacker - Play up to 2 Attack cards. Before revealing, if you played 2 cards, return 1 of them to your hand; If you played 1 card, you may reveal it or return it to your hand.
    `,
    bloodPotency: 6,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["animalism", "fortitude", "protean"],
  },
  "hoe-ekene": {
    stack: "faction",
    clan: "gangrel",
    name: "Ekene",
    text: md`
Solo Attacker - This character does not declare their attack type until Step 8 of the attack sequence.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["protean"],
  },
  "hoe-em": {
    stack: "faction",
    clan: "ventrue",
    name: "Em",
    text: md`
At the start of your turn, if you control +2 Havens, gain 1 [prestige]. If you control +3 Havens, also gain 1 [agenda].
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Amy Wilkins",
    set: "Heart of Europe",
    disciplines: ["fortitude", "presence"],
  },
  "hoe-emil-hruza": {
    stack: "faction",
    clan: "toreador",
    name: "Emil Hruza",
    text: md`
You may ignore City Deck Events. When this character defeats a Mortal or character, you may shuffle 1 Event from the City Deck burned pile into the City Deck. When that Event leaves play, remove it from the game.
    `,
    bloodPotency: 7,
    physical: 0,
    social: 2,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["celerity", "dominate", "presence"],
  },
  "hoe-jan-zoubek": {
    stack: "faction",
    clan: "thin-blood",
    name: "Jan Zoubek",
    text: md`
The first time a 1 [blood potency] or 2 [blood potency] character in your coterie enters torpor during each player's turn, foes gain no [agenda] for defeating them.
    `,
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["thin-blood alchemy"],
  },
  "hoe-kiril": {
    stack: "faction",
    clan: "brujah",
    name: "Kiril",
    text: md`
Attacker - This character has +3 Influence this turn.
    `,
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["celerity", "potence", "presence"],
  },
  "hoe-maia": {
    stack: "faction",
    clan: "toreador",
    name: "Maia",
    text: md`
Attacker - This attack deals +1 [damage] to the target for each Event in play.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Amy Wilkins",
    set: "Heart of Europe",
    disciplines: ["auspex", "presence"],
  },
  "hoe-monika": {
    stack: "faction",
    clan: "thin-blood",
    name: "Monika",
    text: md`
**Exhaust 1 character in this party:** Put a '-1 [blood potency]' token on target character in The Streets who does not have one.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["thin-blood alchemy"],
  },
  "hoe-omnis": {
    stack: "faction",
    clan: "nosferatu",
    name: "Omnis",
    text: md`
When you resolve a Trap with 2+ [prestige] on it, return that card to your hand.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Amy Wilkins",
    set: "Heart of Europe",
    disciplines: ["obfuscate", "potence"],
  },
  "hoe-perseus": {
    stack: "faction",
    clan: "malkavian",
    name: "Perseus",
    text: md`
Attacker - If this attack deals 1+ [damage] to the target, the target's controller discards 1 card for every 4 cards they have in their hand.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
    disciplines: ["auspex", "obfuscate"],
  },
  "hoe-rene-koba": {
    stack: "faction",
    clan: "malkavian",
    name: "René Koba",
    text: md`
When you play a card face down outside of an attack, mend 1 [blood] on a character in your coterie.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
    disciplines: ["auspex"],
  },
  "hoe-roman-monstrum": {
    stack: "faction",
    clan: "hecata",
    name: "Roman Monstrum",
    text: md`
**Reach** _(May attack characters in The Streets from your Haven.)_

**Detach 1 Curse from target character and choose one:** Put a Fear token on the target **OR** the target loses 1 [blood].
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["auspex", "oblivion"],
  },
  "hoe-sarka": {
    stack: "faction",
    clan: "brujah",
    name: "Sarka",
    text: md`
**Guard** _(This character may Block [ranged] attacks.)_

Party - When a character in this party Blocks an attack, they steal 1 [blood] from the attack.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["celerity", "celerity"],
  },
  "hoe-sebastian": {
    stack: "faction",
    clan: "lasombra",
    name: "Sebastian",
    text: md`
Attaching a Title from your hand to this character costs 0 Influence, then ready this character.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 1,
    mental: 2,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["oblivion", "oblivion", "presence"],
  },
  "hoe-thora": {
    stack: "faction",
    clan: "nosferatu",
    name: "Thora",
    text: md`
Attaching a Title from your hand to this character costs 0 Influence, then ready this character.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["animalism", "obfuscate"],
  },
  "hoe-zuzana": {
    stack: "faction",
    clan: "tremere",
    name: "Zuzana",
    text: md`
**Guard**
This character can Block [ranged] attacks.

When this character Blocks an attack, replace 1 [blood] on the attacker with one of your color from the general supply.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["blood sorcery", "dominate"],
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

type AttackType = "mental" | "physical" | "ranged" | "social";

export type Library = {
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

export const libraries: Record<CardId, Library> = {
  "hoe-bad-optics": {
    stack: "library",
    name: "Bad Optics",
    types: ["influence modifier"],
    text: md`
Gain 2 Influence during this action or event. If this is a Scheme and your side loses, put a Fear token on a target character with a 'No Influence' token and exhaust them.
    `,
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-bank-error-in-your-favor": {
    stack: "library",
    name: "Bank Error In Your Favor",
    clan: "malkavian",
    types: ["action", "conspiracy"],
    text: md`
      **Play this card face down and place 1 [prestige] on it.**

           If this card has 2+ [prestige] on it, you may resolve it during your turn. Target foe who did not contribute draws 3 cards.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-blood-poisoning": {
    stack: "library",
    name: "Blood Poisoning",
    clan: "tremere",
    types: ["action", "trap"],
    text: md`
      **Play this card face down and place 1 [prestige] on it.**

      Resolve at any time.

      [obfuscate] Target foe's character that attached a Retainer this turn loses 1 [blood] for each [prestige] on this card.
    `,
    disciplines: ["obfuscate"],
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-blood-transfusion": {
    stack: "library",
    name: "Blood Transfusion",
    clan: "tremere",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - When a character in your coterie attacks a character and does not defeat them, replace 1 [blood] on the target with one of your color from the general supply.
    `,
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-bread-and-circuses": {
    stack: "library",
    name: "Bread and Circuses",
    types: ["action", "scheme"],
    text: md`
      Influence Conflict - Should I give each player a Reward?

           If this succeeds, choose 1 **different** Reward for each player - Draw 1 card, gain 1 [prestige], gain 1 [agenda], or they mend 2 [blood] on 1 character they control.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-cover-charge": {
    stack: "library",
    name: "Cover Charge",
    clan: "toreador",
    types: ["action", "event", "ongoing"],
    text: md`
Play this into The Streets and place 1 [prestige] of your color from the general supply on it. It is now considered a City Deck Event.

Ongoing - For a foe to attack a character with [presence], that foe must first give you 1 [prestige].
    `,
    disciplines: ["presence"],
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-entrancement": {
    stack: "library",
    name: "Entrancement",
    bloodPotencyRequirement: 4,
    damage: 1,
    types: ["attack"],
    attack: "social",
    text: md`
[presence] This target's [social] attribute does not reduce the damage from this attack.
    `,
    disciplines: ["presence"],
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-fortify-the-inner-facade": {
    stack: "library",
    name: "Fortify the Inner Facade",
    bloodPotencyRequirement: 3,
    shield: 1,
    types: ["reaction"],
    reactions: ["social", "mental"],
    text: md`
Play this card face up.

    If your foe's Attack would cause you to lose or spend [prestige], gain 3 [prestige] first.
    [fortitude] If not, +1 [shield].
    `,
    disciplines: ["fortitude"],
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
  },
  "hoe-fourth-tradition-the-accounting": {
    stack: "library",
    name: "Fourth Tradition: The Accounting",
    types: ["action"],
    text: md`
Attach to target Leader with 2 or fewer attachments.

    When another character in this Leader's coterie makes an attack or uses an activated ability, this character loses 1 [blood].
    `,
    illustrator: "Mara Miranda Escota",
    set: "Heart of Europe",
  },
  "hoe-hidden-stash": {
    stack: "library",
    name: "Hidden Stash",
    clan: "thin-blood",
    types: ["action", "ongoing"],
    text: md`
Add 4 [prestige] from the general supply to this card.

    Ongoing - You may spend [prestige] on this to pay for activated abilities on characters in your coterie.
    `,
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-lone-wolf": {
    stack: "library",
    name: "Lone Wolf",
    clan: "gangrel",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - During other players' turns, your characters who are alone in a party have +1 [shield].

    Your characters have: Solo Attacker - The target has -1 [shield] during this attack.
    `,
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
  "hoe-off-limits": {
    stack: "library",
    name: "Off Limits",
    clan: "nosferatu",
    types: ["action", "trap"],
    text: md`
**Play this card face down and place 1 [prestige] on it.**

    Resolve at any time.

    Target defender in The Streets has +2 [shield] during this attack for each [prestige] on this.
    `,
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-property-developer": {
    stack: "library",
    name: "Property Developer",
    clan: "ventrue",
    types: ["action"],
    text: md`
**Pay 1 [prestige].**

    Attach 1 Haven from your collection to your Leader. They have the Leader Abilities of that Haven.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-prosperity": {
    stack: "library",
    name: "Prosperity",
    types: ["action", "scheme"],
    text: md`
Influence Conflict - Should each player draw 4 cards?
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-psychic-assault": {
    stack: "library",
    name: "Psychic Assault",
    bloodPotencyRequirement: 5,
    types: ["attack"],
    attack: "mental",
    text: md`
Play this card face up. This attack cannot be Blocked.

    [auspex] **Reveal the top card of any player's Library:** +X [damage] equal to the [bloodPotencyRequirement] of that card.
    `,
    disciplines: ["auspex"],
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-rapid-reflexes": {
    stack: "library",
    name: "Rapid Reflexes",
    bloodPotencyRequirement: 5,
    types: ["attack"],
    attack: "mental",
    shield: 0,
    text: md`
Retarget this attack to any other character in the defending party.

    The new defender has +1 [shield] for each [celerity] they have.
    `,
    disciplines: ["celerity"],
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-royal-bling": {
    stack: "library",
    name: "Royal Bling",
    clan: "lasombra",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - At the start of your turn, add 1 [agenda] from the general supply to each Titled character in your coterie.
    `,
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
  "hoe-spiders": {
    stack: "library",
    name: "Spiders",
    types: ["action", "trap"],
    text: md`
**Play this card face down and place 1 [prestige] on it.**

    Resolve at any time.

    [animalism] Put a Fear token on target foe's character that made an attack this turn.
    `,
    disciplines: ["animalism"],
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
  "hoe-title-fight": {
    stack: "library",
    name: "Title Fight",
    bloodPotencyRequirement: 3,
    types: ["attack"],
    attack: "physical",
    text: md`
**Superficial**

    +[damage] equal to the [bloodPotencyRequirement] of a Title attached to the attacker (Prince counts as 7). (This attack cannot reduce the target's [blood] below 1.)
    `,
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-voter-suppression": {
    stack: "library",
    name: "Voter Suppression",
    clan: "brujah",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - When a character exerts Influence against a Scheme you play, that character loses 1 [blood].

    **Exhaust:** Target character in your coterie has +1 Influence during this action or event.
    `,
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-wake-with-evenings-freshness": {
    stack: "library",
    name: "Wake With Evening's Freshness",
    types: ["2 actions", "ritual", "ongoing"],
    text: md`
[blood sorcery] **Place 1 to 3 [blood] of your color on this card.**

    Ongoing, **Relentless** - **Remove 1 [blood] from this:** Move a ready character in your coterie to The Streets to Block a non-[ranged] attack against any target.
    `,
    illustrator: "Mara Miranda Escota",
    set: "Heart of Europe",
  },
  "hoe-whip-of-the-primogen": {
    stack: "library",
    name: "Whip of the Primogen",
    bloodPotencyRequirement: 2,
    types: ["action", "title", "1 per player"],
    text: md`
**Exert 2 Influence to attach.**

    This character has +1 Influence for each [presence] they have. At the end of your turn, remove a 'No Influence' token from 1 character in your coterie that matches this character's clan.
    `,
    disciplines: ["presence"],
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-wild-ranting": {
    stack: "library",
    name: "Wild Ranting",
    types: ["influence modifier"],
    text: md`
Gain 3 Influence during this action or event. If this is a Scheme and your side loses, target player draws 1 card.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-withering-spirit": {
    stack: "library",
    name: "Withering Spirit",
    clan: "hecata",
    bloodPotencyRequirement: 5,
    types: ["action"],
    text: md`
**Burn 1 wraith you control:** The [damage] from this card becomes **Aggravated**.

    [oblivion] Deal 1 [mental] [damage] to target character for each wraith in your coterie and each Curse attached to the target.
    `,
    disciplines: ["oblivion"],
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
};
