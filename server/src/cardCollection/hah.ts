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
        **Exhaust:** If there are 5+ cards in your discard pile, gain 1 [agenda].
        If exactly 11 cards, gain 2 [agenda] instead.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    stack: "agenda",
    cardpool: "vampire",
},

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

"hah-fellowship-hall": {    
    stack: "haven",
    name: "Fellowship Hall",
    text: md`
        Your characters have +1 Secrecy.
        **Leader Ability**
        The first time you recruit a character during each of your turns, gain 1 Unhosted Action.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},
    
"hah-back-alley-clinic": {
    stack: "haven",
    name: "Back Alley Clinic",
    text: `md
       Your characters have +1 Secrecy.
        **Leader Ability**
        When a character you control is defeated by non-**Aggravted** [damage], if you control no characters in recovery, you may put the defeated character into recovery.
    `,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},
    
"hah-the-temple-of-set": {
    stack: "haven",
    name: "The Temple of Set",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**    
        When your Leader defeats a character, you may put 1 [prestige] from your general supply on each face-down card you control.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-the-clubhouse": {
    stack: "haven",
    name: "The Clubhouse",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        At the start of your turn, draw 1 card for every 4 different Disciplines or Edges in your coterie, then discard 1 card.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter and vampire",
},

"hah-the-bunker": {
    stack: "haven",
    name: "The Bunker",
    text: md`
        Your characters have +1 Secrecy.
        **Leader Ability**
        **Pay X [prestige]:** Prevent X [damage] to target character you control.
    `,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},
    
"hah-the-feretory": {
    stack: "haven",
    name: "The Feretory",
    text: md`
        Your characters have +1 Secrecy.
        **Leader Ability**
        When your Leader exhausts, reveal the top card of your Library.
        If it's a Relic, draw it. Otherwise, leave it or discard it.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},
    
"hah-the-orphanage": {
    stack: "haven",
    name: "The Orphanage",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        If your discard pile contains 5+ Library cards and none have a clan affiliation , **Exhaust The Orphanage:** Gain 1 Unhosted Action.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},
    
"hah-the-hidden-temple": {
    stack: "haven",
    name: "The Hidden Temple",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        Your Leader has +1 Influence.
        **Exhaust The Hidden Temple:** Put a 'No Influence' token on target character.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards

"hah-lucky": {
    stack: "faction",
    clan: "caitiff",
    name: "Lucky",
    text: md`
        When you recruit a character, if they add any new Discipline(s) to your coterie, draw 1 card and all your foes' characters have -1 [shield] this turn.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Anastasiia Horbunova",
    set: "Hunters & Hunted",
    disciplines: { auspex: 1, potence: 1, presence: 1 },
    cardpool: "vampire",
},

"hah-benicio": {
    stack: "faction",
    clan: "caitiff",
    name: "Benício",
    text: md`
        **Discard 1 Library card:**
        Prevent 1 [damage] to target character in this party.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { celerity: 1, fortitude: 1, oblivion: 1 },
    cardpool: "vampire",
},

"hah-hope": {
    stack: "faction",
    clan: "caitiff",
    name: "Hope",
    text: md`
        If you would lose or be forced to spend [prestige] during an attack, you may discard X cards to reduce that [prestige] loss/expenditure by X.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { animalism: 1, "blood sorcery": 1, presence: 1 },
    cardpool: "vampire",
},

"hah-jorge-guerrero": {
    stack: "faction",
    clan: "caitiff",
    name: "Jorge Guerrero",
    text: `md
        Attacker - **Discard 1 Library card:**
        This attack deals +1 [damage] to the target.
    `,
    bloodPotency: 3,
    physical: 2,
    social: 0,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { dominate: 1, potence: 1 },
    cardpool: "vampire",
},

"hah-prudence": {
    stack: "faction",
    clan: "caitiff",
    name: "Prudence",
    text: md`
        Party - Attackers in the party have +2 [shield] while attacking.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, protean: 1},
    cardpool: "vampire",
},

"hah-judas": {
    stack: "faction",
    clan: "caitiff",
    name: "Judas",
    text: md`
        When this character is defeated, you may **Burn this character:** Gain 1 [prestige].
    `,
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { celerity: 1, protean: 1},
    cardpool: "vampire",
},

"hah-thaddeus": {
    stack: "faction",
    clan: "caitiff",
    name: "Thaddeus",
    text: md`
        When this character enters play, draw 1 card.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { "blood sorcery": 1, oblivion: 1 },
    cardpool: "vampire",
},

"hah-keondra": {
    stack: "faction",
    clan: "ministry",
    name: "Keondra",
    text: md`
        Attacker - This attack deals +1 [damage] to the target for each face-down card you control with 2+ [prestige] on it.
    `,
    bloodPotency: 6,
    physical: 0,
    social: 2,
    mental: 1,
    illustrator: "Anastasiia Horbunova",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, presence: 1, protean: 1 },
    cardpool: "vampire",
},

"hah-ceraph": {
    stack: "faction",
    clan: "ministry",
    name: "Ceraph",
    text: md`(
        +1 Influence for each character with [presence] in your coterie.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 1, protean: 1 },
    cardpool: "vampire",
},

"hah-matthew": {
    stack: "faction",
    clan: "ministry",
    name: "Matthew",
    text: md`(
        The first time you resolve a Conspiracy during each of your turns, gain 1 [prestige].
        If you were the only contributor to it, gain 2 [prestige] instead.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, protean: 1 },
    cardpool: "vampire",
},

"hah-gisele": {
    stack: "faction",
    clan: "ministry",
    name: "Gisele",
    text: md`
        **Guard**
        When this character Blocks an attack, put a 'No Influence' token on the attacker.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 2 },
    cardpool: "vampire",
},

"hah-jimmy": {
    stack: "faction",
    clan: "ministry",
    name: "Jimmy",
    text: md`
        **Exhaust:** Put 1 [prestige] from target player's general supply on a face-down card you control. Use this ability only in The Streets.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1, presence: 1 },
    cardpool: "vampire",
},

"hah-hakim-owusu": {
    stack: "faction",
    clan: "ministry",
    name: "Hakim Owusu",
    text: md`
        This character has +1 Influence for each Ongoing Scheme you control.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: {presence: 1 },
    cardpool: "vampire",
},

"hah-iara": {
    stack: "faction",
    clan: "ministry",
    name: "Iara",
    text: md`
        Face-down cards you control cannot be targeted by foes.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { obfuscate: 1},
    cardpool: "vampire",
},

"hah-evangeline": {
    stack: "faction",
    clan: "faithful",
    name: "Evangeline",
    text: md`
        **Hunter, True Faith**
        Party - Attackers in this party deal +1 [damage] to their target if that target has 1+ [prestige] of your color on them.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
},

"hah-florencia": {
    stack: "faction",
    clan: "faithful",
    name: "Florencia",
    text: md`(
        **Hunter**
        Attacker - **Pay 1 [prestige]:** This attack deals +2 [damage] to the target. Use only if their Preemptive Strike defeated a character in your cell.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "repel the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
},

"hah-toquinho": {
    stack: "faction",
    clan: "faithful",
    name: "Toquinho",
    text: md`
        **Hunter, Guard**
        When a character in your cell is defeated, ready each character in your cell.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
},

"hah-pregador": {
    stack: "faction",
    clan: "faithful",
    name: "Pregador",
    text: md`(
        **Hunter**
        If ready, **Relentless, Pay 1 [prestige]:** Move to The Streets to Block a foe's non-[ranged] attack against any target.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1, "sense the unnatural": 1},
    cardpool: "hunter",
},

  "hah-sister-claire": {
    stack: "faction",
    clan: "faithful",
    name: "Sister Claire",
    text: md`(
        **Hunter**
        Party - **Exhaust:** This attack deals +1 [damage] to the target.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
},

"hah-andres": {
    stack: "faction",
    clan: "faithful",
    name: "Andrés",
    text: md`(
        **Hunter**
        When this character is defeated, target foe loses 1 [agenda].
    `,
    bloodPotency: 1,
    physical: 1,
    social: 0,
    mental: 0,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1 },
    cardpool: "hunter",
},

"hah-noriko": {
    stack: "faction",
    clan: "faithful",
    name: "Noriko",
    text: md`
        **Hunter**
        When this character is defeated, draw 1 card.
    `,
    bloodPotency: 1,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    disciplines: { library: 1 },
    cardpool: "hunter",
},

"hah-francisco": {
    stack: "faction",
    clan: "inquisitive",
    name: "Francisco",
    text: md`
        **Hunter** **Guard**
        **Pay 1 [prestige]:** This character has +2 [shield] this attack.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
},

"hah-jamie": {
    stack: "faction",
    clan: "inquisitive",
    name: "Jamie",
    text: md`
        **Hunter**
        This character may be exhausted to Investigate while in their Hideout.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { global: 1, library: 1 },
    cardpool: "hunter",
},

"hah-juliana": {
    stack: "faction",
    clan: "inquisitive",
    name: "Juliana",
    text: md`
        **Hunter**
        Party - Characters in this party have +1 [shield] during your Action Phase.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { global: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
},

"hah-maria-lopez": {
    stack: "faction",
    clan: "inquisitive",
    name: "Maria Lopez",
    text: md`
        **Hunter**
        **Exhaust, Pay 1 [prestige]:** Deal 1 [social] [damage] to target character for each Curse attached to it.
    `,
    bloodPotency: 4,
    physical: 2,
    social: 0,
    mental: 0,
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
},

"hah-rio": {
    stack: "faction",
    clan: "inquisitive",
    name: "Rio",
    text: md`
        **Hunter**
        Attacker - This attack deals +1 [damage] to the target for every 2 Curses attached to it.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 0,
    mental: 1,
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, library: 1 },
    cardpool: "hunter",
},

"hah-ryan": {
    stack: "faction",
    clan: "inquisitive",
    name: "Ryan",
    text: md`
        **Hunter**
        Attacker - At the end of this attack, you may **Pay 1 [prestige]:** Attach your Attack card to the target.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
},

"hah-sara": {
    stack: "faction",
    clan: "inquisitive",
    name: "Sara",
    text: md`
        **Hunter**
        When you exhaust this character to Investigate, add 1 additional [prestige] to the target from your general supply.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    disciplines: { global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
},

"hah-gina-firenzo": {
    stack: "faction",
    clan: "inquisitive",
    name: "Gina Firenzo",
    text: md`
        **Hunter**
        When this character enters play, put 2 [prestige] from your general supply on target character or face-down monster.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1 },
    cardpool: "hunter",
},

"hah-renata-gomes": {
    stack: "faction",
    clan: "inquisitive",
    name: "Renata Gomes",
    text: md`
        **Hunter**
        Party - When a character in this party attacks a character, put 1 [prestige] from your general supply on the target.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    disciplines: { "beast whisperer": 1, global: 1, library: 1, "sense the unnatural": 1 },
    cardpool: "hunter",
},

"hah-grace": {
    stack: "faction",
    clan: "caitiff",
    name: "Grace",
    text: md`
        **Burn 2 cards in your discard pile:** This character has +2 intel this turn.
        Attacker - **Discard the top 2 cards of your Library:** The target has -1 [shield] this attack.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { auspex: 1, fortitude: 1, obfuscate: 1 },
    cardpool: "vampire",
},

"hah-sage": {
    stack: "faction",
    clan: "caitiff",
    name: "Sage",
    text: md`
        When this character exhausts, you may shuffle 1 random Library card from your discard pile into your deck.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    disciplines: { animalism: 1, dominate: 1 },
    cardpool: "vampire",
},

"hah-ociel-gonzalez": {
    stack: "faction",
    clan: "ministry",
    name: "Ociel Gonzalez",
    text: md`
        Double the Influence bonus from any Title attached to this character.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 2 },
    cardpool: "vampire",
},

"hah-raul-fontes": {
    stack: "faction",
    clan: "ministry",
    name: "Raúl Fontes",
    text: md`
        Attacker - This attack deals +1 [damage] to the target for each 'No Influence' token in the defending party.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    disciplines: { presence: 1, protean: 1 },
    cardpool: "vampire",
},

"hah-deacon-jones": {
    stack: "faction",
    clan: "faithful",
    name: "Deacon Jones",
    text: md`
        **Hunter, True Faith**
        Attacker - **Pay 2 [prestige]:** This attack deal +1 [damage] to the target for each Relic you control.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    disciplines: { library: 1, "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
},

"hah-ingrid": {
    stack: "faction",
    clan: "faithful",
    name: "Ingrid",
    text: md`
        **Hunter**
        When this character plays a Relic, gain 1 Action.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Mara Miranda-Escota",
    set: "Hunters & Hunted",
    disciplines: { "repel the unnatural": 1, "sense the unnatural": 1, "thwart the unnatural": 1 },
    cardpool: "hunter",
},

}

export const library: Record<CardId, Library> = {

    //Library Cards

"hah-persecution": {
    stack: "library",
    name: "Persecution",
    types: ["influence modifier"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Gain 2 Influence during this action or event.
        Gain an additional 2 Influence for each foe who exerted Influence against your choice of Yes or No.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-poison-pill": {
    stack: "library",
    name: "Poison Pill",
    types: ["unhosted action"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to a character in your cell.
        When this character is defeated during an attack, deal 2 **Agravated** [damage] to the opposing character **OR** target for loses 1 [agenda].
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter and vampire",
},

"hah-pass-the-torch": {
    stack: "library",
    name: "Pass the Torch",
    types: ["unhosted action"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Put your Leader token on a character in your coterie (even if it's out of play).
        If you have a Caitiff or Thin-Blood in your coterie, gain 1 Action.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter and vampire",
},

"hah-one-mans-trash": {
    stack: "library",
    name: "One Man's Trash",
    types: ["unhosted action"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        You may put the top 2 cards of your Library into your discard pile.
        Then you may shuffle up to 2 Library cards from target player's discard pile into their Library.
        If you have a Caitiff or Thin-Blood in your coterie, gain 1 Action.
    `,
    //disciplines:[],
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-hasty-embrace": {
    stack: "library",
    name: "Hasty Embrace",
    types: ["unhosted action"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Play only if you have attached a Retainer this turn.
        Recruit a Caitiff character from your hand at no cost, placing only 2 [blood] from your general supply on them; then attach that Retainer to that Caitiff (does not trigger attach effects); then gain 1 Unhosted Action.
    `,
    //disciplines:[],
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-drive-vengeance": {
    stack: "library",
    name: "Drive: Vengeance",
    types: ["unhosted action"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to a character in your cell (max 1).
        Attacker - This character deals +1 [damage] to the target for every 2 of your burned characters.
    `,
    //disciplines:[],
    illustrator: "Darko Stojanovic",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-drive-curiosity": {
    stack: "library",
    name: "Drive: Curiosity",
    types: ["unhosted action"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to a character in your cell (max 1).
        If that character has [library], gain 1 Unhosted Action.
        When you exhaust this character to Investigate, add 1 additional [prestige] to the target from your general supply.
    `,
    disciplines:["library"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-drive-atonement": {
    stack: "library",
    name: "Drive: Atonement",
    types: ["unhosted action"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to a character in your cell (max 1).
        This character has **Guard** and +1 [shield] vs [physical] [damage].
        When this character Blocks an attack, the original target mends 1 [blood].
    `,
    //disciplines:[],
    illustrator: "Darko Stojanovic",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-plots-within-plots": {
    stack: "library",
    name: "Plots Within Plots",
    types: ["action", "scheme", "ongoing"],
    clan:"ministry",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Influence Conflict - Should I put this card into play?
        Ongoing - **Exhaust:** Place a Trap or Conspiracy face down at no cost.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-charmer": {
    stack: "library",
    name: "Charmer",
    types: ["action", "scheme", "ongoing"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Influence Conflict - Should I put this card into play?
        Ongoing - At the start of your turn, you may exhaust target character.
    `,
    //disciplines:[],
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-believer": {
    stack: "library",
    name: "Believer",
    types: ["action", "scheme", "ongoing"],
    //clan:,
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Influence Conflict - Should I put this card into play?
        Ongoing - At the start of your turn, draw 1 card.
    `,
    //disciplines:[],
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-thorn-from-the-crown": {
    stack: "library",
    name: "Thorn from the Crown",
    types: ["action", "relic", "ongoing", "1 per player"],
    clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - **Exhaust, Pay 1** [prestige]: A **True Faith** attacker you control deals +1 [damage] to the target.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-bone-of-the-apostle-james": {
    stack: "library",
    name: "Bone of the Apostle James",
    types: ["action", "relic", "ongoing", "1 per player"],
    clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - **Exhaust:** Ready target **True Faith** character you control.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-blood-of-saint-dominic": {
    stack: "library",
    name: "Blood of Saint Dominic",
    types: ["action", "relic", "ongoing", "1 per player"],
    clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - **Exhaust:** Each **True Faith** character you control mends 1 [blood].
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-wrath": {
    stack: "library",
    name: "Wrath",
    types: ["action"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Deal 1 [mental] [damage] to target character for each of your burned characters.
        [repel-the-unnatural] +1[damage].
    `,
    disciplines:["repel the unnatural"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-weigh-down": {
    stack: "library",
    name: "Weigh Down",
    types: ["action"],
    clan: "inquisitive",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach this card to target character.
        This character deals -1 [damage] when attacking chracters you control.
    `,
    ///disciplines:["repel the unnatural"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-tracking-device": {
    stack: "library",
    name: "Tracking Device",
    types: ["action"],
    clan: "inquisitive",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach this card to target character or face-down Monster.
        Hunters have +1 Intel against this character.
        At the end of your turn, put 1 [prestige] from your general supply on this character.
    `,
    ///disciplines:["repel the unnatural"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-shameless": {
    stack: "library",
    name: "Shameless",
    types: ["action"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Gain 1 [prestige] for every 3 different Disciplines in your coterie.
    `,
    ///disciplines:["repel the unnatural"],
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-found-a-weakness": {
    stack: "library",
    name: "Found a Weakness",
    types: ["action"],
    clan: "inquisitive",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Deal 1 [physical] [damage] to target character for each [prestige] of your color on it.
        (This damage cannot remove the last [blood] token from a character.)
        [sense-the-unnatural] +1 [damage]
    `,
    disciplines:["sense the unnatural"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-cobra-form": {
    stack: "library",
    name: "Cobra Form",
    types: ["action"],
    clan: "ministry",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
    [protean] Attach to the acting character.
    This character has +1 Secrecy.
    Attacker - **Detach:** +1 **Aggravated** [damage] to the target.
    `,
    disciplines:["protean"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-anonymous-tip": {
    stack: "library",
    name: "Anonymous Tip",
    types: ["action"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        [global] **Pay 2 [prestige]:** For each Antagonist in The Streets, deal 1 **Aggravated** [damage] to target Monster.
    `,
    disciplines:["global"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-snake-oil": {
    stack: "library",
    name: "Snake Oil",
    types: ["action", "conspiracy"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        **Place this card face down and put 1 [prestige] on it.**
        If this card has 2+ [prestige] on it, you may resolve it during your Action Phase.
        Each player who contributed readies 1 character in their coterie.
    `,
    ///disciplines:["global"],
    illustrator: "Adelijah Ocampo",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-snake-in-the-grass": {
    stack: "library",
    name: "Snake in the Grass",
    types: ["action", "conspiracy"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        **Place this card face down and put 1 [prestige] on it.**
        If this card has 3+ [prestige] on it, you may resolve it during your Action Phase.
        Target each foe who did not contribute and they lose 1 [agenda].
        If only 1 target, steal 1 [agenda] from them instead.
    `,
    ///disciplines:["global"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-shed-your-skin": {
    stack: "library",
    name: "Shed Your Skin",
    types: ["action", "conspiracy"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        **Place this card face down and put 1 [prestige] on it.**
        If this card has 2+ [prestige] on it, you may resolve it during your Action Phase.
        Target each foe who did not contribute and they each discard 1 Library card at random.
        If only 1 target, 2 at random instead.
    `,
    ///disciplines:["global"],
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-pay-tribute": {
    stack: "library",
    name: "Pay Tribute",
    types: ["action", "conspiracy"],
    clan: "ministry",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        **Place this card face down and put 1 [prestige] on it.**
        If this card has 3+ [prestige] on it, you may resolve it during your Action Phase.
        Target each foe who did not contribute and steal 1 [prestige] from them.
        If only 1 target, steal 2 [prestige] instead.
    `,
    ///disciplines:["global"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-mans-best-friend": {
    stack: "library",
    name: "Man's Best Friend",
    types: ["action", "animal"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        [beast-whisperer] Attach to the acting character.
        When this character would be defeated, burn this card instead and place 1 [damage] on this character.
        They are not defeated.
    `,
    disciplines:["beast whisperer"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-give-em-the-bird": {
    stack: "library",
    name: "Give 'em the Bird",
    types: ["action", "animal"],
    //clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Use only in The Streets.
        [beast-whisperer] Attach to target character.
        At the start of this character's turn, this character loses 1 [blood].
    `,
    disciplines:["beast whisperer"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-take-careful-notes": {
    stack: "library",
    name: "Take Careful Notes",
    types: ["unhosted action", "ongoing"],
    clan: "inquisitive",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - When you attach a card to a character you do not control, put 1 [prestige] from your general supply on that character **OR Burn this card:** That character's controller loses 1 [agenda].
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-share-the-wealth": {
    stack: "library",
    name: "Share the Wealth",
    types: ["action", "ongoing"],
    //clan: "inquisitive",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - Characters in a party with your Leader have the benefits of all Retainers attached to your Leader.
        At the start of your turn, if you don't have a Caitiff or Thin-Blood in your coterie, burn this.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-not-forgotten": {
    stack: "library",
    name: "Not Forgotten",
    types: ["action", "ongoing"],
    //clan: "inquisitive",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        For each diffrerent Discipline in your coterie, shuffle 1 random Library card from your discard pile into your Library.
        Ongoing - At the end of your turn, if you have 2 or fewer Library cards in your hand, you may draw 1 card.
    `,
    //disciplines:[],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-learning-the-ropes": {
    stack: "library",
    name: "Learning the Ropes",
    types: ["unhosted action", "ongoing"],
    //clan: "inquisitive",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - When a character you control deals 1+ [damage] to a foe's character, choose 1 Discipline that character has and place a token of that type on your character.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-dark-money": {
    stack: "library",
    name: "Dark Money",
    types: ["unhosted action", "ongoing"],
    clan: "ministry",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - For every 2 [obfuscate] in your coterie, lower each foe's Influence by 1 during Schemes (min 0).
    `,
    disciplines:["obfuscate"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-majesty": {
    stack: "library",
    name: "Majesty",
    types: ["unhosted action", "ongoing"],
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Ongoing - Your Leader has +1 Influence for each [presence] they have.
        **Exhaust:** Target player cannot play Influence Modifiers during this scheme.
    `,
    disciplines:["presence"],
    illustrator: "Irene Francisco",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-true-faith": {
    stack: "library",
    name: "True Faith",
    types: ["unhosted action"],
    clan: "faithful",
    //bloodPotencyRequirement:,
    //damage:,
    //shield:,
    //attack:[],
    //reactions: [],
    text: md`
        Attach to a character in your cell.
        This character has **True Faith** and +1 [blood potency].
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-well-prepared": {
    stack: "library",
    name: "Well Prepared",
    types: ["reaction", "special"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 1,
    //damage:,
    shield: 2,
    //attack:[],
    //reactions: [],
    text: md`
        A defender you control may play this against any type of Monster attack.
        [sense-the-unnatural] **Pay 1 [prestige]:** +1 [shield].
    `,
    disciplines:["sense the unnatural"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-strength-of-the-fallen": {
    stack: "library",
    name: "Strength of the Fallen",
    types: ["reaction"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    //damage:,
    shield: 2,
    attack: ["physical", "mental"],
    reactions: ["physical", "mental"],
    text: md`
        [thwart-the-unnatural] **Pay 1 [prestige]:** +1 [shield] for each of your burned characters.
    `,
    disciplines:["thwart the unnatural"],
    illustrator: "Darko Stojanovic",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-shifting-organs": {
    stack: "library",
    name: "Shifting Organs",
    types: ["reaction"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    //damage:,
    shield: 1,
    attack: ["ranged", "physical", "mental"],
    reactions: ["ranged", "physical", "mental"],
    text: md`
        [obfuscate] +1 [shield].
        [protean] Diablerie cannot be performed against this character this turn.
    `,
    disciplines:["obfuscate", "protean"],
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-ready-and-waiting": {
    stack: "library",
    name: "Ready and Waiting",
    types: ["reaction"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    //damage:,
    shield: 3,
    attack: ["ranged", "physical"],
    reactions: ["ranged", "physical"],
    text: md`
        [global] Put 1 [prestige] from your general supply on the attacker.
    `,
    disciplines:["global"],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-layers-of-protection": {
    stack: "library",
    name: "Layers of Protection",
    types: ["reaction"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    //damage:,
    shield: 0,
    attack: ["ranged", "physical"],
    reactions: ["ranged", "physical"],
    text: md`
        Each character in this party has +1 [shield].
        **Discard X cards:** Prevent X [damage] to the target.
    `,
    ///disciplines:["obfuscate", "protean"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter and vampire",
},

"hah-know-their-habits": {
    stack: "library",
    name: "Know Their Habits",
    types: ["reaction"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 1,
    //damage:,
    shield: 2,
    attack: ["ranged", "mental"],
    reactions: ["ranged", "mental"],
    text: md`
        [sense-the-unnatural] **Pay 2 [prestige]:** Each character in this party has +2 [shield] this attack.
    `,
    disciplines:["sense the unnatural"],
    illustrator: "Darko Stojanovic",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-get-into-its-mind": {
    stack: "library",
    name: "Get into its Mind",
    types: ["reaction"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    //damage:,
    shield: 1,
    attack: ["social", "mental"],
    reactions: ["social", "mental"],
    text: md`
        [library] **Pay 2 [prestige]:** The attacker's [damage] becomes **Superficial.** (This damage cannot remove the last [blood] token from a character.)
    `,
    disciplines:["library"],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-comeuppance": {
    stack: "library",
    name: "Comeuppance",
    types: ["reaction"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    //damage:,
    shield: 1,
    attack: ["social", "mental"],
    reactions: ["social", "mental"],
    text: md`
        The attacker reveals their hand to the defender. The defender then discards 1 [social] or [mental] Attack card from the revealed cards.
    `,
    ///disciplines:["library"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter and vampire",
},

"hah-subterfuge": {
    stack: "library",
    name: "Subterfuge",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    damage: 0,
    //shield: 1,
    attack: ["social"],
    //reactions: ["social", "mental"],
    text: md`
        +1 [damage] for each Conspiracy and/or Trap you have resolved this turn.
        [obfuscate] **Targeted.**
    `,
    disciplines:["obfuscate"],
    illustrator: "Mico Dimagiba",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-speaking-in-tongues": {
    stack: "library",
    name: "Speaking in Tongues",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 1,
    damage: 1,
    //shield: 1,
    attack: ["social"],
    //reactions: ["social", "mental"],
    text: md`
        [repel-the-unnatural] **Pay 1 [prestige]:** This attack deals +1 [damage] to the target.
        If the target is a Monster, additional +1 [damage].
    `,
    disciplines:["repel the unnatural"],
    illustrator: "Darko Stojanovic",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-social-engineering": {
    stack: "library",
    name: "Social Engineering",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    damage: 2,
    //shield: 1,
    attack: ["social"],
    //reactions: ["social", "mental"],
    text: md`
        [global] Put 2 [prestige] from your general supply on the target.
    `,
    disciplines:["global"],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-rebuke": {
    stack: "library",
    name: "Rebuke",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    damage: 1,
    //shield: 1,
    attack: ["social"],
    //reactions: ["social", "mental"],
    text: md`
        [library] **Pay 1 [prestige]:** +1 [damage] to the target.
        [thwart-the-unnatural] **Pay 2 [prestige]:** +2 [damage] to Monsters and Antagonists.
    `,
    disciplines:["library", "thwart the unnatural"],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-lingering-kiss": {
    stack: "library",
    name: "Lingering Kiss",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    damage: 1,
    //shield: 1,
    attack: ["social"],
    //reactions: ["social", "mental"],
    text: md`
        [presence] At the end of this attack, you may attach this card to the target.
        At the start of this character's turn, if this character is not at maximum [blood], put a '-1 [blood-potency]' token on them.
    `,
    disciplines:["presence"],
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-ingratiate": {
    stack: "library",
    name: "Ingratiate",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    damage: 1,
    //shield: 1,
    attack: ["social"],
    //reactions: ["social", "mental"],
    text: md`
        +1 [damage] for each different Discipline the attacker shares with the defender.
    `,
    ///disciplines:["obfuscate"],
    illustrator: "Felipe Gaona",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-shotgun": {
    stack: "library",
    name: "Shotgun",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 4,
    damage: 2,
    //shield: 1,
    attack: ["ranged"],
    //reactions: [],
    text: md`
        +1 [damage] vs City Deck Mortals.
        **Discard 1 card:** Deal 2 [ranged] [damage] to a different member of the defending party.
    `,
    //disciplines:[],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter and vampire",
},

"hah-triple-threat": {
    stack: "library",
    name: "Triple Threat",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 4,
    damage: 1,
    //shield: 1,
    attack: ["physical"],
    //reactions: ["social", "mental"],
    text: md`
        [auspex] Draw 1 card.
        [potence] +1 [damage].
        [presence] If the defender played a Reaction during this attack, steal 1 [prestige] from them.
    `,
    disciplines:["auspex", "potence", "presence"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-risky-business": {
    stack: "library",
    name: "Risky Business",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    damage: 3,
    //shield: 1,
    attack: ["physical"],
    //reactions: ["social", "mental"],
    text: md`
        If you do not have a Caitiff or Thin-Blood in your coterie, play this card face up.
        If a Reaction is played or the attack is Blocked, discard this card (the attack continues).
    `,
    ///disciplines:["auspex", "potence", "presence"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-release-the-hounds": {
    stack: "library",
    name: "Release the Hounds",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    damage: 2,
    //shield: 1,
    attack: ["physical"],
    //reactions: ["social", "mental"],
    text: md`
        Play this card face up.
        [beast-whisperer] / [animalism] **Pay 1 [prestige]:** +1 [damage].
        `,
    disciplines:["beast whisperer", "animalism"],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter and vampire",
},

"hah-coiled-strike": {
    stack: "library",
    name: "Coiled Strike",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 4,
    damage: 2,
    //shield: 1,
    attack: ["physical"],
    //reactions: ["social", "mental"],
    text: md`
        [protean] +1 [damage] for every 2 unattached face-down cards you control.
        `,
    disciplines:["protean"],
    illustrator: "Joyce Maureira",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-blaze-of-glory": {
    stack: "library",
    name: "Blaze of Glory",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 1,
    damage: 1,
    //shield: 1,
    attack: ["physical"],
    //reactions: ["social", "mental"],
    text: md`
        [thwart-the-unnatural] +1 [damage].
        **Pay 1 [prestige]:** +3 [damage]. After this attack, burn this character.
        Use only if the target is a Monster.
    `,
    disciplines:["thwart the unnatural"],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-wooden-stake": {
    stack: "library",
    name: "Wooden Stake",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    damage: 0,
    //shield: 1,
    attack: ["physical"],
    //reactions: ["social", "mental"],
    text: md`
        If this attack deals 1+ [damage] to an already **Wounded** non-Monster vampire, move them into torpor, then attach this card to them.
        Torpor - This character does not get a free mend during their End Phase.
        When this character leaves Torpor, burn this card.
    `,
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-wide-array-of-pain": {
    stack: "library",
    name: "Wide Array of Pain",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 4,
    damage: 2,
    //shield: 1,
    attack: ["mental"],
    //reactions: ["social", "mental"],
    text: md`
        If the attacker has 3+ different Disciplines, the defender has -1 [shield] this attack.
    `,
    //disciplines:["protean"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-get-the-drop": {
    stack: "library",
    name: "Get the Drop",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 3,
    damage: 1,
    //shield: 1,
    attack: ["mental"],
    //reactions: ["social", "mental"],
    text: md`
        [library] When revealed, you may attach a Library card from your hand face down to the target.
        **Pay 2 [prestige]:** +1 [damage] to the target for each Curse attached to the target.
    `,
    disciplines:["library"],
    illustrator: "Marco Primo",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-confuse": {
    stack: "library",
    name: "Confuse",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    damage: 1,
    //shield: 1,
    attack: ["mental"],
    //reactions: ["social", "mental"],
    text: md`
        **Pay 1 [prestige]:** This attack deals +1 [damage] to the target.
        [sense-the-unnatural] After this attack, you may attach this card to the target.
    `,
    disciplines:["sense the unnatural"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
},

"hah-awe": {
    stack: "library",
    name: "Awe",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 1,
    damage: 1,
    //shield: 1,
    attack: ["mental"],
    //reactions: ["social", "mental"],
    text: md`
        [presence] Put a 'No Influence' token on the target.
        [presence] [presence] +1 [damage].
    `,
    disciplines:["presence"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "vampire",
},

"hah-holy-water": {
    stack: "library",
    name: "Holy Water",
    types: ["attack"],
    //clan: "inquisitive",
    bloodPotencyRequirement: 2,
    damage: 1,
    //shield: 1,
    attack: ["mental"],
    //reactions: ["social", "mental"],
    text: md`
        [repel the unnatural] If the target is a Monster, they do not attack during the End Phase this turn.
        **True Faith - Pay 1 [prestige]:** This attack deals +2 [damage] to the target.
    `,
    disciplines:["repel the unnatural"],
    illustrator: "Cold Castle Studios",
    set: "Hunters & Hunted",
    cardpool: "hunter",
    },
}