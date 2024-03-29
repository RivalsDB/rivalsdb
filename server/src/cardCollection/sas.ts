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
        As you attack a character, put 1 [agenda] on your attacker.
        At the end of your turn, put 1 [agenda] from a character in your coterie on your Agenda card.
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
        **Exhaust:** If you control 1+ wraiths, gain 1 [agenda].
        If you control 3+ [wraiths], gain 2 [agenda] instead.
        If you reach 13 [agenda], you win!
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    stack: "agenda",
    cardpool: "vampire",
},

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

"sas-eternal-life-mortuary": {
    stack: "haven",
    name: "Eternal Life Mortuary",
    text: md`
        Characters in your Haven have +1 Secrecy.    
        **Leader Ability**
        **Remove 2 [blood] from a character in your coterie (this may reduce them to 0):** Burn target unattached City Deck Vagrant or Citizen in The Streets.
    `,
    illustrator: "Marco Primo",
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},
    
"sas-mission-cemetery": {
    stack: "haven",
    name: "Mission Cemetery",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        **Burn a Retainer in your coterie:** Create a wraith and attach it to a character in your coterie.
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},
    
"sas-the-big-house": {
    stack: "haven",
    name: "The Big House",
    text: md`
        _Start of Game - Put 1 [prestige] from each foe's general supply on this._
        Characters in your Haven ha Secrecy.
        **Leader Ability**
        Character in your coterie ha [blood-potency].
        **Give a foe 1 [prestige] of their color from this:** Diablerize a vampire in that foe's coterie that your Leader just defeated.
    `,
    illustrator: "Felipe Gaona",
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},
    
"sas-the-tenderloin": {
    stack: "haven",
    name: "The Tenderloin",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        **Remove 1 [agenda] from X different sources you control:** You pay X less [prestige] to recruit your next character this turn.
        (Add the remaining [blood] from the general supply.)
    `,
    illustrator: "Marco Primo",
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards

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
        When you create a wraith, choose your wraith token instead of drawing it at random.
        Shuffle the stack after choosing.
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
        Party - **Pay 1 [agenda]:** This attack has +3 Intel.
        If the attack defeats the target, gain 1 [prestige].
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

}

export const library: Record<CardId, Library> = {

//Library Cards

"sas-bind-the-spirit": {
    stack: "library",
    name: "Bind the Spirit",
    text: md`
        [oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.
        Ongoing - **Relentless, Remove 1 [blood] from this:** Attach a wraith in your coterie to any character.
        When empty, burn this.
    `,
    illustrator: "János Orbán",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-court-of-blood": {
    stack: "library",
    name: "Court of Blood",
    text: md`
        **Exert 3 Influence:** Attach to the acting character.
        This character has +1 Influence.
        Party - **Detach** The attack diablerizes a vampire defeated by this attack.
    `,
    illustrator: "Marco Primo",
    types: ["action", "title"],
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotencyRequirement: 3,
    cardpool: "vampire",
},

"sas-mental-block": {
    stack: "library",
    name: "Mental Block",
    text: md`
        Ongoing - Your foes may not play cards with the same name as a card attached to this.
        [auspex] **Exhaust:** Detach any card attached to this. 
        Attach the top card of target foe's Library to this card.
    `,
    illustrator: "Harvey Bunda",
    types: ["unhosted action", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"sas-arms-of-ahriman": {
    stack: "library",
    name: "Arms of Ahriman",
    text: md`
        **Superficial**
        Deal 1 [physical] [damage] to target character in The Streets for each [potence] in this party.
        (This attack cannot reduce the target's [blood] below 1 unless Superficial is removed.)
        **[oblivion Pay 1 [agenda]:** This [damage] is not Superficial.
    `,
    illustrator: "Marco Primo",
    types: ["action"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 2,
    disciplines: ["potence", "oblivion"],
    cardpool: "vampire",
},

"sas-clairvoyance": {
    stack: "library",
    name: "Clairvoyance",
    text: md`
        [auspex] Look at target foe's hand.
        Choose 1 Library card there and place it on top of their Library.
        Then gain 1 Unhosted Action.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action"],
    set: "Shadows & Shrouds",
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"sas-cloud-memory": {
    stack: "library",
    name: "Cloud Memory",
    text: md`
        [dominate] If this attack deals 1+ [damage] to the target, that foe discards 1 random Library card from their Hand.
    `,
    illustrator: "Dawn Nique",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 1,
    attack: "mental",
    damage: 1,
    disciplines: ["dominate"],
    cardpool: "vampire",
},

"sas-diminish": {
    stack: "library",
    name: "Diminish",
    text: md`
        [oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.
        Ongoing - **Remove 1 [blood] from this:** Put a '-1 [blood-potency]' token on target character.
    `,
    illustrator: "János Orbán",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-early-grave": {
    stack: "library",
    name: "Early Grave",
    text: md`
        Recruit a Hecata character from your hand into torpor at no cost.
    `,
    illustrator: "Marco Primo",
    types: ["action"],
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},

"sas-fight-makes-right": {
    stack: "library",
    name: "Fight Makes Right",
    text: md`
        Ongoing - Each character in your coterie has +1 Influence for each [agenda] on them.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["unhosted action", "ongoing"],
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},

"sas-flesh-of-marble": {
    stack: "library",
    name: "Flesh of Marble",
    text: md`
        Play only if a character in your coterie would take **Aggravated** damage.
        +2 [shield] for each [fortitude] this character has.
        [fortitude] The damage becomes [physical] and non-**Aggravated**.
    `,
    illustrator: "János Orbán",
    types: ["reaction", "special"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 2,
    shield: 1,
    disciplines: ["fortitude"],
    cardpool: "vampire",
},

"sas-grave-robbing": {
    stack: "library",
    name: "Grave Robbing",
    text: md`
        Draw 1 card and choose 1 player.
        For each character that player has in torpor, either draw 1 card or gain 1 [prestige].
        _(Choose for each.)_
    `,
    illustrator: "Marco Primo",
    types: ["action"],
    set: "Shadows & Shrouds",
    clan: "hecata",
    cardpool: "vampire",
},

"sas-graveyard-smash": {
    stack: "library",
    name: "Graveyard Smash",
    text: md`
        **Superficial**
        +1 [damage] for each burned Mortal.
        (This attack cannot reduce the target's [blood] below 1.)
    `,
    illustrator: "Marco Primo",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 0,
    cardpool: "vampire",
},

"sas-high-stakes": {
    stack: "library",
    name: "High Stakes",
    text: md`
        +1 [damage] for each [agenda] on the attacker.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 4,
    attack: "social",
    damage: 1,
    cardpool: "vampire",
},

"sas-its-your-funeral": {
    stack: "library",
    name: "It's Your Funeral",
    text: md`
        +1 [damage] for each Ritual you control.
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 4,
    attack: "social",
    damage: 1,
    cardpool: "vampire",
},

"sas-interrogation": {
    stack: "library",
    name: "Interrogation",
    text: md`
        If this attack deals 1+ [damage] to the target, look at that foe's hand.
    `,
    illustrator: "Irene Francisco",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 2,
    cardpool: "vampire",
},

"sas-legate": {
    stack: "library",
    name: "Legate",
    text: md`
        **Exert 4 Influence:** Attach to the acting character.
        This character has +3 Influence.
        This character has +1 [blood-potency].
    `,
    illustrator: "János Orbán",
    types: ["action", "title"],
    set: "Shadows & Shrouds",
    clan: "lasombra",
    bloodPotencyRequirement: 4,
    cardpool: "vampire",
},

"sas-living-shadow": {
    stack: "library",
    name: "Living Shadow",
    text: md`
        +1 [damage] for each wraith attached to the attacker.
        [oblivion] **Targeted**
        _(You may retarget this attack to any legal target in the opposing party)_
    `,
    illustrator: "Joyce Maureira",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 2,
    attack: "mental",
    damage: 0,
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-money-shot": {
    stack: "library",
    name: "Money Shot",
    text: md`
        [potence] If this attack defeats the target, put 1 [agenda] from the general supply on target character in any coterie.
    `,
    illustrator: "János Orbán",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 4,
    attack: "physical",
    damage: 1,
    disciplines: ["potence"],
    cardpool: "vampire",
},

"sas-necromancy": {
    stack: "library",
    name: "Necromancy",
    text: md`
        Discard cards from the City Deck until you discard a Mortal, then burn that Mortal.
        If you burned a Mortal this turn, the active character may play a Ritual at no Action cost.
        If they do, they lose 2 [blood].
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Shadows & Shrouds",
    clan: "hecata",
    cardpool: "vampire",
},

"sas-prowess-from-pain": {
    stack: "library",
    name: "Prowess From Pain",
    text: md`
        [fortitude] Deal additional [damage] equal to this character's [blood-potency] minus their current [blood].
    `,
    illustrator: "Joyce Maureira",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 1,
    disciplines: ["fortitude"],
    cardpool: "vampire",
},

"sas-shadow-boxing": {
    stack: "library",
    name: "Shadow Boxing",
    text: md`
        +1 [damage] for each [oblivion] this character has.
        If the attacker has **Reach**, additional +1 [damage].
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 0,
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-shadow-cloak": {
    stack: "library",
    name: "Shadow Cloak",
    text: md`
        Attach to the acting character.
        [oblivion] This character has +1 Secrecy.
        Attacker - This character deals +1 [damage] to City Deck Mortals.
    `,
    illustrator: "János Orbán",
    types: ["action"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-sixth-tradition-destruction": {
    stack: "library",
    name: "Sixth Tradition: Destruction",
    text: md`
        Influence Conflict - Should I deal 1 **Aggravated** [damage] to target character and 1 additional **Aggravated** [damage] for every 5 Influence in favor of this Scheme?
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action", "scheme"],
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},

"sas-soul-crushing": {
    stack: "library",
    name: "Soul Crushing",
    text: md`
        [oblivion] +1 [damage] for each card attached to the target.
    `,
    illustrator: "János Orbán",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 0,
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-spectral-possession": {
    stack: "library",
    name: "Spectral Possession",
    text: md`
        **Exhaust 1 wraith attached to the acting character:** Ready target character in The Streets.
        They become a separate party.
        Take 1 additional Action with that character.
    `,
    illustrator: "Harvey Bunda",
    types: ["action"],
    set: "Shadows & Shrouds",
    clan: "hecata",
    cardpool: "vampire",
},

"sas-spirits-touch": {
    stack: "library",
    name: "Spirit's Touch",
    text: md`
        [auspex] Reveal the top card of target player's Library.
        Gain [prestige] equal to its [blood-potency-requirement].
        If you gain no [prestige] this way, discard the revealed card and ready the acting character.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action"],
    set: "Shadows & Shrouds",
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"sas-summon-spirit": {
    stack: "library",
    name: "Summon Spirit",
    text: md`
        [oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.
        Ongoing - **Remove 2 [blood] from this:** Create a wraith and attach it to a character in your coterie.
        When empty, burn this.
    `,
    illustrator: "Joyce Maureira",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-tenebrous-avatar": {
    stack: "library",
    name: "Tenebrous Avatar",
    text: md`
        [oblivion] **Pay 1 [agenda]:** +4 [shield] during this attack.
    `,
    illustrator: "János Orbán",
    types: ["reaction"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 5,
    attack: ["ranged", "physical", "social", "mental"],
    reactions: ["ranged", "physical", "social", "mental"],
    shield: 1,
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-the-gift-of-false-life": {
    stack: "library",
    name: "The Gift of False Life",
    text: md`
        [oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.
        Ongoing - **Remove 1 [blood] from this:** Place that [blood] on any character in torpor, then move that character to their owner's Haven and ready them. When empty, burn this.
    `,
    illustrator: "János Orbán",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-the-scent-of-death": {
    stack: "library",
    name: "The Scent of Death",
    text: md`
        [oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.
        Ongoing - **Remove 1 [blood] from this:** Target **Wounded** character loses 1 [blood].
        When empty, burn this.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-throwing-shade": {
    stack: "library",
    name: "Throwing Shade",
    text: md`
        If this party has 2+ [oblivion], +1 [damage].
    `,
    illustrator: "Timothy Terrenal",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 4,
    attack: "ranged",
    damage: 2,
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-utter-darkness": {
    stack: "library",
    name: "Utter Darkness",
    text: md`
        [oblivion] Put a Fear token on the original target of this attack and the Blocker (if any).
    `,
    illustrator: "",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 5,
    attack: "mental",
    damage: 1,
    disciplines: ["oblivion"],
    cardpool: "vampire",
},

"sas-whats-yours-is-mine": {
    stack: "library",
    name: "What's Yours is Mine",
    text: md`
        Influence Conflict - Should I steal 1 [agenda] from target foe with the most [agenda]?
        _(If there is a tie for most, choose only 1 of those foes.)_
    `,
    illustrator: "János Orbán",
    types: ["action", "scheme"],
    set: "Shadows & Shrouds",
    clan: "lasombra",
    cardpool: "vampire",
},

"sas-winning": {
    stack: "library",
    name: "Winning",
    text: md`
        Put 1 [agenda] from the general supply on each character in your coterie.
    `,
    illustrator: "Marco Primo",
    types: ["action"],
    set: "Shadows & Shrouds",
    cardpool: "vampire",
},    

}