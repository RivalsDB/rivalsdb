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
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
},

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

"war-city-park": {
    stack: "haven",
    name: "City Park",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        When your Leader exhausts, reveal the top card of your Library.
        If it's an Animal, draw it. Otherwise, leave it or discard it.
    `,
    illustrator: "Harvey Bunda",
    set: "Wolf & Rat",
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards

"war-bobby-handsome": {
    stack: "faction",
    name: "Bobby Handsome",
    text: md`

        **Guard**
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
        Exhaust, Pay 1 [blood]: Attach an Animal from your hand to any character in your coterie.
        Ignore normal attach requirements.
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
        Attacker - If this character has 1+ Retainers, the target has -1 [shield].
        If this character has 2+ Retainers, this attack also deals +1 [damage].
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
        Exhaust: Remove 1 token from target Ongoing or unattached face-down card controlled by any player.
        Use this ability only in The Streets.
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
        Attacker - If alone in a party, attacks made by this character cannot be Blocked.
        At the end of this attack, you may move this character to your Haven.
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
        At the end of your turn, if this character has 1+ Animal attached, ready them.
        If 2+ Animals are attached, they also mend 1 [blood].
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

}

export const library: Record<CardId, Library> = {

//Library Cards

"war-alley-cat": {
    stack: "library",
    name: "Alley Cat",
    text: md`
        [animalism] Pay 1 [blood]: Attach to the acting character. 
        This character has +1 Secrecy in The Streets.
        Detach: Burn target Animal or Retainer attached to a character in The Streets. 
        Then burn this card.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
    cardpool: "vampire",
},

"war-animal-dominion": {
    stack: "library",
    name: "Animal Dominion",
    text: md`
        [animalism] Burn X Animals from characters in your coterie and/or discard X Animals from your hand: Deal X [physical] [damage] to target character in The Streets
    `,
    illustrator: "Timothy Terrenal",
    types: ["action"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 5,
    disciplines: ["animalism"],
    cardpool: "vampire",
},

"war-apex-predator": {
    stack: "library",
    name: "Apex Predator",
    text: md`
        Put a Fear token on the target. 
        If the attacker is your Leader, exhaust the target and ready your Leader.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotencyRequirement: 4,
    attack: "social",
    damage: 2,
    cardpool: "vampire",
},

"war-bad-reflection": {
    stack: "library",
    name: "Bad Reflection",
    text: md`
        Deal [mental] [damage] to the attacker equal to the [damage] they are dealing to you (prior to damage prevention).
    `,
    illustrator: "Harvey Bunda",
    types: ["reaction"],
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotencyRequirement: 4,
    attack: ["physical", "social"],
    reactions: ["physical", "social"],
    cardpool: "vampire",
},

"war-beasts-of-war": {
    stack: "library",
    name: "Beasts of War",
    text: md`
        Superficial
        +1 [damage] for each Animal in this party. 
        (This attack cannot reduce the target's [blood] below 1.)
    `,
    illustrator: "Irene Francisco",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 1,
    cardpool: "vampire",
},

"war-bond-famulus": {
    stack: "library",
    name: "Bond Famulus",
    text: md`
        Exhaust: The next Animal you play this turn costs 1 less [blood] to attach. 
        If a character spends an Action to play it, ready them.
    `,
    illustrator: "Joyce Maureira",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-constant-surveillance": {
    stack: "library",
    name: "Constant Surveillance",
    text: md`
        Pay 1 [prestige]: Cover target foe's Agenda or Haven with this card, or pay 1 additional [prestige] to cover both.
        Ongoing - Covered cards have no text. 
        At the start of your next turn, burn this card.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ongoing"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-cornered-rat": {
    stack: "library",
    name: "Cornered Rat",
    text: md`
        Attacker - Deal [damage] equal to this character's [blood] minus their current [blood].
        Reaction - Deal 1 [physical] [damage] to the attacker for every 2 [damage] they are dealing to you (prior to damage prevention).
    `,
    illustrator: "Harvey Bunda",
    types: ["attack", "reaction"],
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotencyRequirement: 3,
    attack: ["physical","mental"],
    reactions: ["physical", "mental"],
    damage: 0,
    cardpool: "vampire",
},

"war-cracking-the-case": {
    stack: "library",
    name: "Cracking the Case",
    text: md`
        Add 4 [prestige] from the general supply to this card.
        Remove X [prestige] from this card: Target attacker has +X Intel for this attack. 
        When empty, burn this.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-disturbing-the-hive": {
    stack: "library",
    name: "Disturbing the Hive",
    text: md`
        +1 [damage] for each The Swarm in this party and in your discard pile. 
        If the attacker has [obfuscate], negate all Reaction.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotencyRequirement: 4,
    attack: "ranged",
    damage: 1,
    disciplines: ["obfuscate"],
    cardpool: "vampire",
},

"war-earth-meld": {
    stack: "library",
    name: "Earth Meld",
    text: md`
        [protean] Attach to the acting character and they mend 2 [blood].
        This character has +2 Secrecy. 
        At the start of your next turn, discard this card.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action"],
    set: "Wolf & Rat",
    disciplines: ["protean"],
    cardpool: "vampire",
},

"war-feeding-frenzy": {
    stack: "library",
    name: "Feeding Frenzy",
    text: md`
        +1 [damage] if the attacker is **Wounded**.
        [fortitude] If this attack defeats the target, the attacker mends 2 [blood].
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 1,
    disciplines: ["fortitude"],
    cardpool: "vampire",
},

"war-feeding-the-hungry": {
    stack: "library",
    name: "Feeding the Hungry",
    text: md`
        Put 1 Vagrant from the burned pile into The Streets.
    `,
    illustrator: "Harvey Bunda",
    types: ["action"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-feral-claws": {
    stack: "library",
    name: "Feral Claws",
    text: md`
        [protean] **Aggravated**
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 2,
    attack: "physical",
    damage: 0,
    disciplines: ["protean"],
    cardpool: "vampire",
},

"war-feral-fangs": {
    stack: "library",
    name: "Feral Fangs",
    text: md`
        Play this card face up.
        +1 [damage] for each [protean] this character has.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 2,
    disciplines: ["protean"],
    cardpool: "vampire",
},

"war-feral-whispers": {
    stack: "library",
    name: "Feral Whispers",
    text: md`
        Add 3 [blood] from the general supply to this.
        [animalism] At the start of your turn, you may Remove 1 [blood] from this: Put 1 Animal from your discard pile into your hand. 
        When empty, burn this.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "ongoing"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
    cardpool: "vampire",
},

"war-fight-or-flight": {
    stack: "library",
    name: "Fight or Flight",
    text: md`
        Attacker - If this attack is Blocked, negate the target's Reaction (if any).
        Reaction - +1 [shield]. Additional +1 [shield] for each [fortitude] this character has. 
        This deals no [damage] to the attacker.
    `,
    illustrator: "Timothy Terrenal",
    types: ["attack", "reaction"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 3,
    attack: "mental",
    reactions: ["mental"],
    damage: 1,
    disciplines: ["fortitude"],
    cardpool: "vampire",
},

"war-hardened-flesh": {
    stack: "library",
    name: "Hardened Flesh",
    text: md`
        +1 [shield] for each [fortitude] this character has.
    `,
    illustrator: "Timothy Terrenal and Harvey Bunda",
    types: ["reaction"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 2,
    attack: ["ranged", "physical"],
    reactions: ["ranged", "physical"],
    shield: 1,
    disciplines: ["fortitude"],
    cardpool: "vampire",
},

"war-help-me-help-you": {
    stack: "library",
    name: "Help Me Help You",
    text: md`
        When a character in your coiteries attaches a Retainer, mend 1 [blood] on any character in your coterie or torpor.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-hiding-in-plain-sight": {
    stack: "library",
    name: "Hiding in Plain Sight",
    text: md`
        Discard 1 card: Antagonist [damage] cannot be assigned to your characters in The Streets with [protean] or [obfuscate] this turn.
    `,
    illustrator: "Irene Francisco",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
    disciplines: ["obfuscate", "protean"],
    cardpool: "vampire",
},

"war-mongrel": {
    stack: "library",
    name: "Mongrel",
    text: md`
        [animalism] Pay 2 [blood]: Attach to the acting character.
        Attacker - This attack deals +1 [damage] to the target.
        Detach: Prevent 2 [physical] [damage] to this character.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
    cardpool: "vampire",
},

"war-murder-of-crows": {
    stack: "library",
    name: "Murder of Crows",
    text: md`
        [animalism] Pay 1 [blood]: Attach to the acting character.
        Party - Attackers in this party have +1 Intel vs characters in The Streets.
        Detach: Target character in The Streets loses 1 [blood]. 
        If this defeats the target, burn this card.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
    cardpool: "vampire",
},

"war-protect-the-flock": {
    stack: "library",
    name: "Protect the Flock",
    text: md`
        Ongoing - Exhaust: Put 1 [blood] of your color from the general supply on target Mortal. 
        (Each [blood] added to a Mortal increases the [damage] needed to defeat them.)
    `,
    illustrator: "Timothy Terrenal",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-second-tradition-the-domain": {
    stack: "library",
    name: "Second Tradition: The Domain",
    text: md`
        Ongoing - Exhaust: Attach a City Deck Citizen or Vagrant in The Streets to this card (max 2). 
        They are still in The Streets and may be attacked. 
        Foes must pay you 1 [prestige] to attack Mortals attached to this.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action", "ongoing"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-secret-passage": {
    stack: "library",
    name: "Secret Passage",
    text: md`
        Ongoing - Exhaust: Return 1 character in your coterie to your Haven, maintainin their ready or exhausted state.
    `,
    illustrator: "Timothy Terrenal",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
    clan: "nosferatu",
    cardpool: "vampire",
},

"war-seeing-is-believing": {
    stack: "library",
    name: "Seeing is Believing",
    text: md`
        [obfuscate] The target's [mental] attribute does not reduce the damage from this attack.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 4,
    attack: "mental",
    disciplines: ["obfuscate"],
    cardpool: "vampire",
},

"war-sewer-rat": {
    stack: "library",
    name: "Sewer Rat",
    text: md`
        [animalism] Attach to the acting character.
        Exhaust Sewer Rat: Mend 1 [blood] on a **Wounded** character in this party.
        Detach: Steal 1 [blood] from target character in torpor and add it to any character.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
    cardpool: "vampire",
},

"war-shape-of-the-beast": {
    stack: "library",
    name: "Shape of the Beast",
    text: md`
        Ongoing - Exhaust 1 character with [protean] in your coterie: Gain 1 Unhosted Action this turn.
        Pay 1 [blood] from the exhausting character: Gain 1 Action instead.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
    clan: "gangrel",
    disciplines: ["protean"],
    cardpool: "vampire",
},

"war-spy-games": {
    stack: "library",
    name: "Spy Games",
    text: md`
        Steal a Rival token from target foe. 
        At the start of your next turn, return it.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action"],
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotencyRequirement: 5,
    cardpool: "vampire",
},

"war-the-shakedown": {
    stack: "library",
    name: "The Shakedown",
    text: md`
        Name an attack type.
        Then look at target foe's hand and discard all Attack cards with that type.
        If the acting character has the _Sheriff_ Title, gain 1 [prestige] for each card discarded this way.
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Wolf & Rat",
    cardpool: "vampire",
},

"war-the-stampede": {
    stack: "library",
    name: "The Stampede",
    text: md`
        The target has -1 [shield] for each character in this party.
        [potence] +1 [damage]
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 4,
    attack: "physical",
    damage: 1,
    disciplines: ["potence"],
    cardpool: "vampire",
},

"war-the-swarm": {
    stack: "library",
    name: "The Swarm",
    text: md`
        [animalism] Attach to the acting character.
        Party - This party has +1 [shield] during non-**Aggravated** [ranged] and [physical] attacks.
        Detach: Prevent 1 **Aggravated** [damage] to this character.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
    cardpool: "vampire",
},

"war-veiled-threat": {
    stack: "library",
    name: "Veiled Threat",
    text: md`
        +1 [damage] for each [obfuscate] this character has.
        Attach Veiled Threat face down to the target if they have 2 or fewer attachments.
    `,
    illustrator: "Drew Tucker",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    disciplines: ["obfuscate"],
    cardpool: "vampire",
},

"war-we-are-legend": {
    stack: "library",
    name: "We Are Legend",
    text: md`
        Gain 1 [prestige].
        Then draw 2 cards and discard 1 of them.
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Wolf & Rat",
    clan: "gangrel",
    cardpool: "vampire",
},

}