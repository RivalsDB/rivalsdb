import {
    AttackType,
    CardId,
    CardSet,
    Clan,
    Discipline,
    Illustrator,
    LibraryCardType,
    Cardpool,
    md } from "./common.js";
  
  export type Agenda = {
    stack: "agenda";
    name: string;
    text: string;
    illustrator: Illustrator;
    set: CardSet;
    cardpool: Cardpool;
  }
  
  export type Haven = {
    stack: "haven";
    name: string;
    text: string;
    illustrator: Illustrator;
    set: CardSet;
    cardpool: Cardpool;
}
  
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
}

export type Library = {
    stack: "library";
    name: string;
    types: LibraryCardType[];
    clan?: Clan;
    bloodPotencyRequirement?: number;
    damage?: number;
    shield?: number;
    attack?: AttackType | AttackType[];
    reactions?: AttackType | AttackType[];
    text: string;
    disciplines?: Discipline[];
    illustrator: Illustrator;
    set: CardSet;
    cardpool: Cardpool;
};

export const agendas: Record<CardId, Agenda> = {

//Agendas    

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

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

"xxx-tent-city": {
    stack: "haven",
    name: "Tent City",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**  
        While your coterie has characters from 3+ different clans, characters in your coterie have +1 Secrecy.
        `,
    illustrator: "Felipe Gaona",
    set: "Promo",
    cardpool: "vampire",
},

"xxx-the-underpass": {
    stack: "haven",
    name: "The Underpass",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        **Pay 1 [prestige]:** Mend 1 [blood] on a character in your coterie or torpor for each Animal and/or _Vagrant_ you have attached to your Leader.
    `,
    illustrator: "Felipe Gaona",
    set: "Promo",
    cardpool: "vampire",
},

"xxx-the-presidio": {
    stack: "haven",
    name: "The Presidio",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        Your Leader has +1 [shield] vs **Aggravated** [damage].
    `,
    illustrator: "Marco Primo",
    set: "Promo",
    cardpool: "vampire",
},

"xxx-apartment-111": {
    stack: "haven",
    name: "Apartment 111",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Solitary** characters in your coterie have +1 Secrecy in The Streets, +1 Intel, and +1 Influence.
        At the end of your Beginning Phase, ready each character in your coterie.
    `,
    illustrator: "Marco Primo",
    set: "Promo",
    cardpool: "vampire",
},

"xxx-dancing-house": {
    stack: "haven",
    name: "Dancing House",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        **Discard 1 card:** Move a non-Title attachment from a card you control to another card you control (does not trigger attach effects).
    `,
    illustrator: "Felipe Gaona",
    set: "Promo",
    cardpool: "vampire",
},

"xxx-old-police-station": {
    stack: "haven",
    name: "Old Police Station",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        When your Leader defeats a character, you may use up to 3 [blood] of your color that was on that character to play a Ritual at no cost.
        (You may add [blood] from other sources as well.)
    `,
    illustrator: "Marco Primo",
    set: "Promo",
    cardpool: "vampire",
},

"xxx-prague-national-bank": {
    stack: "haven",
    name: "Prague National Bank",
    text: md`
        You start the game with 25 [prestige].
        If this card leaves play, lose 3 [prestige].
    `,
    illustrator: "Marco Primo",
    set: "Promo",
    cardpool: "vampire",
},

"xxx-youth-hostel": {
    stack: "haven",
    name: "Youth Hostel",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        When a character in your coterie is attacked, they have +1 [shield] for each character in the attacking party with [blood-potency] higher than theirs.
    `,
    illustrator: "Mara Miranda-Escota",
    set: "Promo",
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards

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
        At the start of your turn, look at the top card of your Library or Faction Deck.
        Leave it or move it to the bottom of the deck.
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
        Attacker - **Pay 1 [prestige]:** This attack deals +1 [damage] to the target.
        At the end of this attack, you may move this character to your haven.
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
        This character has +1 Influence.
        Pay 1 [blood]: Put a 'No Influence' token on target character.
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

}

export const library: Record<CardId, Library> = {

    //Library Cards
    
}