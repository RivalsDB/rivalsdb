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
        During each player's turn, the first time you remove the last [blood] from a Ritual you control, gain 1 [agenda].
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

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

"jam-the-hermitage": {
    stack: "haven",    
    name: "The Hermitage",
    text: md`
        Characters in your Haven have +1 Secrecy.
        When you recruit a character, gain 1 [prestige].
        If they are Salubri, gain 2 [prestige] instead and draw 1 Faction card.
    `,
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},
    
"jam-ritual-room": {
    stack: "haven",
    name: "Ritual Room",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        When your Leader deals damage to a character, put that lost [blood] onto Rituals you control.
    `,
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
    },
    
"jam-the-castle": {
    stack: "haven",
    name: "The Castle",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Discard 1 card:** Mend 1 [blood] on target character (including in torpor); mend 2 [blood] instead if they are in torpor.
        If the target is the only character in their coterie, draw 1 card.
    `,
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},
    
"jam-the-high-horse": {
    stack: "haven",
    name: "The High Horse",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        When you play a Tradition, draw 1 card.
        Reduce the [prestige] cost of Traditions you play by 1.
    `,
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards


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
        When another character in your coterie would be defeated, burn this character instead.
        Then put 1 [blood] onto your other character from the general supply and they are not defeated.
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
        **Exhaust**: Mend 2 [blood] on target character (including in torpor).
        If you don't control the target, draw 1 card.
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

}

export const library: Record<CardId, Library> = {

    //Library Cards

"jam-look-me-in-the-eyes": {
    stack: "library",
    name: "Look Me in the Eyes",
    types: ["reaction"],
    //clan:,
    bloodPotencyRequirement: 3,
    //damage:,
    shield: 1,
    attack:["physical"],
    reactions: ["physical"],
    text: md`
        Put a Fear token on the attacker.
        **Solitary** - Draw 1 card.
        [auspex] You may play an additional Reaction.
    `,
    disciplines:["auspex"],
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-third-eyes-a-charm": {
    stack: "library",
    name: "Third Eye's a Charm",
    types: ["reaction"],
    clan: "salubri",
    bloodPotencyRequirement: 4,
    //damage:,
    shield: 1,
    attack:["physical", "mental", "social", "ranged"],
    reactions: ["physical", "mental", "social", "ranged"],
    text: md`
        If this attack defeats the defender, gain 3 [prestige].
        If this attack does not defeat the defender, deal 3 [mental][damage] to the attacker.
    `,
    //Discipline:[],
    illustrator: "Irene Francisco",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-acuity": {
    stack: "library",
    name: "Acuity",
    types: ["reaction"],
    //clan:,
    bloodPotencyRequirement: 1,
    //damage:,
    shield: 1,
    attack:["ranged", "mental"],
    reactions: ["ranged", "mental"],
    text: md`
        Put a '-1 [blood potency]' token on the attacker.
        **Solitary** - Draw 1 card.
        [dominate] You may play an additional Reaction.
    `,
    disciplines:["dominate"],
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-warding-circle": {
    stack: "library",
    name: "Warding Circle",
    types: ["reaction"],
    //clan:,
    bloodPotencyRequirement: 2,
    //damage:,
    shield: 0,
    attack:["ranged", "mental", "physical"],
    reactions: ["ranged", "mental", "physical"],
    text: md`
        Each character in this party has +1 [shield] for each Ritual you control.
    `,
    //disciplines:[],
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-a-kiss-before-dying": {
    stack: "library",
    name: "A Kiss Before Dying",
    types: ["reaction"],
    //clan:,
    bloodPotencyRequirement: 2,
    //damage:,
    shield: 1,
    attack:["social"],
    reactions: ["social"],
    text: md`
        Deal 1 **Aggravated** [damage] to the attacker.
        **Solitary** - Draw 1 card.
        [fortitude] You may play an additional Reaction.
    `,
    disciplines:["fortitude"],
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-on-the-lam": {
    stack: "library",
    name: "On the Lam",
    types: ["reaction"],
    //clan:,
    bloodPotencyRequirement: 4,
    //damage:,
    shield: 1,
    attack:["physical", "social"],
    reactions: ["physical", "social"],
    text: md`
        +2 [shield] for each Prey attached to the defender.
        [obfuscate] If the defender would be burned by this attack, put them into torpor instead.
    `,
    disciplines:["obfuscate"],
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-just-a-taste": {
    stack: "library",
    name: "Just a Taste",
    types: ["reaction", "special"],
    //clan:,
    bloodPotencyRequirement: 4,
    //damage:,
    shield: 0,
    //attack:[],
    //reactions: [],
    text: md`
        May only be played by a character with **Solitary**.
        You may play this to aid any character.
        Target defender in The Streets mends 2 [blood].
    `,
    //disciplines:[],
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-rules-lawyer": {
    stack: "library",
    name: "Rules Lawyer",
    types: ["reaction"],
    //clan:,
    bloodPotencyRequirement: 3,
    //damage:,
    shield: 1,
    attack:["social", "mental"],
    reactions: ["social", "mental"],
    text: md`
        +1 [shield] for each different Ongoing Tradition you control.
    `,
    //disciplines:[],
    illustrator: "János Orbán",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-of-two-minds": {
    stack: "library",
    name: "Of Two Minds",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 5,
    damage: 1,
    //shield:,
    attack:["mental"],
    //reactions: ["mental"],
    text: md`
        [auspex] If this attack does not defeat the target, ready the attacker.
        **Solitary** - Gain 1 Action if played during your turn.
    `,
    disciplines:["auspex"],
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-ritualistic-combat": {
    stack: "library",
    name: "Ritualistic Combat",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 3,
    damage: 1,
    //shield:,
    attack:["mental"],
    //reactions: [],
    text: md`
        +2 [damage] to Antagonists.
        [blood sorcery] If the target is defeated, the attacker mends 1 [blood] for each Ritual you control.
    `,
    disciplines:["blood sorcery"],
    illustrator: "Darko Stojanovic",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-divisive": {
    stack: "library",
    name: "Divisive",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 4,
    damage: 1,
    //shield:,
    attack:["mental"],
    //reactions: [],
    text: md`
        +2 [damage] to City Deck Mortals.
        [dominate] +1 [damage] for each Retainer attacked to the target.
    `,
    disciplines:["dominate"],
    illustrator: "Adelijah Ocampo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-bleeding-edge": {
    stack: "library",
    name: "Bleeding Edge",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 4,
    damage: 1,
    //shield:,
    attack:["physical"],
    //reactions: [],
    text: md`
        **Pay 2** [blood]: +2 [damage].
        [fortitude][fortitude] **Pay 1** [blood] instead.
    `,
    disciplines:["fortitude"],
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-cursed-blade": {
    stack: "library",
    name: "Cursed Blade",
    types: ["attack"],
    clan:"banu haqim",
    bloodPotencyRequirement: 3,
    damage: 1,
    //shield:,
    attack:["physical"],
    //reactions: [],
    text: md`
        After this attack, you may attach _Cursed Blade_ to the target.
        At the end of this character's turn, this character loses 1 [blood].
`,
    //disciplines:["fortitude"],
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-split-second": {
    stack: "library",
    name: "Split Second",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 4,
    damage: 1,
    //shield:,
    attack:["physical"],
    //reactions: [],
    text: md`
        [celerity] The target's [physical] attribute does not reduce the [damage] from this attack.
    `,
    disciplines:["celerity"],
    illustrator: "Darko Stojanovic",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-blood-fueled-rage": {
    stack: "library",
    name: "Blood-Fueled Rage",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 5,
    damage: 0,
    //shield:,
    attack:["physical"],
    //reactions: [],
    text: md`
        **Remove up to 1 [blood] from each Ongoing card you control:** +2 [damage] for each [blood] removed this way.
    `,
    //disciplines:["fortitude"],
    illustrator: "Darko Stojanovic",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-dont-be-so-defensive": {
    stack: "library",
    name: "Don't Be So  Defensive",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 4,
    damage: 1,
    //shield:,
    attack:["social"],
    //reactions: [],
    text: md`
        +1 [damage] for every 2 Reactions in the defending player's discard pile.
    `,
    //disciplines:["fortitude"],
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-the-grudge": {
    stack: "library",
    name: "The Grudge",
    types: ["attack"],
    //clan:,
    bloodPotencyRequirement: 3,
    damage: 1,
    //shield:,
    attack:["social"],
    //reactions: [],
    text: md`
        +1 [damage] for each of your characters who is in torpor or has been burned this game.
        If you have suffered diablerie, all of this attack's [damage] becomes **Aggravated**.
    `,
    //disciplines:["fortitude"],
    illustrator: "Felipe Gaona",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-accept-your-fate": {
    stack: "library",
    name: "Accept Your Fate",
    types: ["2 actions", "ritual", "ongoing", "action"],
    //clan:,
    //bloodPotencyRequirement: 3,
    //damage: 1,
    //shield:,
    //attack:["social"],
    //reactions: [],
    text: md`
        [blood sorcery] **Place 1 to 3 [blood] of your color on this card.**
        Ongoing - When a character plays a Reaction during your turn, they lose 1 [blood], then remove 1 [blood] from this.
    `,
    disciplines:["blood sorcery"],
    illustrator: "Adelijah Ocampo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-ishtars-touch": {
    stack: "library",
    name: "Ishtar's Touch",
    types: ["2 actions", "ritual", "ongoing", "action"],
    //clan:,
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        [blood sorcery] **Place 1 to 3 [blood] of your color on this card.**
        Ongoing - **Remove 1 [blood] from this:** Put a '- discipline' token on target character.
    `,
    disciplines:["blood sorcery"],
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-one-with-the-blade": {
    stack: "library",
    name: "One With the Blade",
    types: ["2 actions", "ritual", "ongoing", "action"],
    clan:"banu haqim",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        [blood sorcery] **Place 1 to 3 [blood] of your color on this card.**
        Ongoing - **Remove 1 [blood] from this:** Your attacker deals +1 [damage] to the target for each [blood] of your color on the target.
    `,
    disciplines:["blood sorcery"],
    illustrator: "Irene Francisco",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-secrets-of-the-blood": {
    stack: "library",
    name: "Secrets of the Blood",
    types: ["2 actions", "ritual", "ongoing", "action"],
    //clan:,
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        [blood sorcery] **Place 1 to 3 [blood] of your color on this card.** Ongoing - Your characters have +1 Intel.
        **Remove 2 [blood] from this:** Steal 1 [agenda] from target foe with 9+ [agenda].
    `,
    disciplines:["blood sorcery"],
    illustrator: "Marco Primo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-call-to-purpose": {
    stack: "library",
    name: "Call to Purpose",
    types: ["ongoing", "unhosted action"],
    clan: "banu haqim",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - The first time each turn you play a Ritual using only [blood] from characters you do not control, ready 1 character in your coterie **OR** gain 1 Action.
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Mara Miranda-Escota",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-study-their-ways": {
    stack: "library",
    name: "Study Their Ways",
    types: ["ongoing", "action"],
    //clan: "banu haqim",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Put a '+ discipline' token on this card and gain 1 Action.
        Ongoing - If you control only 1 character, they gain this discipline (leave it on this card).
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Adelijah Ocampo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-obeah": {
    stack: "library",
    name: "Obeah",
    types: ["ongoing", "action"],
    disciplines: ["auspex", "fortitude"],
    //clan: "banu haqim",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing, **Relentless - Exhaust:** Target a character.
        If you have [auspex] in your coterie, you may remove 1 Affliction from the target.
        If you have [fortitude] in your coterie, you may mend 1 [blood] on the target if they are **Wounded**.
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Adelijah Ocampo",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-soul-thieving": {
    stack: "library",
    name: "Soul Thieving",
    types: ["action"],
    clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        [auspex] Attach to target character.
        When this character is defeated by the controller of this card, they may steal another card attached to this character and attach it to a character in their coterie.
    `,
    disciplines:["auspex"],
    illustrator: "Irene Francisco",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-blood-doll": {
    stack: "library",
    name: "Blood Doll",
    types: ["action"],
    //clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to the acting character.
        At the start of your turn, mend 1 [blood] on this character.
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Darko Stojanovic",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-kevlar-vest": {
    stack: "library",
    name: "Kevlar Vest",
    types: ["action"],
    //clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to the acting character (max 1).
        This character has +1 [shield] vs **Aggravated** [damage].
        **Detach:** Prevent 1 [damage] to this character.
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Irene Francisco",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-search-for-golconda": {
    stack: "library",
    name: "Search for Golconda",
    types: ["action"],
    clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to the acting character (max 1).
        If this is the only character you control, you may **Exhaust this character, Pay 2** [prestige]: Gain 1 [agenda].
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Mara Miranda-Escota",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-thought-police": {
    stack: "library",
    name: "Thought Police",
    types: ["action"],
    clan: "banu haqim",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Name an Attack type, then look at target player's hand and discard all Reaction cards with that type.
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Mara Miranda-Escota",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-unburdening-the-bestial-soul": {
    stack: "library",
    name: "Unburdening the Bestial Soul",
    types: ["action"],
    clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to target character.
        This character may not perform diablerie and deals -1 [damage] to Mortals.
        **Aggravated** [damage] this character would deal becomes non-**Aggravated**.
    `,
    //disciplines:["blood sorcery"],
    illustrator: "Joyce Maureira",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-righteousness": {
    stack: "library",
    name: "Righteousness",
    types: ["action"],
    //clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Mend 2 [blood] on target character you control for each Ongoing Tradition in play.
    `,
    //disciplines:["blood sorcery"],
    illustrator: "János Orbán",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-final-judgement": {
    stack: "library",
    name: "Final Judgement",
    types: ["action"],
    //clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Deal 1 [social][damage] to target character for each Ongoing Tradition you control.
        **Discard X Traditions:** +X [damage]
    `,
    //disciplines:["blood sorcery"],
    illustrator: "János Orbán",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-blink": {
    stack: "library",
    name: "Blink",
    types: ["unhosted action"],
    //clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to a character in your coterie.
        Attacker - This character has +3 [shield] while attacking.
        [celerity] At the end of this attack, you may move this character to your Haven.
    `,
    disciplines:["celerity"],
    illustrator: "Darko Stojanovic",
    set: "Justice & Mercy",
    cardpool: "vampire",
},

"jam-cats-grace": {
    stack: "library",
    name: "Cat's Grace",
    types: ["unhosted action"],
    //clan: "salubri",
    //bloodPotencyRequirement: ,
    //damage: ,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to a character in your coterie and draw 1 card.
        [celerity] At the end of your turn, ready this character.
    `,
    disciplines:["celerity"],
    illustrator: "Darko Stojanovic",
    set: "Justice & Mercy",
    cardpool: "vampire",
},    

}