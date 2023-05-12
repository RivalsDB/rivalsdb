import { CardId, CardSet, Illustrator, md } from "./common.js";

export type Agenda = {
  stack: "agenda";
  name: string;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
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
  },
  "dar-raising-the-stakes": {
    name: "Raising the Stakes",
    text: md`
The first time you place 1+ [prestige] on a card you control that already has 2+ tokens on it during each of your turns, gain 1 [agenda]. When your resolve a face-down card with 4+ tokens on it, gain 2 [agenda].

If you reach 13 [agenda], you win!
    `,
    illustrator: "Adelijah Ocampo",
    set: "Dragon & Rogue",
    stack: "agenda",
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
  },
};
