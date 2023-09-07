import {
  Clan,
  Discipline,
  CardSet,
  md,
  CardId,
  Illustrator,
  Cardpool,
} from "./common.js";

export type Faction = {
  stack: "faction";
  name: string;
  clan: Clan;
  bloodPotency: number;
  physical: number;
  social: number;
  mental: number;
  disciplines: Partial<Record<Discipline, 1 | 2 | 3>>;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
  cardpool: Cardpool;
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
    disciplines: { auspex: 1, "blood sorcery": 1 },
    cardpool: "vampire",
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
    disciplines: { auspex: 1 },
    cardpool: "vampire",
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
    disciplines: { dominate: 1, fortitude: 1, presence: 1 },
    cardpool: "vampire",
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
    disciplines: { oblivion: 1 },
    cardpool: "vampire",
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
    disciplines: { animalism: 1, fortitude: 1, protean: 1 },
    cardpool: "vampire",
  },

  "hoe-ekene": {
    stack: "faction",
    clan: "gangrel",
    name: "Ekene",
    text: md`
Solo Attacker - This character declares their attack type when Attack cards are typically revealed during the attack sequence.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: { protean: 1 },
    cardpool: "vampire",
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
    disciplines: { fortitude: 1, presence: 1 },
    cardpool: "vampire",
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
    disciplines: { celerity: 1, dominate: 1, presence: 1 },
    cardpool: "vampire",
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
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
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
    disciplines: { celerity: 1, potence: 1, presence: 1 },
    cardpool: "vampire",
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
    disciplines: { auspex: 1, presence: 1 },
    cardpool: "vampire",
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
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
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
    disciplines: { obfuscate: 1, potence: 1 },
    cardpool: "vampire",
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
    disciplines: { auspex: 1, obfuscate: 1 },
    cardpool: "vampire",
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
    disciplines: { auspex: 1 },
    cardpool: "vampire",
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
    disciplines: { auspex: 1, oblivion: 1 },
    cardpool: "vampire",
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
    disciplines: { celerity: 2 },
    cardpool: "vampire",
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
    disciplines: { oblivion: 2, presence: 1 },
    cardpool: "vampire",
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
    disciplines: { animalism: 1, obfuscate: 1 },
    cardpool: "vampire",
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
    disciplines: { "blood sorcery": 1, dominate: 1 },
    cardpool: "vampire",
  },

  "xxx-victor-cane": {
    stack: "faction",
    clan: "tremere",
    name: "Victor Cane",
    text: md`
When this character is defeated, add 1 of that lost [blood] to another character in your coterie.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Promo",
    disciplines: { "blood sorcery": 1 },
    cardpool: "vampire",
  },

  "xxx-sid-baqri": {
    stack: "faction",
    clan: "thin-blood",
    name: "Sid Baqri",
    text: md`
When this character is defeated by an attacker, put a '-1 [blood potency]' token on that character.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Promo",
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

  "xxx-carmina-magnus": {
    stack: "faction",
    clan: "ventrue",
    name: "Carmina Magnus",
    text: md`
When a foe attacks a character in a Haven or with a Haven attached to them, you may have the defending player gain 1 [prestige] of their color from the general supply.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Darko Stojanovic",
    set: "Promo",
    disciplines: { dominate: 1, presence: 1 },
    cardpool: "vampire",
  },

  "xxx-giselle-della-scala": {
    stack: "faction",
    clan: "lasombra",
    name: "Giselle della Scala",
    text: md`
Attacker - When this character defeats a foe's character in The Streets, move all [agenda] on this character to your Agenda card.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Darko Stojanovic",
    set: "Promo",
    disciplines: { dominate: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "xxx-luviere-bataille": {
    stack: "faction",
    clan: "toreador",
    name: "Luviere Bataille",
    text: md`
When you remove a [prestige] of your color from an Event, put it into your personal supply.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "János Orbán",
    set: "Promo",
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "xxx-r-t-thassos": {
    stack: "faction",
    clan: "gangrel",
    name: "R.T. Thassos",
    text: md`
The first time you attach an Animal to this character during each of your turns, target player discards 1 card.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Anastasiia Horbunova",
    set: "Promo",
    disciplines: { animalism: 1, protean: 1 },
    cardpool: "vampire",
  },

  "xxx-reina-de-la-vega": {
    stack: "faction",
    clan: "tremere",
    name: "Reina de la Vega",
    text: md`
At the start of your turn, look at the top card of your Library or Faction Deck. Leave it or move it to the bottom of the deck.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "János Orbán",
    set: "Promo",
    disciplines: { auspex: 1, "blood sorcery": 1 },
    cardpool: "vampire",
  },

  "sas-mei-yinying": {
    stack: "faction",
    name: "Mei Yinying",
    text: md`
**Reach** _(May attack characters in The Streets from your Haven.)_

Party - This attack deals +1 [damage] to the target if there are 3+ Mortals in the burned pile.
    `,
    illustrator: "Darko Stojanovic",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { dominate: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "sas-scott": {
    stack: "faction",
    name: "Scott",
    text: md`
When you create a wraith, choose your wraith token instead of drawing it at random. Shuffle the stack after choosing.
    `,
    illustrator: "Joyce Maureira",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { auspex: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "sas-adrian-beltza": {
    stack: "faction",
    name: "Adrian Beltza",
    text: md`
**Reach** _(May attack characters in The Streets from your Haven.)_

Attacker - **Pay 1 [agenda]:** This attack deals +2 [damage] to the target if you do not play an Attack card.
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { oblivion: 1, potence: 1 },
    cardpool: "vampire",
  },

  "sas-annika": {
    stack: "faction",
    name: "Annika",
    text: md`
As you play a Ritual, you may move 1 [blood] from any number of your characters in torpor to that Ritual.
    `,
    illustrator: "Ana Horbunova",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 6,
    physical: 1,
    social: 2,
    mental: 0,
    disciplines: { auspex: 1, fortitude: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "sas-astrid-malhela": {
    stack: "faction",
    name: "Astrid Malhela",
    text: md`
Party - **Pay 1 [agenda]:** This attack has +3 Intel. If the attack defeats the target, gain 1 [prestige].
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { potence: 1 },
    cardpool: "vampire",
  },

  "sas-bianca-giovanni": {
    stack: "faction",
    name: "Bianca Giovanni",
    text: md`
Torpor - If you control 2+ Rituals, gain 1 [agenda].
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: { oblivion: 1 },
    cardpool: "vampire",
  },

  "sas-enzo-cappa": {
    stack: "faction",
    name: "Enzo Cappa",
    text: md`
**Reach** _(May attack characters in The Streets from your Haven.)_

Party - This attack deals +1 [damage] if the attacker has a Wraith attached.
    `,
    illustrator: "Joyce Maureira",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { oblivion: 2 },
    cardpool: "vampire",
  },

  "sas-gia-de-emparan": {
    stack: "faction",
    name: "Gia de Emparan",
    text: md`
Party - When this party defeats a character, move 1 [agenda] from any character in your coterie to your Agenda card.
    `,
    illustrator: "Joyce Maureira",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 6,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { dominate: 2, potence: 1 },
    cardpool: "vampire",
  },

  "sas-juan-carlos-diaz": {
    stack: "faction",
    name: "Juan Carlos Diaz",
    text: md`
**Reach** _(May attack characters in The Streets from your Haven.)_

Attacker - This attack deals +1 [damage] to the target if this character played a card with [oblivion].
    `,
    illustrator: "Joyce Maureira",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { oblivion: 2 },
    cardpool: "vampire",
  },

  "sas-kristin": {
    stack: "faction",
    name: "Kristin",
    text: md`
**Exhaust:** Target character in torpor loses 1 [blood].
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    disciplines: { fortitude: 1 },
    cardpool: "vampire",
  },

  "sas-kwame": {
    stack: "faction",
    name: "Kwame",
    text: md`
Torpor - If you control 2+ wraiths, draw 1 card.
    `,
    illustrator: "Darko Stojanovic",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { auspex: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "sas-markus-kumnyama": {
    stack: "faction",
    name: "Markus Kumnyama",
    text: md`
**Reach** _(May attack characters in The Streets from your Haven.)_

As this character performs an Action, place 1 [agenda] from the general supply on them.
    `,
    illustrator: "Ana Horbunova",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { dominate: 1, oblivion: 1, potence: 1 },
    cardpool: "vampire",
  },

  "sas-nathaniel": {
    stack: "faction",
    name: "Nathaniel",
    text: md`
Torpor - If you control 1+ Rituals, gain 1 [prestige].
    `,
    illustrator: "Darko Stojanovic",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1 },
    cardpool: "vampire",
  },

  "sas-piero-calderon": {
    stack: "faction",
    name: "Piero Calderón",
    text: md`
This character has +1 Intel.

Attacker - If this character has a Title, this attack cannot be blocked.
    `,
    illustrator: "Joyce Maureira",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 6,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { oblivion: 1, potence: 2 },
    cardpool: "vampire",
  },

  "sas-rachany-sok": {
    stack: "faction",
    name: "Rachany Sok",
    text: md`
**Guard**

This character may Block [ranged] attacks.

**Pay 1 [agenda]:** +2 [shield] during this attack.
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { dominate: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "sas-raven-smith": {
    stack: "faction",
    name: "Raven Smith",
    text: md`
**Exhaust:** Steal 1 [agenda] from target foe who has the same amount of [agenda] as you and put it on this character.
    `,
    illustrator: "Darko Stojanovic",
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotency: 5,
    physical: 0,
    social: 2,
    mental: 1,
    disciplines: { dominate: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "sas-sophia-giovanni": {
    stack: "faction",
    name: "Sophia Giovanni",
    text: md`
Torpor - For each wraith you control, put 1 [blood] of your color from the general supply on target character (including in torpor).
    `,
    illustrator: "Joyce Maureira",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 5,
    physical: 1,
    social: 0,
    mental: 2,
    disciplines: { fortitude: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "xxx-annabelle": {
    stack: "faction",
    name: "Annabelle",
    text: md`
Party - Characters in this party deal +1 Superficial [damage] to the opposing character during an attack for each Influence you exert during the attack.
    `,
    illustrator: "Ana Horbunova",
    set: "Promo",
    clan: "brujah",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { presence: 1, potence: 1 },
    cardpool: "vampire",
  },

  "xxx-natasha-blank": {
    stack: "faction",
    name: "Natasha Blank",
    text: md`
Attacker - **Pay 1 [prestige]:** This attack deals +1 [damage] to the target. At the end of this attack, you may move this character to your haven.
    `,
    illustrator: "Marco Primo",
    set: "Promo",
    clan: "malkavian",
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { obfuscate: 1 },
    cardpool: "vampire",
  },

  "sas-zahara": {
    stack: "faction",
    name: "Zahara",
    text: md`
When this character is defeated, you may create a wraith and attach it to a character in your coterie.
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    clan: "hecata",
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { oblivion: 1 },
    cardpool: "vampire",
  },

  "baa-alejandro-lopez": {
    stack: "faction",
    name: "Alejandro Lopez",
    text: md`
When this character mends during any player's Action Phase, draw 1 card.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 6,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1, "blood sorcery": 2 },
    cardpool: "vampire",
  },

  "baa-april-smith": {
    stack: "faction",
    name: "April Smith",
    text: md`
Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Fortitude this attack. Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: {},
    cardpool: "vampire",
  },

  "baa-aurora-nix": {
    stack: "faction",
    name: "Aurora Nix",
    text: md`
Attacker - If this attack deals 1+ Damage to the target, put a Fear token on the target.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { auspex: 2 },
    cardpool: "vampire",
  },

  "core-bad-penny": {
    stack: "faction",
    name: "Bad Penny",
    text: md`
Torpor - At the end of your turn, add 1 Blood from the general supply to this character if in torpor.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { obfuscate: 2 },
    cardpool: "vampire",
  },

  "core-bella-forte": {
    stack: "faction",
    name: "Bella Forte",
    text: md`
Attacker - Discard the top card of your Library: If it is not an Attack card, this attack deals +2 Damage to the target.
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "toreador",
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { auspex: 1, celerity: 1 },
    cardpool: "vampire",
  },

  "core-beretta": {
    stack: "faction",
    name: "Beretta",
    text: md`
Attacker - Pay 1 Blood: This Ranged attack deals +1 Damage to the target.
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "brujah",
    bloodPotency: 5,
    physical: 0,
    social: 1,
    mental: 2,
    disciplines: { celerity: 1, potence: 1 },
    cardpool: "vampire",
  },

  "core-bong-cha-park": {
    stack: "faction",
    name: "Bong-Cha Park",
    text: 'At the end of your turn, you may attach a Retainer in this party to another characer in this party (does not trigger "attach" effects).',
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "toreador",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "core-brother": {
    stack: "faction",
    name: "Brother",
    text: md`
Party - Exhaust: This attack deals +1 Damage to the target.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "brujah",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { potence: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-bruno-wagner": {
    stack: "faction",
    name: "Bruno Wagner",
    text: md`
Draw 1 card when you play an Ongoing card.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 5,
    physical: 0,
    social: 2,
    mental: 1,
    disciplines: { dominate: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-bunny-benitez": {
    stack: "faction",
    name: "Bunny Benitez",
    text: md`
When a Scheme you play succedds, gain 1 prestige. Exhaust: This character has +2 influence during this action or event
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "toreador",
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { celerity: 1, presence: 1 },
    cardpool: "vampire",
  },

  "baa-caleb-walker": {
    stack: "faction",
    name: "Caleb Walker",
    text: md`
Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Blood Sorcery this attack. Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 1,
    mental: 0,
    disciplines: {},
    cardpool: "vampire",
  },

  "baa-candi-liu": {
    stack: "faction",
    name: "Candi Liu",
    text: md`
Attacker - If this attack deals +1 Damage to the target, put a '-1 Blood Potence' token on the target.
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

  "baa-claudia-sterling": {
    stack: "faction",
    name: "Claudia Sterling",
    text: md`
When this character takes [damage] from an attacker, place 1 of that lost Blood onto a Ritual you control.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { "blood sorcery": 1 },
    cardpool: "vampire",
  },

  "baa-darius-wolfe": {
    stack: "faction",
    name: "Darius Wolfe",
    text: md`
Guard This character may block Ranged Attacker. When this character Blocks an attacks, draw 1 card.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { auspex: 1, dominate: 1 },
    cardpool: "vampire",
  },

  "core-doc": {
    stack: "faction",
    name: "Doc",
    text: md`
Pay 1 Prestige: Mend 1 Blood on each character in this party.
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 5,
    physical: 0,
    social: 1,
    mental: 2,
    disciplines: { auspex: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "baa-faith-gray": {
    stack: "faction",
    name: "Faith Gray",
    text: md`
When you play a Ritual, draw 1 card.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { auspex: 1, "blood sorcery": 1 },
    cardpool: "vampire",
  },

  "core-flick": {
    stack: "faction",
    name: "Flick",
    text: md`
Relentless - Pay 1 Blood: This character has +3 Influence during this action or event.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "brujah",
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "baa-frog": {
    stack: "faction",
    name: "Frog",
    text: md`
When a character in this party attaches an Alchemy, ready them. Detach an Alchemy from this character: Prevent 1 Damage.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

  "baa-grigori": {
    stack: "faction",
    name: "Grigori",
    text: md`
Exhaust: Replace 1 Blood on target character with one of your color from the general supply.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 5,
    physical: 1,
    social: 0,
    mental: 2,
    disciplines: { "blood sorcery": 1, dominate: 1 },
    cardpool: "vampire",
  },

  "core-guvnah": {
    stack: "faction",
    name: "Guv'nah",
    text: md`
Draw 1 card when you play a card face down outside of an attack.
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1, dominate: 1 },
    cardpool: "vampire",
  },

  "baa-hua-jiang": {
    stack: "faction",
    name: "Hua Jiang",
    text: md`
Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Celerity this attack. Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: {},
    cardpool: "vampire",
  },

  "core-humberto-garcia": {
    stack: "faction",
    name: "Humberto Garcia",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { dominate: 1 },
    cardpool: "vampire",
  },

  "core-hydra": {
    stack: "faction",
    name: "Hydra",
    text: md`
Attacker - Pay 1 Blood: Draw 1 card.
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    clan: "brujah",
    bloodPotency: 6,
    physical: 2,
    social: 1,
    mental: 0,
    disciplines: { celerity: 1, potence: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-inmate-745943": {
    stack: "faction",
    name: "Inmate #745943",
    text: md`
Attacker - Pay 1 Prestige: This attack deals +2 Damage to the target.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 4,
    physical: 2,
    social: 0,
    mental: 0,
    disciplines: { dominate: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "core-iris-lokken": {
    stack: "faction",
    name: "Iris Lokken",
    text: md`
When this character plays a Scheme, reveal the top card of your Library and gain Influence equal to its [blood-potency] for this action (the return it).
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "toreador",
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { auspex: 1, presence: 1 },
    cardpool: "vampire",
  },

  "baa-jacob-frost": {
    stack: "faction",
    name: "Jacob Frost",
    text: md`
Attacker - This attack deals +1 Damage to the target for every 2 characters in this party (including this character).
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

  "core-jesus": {
    stack: "faction",
    name: "Jesús",
    text: md`
Relentless - When this character is defeated, you may Pay 1 Prestige: Gain 1 Agenda.
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: { obfuscate: 1 },
    cardpool: "vampire",
  },

  "core-john-kartunen": {
    stack: "faction",
    name: "John Kartunen",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "toreador",
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1 },
    cardpool: "vampire",
  },

  "core-johnny": {
    stack: "faction",
    name: "Johnny",
    text: md`
Party - When this party defeats and burns a City Deck Mortal, each character in this party may mend 1 Blood instead of the normal burn benefit.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "brujah",
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { presence: 2 },
    cardpool: "vampire",
  },

  "baa-joseph-drake": {
    stack: "faction",
    name: "Joseph Drake",
    text: md`
For each Alchemy attached to this character, +1 Resistence during attacks.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

  "core-june-bryant": {
    stack: "faction",
    name: "June Bryant",
    text: md`
At the start of your turn if you control the Prince of the City, draw 2 cards.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "core-karma": {
    stack: "faction",
    name: "Karma",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { auspex: 1 },
    cardpool: "vampire",
  },

  "core-lixue-chen": {
    stack: "faction",
    name: "Lixue Chen",
    text: md`
Party - While this character has a Retainer, their party's first Social attack during each of your turns deals +1 Damage to the target.
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    clan: "toreador",
    bloodPotency: 6,
    physical: 1,
    social: 2,
    mental: 0,
    disciplines: { auspex: 1, celerity: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-liza-holt": {
    stack: "faction",
    name: "Liza Holt",
    text: md`
Party- When this party defeats a character, you may attach 1 of the defeated character's Retainers to a character in this party.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "toreador",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { celerity: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-lolita": {
    stack: "faction",
    name: "Lolita",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { dominate: 1 },
    cardpool: "vampire",
  },

  "baa-lorenzo-murik": {
    stack: "faction",
    name: "Lorenzo Murik",
    text: md`
Exhaust: Mend 1 Blood on a character in your coterie.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { "blood sorcery": 1 },
    cardpool: "vampire",
  },

  "core-montgomery-white": {
    stack: "faction",
    name: "Montgomery White",
    text: md`
Party -This party has +1 Shield during ranged attacks.
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { fortitude: 2 },
    cardpool: "vampire",
  },

  "core-muhammad-zadeh": {
    stack: "faction",
    name: "Muhammad Zadeh",
    text: md`
This character has +1 Influence for each attached Retainer
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "toreador",
    bloodPotency: 5,
    physical: 0,
    social: 2,
    mental: 1,
    disciplines: { auspex: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-nancy-witt": {
    stack: "faction",
    name: "Nancy Witt",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "baa-phuoc-dihn": {
    stack: "faction",
    name: "Phuoc Dihn",
    text: md`
Pay 1 blood: Put that Blood onto a Ritual you control.
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { "blood sorcery": 1, dominate: 1 },
    cardpool: "vampire",
  },

  "core-randolph-marz": {
    stack: "faction",
    name: "Randolph Marz",
    text: md`
Party - Discard a Title: This attack deals +1 damage to the target. Additional +1 damage if this character is Prince of the City.
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 6,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { dominate: 1, fortitude: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-shades": {
    stack: "faction",
    name: "Shades",
    text: md`
Party - For every 5 Agenda a foe has, this party has +1 Intel vs that foe.
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    clan: "brujah",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { celerity: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-skunk": {
    stack: "faction",
    name: "Skunk",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "brujah",
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { potence: 1 },
    cardpool: "vampire",
  },

  "xxx-smoke": {
    stack: "faction",
    name: "Smoke",
    text: md`
At the end of your turn, ready 1 character in this party.
    `,
    illustrator: "Drew Tucker",
    set: "Promo",
    clan: "brujah",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { celerity: 1 },
    cardpool: "vampire",
  },

  "xxx-martine-diaz": {
    stack: "faction",
    name: "Martine Diaz",
    text: md`
Exhaust: Draw 1 card, then discard 1 card.
    `,
    illustrator: "Marco Primo",
    set: "Promo",
    clan: "ventrue",
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { fortitude: 1, presence: 1 },
    cardpool: "vampire",
  },

  "xxx-freddy-usher": {
    stack: "faction",
    name: "Freddy Usher",
    text: md`
When this character plays a Reaction, draw 1 card.
    `,
    illustrator: "Drew Tucker",
    set: "Promo",
    clan: "toreador",
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { celerity: 1 },
    cardpool: "vampire",
  },

  "xxx-victor-temple": {
    stack: "faction",
    name: "Victor Temple",
    text: md`
This character has +1 Influence. Pay 1 [blood]: Put a 'No Influence' token on target character.
    `,
    illustrator: "Joyce Maureira",
    set: "Promo",
    clan: "ventrue",
    bloodPotency: 5,
    physical: 0,
    social: 1,
    mental: 2,
    disciplines: { dominate: 1, presence: 1 },
    cardpool: "vampire",
  },

  "baa-sonja-valentine": {
    stack: "faction",
    name: "Sonja Valentine",
    text: md`
At the start of your turn, replace 1 Blood on target character in The Streets with one of your color from the general supply
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 6,
    physical: 0,
    social: 1,
    mental: 2,
    disciplines: { auspex: 1, "blood sorcery": 1, dominate: 1 },
    cardpool: "vampire",
  },

  "core-stevie-osborn": {
    stack: "faction",
    name: "Stevie Osborn",
    text: md`
Gain 1 prestige when any character in your coterie attaches a title.
    `,
    illustrator: "Drew Tucker",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { fortitude: 1, presence: 1 },
    cardpool: "vampire",
  },

  "core-street-preacher": {
    stack: "faction",
    name: "Street Preacher",
    text: md`
Relentless - If ready, Pay 1 Prestige: Move to The Streets and Block an attack against any targe in The Streets.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: { auspex: 1 },
    cardpool: "vampire",
  },

  "core-sweetums": {
    stack: "faction",
    name: "Sweetums",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "brujah",
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { celerity: 1 },
    cardpool: "vampire",
  },

  "core-the-cossack": {
    stack: "faction",
    name: "The Cossack",
    text: md`
Pay 1 Blood: This character's next attack this turn cannot be Blocked.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "brujah",
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { celerity: 1, potence: 1 },
    cardpool: "vampire",
  },

  "core-ty-smith": {
    stack: "faction",
    name: "Ty Smith",
    text: md`
Guard This character may block ranged attacks.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "toreador",
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "baa-valerie-nash": {
    stack: "faction",
    name: "Valerie Nash",
    text: md`
Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Auspex this attack. Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 1,
    social: 0,
    mental: 0,
    disciplines: {},
    cardpool: "vampire",
  },

  "core-velvet": {
    stack: "faction",
    name: "Velvet",
    text: md`
Gain 1 prestige when you resolve a face-down card outside of an attack.
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    clan: "malkavian",
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "baa-wendy": {
    stack: "faction",
    name: "Wendy",
    text: md`
Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Obfuscate this attack. Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 1,
    mental: 0,
    disciplines: {},
    cardpool: "vampire",
  },

  "core-yusuf-kaya": {
    stack: "faction",
    name: "Yusuf Kaya",
    text: md`
Exhaust: Mend 1 blood on each Titled character in your coterie and in torpor.
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    disciplines: { fortitude: 2 },
    cardpool: "vampire",
  },

  "core-zhang-wei": {
    stack: "faction",
    name: "Zhang Wei",
    text: md`
Party - While this character has a title, when this party defeats a character, that foe loses 1 prestige.
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    clan: "ventrue",
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { dominate: 1, presence: 1 },
    cardpool: "vampire",
  },

  "war-bobby-handsome": {
    stack: "faction",
    name: "Bobby Handsome",
    text: md`
Guard

This character may Block [ranged] attacks.
    `,
    illustrator: "Drew Tucker",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 3,
    physical: 2,
    social: 0,
    mental: 0,
    disciplines: { obfuscate: 1 },
    cardpool: "vampire",
  },

  "war-chooha": {
    stack: "faction",
    name: "Chooha",
    text: md`
Party - Exhaust: The next attack made by a member of this party this turn has +1 Intel vs characters in their Haven.
    `,
    illustrator: "Drew Tucker",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { animalism: 1 },
    cardpool: "vampire",
  },

  "war-clandestine": {
    stack: "faction",
    name: "Clandestine",
    text: md`
Attacker - This attack deals +1 [social] [damage] to City Deck Mortals.
    `,
    illustrator: "Drew Tucker",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 5,
    physical: 0,
    social: 2,
    mental: 1,
    disciplines: { obfuscate: 2 },
    cardpool: "vampire",
  },

  "war-crazy-cat-lady": {
    stack: "faction",
    name: "Crazy Cat Lady",
    text: md`
Exhaust: Attach up to 2 Alley Cats from your hand or discard pile to this character, ignoring [blood] costs.
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { animalism: 1, potence: 1 },
    cardpool: "vampire",
  },

  "war-drea-warden": {
    stack: "faction",
    name: "Drea Warden",
    text: md`
Exhaust, Pay 1 [blood]: Attach an Animal from your hand to any character in your coterie. Ignore normal attach requirements.
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { animalism: 1, protean: 1 },
    cardpool: "vampire",
  },

  "war-general-flint": {
    stack: "faction",
    name: "General Flint",
    text: md`
Attacker - If this character has 1+ Retainers, the target has -1 [shield]. If this character has 2+ Retainers, this attack also deals +1 [damage].
    `,
    illustrator: "Ana Horbunova",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { animalism: 1, potence: 2 },
    cardpool: "vampire",
  },

  "war-ghost": {
    stack: "faction",
    name: "Ghost",
    text: md`
Party - Characters with [protean] in this party have +1 Secrecy in The Streets.
    `,
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { protean: 2 },
    cardpool: "vampire",
  },

  "war-harry-o-brien": {
    stack: "faction",
    name: "Harry O'Brien",
    text: md`
Exhaust: Mend 1 [blood] on target character in this party for each Animal the target has attached.
    `,
    illustrator: "Drew Tucker",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { fortitude: 1 },
    cardpool: "vampire",
  },

  "war-kim-phan": {
    stack: "faction",
    name: "Kim Phan",
    text: md`
Exhaust: Remove 1 token from target Ongoing or unattached face-down card controlled by any player. Use this ability only in The Streets.

Pay 1 [prestige]: Discard the card instead.
    `,
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { obfuscate: 1, potence: 1 },
    cardpool: "vampire",
  },

  "war-leah-swiftfoot": {
    stack: "faction",
    name: "Leah Swiftfoot",
    text: md`
Attacker - If alone in a party, attacks made by this character cannot be Blocked. At the end of this attack, you may move this character to your Haven.
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { animalism: 1, protean: 1 },
    cardpool: "vampire",
  },

  "war-lil-fang": {
    stack: "faction",
    name: "Lil' Fang",
    text: md`
Exhaust: Put 1 Animal from your discard pile into your hand.
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 4,
    physical: 2,
    social: 0,
    mental: 0,
    disciplines: { animalism: 1, protean: 1 },
    cardpool: "vampire",
  },

  "war-lori-swiftfoot": {
    stack: "faction",
    name: "Lori Swiftfoot",
    text: md`
Guard

This character may Block [ranged] attacks.
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { fortitude: 1 },
    cardpool: "vampire",
  },

  "war-pong": {
    stack: "faction",
    name: "Pong",
    text: md`
The first time you detach an Animal from a character in your coterie during each of your turns, draw 1 card.
    `,
    illustrator: "Drew Tucker",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { animalism: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "war-sheilar-omar": {
    stack: "faction",
    name: "Sheilar Omar",
    text: md`
Party - When a character in this party would attach a Retainer, you may attach it to another character in this party instead.
    `,
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { animalism: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "war-shep-mason": {
    stack: "faction",
    name: "Shep Mason",
    text: md`
You may attach the Sheriff Title to this character at no Influence cost.
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    disciplines: { potence: 2 },
    cardpool: "vampire",
  },

  "war-summer-moon": {
    stack: "faction",
    name: "Summer Moon",
    text: md`
At the end of your turn, if this character has 1+ Animal attached, ready them. If 2+ Animals are attached, they also mend 1 [blood].
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 5,
    physical: 1,
    social: 2,
    mental: 0,
    disciplines: { animalism: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "war-tamaska": {
    stack: "faction",
    name: "Tamaska",
    text: md`
The first time you attach an Animal to this character during your turn, ready them and gain 1 Unhosted Action.
    `,
    illustrator: "Ana Horbunova",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 6,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { animalism: 1, fortitude: 1, protean: 1 },
    cardpool: "vampire",
  },

  "war-trinity-voss": {
    stack: "faction",
    name: "Trinity Voss",
    text: md`
Party - The first attack made by a member of this party each turn against an Antagonist deals +2 [damage].
    `,
    illustrator: "Joyce Maureira",
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotency: 5,
    physical: 1,
    social: 2,
    mental: 0,
    disciplines: { animalism: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "dar-angela": {
    stack: "faction",
    name: "Angela",
    text: md`
**Possessive** _(When entering torpor, may retain 1 attached card.)_

The first time you attach a card to any card (including Ghouls) each turn, draw 1 card.
    `,
    illustrator: "Anastasiia Horbunova",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { animalism: 1, dominate: 1, protean: 1 },
    cardpool: "vampire",
  },

  "dar-chance": {
    stack: "faction",
    name: "Chance",
    text: md`
**Put a 'No Influence' token on a ready character in your coterie who has 1+ Influence and exhaust them:** Put 1 [prestige] from the general supply on a face-down card you control.
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { obfuscate: 1 },
    cardpool: "vampire",
  },

  "dar-haya": {
    stack: "faction",
    name: "Haya",
    text: md`
Party - Attackers in this party deal +1 [damage] to Mortals for each Ravnos character in this party.
    `,
    illustrator: "Adelijah Ocampo",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "dar-jack": {
    stack: "faction",
    name: "Jack",
    text: md`
**Exhaust:** Reveal the top 2 cards of your Library, then discard 1 and draw the other. Use this ability only in The Streets.
    `,
    illustrator: "Joyce Maureira",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    disciplines: { animalism: 1 },
    cardpool: "vampire",
  },

  "dar-kwaku": {
    stack: "faction",
    name: "Kwaku",
    text: md`
While there are 2+ unattached Citizens and/or _Vagrants_ in The Streets, characters in this party have +1 Secrecy in The Streets.
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { obfuscate: 1 },
    cardpool: "vampire",
  },

  "dar-mahendra-chanda": {
    stack: "faction",
    name: "Mahendra Chanda",
    text: md`
**Guard**

While this character is a Blocker, any [blood] they lose due to [damage] may be put on an Ongoing or face-down card you control (flipped to either side).
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { animalism: 1, presence: 1 },
    cardpool: "vampire",
  },

  "dar-matthias": {
    stack: "faction",
    name: "Matthias",
    text: md`
**Possessive** _(When entering torpor, may retain 1 attached card.)_

This character has +1 **Attachment**.

The first time you burn a card attached to this character during each of your turns, draw 1 card.
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { animalism: 1, dominate: 1 },
    cardpool: "vampire",
  },

  "dar-maya": {
    stack: "faction",
    name: "Maya",
    text: md`
**Exhaust:** Attach 1 Haven from your collection to this character if they have none attached **OR** Swap 1 Haven attached to this character with another Haven you control.
    `,
    illustrator: "Joyce Maureira",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { obfuscate: 1, presence: 1 },
    cardpool: "vampire",
  },

  "dar-mircea": {
    stack: "faction",
    name: "Mircea",
    text: md`
The first time you recruit a character during each of your turns with [blood-potency] lower than your Leader, gain 1 Unhosted Action.
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "dar-nikolae": {
    stack: "faction",
    name: "Nikolae",
    text: md`
**Possessive** _(When entering torpor, may retain 1 attached card.)_

Attacker - If this attack defeats the target, steal 1 Retainer from any character in the defending party (does not trigger attach effects).
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { dominate: 1, protean: 1 },
    cardpool: "vampire",
  },

  "dar-radu": {
    stack: "faction",
    name: "Radu",
    text: md`
**Possessive** _(When entering torpor, may retain 1 attached card.)_

**Exhaust:** Reveal the top card of your Library, then draw it or attach it face down to a character you control who has no face-down cards attached.
    `,
    illustrator: "Joyce Maureira",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { animalism: 1, protean: 1 },
    cardpool: "vampire",
  },

  "dar-shweta": {
    stack: "faction",
    name: "Shweta",
    text: md`
Solo Attacker - If this attack deals 1+ [damage] to a target in their haven, steal 1 [prestige] from that foe and you may place it on a non-Haven card you control.
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 3,
    physical: 2,
    social: 0,
    mental: 0,
    disciplines: { animalism: 1 },
    cardpool: "vampire",
  },

  "dar-simona": {
    stack: "faction",
    name: "Simona",
    text: md`
**Possessive** _(When entering torpor, may retain 1 attached card.)_

**Detach 1 face-down card from this character:** Mend 2 [blood] on this character or gain 1 [prestige].
    `,
    illustrator: "Joyce Maureira",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 5,
    physical: 0,
    social: 2,
    mental: 1,
    disciplines: { dominate: 1, protean: 1 },
    cardpool: "vampire",
  },

  "dar-stefan-cel-tradat": {
    stack: "faction",
    name: "Stefan Cel Tradat",
    text: md`
When this character exhausts, you may move 1 [blood] or [prestige] from a card you control to another card you control.
    `,
    illustrator: "Anastasiia Horbunova",
    set: "Dragon & Rogue",
    clan: "ravnos",
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { animalism: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "dar-the-ghoul-keeper": {
    stack: "faction",
    name: "The Ghoul Keeper",
    text: md`
When this character exhausts, you may mend 1 [blood] on target Ghoul you control **OR** put 1 Mortal from the City Deck burned pile into The Streets.
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { protean: 1 },
    cardpool: "vampire",
  },

  "dar-valeria": {
    stack: "faction",
    name: "Valeria",
    text: md`
If this character is defeated, steal 1 [prestige] from the attacking player for each card attached to this character.
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { dominate: 1, protean: 1 },
    cardpool: "vampire",
  },

  "dar-vladislav": {
    stack: "faction",
    name: "Vladislav",
    text: md`
**Possessive** _(When entering torpor, may retain 1 attached card.)_

**Exhaust:** Move 1 non-Title attachment you control from one card to another card (does not trigger attach effects).
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    disciplines: { animalism: 1, dominate: 1 },
    cardpool: "vampire",
  },

  "dar-zoya": {
    stack: "faction",
    name: "Zoya",
    text: md`
When this character Blocks an attack and is not defeated, you may attach 1 unattached City Deck Citizen or _Vagrant_ in The Streets to any character you control (this is not defeating them).
    `,
    illustrator: "Mara Miranda-Escota",
    set: "Dragon & Rogue",
    clan: "tzimisce",
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { animalism: 1 },
    cardpool: "vampire",
  },
  "jam-javier": {
    stack: "faction",
    name: "Javier",
    text: md`
When you play a Ritual, mend 1 [blood] on a character in your coterie.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { "blood sorcery": 1 },
    cardpool: "vampire",
  },

  "jam-minnie": {
    stack: "faction",
    name: "Minnie",
    text: md`
When your Rival discards to mend during their End Phase (including in torpor), replace that [blood] with [blood] of your color from the general supply.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { "blood sorcery": 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "jam-todd": {
    stack: "faction",
    name: "Todd",
    text: md`
**Diablerist**

When any character suffers diablerie, you may put 1 [blood] from the general supply on each Ongoing card you control with 1+ [blood] already on it.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 4,
    physical: 2,
    social: 0,
    mental: 0,
    disciplines: { "blood sorcery": 1, celerity: 1 },
    cardpool: "vampire",
  },

  "jam-sama-radi": {
    stack: "faction",
    name: "Sama Radi",
    text: md`
**Diablerist**

Attacker - If the target has an Affliction, this attack cannot be Blocked.
    `,
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 5,
    physical: 1,
    social: 0,
    mental: 2,
    disciplines: { "blood sorcery": 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "jam-pavel-horak": {
    stack: "faction",
    name: "Pavel Horak",
    text: md`
**Diablerist**

Attacker - This attack deals +1 [damage] to the target for each [blood] of your color on the target and the [damage] becomes non-**Aggravated**.
    `,
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { "blood sorcery": 1, celerity: 1 },
    cardpool: "vampire",
  },

  "jam-alhaml-alqurbaniu": {
    stack: "faction",
    name: "Alhaml Alqurbaniu",
    text: md`
When another character in your coterie would be defeated, burn this character instead. Then put 1 [blood] onto your other character from the general supply and they are not defeated.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { obfuscate: 1 },
    cardpool: "vampire",
  },

  "jam-alraaz-tahir": {
    stack: "faction",
    name: "Alraaz Tahir",
    text: md`
**Diablerist**

Party - When an attacker in this party does not defeat their target, replace 1 [blood] on the target with one of your color from the general supply.
    `,
    illustrator: "Amy Wilkins",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { "blood sorcery": 1, celerity: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "jam-naomi": {
    stack: "faction",
    name: "Naomi",
    text: md`
**Diablerist**

Attacker - This attack deals +1 [damage] to target for each different Ongoing Tradition you control.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    disciplines: { "blood sorcery": 2 },
    cardpool: "vampire",
  },

  "jam-szymon-nowak": {
    stack: "faction",
    name: "Szymon Nowak",
    text: md`
When you play a Tradition, draw 1 card.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "banu haqim",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { "blood sorcery": 1, celerity: 1 },
    cardpool: "vampire",
  },

  "jam-chiara": {
    stack: "faction",
    name: "Chiara",
    text: md`
**Solitary**

When this character plays or places an Action card, draw 1 card.
    `,
    illustrator: "Amy Wilkins",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 7,
    physical: 1,
    social: 1,
    mental: 2,
    disciplines: { auspex: 1, dominate: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "jam-mareike": {
    stack: "faction",
    name: "Mareike",
    text: md`
**Solitary**

When this character plays a Reaction, gain 1 [prestige].
    `,
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 4,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { auspex: 1, fortitude:1 },
    cardpool: "vampire",
  },

  "jam-noelle": {
    stack: "faction",
    name: "Noelle",
    text: md`
**Solitary**

When this character is recruited, they gain any number of attachments from a character who left your coterie this turn.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { auspex: 1, dominate: 1 },
    cardpool: "vampire",
  },

  "jam-alzbeta": {
    stack: "faction",
    name: "Alzbeta",
    text: md`
**Solitary**

At the start of your turn, if this is the only character you control and they are at maximum [blood], gain 1 [prestige].

When this character plays a Reaction, the affected character has +1 [shield].
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 6,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { auspex: 2, fortitude: 1 },
    cardpool: "vampire",
  },

  "jam-baptiste": {
    stack: "faction",
    name: "Baptiste",
    text: md`
**Solitary**

**Exhaust**: Mend 2 [blood] on target character (including in torpor). If you don't control the target, draw 1 card.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 5,
    physical: 0,
    social: 2,
    mental: 1,
    disciplines: { fortitude: 2 },
    cardpool: "vampire",
  },

  "jam-anita": {
    stack: "faction",
    name: "Anita",
    text: md`
**Solitary**

When this character exhausts during your turn, you may mend 1 [blood] on target character (including in torpor).
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 6,
    physical: 2,
    social: 1,
    mental: 0,
    disciplines: { dominate: 1, fortitude: 2 },
    cardpool: "vampire",
  },

  "jam-illona": {
    stack: "faction",
    name: "Illona",
    text: md`
**Solitary**

**Shuffle 1 Reaction from your discard pile into your Library:**

This character has +1 [shield] this turn.
    `,
    illustrator: "Irene Francisco",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "jam-kashi": {
    stack: "faction",
    name: "Kashi",
    text: md`
**Solitary**

When this character exhausts, you may remove 1 Affliction from target character.
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { dominate: 2 },
    cardpool: "vampire",
  },

  "jam-amara": {
    stack: "faction",
    name: "Amara",
    text: md`
**Solitary**

When you mend a **Wounded** character, you may discard a non-Title, non-Wraith card attached to that character.
    `,
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    clan: "salubri",
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "xxx-timothy-winters": {
    stack: "faction",
    name: "Timothy Winters",
    text: md`
  This character has +2 Influence during Schemes.

  When this character exhausts, you and target foe each draw 1 card.
    `,
    illustrator: "Joyce Maureira",
    set: "Promo",
    clan: "lasombra",
    bloodPotency: 5,
    physical: 1,
    social: 0,
    mental: 2,
    disciplines: { dominate: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "hah-lucky": {
    stack: "faction",
    clan: "caitiff",
    name: "Lucky",
    text: md`
    When you recruit a character, if they add any new Discipline(s) to your coterie, draw 1 card and all your foes' characters have -1 [shield] this turn.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Anastasiia Horbunova",
    set: "Hunters & Hunted",
    disciplines: { auspex: 1, potence: 1, presence: 1 },
    cardpool: "vampire",
  },

  "hah-benicio": {
    stack: "faction",
    clan: "caitiff",
    name: "Benício",
    text: md`
    **Discard 1 Library card:**

    Prevent 1 [damage] to target character in this party.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { celerity: 1, fortitude: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "hah-hope": {
    stack: "faction",
    clan: "caitiff",
    name: "Hope",
    text: md`
    If you would lose or be forced to spend [prestige] during an attack, you may discard X cards to reduce that [prestige] loss/expenditure by X.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { animalism: 1, "blood sorcery": 1, presence: 1 },
    cardpool: "vampire",
  },

  "hah-jorge-guerrero": {
    stack: "faction",
    clan: "caitiff",
    name: "Jorge Guerrero",
    text: `md
    Attacker - **Discard 1 Library card:**

    This attack deals +1 [damage] to the target.
    `,
    bloodPotency: 3,
    physical: 2,
    social: 0,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { dominate: 1, potence: 1 },
    cardpool: "vampire",
  },

"hah-prudence": {
    stack: "faction",
    clan: "caitiff",
    name: "Prudence",
    text: md`
    Party - Attackers in the party have +2 [shield] while attacking.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, protean: 1},
    cardpool: "vampire",
  },

  "hah-judas": {
    stack: "faction",
    clan: "caitiff",
    name: "Judas",
    text: md`
    When this character is defeated, you may **Burn this character:** Gain 1 [prestige].
    `,
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { celerity: 1, protean: 1},
    cardpool: "vampire",
  },

  "hah-thaddeus": {
    stack: "faction",
    clan: "caitiff",
    name: "Thaddeus",
    text: md`
    When this character enters play, draw 1 card.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { "blood sorcery": 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "hah-keondra": {
    stack: "faction",
    clan: "ministry",
    name: "Keondra",
    text: md`
    Attacker - This attack deals +1 [damage] to the target for each face-down card you control with 2+ [prestige] on it.
    `,
    bloodPotency: 6,
    physical: 0,
    social: 2,
    mental: 1,
    illustrator: "Anastasiia Horbunova",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, presence: 1, protean: 1 },
    cardpool: "vampire",
  },

  "hah-ceraph": {
    stack: "faction",
    clan: "ministry",
    name: "Ceraph",
    text: md`(
    +1 Influence for each character with [presence] in your coterie.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 1, protean: 1 },
    cardpool: "vampire",
  },

  "hah-matthew": {
    stack: "faction",
    clan: "ministry",
    name: "Matthew",
    text: md`(
    The first time you resolve a Conspiracy during each of your turns, gain 1 [prestige]. If you were the only contributor to it, gain 2 [prestige] instead.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, protean: 1 },
    cardpool: "vampire",
  },

  "hah-gisele": {
    stack: "faction",
    clan: "ministry",
    name: "Gisele",
    text: md`
    **Guard**
    When this character Blocks an attack, put a 'No Influence' token on the attacker.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 2 },
    cardpool: "vampire",
  },

  "hah-jimmy": {
    stack: "faction",
    clan: "ministry",
    name: "Jimmy",
    text: md`
    **Exhaust:** Put 1 [prestige] from target player's general supply on a face-down card you control. Use this ability only in The Streets.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, presence: 1 },
    cardpool: "vampire",
  },

  "hah-hakim-owusu": {
    stack: "faction",
    clan: "ministry",
    name: "Hakim Owusu",
    text: md`
    This character has +1 Influence for each Ongoing Scheme you control.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: {presence: 1 },
    cardpool: "vampire",
  },

  "hah-iara": {
    stack: "faction",
    clan: "ministry",
    name: "Iara",
    text: md`
    Face-down cards you control cannot be targeted by foes.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1},
    cardpool: "vampire",
  },

  "hah-evangeline": {
    stack: "faction",
    clan: "faithful",
    name: "Evangeline",
    text: md`
    **Hunter, True Faith**
    Party - Attackers in this party deal +1 [damage] to their target if that target has 1+ [prestige] of your color on them.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-florencia": {
    stack: "faction",
    clan: "faithful",
    name: "Florencia",
    text: md`(
    **Hunter**

    Attacker - **Pay 1 [prestige]:** This attack deals +2 [damage] to the target. Use only if their Preemptive Strike defeated a character in your cell.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "repel the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-toquinho": {
    stack: "faction",
    clan: "faithful",
    name: "Toquinho",
    text: md`
    **Hunter, Guard**

    When a character in your cell is defeated, ready each character in your cell.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-pregador": {
    stack: "faction",
    clan: "faithful",
    name: "Pregador",
    text: md`(
    **Hunter**

    If ready, **Relentless, Pay 1 [prestige]:** Move to The Streets to Block a foe's non-[ranged] attack against any target.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1, "sense the unnatural": 1},
    cardpool: "hunter",
  },

"hah-sister-claire": {
    stack: "faction",
    clan: "faithful",
    name: "Sister Claire",
    text: md`(
    **Hunter**

    Party - **Exhaust:** This attack deals +1 [damage] to the target.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-andres": {
    stack: "faction",
    clan: "faithful",
    name: "Andrés",
    text: md`(
    **Hunter**

    When this character is defeated, target foe loses 1 [agenda].
    `,
    bloodPotency: 1,
    physical: 1,
    social: 0,
    mental: 0,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-noriko": {
    stack: "faction",
    clan: "faithful",
    name: "Noriko",
    text: md`
    **Hunter**

    When this character is defeated, draw 1 card.
    `,
    bloodPotency: 1,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    disciplines: { library: 1 },
    cardpool: "hunter",
  },

  "hah-francisco": {
    stack: "faction",
    clan: "inquisitive",
    name: "Francisco",
    text: md`
    **Hunter** **Guard**

    **Pay 1 [prestige]:** This character has +2 [shield] this attack.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-jamie": {
    stack: "faction",
    clan: "inquisitive",
    name: "Jamie",
    text: md`
    **Hunter**

    This character may be exhausted to Investigate while in their Hideout.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { global: 1, library: 1 },
    cardpool: "hunter",
  },

  "hah-juliana": {
    stack: "faction",
    clan: "inquisitive",
    name: "Juliana",
    text: md`
    **Hunter**

    Party - Characters in this party have +1 [shield] during your Action Phase.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { global: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-maria-lopez": {
    stack: "faction",
    clan: "inquisitive",
    name: "Maria Lopez",
    text: md`
    **Hunter**

    **Exhaust, Pay 1 [prestige]:** Deal 1 [social] [damage] to target character for each Curse attached to it.
    `,
    bloodPotency: 4,
    physical: 2,
    social: 0,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-rio": {
    stack: "faction",
    clan: "inquisitive",
    name: "Rio",
    text: md`
    **Hunter**

    Attacker - This attack deals +1 [damage] to the target for every 2 Curses attached to it.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, library: 1 },
    cardpool: "hunter",
  },

  "hah-ryan": {
    stack: "faction",
    clan: "inquisitive",
    name: "Ryan",
    text: md`
    **Hunter**

    Attacker - At the end of this attack, you may **Pay 1 [prestige]:** Attach your Attack card to the target.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-sara": {
    stack: "faction",
    clan: "inquisitive",
    name: "Sara",
    text: md`
    **Hunter**

    When you exhaust this character to Investigate, add 1 additional [prestige] to the target from your general supply.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    disciplines: { global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-gina-firenzo": {
    stack: "faction",
    clan: "inquisitive",
    name: "Gina Firenzo",
    text: md`
    **Hunter**

    When this character enters play, put 2 [prestige] from your general supply on target character or face-down monster.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1 },
    cardpool: "hunter",
  },

  "hah-renata-gomes": {
    stack: "faction",
    clan: "inquisitive",
    name: "Renata Gomes",
    text: md`
    **Hunter**

    Party - When a character in this party attacks a character, put 1 [prestige] from your general supply on the target.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-grace": {
    stack: "faction",
    clan: "caitiff",
    name: "Grace",
    text: md`
    **Burn 2 cards in your discard pile:** This character has +2 intel this turn.

    Attacker - **Discard the top 2 cards of your Library:** The target has -1 [shield] this attack.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { auspex: 1, fortitude: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "hah-sage": {
    stack: "faction",
    clan: "caitiff",
    name: "Sage",
    text: md`
    When this character exhausts, you may shuffle 1 random Library card from your discard pile into your deck.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { animalism: 1, dominate: 1 },
    cardpool: "vampire",
  },

  "hah-ociel-gonzalez": {
    stack: "faction",
    clan: "ministry",
    name: "Ociel Gonzalez",
    text: md`
    Double the Influence bonus from any Title attached to this character.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 2 },
    cardpool: "vampire",
  },

  "hah-raul-fontes": {
    stack: "faction",
    clan: "ministry",
    name: "Raúl Fontes",
    text: md`
    Attacker - This attack deals +1 [damage] to the target for each 'No Influence' token in the defending party.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 1, protean: 1 },
    cardpool: "vampire",
  },

  "hah-deacon-jones": {
    stack: "faction",
    clan: "faithful",
    name: "Deacon Jones",
    text: md`
    **Hunter, True Faith**

    Attacker - **Pay 2 [prestige]:** This attack deal +1 [damage] to the target for each Relic you control.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
  },

  "hah-ingrid": {
    stack: "faction",
    clan: "faithful",
    name: "Ingrid",
    text: md`
    **Hunter**

    When this character plays a Relic, gain 1 Action.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
  },

  "xxx-fujiko": {
    stack: "faction",
    clan: "hecata",
    name: "Fujiko",
    text: md`
Your Ongoing cards cannot be targeted by foes.
    `,
    bloodPotency: 4,
    physical: 2,
    social: 0,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Promo",
    disciplines: { auspex: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "xxx-the-exterminator": {
    stack: "faction",
    clan: "nosferatu",
    name: "The Exterminator",
    text: md`
    Attacker - **Pay 1 [blood]:** Burn 1 Animal or Retainer attached to the target.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 0,
    mental: 2,
    illustrator: "Harvey Bunda",
    set: "Promo",
    disciplines: { animalism: 1, potence: 1 },
    cardpool: "vampire",
  },

  "xxx-timothy-schwartz": {
    stack: "faction",
    clan: "lasombra",
    name: "Timothy Schwartz",
    text: md`
    **Pay 1 [agenda]:** Gain 2 [prestige] or 5 Influence.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Promo",
    disciplines: { dominate: 1 },
    cardpool: "vampire",
  },

  "xxx-xander-klaus": {
    stack: "faction",
    clan: "gangrel",
    name: "Xander Klaus",
    text: md`
    Attacker - This attack deals +2 [damage] to characters with a Title.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Promo",
    disciplines: { fortitude: 1, protean:1 },
    cardpool: "vampire",
  },

  "pp1-abraham": {
    stack: "faction",
    clan: "thin-blood",
    name: "Abraham",
    text: md`
    When you attach an Alchemy to a character in your coterie, they mend 1 [blood].

    When this character is defeated, return all Alchemy attached to them to your hand.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { auspex: 1, "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

  "pp1-ainsley-kalb": {
    stack: "faction",
    clan: "malkavian",
    name: "Ainsley Kalb",
    text: md`
The first time this character exhausts during each of your turns, any player may pay 1 [agenda]. If they do, ready this character.

**Action:** Each player discards 2 random Library cards, then may draw 2 cards.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 2,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { animalism: 1, auspex: 1, dominate: 1 },
    cardpool: "vampire",
  },

  "pp1-alyssa-nicole": {
    stack: "faction",
    clan: "gangrel",
    name: "Alyssa Nicole",
    text: md`
Party - Characters in this party may initiate an attack while exhausted characters are in this party.

**Exhaust a character in this party:** Ready another character in this party.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 2,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { animalism: 1, auspex: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "pp1-andy-simonelli": {
    stack: "faction",
    clan: "thin-blood",
    name: "Andy Simonelli",
    text: md`
**Guard**
When this character Blocks an attack, **Pay X [prestige]:** Return X target characters from the attacking and/or defending party to their Haven (the attack continues).
    `,
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

  "pp1-branden-james": {
    stack: "faction",
    clan: "lasombra",
    name: "Branden James",
    text: md`
Attacker - If this attack defeats the target character, this character may play a Scheme or Title at no Action cost.

**Pay 1 [agenda]:** Ready this character and they have +2 Influence this turn.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 2,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { dominate: 1, oblivion: 1, presence: 1 },
    cardpool: "vampire",
  },

  "pp1-chris-bargeron": {
    stack: "faction",
    clan: "ravnos",
    name: "Chris Bargeron",
    text: md`
+2 Influence for each non-active Haven you control.

If a Scheme you play fails, put a Fear token on target character with a 'No Influence' token on them.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { presence: 1 },
    cardpool: "vampire",
  },

  "pp1-daniel-trujillo": {
    stack: "faction",
    clan: "malkavian",
    name: "Daniel Trujillo",
    text: md`
The first time each player defeats a vampire controlled by another player during any player's turn, they gain 1 [agenda].
    `,
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { dominate: 1 },
    cardpool: "vampire",
  },

  "pp1-david-garcia": {
    stack: "faction",
    clan: "malkavian",
    name: "David Garcia",
    text: md`
The first time you place a card face down outside of an attack each turn, add 1 [prestige] from your general supply on up to 2 other face-down cards you control.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { dominate: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "pp1-doug-st-john": {
    stack: "faction",
    clan: "ministry",
    name: "Doug St. John",
    text: md`
**Guard**

**Remove 1 token from up to 2 face-down cards you control:** This character has +1 [shield] during this attack for each token removed this way.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { obfuscate: 2 },
    cardpool: "vampire",
  },

  "pp1-drakh": {
    stack: "faction",
    clan: "banu haqim",
    name: "Drakh",
    text: md`
**Diablerist**

Attacker - **Remove 1 [blood] of your color from up to 3 foes' characters:** This attack deals +1 [damage] for each [blood] removed this way.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 1,
    mental: 2,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { auspex: 1, "blood sorcery": 1, celerity: 1 },
    cardpool: "vampire",
  },

  "pp1-emile-rene": {
    stack: "faction",
    clan: "tremere",
    name: "Emile René",
    text: md`
**Pay 1 [blood]:** Steal 1 [blood] from target character and put it onto an Ongoing card you control.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 2,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Prince Pack 1",
    disciplines: { auspex: 1, "blood sorcery": 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "pp1-james-chung": {
    stack: "faction",
    clan: "brujah",
    name: "James Chung",
    text: md`
Attacker - You may immediately play an Attack card of the announced type and apply only [damage] listed, ignoring the game text.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { celerity: 1, presence: 1 },
    cardpool: "vampire",
  },

  "pp1-john-urbanek": {
    stack: "faction",
    clan: "hecata",
    name: "John Urbanek",
    text: md`
**Possessive**

When this character is recruited, you may create a wraith and attach it to this character.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { auspex: 1, oblivion: 1 },
    cardpool: "vampire",
  },

  "pp1-ken-michael-otto": {
    stack: "faction",
    clan: "ventrue",
    name: "Ken Michael-Otto",
    text: md`
**Pay 1 [blood]:** Reveal an Influence Modifier in your hand, then put it face-down into your Haven. Put 1 [blood] from your general supply on that card, which is now a Ghoul.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 2,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { obfuscate: 1, presence: 2 },
    cardpool: "vampire",
  },

  "pp1-krisken-monroe": {
    stack: "faction",
    clan: "nosferatu",
    name: "Krisken Monroe",
    text: md`
When this character mends, put 1 additional [blood] from your general supply on them.

**Relentless, Pay 1 [blood]:** If this character is in your Haven, they have **Guard** and may Block this turn, even if exhausted.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 1,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { animalism: 1, fortitude: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "pp1-leon-alqatil": {
    stack: "faction",
    clan: "ministry",
    name: "Leon Alqatil",
    text: md`
Attacker - **Pay 1 [blood] and discard 1 card:** This attack deals **Aggravated** [damage] to the target if you do not play an Attack card.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Darko Stojanovic",
    set: "Prince Pack 1",
    disciplines: { presence: 1, protean: 1 },
    cardpool: "vampire",
  },

  "pp1-marcel-kraatz": {
    stack: "faction",
    clan: "lasombra",
    name: "Marcel Kraatz",
    text: md`
If this character has +1 [agenda] on them, they have +3 Influence.

**Pay 1 [prestige]:** Place 1 [agenda] on target character. If they are controlled by your rival, lose 1 [prestige].
    `,
    bloodPotency: 6,
    physical: 0,
    social: 1,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { dominate: 2, oblivion: 1 },
    cardpool: "vampire",
  },

  "pp1-murchaidh": {
    stack: "faction",
    clan: "toreador",
    name: "Murchaidh",
    text: md`
Attacker - Reveal the top card of the defender's Library. If it's not an Attack card, +1 [damage]. If it is an Attack card, negate the target's Reaction (if any).
    `,
    bloodPotency: 7,
    physical: 2,
    social: 1,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { auspex: 1, presence: 2 },
    cardpool: "vampire",
  },

  "pp1-odellas-caine": {
    stack: "faction",
    clan: "banu haqim",
    name: "Odellas Caine",
    text: md`
This character gains the active Haven's Leader Ability of any foe whose Leader has half or more [blood] of your color.

**Discard 1 card:** Replace 1 [blood] on target character with 1 of your color from your general supply.
    `,
    bloodPotency: 6,
    physical: 0,
    social: 2,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Prince Pack 1",
    disciplines: { "blood sorcery": 1, celerity: 1, obfuscate: 1 },
    cardpool: "vampire",
  },

  "pp1-robert-bruce": {
    stack: "faction",
    clan: "salubri",
    name: "Robert Bruce",
    text: md`
**Solitary**

If this is the only character in your coterie, characters with [blood] of your color have +1 [shield] during attack actions by your foes.

**Relentless, Pay 1 [blood]:** Replace 1 [blood] on target character in a defending party with one of your color from your general supply.
    `,
    bloodPotency: 7,
    physical: 2,
    social: 0,
    mental: 2,
    illustrator: "Darko Stojanovic",
    set: "Prince Pack 1",
    disciplines: { auspex: 1, dominate: 1, fortitude: 1 },
    cardpool: "vampire",
  },

  "pp1-savage": {
    stack: "faction",
    clan: "brujah",
    name: "Savage",
    text: md`
Attacker - If this attack causes the target to become **Wounded**, exhaust the target and put a Fear token on them. This attack deals +1 [damage] to the target if the defending party has 3+ characters.
    `,
    bloodPotency: 7,
    physical: 2,
    social: 1,
    mental: 1,
    illustrator: "Darko Stojanovic",
    set: "Prince Pack 1",
    disciplines: { celerity: 1, potence: 1, protean: 1 },
    cardpool: "vampire",
  },

  "pp1-sirilla-rosselini": {
    stack: "faction",
    clan: "hecata",
    name: "Sirilla Rosselini",
    text: md`
The first time this character plays a Ritual each turn, ready them and you may add (from your general supply) or remove 1 [blood] from target character you control.
    `,
    bloodPotency: 7,
    physical: 2,
    social: 1,
    mental: 1,
    illustrator: "Darko Stojanovic",
    set: "Prince Pack 1",
    disciplines: { "blood sorcery": 1, fortitude: 1, oblivion: 1 },
    cardpool: "vampire",
  },

};
