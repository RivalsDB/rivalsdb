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

// Agenda Cards

"baa-knowledge-is-power": {
    name: "Knowledge is Power",
    text: md`
        The first time your Leader exhausts in The Streets during each of your turns, if you have 6+ Library cards in your hand, gain 1 [agenda].
        If exactly 10 Library cards, gain 2 [agenda] instead.
        If you reach 13 [agenda], you win!
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    stack: "agenda",
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
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
    cardpool: "vampire",
},

}

export const havens: Record<CardId, Haven> = {

    //Haven Cards

"baa-the-chantry": {
    stack: "haven",
    name: "The Chantry",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        When your Leader plays a Ritual, gain 1 Unhosted Action.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    cardpool: "vampire",
},
    
"baa-the-pit": {
    stack: "haven",
    name: "The Pit",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        The first time you recruit a character during each of your turns, gain 1 Unhosted Action.
    `,
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
    cardpool: "vampire",
},
    
"baa-thrift-store": {
    stack: "haven",
    name: "Thrift Store",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        Your Library cards have -1 Blood Potence.
        When your Leader is defeated, put a '-1 Blood Potence' token on target character.
    `,
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
    cardpool: "vampire",
},
    
"baa-university-library": {
    stack: "haven",
    name: "University Library",
    text: md`
        Characters in your Haven have +1 Secrecy.
        **Leader Ability**
        **Pay 1 or 2 [blood]:** Draw that many cards from your Library.
    `,
    illustrator: "Marco Primo",
    set: "Blood & Alchemy",
    cardpool: "vampire",
},

}

export const factions: Record<CardId, Faction> = {

// Faction Cards

"baa-alejandro-lopez": {
    stack: "faction",
    name: "Alejandro Lopez",
    text: md`
        When this character mends during any player's Action Phase, draw 1 card.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 6,
    physical: 1,
    social: 1,
    mental: 1,
    disciplines: { auspex: 1, "blood sorcery": 2 },
    cardpool: "vampire",
},

"baa-april-smith": {
    stack: "faction",
    name: "April Smith",
    text: md`
        Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Fortitude this attack.
        Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: {},
    cardpool: "vampire",
},

"baa-aurora-nix": {
    stack: "faction",
    name: "Aurora Nix",
    text: md`
        Attacker - If this attack deals 1+ Damage to the target, put a Fear token on the target.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 5,
    physical: 2,
    social: 0,
    mental: 1,
    disciplines: { auspex: 2 },
    cardpool: "vampire",
},

"baa-caleb-walker": {
    stack: "faction",
    name: "Caleb Walker",
    text: md`
        Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Blood Sorcery this attack.
        Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 1,
    mental: 0,
    disciplines: {},
    cardpool: "vampire",
},

"baa-candi-liu": {
    stack: "faction",
    name: "Candi Liu",
    text: md`
        Attacker - If this attack deals +1 Damage to the target, put a '-1 Blood Potence' token on the target.
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
},

"baa-claudia-sterling": {
    stack: "faction",
    name: "Claudia Sterling",
    text: md`
        When this character takes [damage] from an attacker, place 1 of that lost Blood onto a Ritual you control.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { "blood sorcery": 1 },
    cardpool: "vampire",
},

  "baa-darius-wolfe": {
    stack: "faction",
    name: "Darius Wolfe",
    text: md`
        Guard This character may block Ranged Attacker.
        When this character Blocks an attacks, draw 1 card.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 4,
    physical: 1,
    social: 1,
    mental: 0,
    disciplines: { auspex: 1, dominate: 1 },
    cardpool: "vampire",
},

"baa-faith-gray": {
    stack: "faction",
    name: "Faith Gray",
    text: md`
        When you play a Ritual, draw 1 card.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { auspex: 1, "blood sorcery": 1 },
    cardpool: "vampire",
},

"baa-frog": {
    stack: "faction",
    name: "Frog",
    text: md`
When a character in this party attaches an Alchemy, ready them. Detach an Alchemy from this character: Prevent 1 Damage.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
  },

"baa-grigori": {
    stack: "faction",
    name: "Grigori",
    text: md`
        Exhaust: Replace 1 Blood on target character with one of your color from the general supply.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 5,
    physical: 1,
    social: 0,
    mental: 2,
    disciplines: { "blood sorcery": 1, dominate: 1 },
    cardpool: "vampire",
},

"baa-hua-jiang": {
    stack: "faction",
    name: "Hua Jiang",
    text: md`
        Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Celerity this attack.
        Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 0,
    mental: 1,
    disciplines: {},
    cardpool: "vampire",
},

"baa-jacob-frost": {
    stack: "faction",
    name: "Jacob Frost",
    text: md`
        Attacker - This attack deals +1 Damage to the target for every 2 characters in this party (including this character).
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
},

"baa-joseph-drake": {
    stack: "faction",
    name: "Joseph Drake",
    text: md`
        For each Alchemy attached to this character, +1 [sheild] during attacks.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    disciplines: { "thin-blood alchemy": 1 },
    cardpool: "vampire",
},

"baa-lorenzo-murik": {
    stack: "faction",
    name: "Lorenzo Murik",
    text: md`
        Exhaust: Mend 1 Blood on a character in your coterie.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    disciplines: { "blood sorcery": 1 },
    cardpool: "vampire",
},

"baa-phuoc-dihn": {
    stack: "faction",
    name: "Phuoc Dihn",
    text: md`
        Pay 1 blood: Put that Blood onto a Ritual you control.
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 4,
    physical: 0,
    social: 2,
    mental: 0,
    disciplines: { "blood sorcery": 1, dominate: 1 },
    cardpool: "vampire",
},

"baa-sonja-valentine": {
    stack: "faction",
    name: "Sonja Valentine",
    text: md`
        At the start of your turn, replace 1 Blood on target character in The Streets with one of your color from the general supply
    `,
    illustrator: "Darko Stojanovic",
    set: "Blood & Alchemy",
    clan: "tremere",
    bloodPotency: 6,
    physical: 0,
    social: 1,
    mental: 2,
    disciplines: { auspex: 1, "blood sorcery": 1, dominate: 1 },
    cardpool: "vampire",
},

"baa-valerie-nash": {
    stack: "faction",
    name: "Valerie Nash",
    text: md`
        Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Auspex this attack.
        Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Felipe Gaona",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 1,
    social: 0,
    mental: 0,
    disciplines: {},
    cardpool: "vampire",
},

"baa-wendy": {
    stack: "faction",
    name: "Wendy",
    text: md`
        Party - Attackers with Thin-blood alchemy in this party gain +1 Blood Potence and Obfuscate this attack.
        Pay 1 Prestige: Each 1 Blood Potence character in your coterie has +1 Resistence this turn.
    `,
    illustrator: "Joyce Maureira",
    set: "Blood & Alchemy",
    clan: "thin-blood",
    bloodPotency: 1,
    physical: 0,
    social: 1,
    mental: 0,
    disciplines: {},
    cardpool: "vampire",
},

}

export const library: Record<CardId, Library> = {

//Library Cards

"baa-absolution": {
    stack: "library",
    name: "Absolution",
    text: md`
        Negate all Reactions played by characters with 1+ [blood] of your color on them.
    `,
    illustrator: "Timothy Terrenal",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 5,
    attack: "mental",
    damage: 2,
    shield: 0,
    cardpool: "vampire",
},

"baa-all-the-angles": {
    stack: "library",
    name: "All the Angles",
    text: md`
        Superficial. +1 Damage for each different Discipline the attacker has.
        (This attack cannot reduce the target's Blood below 1.)
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 6,
    attack: "mental",
    damage: 0,
    shield: 0,
    cardpool: "vampire",
},

"baa-athanor-corporis": {
    stack: "library",
    name: "Athanor Corporis",
    text: md`
        Attach to the acting character.
        If they are a Thin-blood, gain 1 Action.
        This character gains +1 Physical Damage and Thin-blood Alchemy.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "alchemy"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
    cardpool: "vampire",
},

"baa-baals-caress": {
    stack: "library",
    name: "Baal's Caress",
    text: md`
        Play this card face up.
        Blood Sorcery Pay 1 blood: +1 **Aggravated** Damage. 
        You may activate this ability one for each Blood Sorcery this character has.
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 0,
    shield: 0,
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-back-to-formula": {
    stack: "library",
    name: "Back to Formula",
    text: md`
        Thin-blood Alchemy Revel the top 4 cards of your Library. 
        Draw each revealed Alchemy and discard the rest. 
        If you raw none, put 1 Alchemy from your discard pile into your hand.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action"],
    set: "Blood & Alchemy",
    disciplines: ["thin-blood alchemy"],
    cardpool: "vampire",
},

"baa-backup": {
    stack: "library",
    name: "Backup",
    text: md`
        +1 Resistance for each card attached to this character.
    `,
    illustrator: "Timothy Terrenal",
    types: ["reaction"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 1,
    attack: ["physical", "social"],
    reactions: ["physical", "social"],
    //damage: 0,
    shield: 0,
    cardpool: "vampire",
},

"baa-blood-makes-noise": {
    stack: "library",
    name: "Blood Makes Noise",
    text: md`
        Blood Sorcery Place 1 to 3 Blood of your color on this card. 
        Ongoing, Relentless - **Remove 1 Blood from this:** Gain 1 Prestige or 4 Influence. 
        WHen empty, burn this.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-blood-of-potency": {
    stack: "library",
    name: "Blood of Potency",
    text: md`
        Attach to the acting character. 
        This character has +2 Blood Potence. 
        When this attaches, this character mends 1 Blood for each Blood Sorcery they have.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-break-down": {
    stack: "library",
    name: "Break Down",
    text: md`
        Blood-thin Alchemy Put a '-1 Blood Potence' token on the target.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 3,
    attack: "mental",
    damage: 1,
    shield: 0,
    disciplines: ["thin-blood alchemy"],
    cardpool: "vampire",
},

"baa-calcinatio": {
    stack: "library",
    name: "Calcinatio",
    text: md`
        Attach to the acting character. 
        If they are a Thin-blood, gain 1 Action. 
        This character gains +1 Social Damage and Thin-blood Alchemy.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "alchemy"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
    cardpool: "vampire",
},

"baa-crossbow": {
    stack: "library",
    name: "Crossbow",
    text: md`
Discard 1 card: Attach Crossbow to the target if they have 2 or fewer attachment. This target cannot mend during their End phase.
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 3,
    attack: "ranged",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"baa-dangerous-mixture": {
    stack: "library",
    name: "Dangerous Mixture",
    text: md`
        +1 Damage for each different Alchemy in this party.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"baa-defense-of-the-sacred-haven": {
    stack: "library",
    name: "Defense of the Sacred Haven",
    text: md`
        [blood sorcery] **Place 1 to 3 Blood of your color on this card.
        ** Ongoing - Characters in your Haven have +1 Secrecy.
        At the start of your turn, remove 1 Blood from this. 
        When empty, burn this.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-enervate": {
    stack: "library",
    name: "Enervate",
    text: md`
        Use only in the Streets. 
        Steal 1 Prestige from target foe and put it on the acting character as Blood (this is a mend effect).
    `,
    illustrator: "Harvey Bunda",
    types: ["action"],
    set: "Blood & Alchemy",
    clan: "tremere",
    cardpool: "vampire",
},

"baa-envelop": {
    stack: "library",
    name: "Envelop",
    text: md`
        Detach an Alchemy from the acting character: Put a '-1 Blood Potence' token on each character in target party in The Streets.
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Blood & Alchemy",
    cardpool: "vampire",
},

"baa-extinguish-vitae": {
    stack: "library",
    name: "Extinguish Vitae",
    text: md`
        Blood Sorcery Remove all Blood of your color from target character.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-far-reach": {
    stack: "library",
    name: "Far Reach",
    text: md`
        Move target character into The Streets as a separate party. 
        Detach an Alchemy from the acting character: The acting character starts an attack against the target, who cannot play a Reaction.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action"],
    set: "Blood & Alchemy",
    cardpool: "vampire",
},

"baa-first-ones-free": {
    stack: "library",
    name: "First One's Free",
    text: md`
        Detach an Alchemy from a characer in this party: Steal a Retainer from a member of the opposing party and attacj it to the attacker.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 2,
    attack: "social",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"baa-fixatio": {
    stack: "library",
    name: "Fixatio",
    text: md`
        Attach to the acting character. 
        If they are a Thin-blood, gain 1 Action. 
        This character gains +1 Mental Damage and Thin-blood Alchemy.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "alchemy"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
    cardpool: "vampire",
},

"baa-haze": {
    stack: "library",
    name: "Haze",
    text: md`
        Requires Alchemy in the party to play. 
        Play this card face up. 
        Negate a Ranged Attack or non-Attack effect targeting a character in this party.
    `,
    illustrator: "Irene Francisco",
    types: ["reaction", "special"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 1,
    damage: 0,
    shield: 0,
    cardpool: "vampire",
},

"baa-heightened-senses": {
    stack: "library",
    name: "Heightened Senses",
    text: md`
        You may play this to aid any character in The Streets from any coterie. 
        Target defending character in The Streets has +1 [shield] for each [auspex] your Leader has.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["reaction", "special"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 1,
    attack: ["ranged", "physical", "social"],
    reactions: ["ranged", "physical", "social"],
    //damage: 0,
    shield: 0,
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"baa-intimidation": {
    stack: "library",
    name: "Intimidation",
    text: md`
        +2 Damage to City Deck Mortals. 
        If the attacker's Blood Potence is higher than the target's, exhaust the target and put a Fear token on them.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 4,
    attack: "social",
    damage: 1,
    shield: 0,
    cardpool: "vampire",
},

"baa-mesmerize": {
    stack: "library",
    name: "Mesmerize",
    text: md`
        [Dominate] Put a Fear token on the target.
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 2,
    attack: "mental",
    damage: 1,
    shield: 0,
    disciplines: ["dominate"],
    cardpool: "vampire",
},

"baa-out-of-time": {
    stack: "library",
    name: "Out of Time",
    text: md`
    Play this card face down and place 1 Prestige on it. 
    If this card has 3+ Prestige on it, you may resolve it during your turn. 
    Target foe who did not contribute loses 1 Action during their next turn.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "conspiracy"],
    set: "Blood & Alchemy",
    cardpool: "vampire",
},

"baa-peer-pressure": {
    stack: "library",
    name: "Peer Pressure",
    text: md`
        +1 Damage for every 2 characters in this party (including this character).
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 0,
    attack: "social",
    damage: 0,
    shield: 0,
    cardpool: "vampire",
},

"baa-premonition": {
    stack: "library",
    name: "Premonition",
    text: md`
        Attach to a character in your coterie and gain 1 Action. 
        Auspex party - Characters attacking members of this party play their Attack cards face up.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["unhosted action"],
    set: "Blood & Alchemy",
    disciplines: ["auspex"],
    cardpool: "vampire",
},

"baa-rain-of-blood": {
    stack: "library",
    name: "Rain of Blood",
    text: md`
        Influence Conflict - Should each plater mend 1 Blood on each character in their coterie and torpor?
    `,
    illustrator: "Adelijah Ocampo",
    types: ["unhosted action", "scheme"],
    set: "Blood & Alchemy",
    cardpool: "vampire",
},

"baa-scorpions-touch": {
    stack: "library",
    name: "Scorpion's Touch",
    text: md`
        For each Blood Sorcery the attacker has, replace 1 Blood on the target with Blood of your color from the general supply.
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 1,
    shield: 0,
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-seek-knowledge": {
    stack: "library",
    name: "Seek Knowledge",
    text: md`
        [blood sorcery] **Place 1 to 3 Blood of your color on this card.
        ** Ongoing - **Remove 1 Blood from this:** Draw 2 cards, then discard 1 card. 
        When empty, burn this.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    clan: "tremere",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-sleep-of-the-damned": {
    stack: "library",
    name: "Sleep of the Damned",
    text: md`
        [blood sorcery] **Place 1 to 3 Blood of your color on this card.
        ** Ongoing - Foe's charcters in torpor have +2 Blood Potence. 
        At the start of your turn, if 1+ foes have a charcter in torpor, remove 1 Blood from this. 
        When empty, burn this.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-sunrise-surprise": {
    stack: "library",
    name: "Sunrise Surprise",
    text: md`
        Cannot be played during the 1st or 2nd Action of your turn. 
        Play only in The Streets. 
        Deal 2 **Aggravated** Damage to the acting character and target character in The Streets.
    `,
    illustrator: "Dawn Nique",
    types: ["action"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
    cardpool: "vampire",
},

"baa-theft-of-vitae": {
    stack: "library",
    name: "Theft of Vitae",
    text: md`
        Blood Sorcery Burn target unattached City Deck Mortal in The Streets (this is not defeating them). 
        If they have a Burn benefit, the acting character claims that reward.
    `,
    illustrator: "Harvey Bunda",
    types: ["action"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},

"baa-third-tradition-the-progeny": {
    stack: "library",
    name: "Third Tradition: The Progeny",
    text: md`
        Pay 1 Prestige. Ongoing. 
        At the start of your turn, each player with 4+ vampires in their coterie chooses to either lose 1 Prestige or discard 1 card.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["unhosted action", "ongoing"],
    set: "Blood & Alchemy",
    cardpool: "vampire",
},

"baa-truth-of-blood": {
    stack: "library",
    name: "Truth of Blood",
    text: md`
        [blood sorcery] **Place 1 to 3 Blood of your color on this card.
        ** Ongoing - Pay 1 Prestige, **Remove 1 Blood from this:** Target foe loses 1 Agenda. 
        When empty, burn this.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
    cardpool: "vampire",
},



}

