import { CardId, CardSet, Illustrator, Cardpool, md } from "./common.js";

export type Agenda = {
  stack: "agenda";
  name: string;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
  cardpools: Cardpool[];
};

export const agendas: Record<CardId, Agenda> = {

// Core //

"core-base-of-power": {
  name: "Base of Power",
  text: md`
    When a character in your coterie attaches a Title, gain 2 [agenda].
    If you reach 13 [agenda], you win!
  `,
  illustrator: "The Creation Studio",
  set: "Core",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"core-drain-them-slowly": {
  name: "Drain Them Slowly",
  text: md`
    When an attack you make deals 1+ non-**Aggravated** [damage] to 1+ characters but does not defeat them, gain 2 [agenda].
  `,
  illustrator: "Marco Primo",
  set: "Core",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"core-manipulate-the-masses": {
  name: "Manipulate the Masses",
  text: md`
    When a Scheme you play suceeds, gain 1 [agenda].
    If you reach 13 [agenda], you win!
  `,
  illustrator: "The Creation Studio",
  set: "Core",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"core-strength-in-numbers": {
  name: "Strength in Numbers",
  text: md`
    At the start of your turn, if you control 3 characters in The Streets, gain 1 [agenda].
    If you control 4+ characters each with 2+ Blood in The Streets, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Felipe Gaona",
  set: "Core",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"core-turf-war": {
  name: "Turf War",
  text: md`
    When you defeat a non-Rival character, gain 1 [agenda].
    When you defeat a character with 5+ Blood, gain 1 [agenda].
    If you reach 13 agenda, you win!
  `,
  illustrator: "The Creation Studio",
  set: "Core",
  stack: "agenda",
  cardpools: ["Vampire"],
},

// Blood and Alchemy //

"baa-knowledge-is-power": {
  name: "Knowledge is Power",
  text: md`
    The first time your Leader exhausts in The Streets during each of your turns, if you have 6+ Library cards in your hand, gain 1 [agenda]. If exactly 10 Library cards, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Darko Stojanovic",
  set: "Blood & Alchemy",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"baa-rites-of-the-blood": {
  name: "Rites of the Blood",
  text: md`
    The first time you play a Ritual during each of your turns, gain 1 [agenda].
    If you put 3+ Blood on that Ritual, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Felipe Gaona",
  set: "Blood & Alchemy",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"baa-street-brew": {
  name: "Street Brew",
  text: md`
    At the start of your turn, if you have a character with Alchemy in your coterie, gain 1 [agenda].
    If 3+ characters in your coterie have Alchemy, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!.
  `,
  illustrator: "Felipe Gaona",
  set: "Blood & Alchemy",
  stack: "agenda",
  cardpools: ["Vampire"],
},

// Wolf and Rat //

"war-animal-kingdom": {
  name: "Animal Kingdom",
  text: md`
    At the start of your turn, gain 1 [agenda] if you control 1+ Animals.
    If you control 3+ different Animals, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Felipe Gaona",
  set: "Wolf & Rat",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"war-call-of-the-wild": {
  name: "Call of the Wild",
  text: md`
    When you attach an Animal to a character in your coterie in The Streets who has no Animals attached, gain 1 [agenda].
    If you control 3+ different Animals, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Harvey Bunda",
  set: "Wolf & Rat",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"war-hoard-the-herd": {
  name: "Hoard the Herd",
  text: md`
    At the end of your turn, if there are no unattached City Deck Citizens or Vagrants in The Streets, gain 1 [agenda].
    If there are no unattached City Deck Mortals, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Mara Miranda-Escota",
  set: "Wolf & Rat",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"war-invisible-army": {
  name: "Invisible Army",
  text: md`
    When you defeat a Vagrant, gain 1 [agenda].
    When you attach a Vagrant to a character in your coterie, gain 1 [agenda].
    When you defeat a character with an attached Vagrant, gain 1 [agenda].
  `,
  illustrator: "Harvey Bunda",
  set: "Wolf & Rat",
  stack: "agenda",
  cardpools: ["Vampire"],
},

// Shadows and Shrouds //

"sas-death-is-only-the-beginning": {
  name: "Death is Only the Beginning",
  text: md`
    **Exhaust:** If you have 1+ characters in torpor, gain 1 [agenda].
    If you have 3+, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Irene Francisco",
  set: "Shadows & Shrouds",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"sas-most-impressive": {
  name: "Most Impressive",
  text: md`
    At the start of your turn, if your [blood potency] in The Streets is higher than each individual foes' [blood potency] in The Streets, gain 1 [agenda]. 
    During each of your turns, the first time you increase the [blood potency] of a character you control in The Streets, gain 2 [agenda].
  `,
  illustrator: "Mara Miranda-Escota",
  set: "Shadows & Shrouds",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"sas-prizefighter": {
  name: "Prizefighter",
  text: md`
    As you attack a character, put 1 [agenda] on your attacker.
    At the end of your turn, put 1 [agenda] from a character in your coterie on your Agenda card.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Felipe Gaona",
  set: "Shadows & Shrouds",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"sas-wake-the-dead": {
  name: "Wake the Dead",
  text: md`
    **Exhaust:** If you control 1+ wraiths, gain 1 [agenda].
    If you control 3+ [wraiths], gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Felipe Gaona",
  set: "Shadows & Shrouds",
  stack: "agenda",
  cardpools: ["Vampire"],
},

// Heart of Europe //

"hoe-disheveled-shelves": {
  name: "Disheveled Shelves",
  text: md`
    At the start of your turn, if your Rival's Library has no cards in it, you win the game.
    If you would cause a foe to discard cards, you may have that foe draw that many cards instead.
  `,
  illustrator: "Felipe Gaona",
  set: "Heart of Europe",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Dragon and Rogue //

"dar-army-of-the-dragon": {
  name: "Army of the Dragon",
  text: md`
    Each time you play a Ghoul, gain 1 [agenda].
    If you attach 2+ Retainers to that Ghoul when played, gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Felipe Gaona",
  set: "Dragon & Rogue",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"dar-raising-the-stakes": {
  name: "Raising the Stakes",
  text: md`
    The first time you place 1+ [prestige] on a card you control that already has 2+ tokens on it during each of your turns, gain 1 [agenda].
    The first time you resolve a face-down card with 4+ tokens on it during each player's turn, gain 2 [agenda].
  `,
  illustrator: "Adelijah Ocampo",
  set: "Dragon & Rogue",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Justice and Mercy //

"jam-army-of-one": {
  name: "Army of One",
  text: md`
    At the start of your turn, if you control only 1 character, gain 1 [agenda].
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Marco Primo",
  set: "Justice & Mercy",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"jam-ritual-master": {
  name: "Ritual Master",
  text: md`
    At the start of your turn, if there is 3+ [blood] on Ongoing cards you control, draw 1 card and gain 1 [agenda].
    During each player's turn, the first time you remove the last [blood] from a Ritual you control, gain 1 [agenda].
  `,
  illustrator: "Marco Primo",
  set: "Justice & Mercy",
  stack: "agenda",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Hunter and Hunted //

"hah-the-snake-den": {
  name: "The Snake Den",
  text: md`
    At the start of your turn, if you control 1+ face-down card with 1+ [prestige] on them, gain 1 [agenda].
    The first time you resolve a Conspiracy during each of your turns, gain 1 [agenda].
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"hah-birds-of-different-feathers": {
  name: "Birds of Different Feathers",
  text: md`
    At the start of your turn, if there are 6+ different Disciplines or Edges in your coterie, gain 1 [agenda].
  `,
  illustrator: "Mara Miranda-Escota",
  set: "Hunters & Hunted",
  stack: "agenda",
  cardpools: ["Hunter", "Vampire"],
},

"hah-martyrdom": {
  name: "Martyrdom",
  text: md`
    When a character you control is burned, gain 1 [agenda].
  `,
  illustrator: "Mara Miranda-Escota",
  set: "Hunters & Hunted",
  stack: "agenda",
  cardpools: ["Hunter"],
},

"hah-observe-and-report": {
  name: "Observe and Report",
  text: md`
    When you attach a card to a card you do not control, gain 1 [agenda].
  `,
  illustrator: "Mico Dimagiba",
  set: "Hunters & Hunted",
  stack: "agenda",
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
},

"hah-symbolic-meaning": {
  name: "Symbolic Meaning",
  text: md`
    The first time you defeat a Monster during each of your turns, gain 1 [agenda] for each Relic you control, to a maximum of 3 [agenda].
  `,
  illustrator: "Adelijah Ocampo",
  set: "Hunters & Hunted",
  stack: "agenda",
  cardpools: ["Hunter"],
},

"hah-the-ash-heap-of-history": {
  name: "The Ash Heap of History",
  text: md`
    **Exhaust:** If there are 5+ cards in your discard pile, gain 1 [agenda].
    If exactly 11 cards, gain 2 [agenda] instead.
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  stack: "agenda",
  cardpools: ["Vampire"],
},


// Martial Law //

"ml-ghoul-master": {
  name: "Ghoul Master",
  text: md`
    At the start of your turn, if you control 1+ Ghouls, gain 1 [agenda].
    During each player's turn, the first time a Ghoul you control attacks, Blocks, or uses an activated ability, gain 1 [agenda].
  `,
  illustrator: "Marco Primo",
  set: "Martial Law",
  stack: "agenda",
  cardpools: ["Vampire"],
},

"ml-kill-tally": {
  name: "Kill Tally",
  text: md`
    When you defeat a character you do not control, gain 1 [agenda].
    When you deal damage to an attacker you do not control, gain 1 [agenda].
  `,
  illustrator: "Adelijah Ocampo",
  set: "Martial Law",
  stack: "agenda",
  cardpools: ["Hunter", "Vampire"],
},

"ml-unrelenting-pressure": {
  name: "Unrelenting Pressure",
  text: md`
    The first time you recruit a character with a **Relentless** ability during each of your turns, gain 1 [agenda].
    The first time you play a Library card with **Relentless** during each of your turns, gain 1 [agenda].
  `,
  illustrator: "Mico Dimagiba",
  set: "Martial Law",
  stack: "agenda",
  cardpools: ["Hunter"],
},

// Fang and Talon //

"fat-expand-the-pack": {
  name: "Expand the Pack",
  text: md`
    When you recruit a werewolf, gain 1 [agenda]. If you control 3 or fewer werewolves after resolving a recruit action, gain 1 additional [agenda].
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  stack: "agenda",
  cardpools: ["Werewolf"],
},

"fat-inhuman-rites": {
  name: "Inhuman Rites",
  text: md`
    Each time you place a Rite with 2+ Rage on it, gain 1 [agenda]. If you put 3+ Rage on that Rite when you place it, gain 2 [agenda] instead.
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  stack: "agenda",
  cardpools: ["Werewolf"],
},

"fat-leader-of-the-pack": {
  name: "Leader of the Pack",
  text: md`
    Each time your Leader targets another Leader to attack, gain 1 [agenda]. When you defeat a Leader, gain 1 [agenda]. At the end of your turn, if your Leader is the only Leader in The Streets, gain 1 [agenda].
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  stack: "agenda",
  cardpools: ["Werewolf"],
},

"fat-no-quarter-given": {
  name: "No Quarter Given",
  text: md`
    The first time you defeat an unattached City Deck Mortal during each of your turns, gain 1 [agenda]. Each time you defeat the only unattached City Deck Mortal in The Streets, gain 1 [prestige].
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  stack: "agenda",
  cardpools: ["Werewolf"],
},

"fat-shapes-of-death": {
  name: "Shapes of Death",
  text: md`
    At the start of your turn, if you have 1+ character(s) in a Form, gain 1 [agenda]. If you have 3+ characters in 3 different Forms, gain 2 [agenda] instead.
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  stack: "agenda",
  cardpools: ["Werewolf"],
},

// Prince Pack 2

"pp2-discipline-of-the-sensei": {
  name: "Discipline of the Sensei",
  text: md`
    If 1 Reaction card entered foes' discard piles this turn, **Exhaust this card:** Gain 2 [agenda].
    If 2+ Reaction cards entered foes' discard piles this turn, gain 3 [agenda] instead.

  `,
  illustrator: "Anastasiia Horbunova",
  set: "Prince Pack 2",
  stack: "agenda",
  cardpools: ["Vampire", "Hunter"],
},

"pp2-power-behind-the-throne": {
  name: "Power Behind the Throne",
  text: md`
    **Exert 35 Influence:** You win the game!
  `,
  illustrator: "Anastasiia Horbunova",
  set: "Prince Pack 2",
  stack: "agenda",
  cardpools: ["Vampire"],
},


// Promo //

"xxx-kiss-the-ring": {
  name: "Kiss The Ring",
  text: md`
    The first time a Titled character in your coterie attacks a character during each of your turns, you may Exert 2 Influence: gain 1 [agenda] or Exert 5 Influence: gain 2 [agenda] instead.
    If you reach 13 [agenda], you win!
  `,
  illustrator: "Joyce Maureira",
  set: "Promo",
  stack: "agenda",
  cardpools: ["Vampire"],
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
    cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},
};
