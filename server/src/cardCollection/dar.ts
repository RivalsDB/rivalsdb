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
        The first time you place 1+ [prestige] on a card you control that already has 2+ tokens on it during each of your turns, gain 1 [agenda].
        The first time you resolve a face-down card with 4+ tokens on it during each player's turn, gain 2 [agenda].
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

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

"dar-campsite": {
    stack: "haven",
    name: "Camp Site",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        Your Leader has +1 Secrecy.
        **Exhaust a character in your coterie and pay 1 Action:** You may replace this Haven with one from your collection.
    `,
    illustrator: "Adelijah Ocampo",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},
    
"dar-converted-bus": {
    stack: "haven",
    name: "Converted Bus",
    text: md`
        Your characters in The Streets have +1 Secrecy.
        **Leader Ability**
        When your Leader moves to The Streets, you may move 1 of their [blood] to another card you control (flipped to either side).
    `,
    illustrator: "Adelijah Ocampo",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},
    
"dar-country-estate": {
    stack: "haven",
    name: "Country Estate",
    text: md`
        \***\*Start of Game:** Attach a Ghoul from your Library to this.\*\*
        Characters in your Haven have +1 Secrecy and Ghouls you control in The Streets have +1 [shield].
        **Leader Ability**    
        When your Leader defeats a Citizen of _Vagrant_, you may play the Ghoul attached to this at no Action cost **OR** if you control a Ghoul, play a card at no Action cost.
    `,
    illustrator: "Irene Francisco",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},
    
"dar-social-housing": {
    stack: "haven",
    name: "Social Housing",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability** 
        Your Leader has **+1 Attachment**.    
        When your Leader defeats a City Deck Mortal, you may move a Retainer from a character you control to another character you control (does not trigger attach effects).
    `,
    illustrator: "Mara Miranda-Escota",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards

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
        **Exhaust:** Reveal the top 2 cards of your Library, then discard 1 and draw the other.
        Use this ability only in The Streets.
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

}

export const library: Record<CardId, Library> = {

    //Library Cards

    
"dar-backpacker": {
    stack: "library",
    name: "Backpacker",
    text: md`
        Attach your active Haven to a character in your coterie who doesn't have one attached and put another Haven from your collection into play as your active Haven.
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-bat-out-of-hell": {
    stack: "library",
    name: "Bat Out of Hell",
    text: md`
        **[animalism] Pay 1 [blood] to attach.**
        **Exhaust this character:** Draw 2 cards, then discard 1 of them.
        **Detach:** Target player discards 3 cards, then they may draw 2 cards.
    `,
    disciplines: ["animalism"],
    illustrator: "Irene Francisco",
    types: ["action", "animal"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-change-of-plans": {
    stack: "library",
    name: "Change of Plans",
    text: md`
        **Play this card face down and place 1 [prestige] on it.**
        Resolve during your turn if an Ongoing Event is in play. For each [prestige] on this, you may discard 1 unattached City Deck card from The Streets, then put the top card of the City Deck into The Streets.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "trap"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-cryptolect": {
    stack: "library",
    name: "Cryptolect",
    clan: "ravnos",
    text: md`
        Ongoing - You pay 1 less [prestige] to recruit vampires with 2+ [blood-potency] (add the last [blood]) from the general supply).
        When you recruit a Ravnos vampire, draw 1 card.
    `,
    illustrator: "Felipe Gaona",
    types: ["action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-domino-effect": {
    stack: "library",
    name: "Domino Effect",
    text: md`
        Ongoing, **Relentless - Exhaust:** The next time you resolve a face-down card with 1+ tokens on it this turn, place 1 of those tokens on another card you control.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-doomed-to-roam": {
    stack: "library",
    name: "Doomed to Roam",
    text: md`
        Attach a haven from your collection to a non-Leader character in your coterie.
        Ongoing - **Discard 1 card:** Remove your active Haven from the game and replace it with another Haven you control.
        Then you may return any of your characters in The Streets to your Haven.
    `,
    illustrator: "Joyce Maureira",
    types: ["unhosted action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-emperors-new-clothes": {
    stack: "library",
    name: "Emperor's New Clothes",
    text: md`
        **Play this card face down and place 1 [prestige] on it.**
        Resolve at any time.
        Target player who attached a card this turn burns 1 non-Title card (without effect) attached to a card they control for every 2 tokens on this card.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "trap"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-escape-artist": {
    stack: "library",
    name: "Escape Artist",
    bloodPotencyRequirement: 2,
    clan: "ravnos",
    shield: 1,
    text: md`
        +2 [shield] if you control 2+ unattached face-down and/or Ongoing cards.
    `,
    illustrator: "Felipe Gaona",
    types: ["reaction"],
    attack: ["ranged", "physical"],
    reactions: ["ranged", "physical"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-fata-morgana": {
    stack: "library",
    name: "Fata Morgana",
    clan: "ravnos",
    text: md`
        **Play this card face down and place 1 [prestige] on it.**
        Resolve any time during an attack.
        For every 2 [prestige] on this card, you may redirect 1 [damage] from this attack to target character in The Streets.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "trap"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-fear-tactics": {
    stack: "library",
    name: "Fear Tactics",
    text: md`
        [obfuscate] Steal 1 [prestige] from each foe who has a Fear token on a character in their coterie.
        Place the stolen [prestige] on cards you control or add them to your personal supply.
    `,
    disciplines: ["obfuscate"],
    illustrator: "Joyce Maureira",
    types: ["action"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-fifth-tradition-hospitality": {
    stack: "library",
    name: "Fifth Tradition: Hospitality",
    text: md`
        Each player moves their Leader to The Streets.
        If you control the _Prince of the City_, each foe gives you 1 [prestige].
        If the _Prince of the City_ is in the City Deck, locate it and put it into The Streets, then shuffle the City Deck.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-fleshcrafting": {
    stack: "library",
    name: "Fleshcrafting",
    clan: "tzimisce",
    text: md`
        [protean] Attach 1 unattached Citizen or _Vagrant_ in The Streets or City Deck burned pile to a character you control (this is not defeating them).
    `,
    disciplines: ["protean"],
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-freelancer": {
    stack: "library",
    name: "Freelancer",
    text: md`
        Add 3 [prestige] from the general supply to this card.
        Ongoing - **Remove 1 [prestige] from this:**
        The next time a character in your coterie plays an Action card this turn, ready them.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-grey-wolf": {
    stack: "library",
    name: "Grey Wolf",
    text: md`
        **[animalis] Pay 1 [blood] to attach.**
        When this character is attacked, the attacker loses 1 [blood].
        **Burn this card:** Attach 1 unattached Citizen or _Vagrant_ in The Streets to any character.
    `,
    disciplines: ["animalism"],
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-home-improvement": {
    stack: "library",
    name: "Home Improvement",
    text: md`
        Attach this card to your Haven.
        Ongoing - Your Leader has abilities based on # of attached _Home Improvements_. 1: At the start of your turn, mend 1 [blood] on your Leader. 2: Also, at the start of your turn, draw 1 card. 3: Also, +2 [shield].
    `,
    illustrator: "Felipe Gaona",
    types: ["action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-mask-of-a-thousand-faces": {
    stack: "library",
    name: "Mask of a Thousand Faces",
    text: md`
        [obfuscate] Add 3 [prestige] from the general supply to this card.
        Ongoing - **Relentless - Remove 1 [prestige] from this:** Swap 1 non-Leader character in your coterie with 1 in your hand, retaining state, tokens, and attachments. Pay any higher [blood-potency] difference in [prestige].
    `,
    disciplines: ["obfuscate"],
    illustrator: "Irene Francisco",
    types: ["unhosted action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-perimeter-defense": {
    stack: "library",
    name: "Perimeter Defense",
    text: md`
        **Play this card face down and place 1 [prestige] on it.**
        Resolve at any time.
        When a character in your Haven is attacked, they have +1 [shield] for each token on this.
        The attacker also loses 1 [blood] for each card attached to your Haven.
    `,
    illustrator: "Joyce Maureira",
    types: ["action", "trap"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-poachers-choice": {
    stack: "library",
    name: "Poacher's Choice",
    bloodPotencyRequirement: 3,
    damage: 2,
    text: md`
        If this attack defeats a character in The Streets, steal 1 Retainer attached to that character (does not trigger attach effects).
        [dominate] The defender's attached cards are blank during this attack.
    `,
    disciplines: ["dominate"],
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    attack: "social",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-secret-compartment": {
    stack: "library",
    name: "Secret Compartment",
    text: md`
        Ongoing - When you discard a card from your hand, you may attach it to this card face down (max. 3).
        When you would draw 1 card, you may put 1 card attached to this into your hand instead.
    `,
    illustrator: "Joyce Maureira",
    types: ["unhosted action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-siege-engine": {
    stack: "library",
    name: "Siege Engine",
    bloodPotencyRequirement: 0,
    damage: 1,
    text: md`
        +1 [damage] for each Ghoul you control. For each Ghoul with 3+ attachments, +2 [damage] instead.
        **Burn 1 Retainer attached to the attacker:** Burn target Ongoing card the defending player controls.
    `,
    illustrator: "Felipe Gaona",
    types: ["attack"],
    attack: "physical",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-sleight-of-hand": {
    stack: "library",
    name: "Sleight of Hand",
    bloodPotencyRequirement: 3,
    damage: 1,
    clan: "ravnos",
    text: md`
        If the defender played a Reaction, that player discards 1 card.
        If this party has [presence] and [obfuscate], also steal 1 [prestige] from the defending player.
    `,
    disciplines: ["presence", "obfuscate"],
    illustrator: "Irene Francisco",
    types: ["attack"],
    attack: "mental",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-slumlord": {
    stack: "library",
    name: "Slumlord",
    clan: "tzimisce",
    text: md`
        Gain 1 [prestige] for each Citizen attached to a card you control.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-smoke-and-mirrors": {
    stack: "library",
    name: "Smoke and Mirrors",
    bloodPotencyRequirement: 3,
    shield: 1,
    text: md`
        Put a Fear token on target character in the attacking Party.
        [obfuscate] The attacker's [damage] becomes **Superficial**. (This attack cannot reduce the target's [blood] below 1.)
    `,
    disciplines: ["obfuscate"],
    illustrator: "Felipe Gaona",
    types: ["reaction"],
    attack:["physical", "mental"],
    reactions: ["physical", "mental"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-switcharoo": {
    stack: "library",
    name: "Switcharoo",
    bloodPotencyRequirement: 2,
    damage: 1,
    text: md`
        When revealed, you may discard this card.
        If you do, declare a different Attack type, then you may play another Attack card face up.
    `,
    illustrator: "Felipe Gaona",
    types: ["attack"],
    attack: ["physical", "social", "mental"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-szlachta": {
    stack: "library",
    name: "Szlachta",
    bloodPotencyRequirement: 0,
    text: md`
        **[protean] Attach 1 Retainer you control (max. 1) and put 2 [blood] on this Ghoul.**
        **Guard**
        When defeated or burned, you may move the Retainer attached to this to a _Vozhd_ you control.
    `,
    disciplines: ["protean"],
    illustrator: "Felipe Gaona",
    types: ["action", "ghoul"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-the-hat-trick": {
    stack: "library",  
    name: "The Hat Trick",
    bloodPotencyRequirement: 2,
    damage: 1,
    text: md`
        [presence] If you defeat a Mortal in The Streets, you may place 1 [prestige] of your color from the general supply on a card you control.
        If this party has [animalism] and [obfuscate], gain 1 Unhosted Action if played during your turn.
    `,
    disciplines: ["presence", "animalism", "obfuscate"],
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    attack: "social",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-the-more-the-scarier": {
    stack: "library",
    name: "The More The Scarier",
    clan: "tzimisce",
    text: md`
        Ongoing - Characters in your coterie have +1 **Attachment**.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["unhosted action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-throwing-knives": {
    stack: "library",
    name: "Throwing Knives",
    clan: "ravnos",
    bloodPotencyRequirement: 2,
    damage: 3,
    text: md`
        You may distribute the [damage] to any characters in the defending party (max 2 [damage] to any character who was not the target).
    `,
    illustrator: "Felipe Gaona",
    types: ["attack"],
    attack: "ranged",
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-urban-fox": {
    stack: "library",
    name: "Urban Fox",
    text: md`
        **[animalism] Pay 1 [blood] to attach.**
        Ignore 1 Antagonist during your End Phase.
        **Burn this card:** Discard target Ongoing card a foe controls with 0-2 tokens on it.
    `,
    disciplines: ["animalism"],
    illustrator: "Mara Miranda-Escota",
    types: ["action", "animal"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-vicissitude": {
    stack: "library",
    name: "Vicissitude",
    clan: "tzimisce",
    text: md`
        Ongoing - **Start of Turn:** You may attach 1 card in your hand face down to a character in your coterie.
        **Exhaust:** Target attacker deals +1 [damage] if they have 1+ face-down attachments.
        If 3+, +2 [damage] instead.
    `,
    illustrator: "Joyce Maureira",
    types: ["action", "ongoing"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-vozhd": {
    stack: "library",
    name: "Vozhd",
    bloodPotencyRequirement: 0,
    text: md`
        **[protean] Attach 1+ Retainers you control to this (no max.).**
        When a Retainer is attached to this Ghoul, it gains 2 [blood] and 2 [physical] (place [blood] from the general supply on this).
    `,
    disciplines: ["protean"],
    illustrator: "Irene Francisco",
    types: ["action", "ghoul"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-wolf-spider": {
    stack: "library",
    name: "Wolf Spider",
    text: md`
        **[animalism] to attach.**
        Attackers must play their Attack cards face up when attacking this character.
        **Detach:** Put a Fear token on target character in their Haven.
    `,
    disciplines: ["animalism"],
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-back-with-a-vengeance": {
    stack: "library",
    name: "Back with a Vengeance",
    bloodPotencyRequirement: 3,
    damage: 0,
    text: md`
        Attacker - +1 [damage] for each attachment this character has.
        Reaction - Deal [physical] [damage] to the attacker (not [mental]).
        [protean] This Reaction [damage] becomes **Aggravated**.
    `,
    disciplines: ["protean"],
    illustrator: "Adelijah Ocampo",
    types: ["attack", "reaction"],
    attack: ["physical", "mental"],
    reactions: ["physical", "mental"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},

"dar-the-long-con": {
    stack: "library",
    name: "The Long Con",
    text: md`
        **Play this card face down and place 1 [prestige] on it.**
        [presence] Resolve any time a fow puts a token on a card during their Action Phase. For each [prestige] on this card, steal 1 [prestige] or [blood] from a card you have not stolen from this turn. Place each token on a card you control.
    `,
    disciplines: ["presence"],
    illustrator: "Mara Miranda-Escota",
    types: ["action", "trap"],
    set: "Dragon & Rogue",
    cardpool: "vampire",
},
}