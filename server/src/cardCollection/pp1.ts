import { 
    CardId,
    CardSet,
    Illustrator,
    Cardpool,
    Clan,
    Discipline,
    md } from "./common.js";
  
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

// Faction Cards

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
        **Pay 1 [blood]:** Reveal an Influence Modifier in your hand, then put it face-down into your Haven.
        Put 1 [blood] from your general supply on that card, which is now a Ghoul.
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
        **Pay 1 [prestige]:** Place 1 [agenda] on target character.
        If they are controlled by your rival, lose 1 [prestige].
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
        Attacker - Reveal the top card of the defender's Library.
        If it's not an Attack card, +1 [damage].
        If it is an Attack card, negate the target's Reaction (if any).
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
        Attacker - If this attack causes the target to become **Wounded**, exhaust the target and put a Fear token on them.
        This attack deals +1 [damage] to the target if the defending party has 3+ characters.
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

}