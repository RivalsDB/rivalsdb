import { CardId, CardSet, Illustrator, Cardpool, md } from "./common.js";

export type Agenda = {
  stack: "agenda";
  name: string;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
  cardpool: Cardpool;
};

export const agendas: Record<CardId, Agenda> = {
  "baa-knowledge-is-power": {
    name: "Knowledge is Power",
    text: md`
The first time your Leader exhausts in The Streets during each of your turns, if you have 6+ Library cards in your hand, gain 1 [agenda]. If exactly 10 Library cards, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "baa-recruitment-drive": {
    name: "Recruitment Drive",
    text: md`
When you recruit a character, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "baa-rites-of-the-blood": {
    name: "Rites of the Blood",
    text: md`
The first time you play a Ritual during each of your turns, gain 1 [agenda]. If you put 3+ Blood on that Ritual, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "baa-street-brew": {
    name: "Street Brew",
    text: md`
At the start of your turn, if you have a character with Alchemy in your coterie, gain 1 [agenda]. If 3+ characters in your coterie have Alchemy, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-base-of-power": {
    name: "Base of Power",
    text: md`
When a character in your coterie attaches a Title, gain 2 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-drain-them-slowly": {
    name: "Drain Them Slowly",
    text: md`
When a character you attack takes 1+ non-**Aggravated** damage but is not defeated, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Marco Primo",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-hunt-the-hunters": {
    name: "Hunt the Hunters",
    text: md`
The first time you defeat a Second Inquisition during each of your turns, gain 1 [prestige] and 1 [agenda], then shuffle it and any cards in the City Deck discard pile into the City Deck.

If you reach 13 [agenda], you win!
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-manipulate-the-masses": {
    name: "Manipulate the Masses",
    text: md`
WHen a Scheme you play suceeds, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-playthings": {
    name: "Playthings",
    text: md`
When a character in your coterie attaches a Citizen Retainer, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Amy Wilkins",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-strength-in-numbers": {
    name: "Strength in Numbers",
    text: md`
At the start of your turn, if you control 3 characters in The Streets, gain 1 [agenda]. If you control 4+ characters each with 2+ Blood in The Streets, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-the-end-is-nigh": {
    name: "The End is Nigh",
    text: md`
The first time you resolve a Conspiracy during each of your turns, gain 1 Prestige and 2 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "core-turf-war": {
    name: "Turf War",
    text: md`
When you defeat a non-Rival character, gain 1 [agenda]. When you defeat a character with 5+ Blood, gain 1 [agenda].

If you reach 13 agenda, you win!
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
  },

  "hoe-disheveled-shelves": {
    name: "Disheveled Shelves",
    text: md`
At the start of your turn, if your Rival's Library has no cards in it, you win the game.

If you would cause a foe to discard cards, you may have that foe draw that many cards instead.
    `,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    stack: "agenda",
    cardpool: "vampire",
  },

  "hoe-full-of-surprises": {
    name: "Full of Surprises",
    text: md`
The first time you resolve a Trap during each player's turn, gain 1 [prestige] or 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    stack: "agenda",
    cardpool: "vampire",
  },

  "sas-death-is-only-the-beginning": {
    name: "Death is Only the Beginning",
    text: md`
**Exhaust:** If you have 1+ characters in torpor, gain 1 [agenda]. If you have 3+, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Irene Francisco",
    set: "Shadows & Shrouds",
    stack: "agenda",
    cardpool: "vampire",
  },

  "sas-most-impressive": {
    name: "Most Impressive",
    text: md`
At the start of your turn, if your [blood-potency] in The Streets is higher than each individual foes' [blood-potency] in The Streets, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Mara Miranda-Escota",
    set: "Shadows & Shrouds",
    stack: "agenda",
    cardpool: "vampire",
  },

  "sas-prizefighter": {
    name: "Prizefighter",
    text: md`
As you attack a character, put 1 [agenda] on your attacker. At the end of your turn, put 1 [agenda] from a character in your coterie on your Agenda card.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    stack: "agenda",
    cardpool: "vampire",
  },

  "sas-wake-the-dead": {
    name: "Wake the Dead",
    text: md`
**Exhaust:** If you control 1+ wraiths, gain 1 [agenda]. If you control 3+ [wraiths], gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    stack: "agenda",
    cardpool: "vampire",
  },

  "war-animal-kingdom": {
    name: "Animal Kingdom",
    text: md`
At the start of your turn, gain 1 [agenda] if you control 1+ Animals. If you control 3+ different Animals, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Wolf & Rat",
    stack: "agenda",
    cardpool: "vampire",
  },

  "war-call-of-the-wild": {
    name: "Call of the Wild",
    text: md`
When you attach an Animal to a character in your coterie in The Streets who has no Animals attached, gain 1 [agenda]. If you control 3+ different Animals, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
    stack: "agenda",
    cardpool: "vampire",
  },

  "war-hoard-the-herd": {
    name: "Hoard the Herd",
    text: md`
At the end of your turn, if there are no unattached City Deck Citizens or Vagrants in The Streets, gain 1 [agenda]. If there are no unattached City Deck Mortals, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Mara Miranda-Escota",
    set: "Wolf & Rat",
    stack: "agenda",
    cardpool: "vampire",
  },

  "war-invisible-army": {
    name: "Invisible Army",
    text: md`
When a character in your coterie attaches a Vagrant as a Retainer, gain 2 [agenda]. When you defeat a character with an attached Vagrant, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
    stack: "agenda",
    cardpool: "vampire",
  },

  "dar-army-of-the-dragon": {
    name: "Army of the Dragon",
    text: md`
Each time you play a Ghoul, gain 1 [agenda].

If you attach 2+ Retainers to that Ghould when played, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Dragon & Rogue",
    stack: "agenda",
    cardpool: "vampire",
  },

  "dar-change-of-scenery": {
    name: "Change of Scenery",
    text: md`
When you put a new active Haven into play, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Joyce Maureira",
    set: "Dragon & Rogue",
    stack: "agenda",
    cardpool: "vampire",
  },

  "dar-raising-the-stakes": {
    name: "Raising the Stakes",
    text: md`
The first time you place 1+ [prestige] on a card you control that already has 2+ tokens on it during each of your turns, gain 1 [agenda]. The first time you resolve a face-down card with 4+ tokens on it during each player's turn, gain 2 [agenda].
    `,
    illustrator: "Adelijah Ocampo",
    set: "Dragon & Rogue",
    stack: "agenda",
    cardpool: "vampire",
  },

  "dar-the-completionist": {
    name: "The Completionist",
    text: md`
At the start of your turn, for each card you control that is not in your Haven and that has 3+ attachments, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Adelijah Ocampo",
    set: "Dragon & Rogue",
    stack: "agenda",
    cardpool: "vampire",
  },

  "jam-army-of-one": {
    name: "Army of One",
    text: md`
At the start of your turn, if you control only 1 character, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "jam-ritual-master": {
    name: "Ritual Master",
    text: md`
At the start of your turn, if there is 3+ [blood] on Ongoing cards you control, draw 1 card and gain 1 [agenda].

When a Ritual you control leaves play, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "jam-traditionalist": {
    name: "Traditionalist",
    text: md`
At the start of your turn, if you control 3+ different Traditions, gain 1 [agenda].

When you play a Tradition, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "jam-good-samaritan": {
    name: "Good Samaritan",
    text: md`
During each player's Action Phase, the first time an effect you control removes an Affliction from 1+ characters or mends 1+ characters, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Adelijah Ocampo",
    set: "Justice & Mercy",
    stack: "agenda",
    cardpool: "vampire",
  },

  "xxx-kiss-the-ring": {
    name: "Kiss The Ring",
    text: md`
The first time a Titled character in your coterie attacks a character during each of your turns, you may Exert 2 Influence: gain 1 [agenda] or Exert 5 Influence: gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Joyce Maureira",
    set: "Promo",
    stack: "agenda",
    cardpool: "vampire",
  },

  "hah-the-snake-den": {
    name: "The Snake Den",
    text: md`
At the start of your turn, if you control 1+ face-down card with 1+ [prestige] on them, gain 1 [agenda].

The first time you resolve a Conspiracy during each of your turns, gain 1 [agenda].
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "vampire",
  },

  "hah-birds-of-different-feathers": {
    name: "Birds of Different Feathers",
    text: md`
At the start of your turn, if there are 6+ different Disciplines or Edges in your coterie, gain 1 [agenda].
    `,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "hunter and vampire",
  },

  "hah-martyrdom": {
    name: "Martyrdom",
    text: md`
When a character you control is burned, gain 1 [agenda].
    `,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "hunter",
  },

  "hah-observe-and-report": {
    name: "Observe and Report",
    text: md`
When you attach a card to a card you do not control, gain 1 [agenda].
    `,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "hunter and vampire",
  },

  "hah-all-figured-out": {
    name: "All Figured Out",
    text: md`
At the start of your turn, if there is 4+ [prestige] of your color on characters and face-down Monsters, gain 1 [agenda].

When you defeat a character, gain 1 [agenda] for every 2 [prestige] on them, to a maximum of 3 [agenda].
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "hunter",
  },

  "hah-go-for-broke": {
    name: "Go For Broke",
    text: md`
At the start of your turn, if you control 1+ Ongoing Schemes, gain 1 [agenda].

When a Scheme you play succeeds, if you did not play an Influence Modifier during it, gain 1 [agenda].
    `,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "vampire",
  },

  "hah-symbolic-meaning": {
    name: "Symbolic Meaning",
    text: md`
The first time you defeat a Monster during each of your turns, gain 1 [agenda] for each Relic you control, to a maximum of 3 [agenda].
    `,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "hunter",
  },

  "hah-the-ash-heap-of-history": {
    name: "The Ash Heap of History",
    text: md`
**Exhaust:** If there are 5+ cards in your discard pile, gain 1 [agenda]. If exactly 11 cards, gain 2 [agenda] instead.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "vampire",
  },

  "xxx-balance-in-all-things": {
    name: "Balance in All Things",
    text: md`
At the end of your turn, if you control 2 characters each with exactly 2 attachments, gain 1 [agenda].
If you control 3 characters each with exactly 2 attachments, gain 2 [agenda] instead.

If you reach 13 [agenda], you win!
    `,
    illustrator: "Joyce Maureira",
    set: "Promo",
    stack: "agenda",
    cardpool: "vampire",
  },

  "xxx-race-to-the-bottom": {
    name: "Race to the Bottom",
    text: md`
When you place a '-1 [blood-potency]' token on 1+ characters in a foe's coterie, gain 1 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Joyce Maureira",
    set: "Promo",
    stack: "agenda",
    cardpool: "vampire",
  },

  "xxx-the-killing-moon": {
    name: "The Killing Moon",
    text: md`
At the start of your turn, if you control 1+ Prey, gain 1 [agenda].

When a character in your coterie performs diablerie, gain 2 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Promo",
    stack: "agenda",
    cardpool: "vampire",
  },
};
