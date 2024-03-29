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

// Agendas

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
        When a Scheme you play suceeds, gain 1 [agenda].
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
        At the start of your turn, if you control 3 characters in The Streets, gain 1 [agenda].
        If you control 4+ characters each with 2+ Blood in The Streets, gain 2 [agenda] instead.
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
        When you defeat a non-Rival character, gain 1 [agenda].
        When you defeat a character with 5+ Blood, gain 1 [agenda].
        If you reach 13 agenda, you win!
    `,
    illustrator: "The Creation Studio",
    set: "Core",
    stack: "agenda",
    cardpool: "vampire",
},

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

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
    cardpool: "vampire",
    },
    
"core-dragons-roost": {
    stack: "haven",
    name: "Dragon's Roost",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        If ready, you may move your Leader to The Streets (if they are not already there) to Block a foe's attack (including [ranged]).
        If the attack targeted a character, gain 1 [prestige].
    `,
    illustrator: "Felipe Gaona",
    set: "Core",
    cardpool: "vampire",
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
    cardpool: "vampire",
    },
    
"core-old-post-office": {
    stack: "haven",
    name: "Old Post Office",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        Once during each player's turn, you may place a card fro your hand with 1-3 Blood Potence as an Influence Modifier.
        When revealed, gain Influence equal to the card's Blood Potence value.
    `,
    illustrator: "Cold Castle Studios",
    set: "Core",
    cardpool: "vampire",
    },
    
"core-royal-retreat": {
    stack: "haven",
    name: "Royal Retreat",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        Characters with a Title in your coterie have +1 Influence.
        Discard an unattached City Deck Mortal in The Streets: Add a new card to The Streets.
    `,
    illustrator: "Cold Castle Studios",
    set: "Core",
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards

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
    text: md`
        At the end of your turn, you may attach a Retainer in this party to another characer in this party (does not trigger "attach" effects).'
    `,
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
        When a Scheme you play succedds, gain 1 prestige.
        Exhaust: This character has +2 influence during this action or event
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

"core-randolph-marz": {
    stack: "faction",
    name: "Randolph Marz",
    text: md`
        Party - Discard a Title: This attack deals +1 damage to the target.
        Additional +1 damage if this character is Prince of the City.
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

}

export const library: Record<CardId, Library> = {

//Library Cards

"core-38-special": {
    stack: "library",
    name: ".38 Special",
    text: md`

    `,
    illustrator: "The Creation Studio",
    types: ["attack", "reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack: "ranged",
    damage: 2,
    cardpool: "vampire",
},

"core-a-biting-comment": {
    stack: "library",
    name: "A Biting Comment",
    text: md`
        Chose one: +2 Damage OR steal 1 Prestige from your foe.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 4,
    attack: "social",
    damage: 0,
    shield: 0,
    cardpool: "vampire",
},

"core-all-tied-up": {
    stack: "library",
    name: "All Tied Up",
    text: md`
        Play this card face down and place 1 prestige on it.
        If this card has 2+ prestige on it, you may resolve it during your turn.
        Target foe who did not contribute exhaust all of their characters.
    `,
    illustrator: "Marco Primo",
    types: ["action", "conspiracy"],
    set: "Core",
    clan: "malkavian",
    cardpool: "vampire",
},

"core-assert-authority": {
    stack: "library",
    name: "Assert Authority",
    text: md`
        Ongoing - Your Leader has +1 Influence for each foe in the game.
    `,
    illustrator: "The Creation Studio",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    clan: "ventrue",
    cardpool: "vampire",
},

"core-backhanded-compliment": {
    stack: "library",
    name: "Backhanded Compliment",
    text: md`
        If the target is not defeated, your foe must mend them by spending Prestige equal to the Damage taken, but cannot spend their last Prestige this way.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    clan: "toreador",
    bloodPotencyRequirement: 5,
    attack: "social",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-balance-of-power": {
    stack: "library",
    name: "Balance of Power",
    text: md`
        Choose at least hald of the players (including yourseld). 
        Influence Conflict - Should each chosen player steal 1 Prestige from an unchosen player?
    `,
    illustrator: "Felipe Gaona",
    types: ["action", "scheme"],
    set: "Core",
    clan: "toreador",
    cardpool: "vampire",
},

"core-baseball-bat": {
    stack: "library",
    name: "Baseball Bat",
    text: md`
        +1 Damage to City Deck Mortals.
    `,
    illustrator: "The Creation Studio",
    types: ["attack", "reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack: "physical",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-beauty-is-a-beast": {
    stack: "library",
    name: "Beauty is a Beast",
    text: md`
        Ongoing - During a Social attack against a City Deck Mortal, Exhaust: The attacker deals +1 damage to the target.
    `,
    illustrator: "Marco Primo",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    clan: "toreador",
    cardpool: "vampire",
},

"core-blood-for-blood": {
    stack: "library",
    name: "Blood for Blood",
    text: md`
        Ongoing - When a character in your coterie makes a physic attack, they have the ability Pay 1 blood: Deal +1 Damage to the target.
    `,
    illustrator: "Darko Stojanovic",
    types: ["action", "ongoing"],
    set: "Core",
    clan: "brujah",
    cardpool: "vampire",
},

"core-burning-down-the-house": {
    stack: "library",
    name: "Burning Down the House",
    text: md`
        Play this card face down and place 1 prestige on it. 
        If this card has 3+ prestige on it, you may resolve it during your turn. 
        Burn target Ongoing card controlled by a foe who did not contribute.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "conspiracy"],
    set: "Core",
    cardpool: "vampire",
},

"core-cloak-of-shadows": {
    stack: "library",
    name: "Cloak of Shadows",
    text: md`
        Each character in this party has +1 [shield] for each [obfuscate] in this party.
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack: ["ranged", "physical"],
    reactions: ["ranged", "physical"],
    //damage: 0,
    shield: 0,
    disciplines: ["obfuscate"],
    cardpool: "vampire",
},

"core-coup-de-grace": {
    stack: "library",
    name: "Coup de Grâce",
    text: md`
        Use only in The Streets. 
        Potence pay 2 blood: Defeat target **Wounded** character not in their Haven.
    `,
    illustrator: "The Creation Studio",
    types: ["action"],
    set: "Core",
    disciplines: ["potence"],
    cardpool: "vampire",
},

"core-demand-obedience": {
    stack: "library",
    name: "Demand Obedience",
    text: md`
        If this party has 2+ Dominate, your foe loses 2 Prestige.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 4,
    attack: "mental",
    damage: 1,
    shield: 0,
    disciplines: ["dominate"],
    cardpool: "vampire",
},

"core-destroy-the-plans": {
    stack: "library",
    name: "Destroy the Plans",
    text: md`
        Play this card face down and place 1 prestige on it. 
        If this card has 3+ prestige on it, you may resolve it during your turn. 
        Target foe who did not contribute discards 3 cards.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "conspiracy"],
    set: "Core",
    cardpool: "vampire",
},

"core-dignity-of-the-office": {
    stack: "library",
    name: "Dignity of the Office",
    text: md`
        +2 [shield] for each character with a Title in your coterie.
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    attack:["physical", "social"],
    reactions: ["physical", "social"],
    set: "Core",
    clan: "ventrue",
    bloodPotencyRequirement: 3,
    //attack: "physical",
    damage: 0,
    shield: 0,
    cardpool: "vampire",
},

"core-distraction": {
    stack: "library",
    name: "Distraction",
    text: md`
        Ongoing - Discard this card: Redirect up to 2 Second Inquisition damage you would take during your End Phase to target foe.
    `,
    illustrator: "Marco Primo",
    types: ["action", "ongoing"],
    set: "Core",
    clan: "malkavian",
    cardpool: "vampire",
},

"core-drive-by": {
    stack: "library",
    name: "Drive-By",
    text: md`
        Deal 2 Damage to an additional member of the opposing party for each character with Celerity in this party. 
        (Can't target the same character twice).
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    clan: "brujah",
    bloodPotencyRequirement: 4,
    attack: "ranged",
    damage: 2,
    shield: 0,
    disciplines: ["celerity"],
    cardpool: "vampire",
},

"core-dumpster-dive": {
    stack: "library",
    name: "Dumpster Dive",
    text: md`
        Put a card from your discard pile into your hand. 
        If your coterie has 2+ Auspex, draw 1 card.
    `,
    illustrator: "Drew Tucker",
    types: ["action"],
    set: "Core",
    clan: "malkavian",
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"core-emergency-bloodbag": {
    stack: "library",
    name: "Emergency Bloodbag",
    text: md`
        Add 3 blood from the general supply to this card. 
        Ongoing - At the start of your turn, you may place a token from this card onto a **Wounded** character in your coterie or in torpor. 
        When empty, burn this card.
    `,
    illustrator: "Drew Tucker",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    cardpool: "vampire",
},

"core-everything-is-connected": {
    stack: "library",
    name: "Everything is Connected",
    text: md`
        If you have Auspex in your coterie, add 1 Prestige from the general supply to each face-down card you control.
    `,
    illustrator: "The Creation Studio",
    types: ["action"],
    set: "Core",
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"core-fame-and-fortune": {
    stack: "library",
    name: "Fame & Fortune",
    text: md`
        Influence Conflict - Should I gain 2 Prestige and 1 Agenda?
    `,
    illustrator: "Marco Primo",
    types: ["action", "scheme"],
    set: "Core",
    clan: "toreador",
    cardpool: "vampire",
},

"core-faulty-logic": {
    stack: "library",
    name: "Faulty Logic",
    text: md`
        Your foe contributes 1 Prestige to a face-down card of your choosing. 
        If you resolve that card this turn, you may target that foe.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    clan: "malkavian",
    bloodPotencyRequirement: 2,
    attack: "social",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-first-tradition-the-masquerade": {
    stack: "library",
    name: "First Tradition: The Masquerade",
    text: md`
        Pay 2 prestige. 
        Ongoing - Your vampires outside your Haven have +1 Secrecy. 
        If you defeat 2 Mortals during a single turn, burn this card.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    cardpool: "vampire",
},

"core-fleetness": {
    stack: "library",
    name: "Fleetness",
    text: md`
        +2 [shield] for each [celerity] this character has.
    `,
    illustrator: "Felipe Gaona",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 2,
    attack: ["ranged", "physical"],
    reactions: ["ranged", "physical"],
    shield: 0,
    disciplines: ["celerity"],
    cardpool: "vampire",
},

"core-fragmented-mind": {
    stack: "library",
    name: "Fragmented Mind",
    text: md`
        Your foe discard 1 card for each character with Dominate in this party.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 4,
    attack: "mental",
    damage: 0,
    shield: 0,
    disciplines: ["dominate"],
    cardpool: "vampire",
},

"core-free-money": {
    stack: "library",
    name: "Free Money",
    text: md`
        Influence Conflict - Should each plater gain 3 Prestige?
    `,
    illustrator: "Krasen Maximov",
    types: ["action", "scheme"],
    set: "Core",
    cardpool: "vampire",
},

"core-gang-up": {
    stack: "library",
    name: "Gang Up",
    text: md`
        +1 Damage for each Retainer in this party.
    `,
    illustrator: "Drew Tucker",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 0,
    shield: 0,
    cardpool: "vampire",
},

"core-greed": {
    stack: "library",
    name: "Greed",
    text: md`
        Influence Conflict - Should I gain 2 Agenda?
    `,
    illustrator: "The Creation Studio",
    types: ["action", "scheme"],
    set: "Core",
    clan: "ventrue",
    cardpool: "vampire",
},

"core-hedge-your-bets": {
    stack: "library",
    name: "Hedge Your Bets",
    text: md`
        Gain 2 Influence during this action or event. 
        If this is a Scheme and it fails, gain 1 agenda.
    `,
    illustrator: "The Creation Studio",
    types: ["influence modifier"],
    set: "Core",
    cardpool: "vampire",
},

"core-herald": {
    stack: "library",
    name: "Herald",
    text: md`
        Exert 2 Influence: Attach to the acting character. 
        You pay 1 less Prestige to recruit characters. 
        (Add the last blood from the general supply).
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 2,
    cardpool: "vampire",
},

"core-holdout-dagger": {
    stack: "library",
    name: "Holdout Dagger",
    text: md`
        +1 Damage for each Obfuscate in this party.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 0,
    attack: "physical",
    damage: 0,
    shield: 0,
    disciplines: ["obfuscate"],
    cardpool: "vampire",
},

"core-humiliate": {
    stack: "library",
    name: "Humiliate",
    text: md`
        If this party has 2+ Presence, +1 Damage
    `,
    illustrator: "Drew Tucker",
    types: ["attack", "reaction"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    shield: 0,
    disciplines: ["presence"],
    cardpool: "vampire",
},

"core-incite-rebellion": {
    stack: "library",
    name: "Incite Rebellion",
    text: md`
        Pay 1 blood: Burn 1 Retainer in the opposing party. 
        Gain no rewards for this.
    `,
    illustrator: "Marco Primo",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-influencer": {
    stack: "library",
    name: "Influencer",
    text: md`
        Pay 1 prestige. 
        Ongoing - Each character with Presence in your coterie has +1 Influence.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    disciplines: ["presence"],
    cardpool: "vampire",
},

"core-insanity-defense": {
    stack: "library",
    name: "Insanity Defense",
    text: md`
        Additional +1 [shield] against [mental] attacks.
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    set: "Core",
    clan: "malkavian",
    bloodPotencyRequirement: 0,
    attack: ["physical", "mental", "social"],
    reactions:["physical", "mental", "social"],
    //damage: 0,
    shield: 2,
    cardpool: "vampire",
},

"core-irresistible-voice": {
    stack: "library",
    name: "Irresistible Voice",
    text: md`
        Presence pay 2 blood: Steal 1 Retainer from the target. 
        If this party has Dominate, Pay 1 blood instead.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 4,
    attack: "mental",
    damage: 2,
    shield: 0,
    disciplines: ["dominate", "presence"],
    cardpool: "vampire",
},

  "core-keeper-of-elysium": {
    stack: "library",
    name: "Keeper of Elysium",
    text: md`
        Exert 4 Influence: Attach to the acting character. 
        Characters in your Haven have +1 Secrecy.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 4,
    cardpool: "vampire",
},

"core-kneecapped": {
    stack: "library",
    name: "Kneecapped",
    text: md`
        Discard 1 card: +3 Damage to Second Inquisition.
    `,
    illustrator: "Marco Primo",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-know-your-place": {
    stack: "library",
    name: "Know Your Place",
    text: md`
        +1 Damage if the attacker has a Title. 
        Id the attacker is Prince of the City, +2 Damage instead.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-late-night-snack": {
    stack: "library",
    name: "Late-Night Snack",
    text: md`
        For each Fortitude in your coterie, mend 1 blood on a character in your coterie or in torpor
    `,
    illustrator: "Felipe Gaona",
    types: ["action"],
    set: "Core",
    disciplines: ["fortitude"],
    cardpool: "vampire",
},

"core-lightning-strike": {
    stack: "library",
    name: "Lightning Strike",
    text: md`
        If this party has 2+ Celerity, this attack ignores all Resistance.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 2,
    shield: 0,
    disciplines: ["celerity"],
    cardpool: "vampire",
},

"core-long-term-investment": {
    stack: "library",
    name: "Long-Term Investment",
    text: md`
        Pay 1 to 3 Prestige: Add double that amount of Prestige from the general supply to this card. 
        Ongoing - At the start of your turn, gain 1 Prestige from this card. 
        When empty, burn this card.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "ongoing"],
    set: "Core",
    clan: "ventrue",
    cardpool: "vampire",
},

"core-lost-glory": {
    stack: "library",
    name: "Lost Glory",
    text: md`
        Play this card face down and place 1 prestige on it. 
        If this card has 4+ prestige on it, you may resolve it during your turn. 
        Target foe who did not contribute loses 1 agenda. 
        If they have 9+ agenda, they lose 2 agenda instead.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "conspiracy"],
    set: "Core",
    cardpool: "vampire",
},

"core-marked-man": {
    stack: "library",
    name: "Marked Man",
    text: md`
        Put 1 Agenda from the general supply onto any character. 
        If a player defeats them, they gain that agenda.
    `,
    illustrator: "Marco Primo",
    types: ["unhosted action"],
    set: "Core",
    clan: "ventrue",
    cardpool: "vampire",
},

"core-mercy": {
    stack: "library",
    name: "Mercy",
    text: md`
        Influence Conflict - Should each player mend 4 blood on a character in their coterie or in torpor?
    `,
    illustrator: "The Creation Studio",
    types: ["action", "scheme"],
    set: "Core",
    cardpool: "vampire",
},

"core-molotov-cocktail": {
    stack: "library",
    name: "Molotov Cocktail",
    text: md`
        **Aggravated** - Discard 1 card: Deal 1 **Aggravated** Damage to each of the other characters in the opposing party.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "ranged",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-power-play": {
    stack: "library",
    name: "Power Play",
    text: md`
        +1 Damage for each character with a Title in this party.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 5,
    attack: "mental",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-pr-firm": {
    stack: "library",
    name: "PR Firm",
    text: md`
        Ongoing - When a Scheme you play suceeds, you may Pay 1 prestige: Gain 1 agenda.
    `,
    illustrator: "Darko Stojanovic",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    clan: "toreador",
    cardpool: "vampire",
},

"core-primogen": {
    stack: "library",
    name: "Primogen",
    text: md`
        Exert 3 Influence: Attach to the acting character. 
        This character has +1 Influence. 
        This character deals +1 Damage to characters with a Title.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 3,
    cardpool: "vampire",
},

"core-rain-on-your-parade": {
    stack: "library",
    name: "Rain on Your Parade",
    text: md`
        If your foe has 9+ Agenda, they lose 1 Agenda.
    `,
    illustrator: "Marco Primo",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-royal-review": {
    stack: "library",
    name: "Royal Review",
    text: md`
        Gain 1 Prestige for each Title in your coterie.
    `,
    illustrator: "Darko Stojanovic",
    types: ["action"],
    set: "Core",
    clan: "ventrue",
    cardpool: "vampire",
},

"core-scoped-30-06": {
    stack: "library",
    name: "Scoped .30-06",
    text: md`
        During your Intel Step, you may play this card face up as your Attack card to add +1 Intel to this attack.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "ranged",
    damage: 2,
    shield: 0,
    cardpool: "hunter and vampire",
},

"core-scry-the-soul": {
    stack: "library",
    name: "Scry the Soul",
    text: md`
        If this party has 2+ Auspex, negate the target's Reaction (if any).
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "mental",
    damage: 1,
    shield: 0,
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"core-search-engine": {
    stack: "library",
    name: "Search Engine",
    text: md`
        Ongoing - Exhaust: If you have Auspex in your coterie, look at the top card of your Library or Faction Deck. 
        Leave it or move it to the bottom of the deck.
    `,
    illustrator: "The Creation Studio",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"core-seduction": {
    stack: "library",
    name: "Seduction",
    text: md`
        Chose one: Steal 1 blood from the target OR this attack deals +1 Damage to a City Deck Mortal for each Presence in this party.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 0,
    shield: 0,
    disciplines: ["presence"],
    cardpool: "vampire",
},

"core-seneschal": {
    stack: "library",
    name: "Seneschal",
    text: md`
        Exert 5 Influence: Attach to the acting character. 
        Action: Target foe loses 1 Prestige. 
        If no one controls the Prince of the City, they lose 2 instead.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 5,
    cardpool: "vampire",
},

"core-sheriff": {
    stack: "library",
    name: "Sheriff",
    text: md`
        Exert 4 Influence: Attach to the acting character. 
        Exhaust this character: Burn target Ongoing card. 
        Use this ability only in The Streets.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 4,
    cardpool: "vampire",
},

"core-slap-in-the-face": {
    stack: "library",
    name: "Slap in the Face",
    text: md`
        Deal [physical] to the attacker (add this character's [physical] to the damage).
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack:["social", "mental"],
    reactions:["social", "mental"],
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-smoke-em-out": {
    stack: "library",
    name: "Smoke 'Em Out",
    text: md`
        Use only in The Streets. 
        Move all characters from target Haven to The Streets. 
        Deal 1 **Aggravated** Damage to each exhausted character moved this way.
    `,
    illustrator: "The Creation Studio",
    types: ["action"],
    set: "Core",
    clan: "brujah",
    cardpool: "vampire",
},

"core-steal-the-spotlight": {
    stack: "library",
    name: "Steal the Spotlight",
    text: md`
        If this character is a Blocker, the attacker loses 2 Blood.
    `,
    illustrator: "Marco Primo",
    types: ["reaction"],
    set: "Core",
    clan: "toreador",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 0,
    shield: 2,
    cardpool: "vampire",
},

"core-sucker-punch": {
    stack: "library",
    name: "Sucker Punch",
    text: md`
        Targeted (You may retarget this attack to any legal target in the opposing party.)
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    clan: "brujah",
    bloodPotencyRequirement: 2,
    attack: "physical",
    damage: 1,
    cardpool: "vampire",
},

"core-terrorize": {
    stack: "library",
    name: "Terrorize",
    text: md`
        Exhaust all characters in the opposing party.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    clan: "brujah",
    bloodPotencyRequirement: 3,
    attack: "mental",
    damage: 2,
    shield: 0,
    cardpool: "vampire",
},

"core-the-last-word": {
    stack: "library",
    name: "The Last Word",
    text: md`
        Gain 5 Influence during this action or event. 
        If this is a Scheme and your side wins, gain 1 prestige.
    `,
    illustrator: "The Creation Studio",
    types: ["influence modifier"],
    set: "Core",
    cardpool: "vampire",
},

"core-the-mighty-fall": {
    stack: "library",
    name: "The Mighty Fall",
    text: md`
        +2 Damage if the target has 5+ blood.
    `,
    illustrator: "Marco Primo",
    types: ["attack", "reaction"],
    set: "Core",
    bloodPotencyRequirement: 2,
    attack: "mental",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-the-spoils": {
    stack: "library",
    name: "The Spoils",
    text: md`
        Ongoing - When an attacker in your coterie defeats another character, each character in the attacker's party mend 1 blood.
    `,
    illustrator: "The Creation Studio",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    clan: "brujah",
    cardpool: "vampire",
},

"core-throat-rip": {
    stack: "library",
    name: "Throat Rip",
    text: md`
        +1 Damage for each character with Potence in this party.
    `,
    illustrator: "Felipe Gaona",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 4,
    attack: "physical",
    damage: 1,
    shield: 0,
    disciplines: ["potence"],
    cardpool: "vampire",
},

"core-unhinged": {
    stack: "library",
    name: "Unhinged",
    text: md`
        Discard up to 2 cards: For each discard, deal +1 Damage to the target.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    clan: "malkavian",
    bloodPotencyRequirement: 3,
    attack: "mental",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"core-unswayable-mind": {
    stack: "library",
    name: "Unswayable Mind",
    text: md`
        If this party has 2+ [fortitude], negate the game text effects of the attacker's Attack card (but not the inherent damage or keywords).
    `,
    illustrator: "Felipe Gaona",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack: ["social", "mental"],
    reactions:["social", "mental"],
    //damage: 0,
    shield: 1,
    disciplines: ["fortitude"],
    cardpool: "vampire",
},

"core-whispering-campaign": {
    stack: "library",
    name: "Whispering Campaign",
    text: md`
        Play this card face down and place 1 prestige on it. 
        If this card has 4+ prestige on it, you may resolve it during your turn. 
        Steal 2 prestige from target foe who did not contribute.
    `,
    illustrator: "Felipe Gaona",
    types: ["action", "conspiracy"],
    set: "Core",
    cardpool: "vampire",
},



}