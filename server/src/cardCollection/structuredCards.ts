import { CardId, CardSet, md } from "./common.js";

type Clan =
  | "brujah"
  | "gangrel"
  | "hecata"
  | "lasombra"
  | "malkavian"
  | "nosferatu"
  | "thin-blood"
  | "toreador"
  | "tremere"
  | "ventrue";

type Discipline =
  | "animalism"
  | "auspex"
  | "blood sorcery"
  | "celerity"
  | "dominate"
  | "fortitude"
  | "obfuscate"
  | "oblivion"
  | "potence"
  | "presence"
  | "protean"
  | "thin-blood alchemy";

export type Faction = {
  stack: "faction";
  name: string;
  clan: Clan;
  bloodPotency: number;
  physical: number;
  social: number;
  mental: number;
  disciplines?: Discipline[];
  text: string;
  illustrator: string;
  set: CardSet;
};

export const factions: Record<CardId, Faction> = {
  "hoe-aleister": {
    stack: "faction",
    clan: "tremere",
    name: "Aleister",
    text: md`
Attacker - **Discard 2 cards:** This attack deals +4 **Superficial** [Damage] to the target. (This attack cannot reduce the target's [blood] below 1.)
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["auspex", "blood sorcery"],
  },
  "hoe-anjali-the-samedi": {
    stack: "faction",
    clan: "hecata",
    name: "Anjali the Samedi",
    text: md`
Torpor - Attach the top card of target player's Library face down to a character in their coterie with 2 or fewer attachments. If this is its first attachment, draw 1 card.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 2,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["auspex"],
  },
  "hoe-borek-wagner": {
    stack: "faction",
    clan: "ventrue",
    name: "Borek Wagner",
    text: md`
At the start of your first turn of the game, reveal 2 different Havens from your collection. Your Rival chooses 1 and you attach that Haven to this character, who gains the Leader Ability of that Haven.
    `,
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["dominate", "fortitude", "presence"],
  },
  "hoe-camila": {
    stack: "faction",
    clan: "lasombra",
    name: "Camila",
    text: md`
Attacker - Put a "No Influence" token on the target.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["oblivion"],
  },
  "hoe-dien": {
    stack: "faction",
    clan: "gangrel",
    name: "Dien",
    text: md`
Solo Attacker - Play up to 2 Attack cards. Before revealing, if you played 2 cards, return 1 of them to your hand; If you played 1 card, you may reveal it or return it to your hand.
    `,
    bloodPotency: 6,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["animalism", "fortitude", "protean"],
  },
  "hoe-ekene": {
    stack: "faction",
    clan: "gangrel",
    name: "Ekene",
    text: md`
Solo Attacker - This character does not declare their attack type until Step 8 of the attack sequence.
    `,
    bloodPotency: 3,
    physical: 1,
    social: 1,
    mental: 0,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["protean"],
  },
  "hoe-em": {
    stack: "faction",
    clan: "ventrue",
    name: "Em",
    text: md`
At the start of your turn, if you control +2 Havens, gain 1 [prestige]. If you control +3 Havens, also gain 1 [agenda].
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Amy Wilkins",
    set: "Heart of Europe",
    disciplines: ["fortitude", "presence"],
  },
  "hoe-emil-hruza": {
    stack: "faction",
    clan: "toreador",
    name: "Emil Hruza",
    text: md`
You may ignore City Deck Events. When this character defeats a Mortal or character, you may shuffle 1 Event from the City Deck burned pile into the City Deck. When that Event leaves play, remove it from the game.
    `,
    bloodPotency: 7,
    physical: 0,
    social: 2,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["celerity", "dominate", "presence"],
  },
  "hoe-jan-zoubek": {
    stack: "faction",
    clan: "thin-blood",
    name: "Jan Zoubek",
    text: md`
The first time a 1 [blood potency] or 2 [blood potency] character in your coterie enters torpor during each player's turn, foes gain no [agenda] for defeating them.
    `,
    bloodPotency: 2,
    physical: 1,
    social: 0,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["thin-blood alchemy"],
  },
  "hoe-kiril": {
    stack: "faction",
    clan: "brujah",
    name: "Kiril",
    text: md`
Attacker - This character has +3 Influence this turn.
    `,
    bloodPotency: 6,
    physical: 2,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["celerity", "potence", "presence"],
  },
  "hoe-maia": {
    stack: "faction",
    clan: "toreador",
    name: "Maia",
    text: md`
Attacker - This attack deals +1 [damage] to the target for each Event in play.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Amy Wilkins",
    set: "Heart of Europe",
    disciplines: ["auspex", "presence"],
  },
  "hoe-monika": {
    stack: "faction",
    clan: "thin-blood",
    name: "Monika",
    text: md`
**Exhaust 1 character in this party:** Put a '-1 [blood potency]' token on target character in The Streets who does not have one.
    `,
    bloodPotency: 3,
    physical: 0,
    social: 0,
    mental: 2,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["thin-blood alchemy"],
  },
  "hoe-omnis": {
    stack: "faction",
    clan: "nosferatu",
    name: "Omnis",
    text: md`
When you resolve a Trap with 2+ [prestige] on it, return that card to your hand.
    `,
    bloodPotency: 4,
    physical: 0,
    social: 1,
    mental: 1,
    illustrator: "Amy Wilkins",
    set: "Heart of Europe",
    disciplines: ["obfuscate", "potence"],
  },
  "hoe-perseus": {
    stack: "faction",
    clan: "malkavian",
    name: "Perseus",
    text: md`
Attacker - If this attack deals 1+ [damage] to the target, the target's controller discards 1 card for every 4 cards they have in their hand.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
    disciplines: ["auspex", "obfuscate"],
  },
  "hoe-rene-koba": {
    stack: "faction",
    clan: "malkavian",
    name: "René Koba",
    text: md`
When you play a card face down outside of an attack, mend 1 [blood] on a character in your coterie.
    `,
    bloodPotency: 2,
    physical: 0,
    social: 1,
    mental: 0,
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
    disciplines: ["auspex"],
  },
  "hoe-roman-monstrum": {
    stack: "faction",
    clan: "hecata",
    name: "Roman Monstrum",
    text: md`
**Reach** _(May attack characters in The Streets from your Haven.)_

**Detach 1 Curse from target character and choose one:** Put a Fear token on the target **OR** the target loses 1 [blood].
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["auspex", "oblivion"],
  },
  "hoe-sarka": {
    stack: "faction",
    clan: "brujah",
    name: "Sarka",
    text: md`
**Guard** _(This character may Block [ranged] attacks.)_

Party - When a character in this party Blocks an attack, they steal 1 [blood] from the attack.
    `,
    bloodPotency: 5,
    physical: 1,
    social: 1,
    mental: 1,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["celerity", "celerity"],
  },
  "hoe-sebastian": {
    stack: "faction",
    clan: "lasombra",
    name: "Sebastian",
    text: md`
Attaching a Title from your hand to this character costs 0 Influence, then ready this character.
    `,
    bloodPotency: 7,
    physical: 1,
    social: 1,
    mental: 2,
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
    disciplines: ["oblivion", "oblivion", "presence"],
  },
  "hoe-thora": {
    stack: "faction",
    clan: "nosferatu",
    name: "Thora",
    text: md`
Attaching a Title from your hand to this character costs 0 Influence, then ready this character.
    `,
    bloodPotency: 5,
    physical: 2,
    social: 1,
    mental: 0,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["animalism", "obfuscate"],
  },
  "hoe-zuzana": {
    stack: "faction",
    clan: "tremere",
    name: "Zuzana",
    text: md`
**Guard**
This character can Block [ranged] attacks.

When this character Blocks an attack, replace 1 [blood] on the attacker with one of your color from the general supply.
    `,
    bloodPotency: 4,
    physical: 1,
    social: 0,
    mental: 1,
    illustrator: "Felipe Gaona",
    set: "Heart of Europe",
    disciplines: ["blood sorcery", "dominate"],
  },

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
    disciplines: ["blood sorcery"],
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
    disciplines: ["thin-blood alchemy"],
  },
};

type LibraryCardType =
  | "1 per player"
  | "2 actions"
  | "action"
  | "animal"
  | "alchemy"
  | "attack"
  | "conspiracy"
  | "event"
  | "influence modifier"
  | "ongoing"
  | "reaction"
  | "ritual"
  | "scheme"
  | "special"
  | "title"
  | "trap"
  | "unhosted action"
  | "unique";

type AttackType = "mental" | "physical" | "ranged" | "social";

export type Library = {
  stack: "library";
  name: string;
  clan?: Clan;
  bloodPotencyRequirement?: number;
  damage?: number;
  shield?: number;
  types: LibraryCardType[];
  attack?: AttackType;
  reactions?: AttackType[];
  text: string;
  disciplines?: Discipline[];
  illustrator: string;
  set: CardSet;
};

export const libraries: Record<CardId, Library> = {
  "hoe-bad-optics": {
    stack: "library",
    name: "Bad Optics",
    types: ["influence modifier"],
    text: md`
Gain 2 Influence during this action or event. If this is a Scheme and your side loses, put a Fear token on a target character with a 'No Influence' token and exhaust them.
    `,
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-bank-error-in-your-favor": {
    stack: "library",
    name: "Bank Error In Your Favor",
    clan: "malkavian",
    types: ["action", "conspiracy"],
    text: md`
      **Play this card face down and place 1 [prestige] on it.**

           If this card has 2+ [prestige] on it, you may resolve it during your turn. Target foe who did not contribute draws 3 cards.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-blood-poisoning": {
    stack: "library",
    name: "Blood Poisoning",
    types: ["action", "trap"],
    text: md`
      **Play this card face down and place 1 [prestige] on it.**

      Resolve at any time.

      [obfuscate] Target foe's character that attached a Retainer this turn loses 1 [blood] for each [prestige] on this card.
    `,
    disciplines: ["obfuscate"],
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-blood-transfusion": {
    stack: "library",
    name: "Blood Transfusion",
    clan: "tremere",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - When a character in your coterie attacks a character and does not defeat them, replace 1 [blood] on the target with one of your color from the general supply.
    `,
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-bread-and-circuses": {
    stack: "library",
    name: "Bread and Circuses",
    types: ["action", "scheme"],
    text: md`
      Influence Conflict - Should I give each player a Reward?

           If this succeeds, choose 1 **different** Reward for each player - Draw 1 card, gain 1 [prestige], gain 1 [agenda], or they mend 2 [blood] on 1 character they control.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-cover-charge": {
    stack: "library",
    name: "Cover Charge",
    clan: "toreador",
    types: ["action", "event", "ongoing"],
    text: md`
Play this into The Streets and place 1 [prestige] of your color from the general supply on it. It is now considered a City Deck Event.

Ongoing - For a foe to attack a character with [presence], that foe must first give you 1 [prestige].
    `,
    disciplines: ["presence"],
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-entrancement": {
    stack: "library",
    name: "Entrancement",
    bloodPotencyRequirement: 4,
    damage: 1,
    types: ["attack"],
    attack: "social",
    text: md`
[presence] This target's [social] attribute does not reduce the damage from this attack.
    `,
    disciplines: ["presence"],
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-fortify-the-inner-facade": {
    stack: "library",
    name: "Fortify the Inner Facade",
    bloodPotencyRequirement: 3,
    shield: 1,
    types: ["reaction"],
    reactions: ["social", "mental"],
    text: md`
Play this card face up.

    If your foe's Attack would cause you to lose or spend [prestige], gain 3 [prestige] first.
    [fortitude] If not, +1 [shield].
    `,
    disciplines: ["fortitude"],
    illustrator: "Joyce Maureira",
    set: "Heart of Europe",
  },
  "hoe-fourth-tradition-the-accounting": {
    stack: "library",
    name: "Fourth Tradition: The Accounting",
    types: ["action"],
    text: md`
Attach to target Leader with 2 or fewer attachments.

    When another character in this Leader's coterie makes an attack or uses an activated ability, this character loses 1 [blood].
    `,
    illustrator: "Mara Miranda Escota",
    set: "Heart of Europe",
  },
  "hoe-hidden-stash": {
    stack: "library",
    name: "Hidden Stash",
    clan: "thin-blood",
    types: ["action", "ongoing"],
    text: md`
Add 4 [prestige] from the general supply to this card.

    Ongoing - You may spend [prestige] on this to pay for activated abilities on characters in your coterie.
    `,
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-lone-wolf": {
    stack: "library",
    name: "Lone Wolf",
    clan: "gangrel",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - During other players' turns, your characters who are alone in a party have +1 [shield].

    Your characters have: Solo Attacker - The target has -1 [shield] during this attack.
    `,
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
  "hoe-off-limits": {
    stack: "library",
    name: "Off Limits",
    clan: "nosferatu",
    types: ["action", "trap"],
    text: md`
**Play this card face down and place 1 [prestige] on it.**

    Resolve at any time.

    Target defender in The Streets has +2 [shield] during this attack for each [prestige] on this.
    `,
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-property-developer": {
    stack: "library",
    name: "Property Developer",
    clan: "ventrue",
    types: ["action"],
    text: md`
**Pay 1 [prestige].**

    Attach 1 Haven from your collection to your Leader. They have the Leader Abilities of that Haven.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-prosperity": {
    stack: "library",
    name: "Prosperity",
    types: ["action", "scheme"],
    text: md`
Influence Conflict - Should each player draw 4 cards?
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-psychic-assault": {
    stack: "library",
    name: "Psychic Assault",
    bloodPotencyRequirement: 5,
    types: ["attack"],
    attack: "mental",
    text: md`
Play this card face up. This attack cannot be Blocked.

    [auspex] **Reveal the top card of any player's Library:** +X [damage] equal to the [bloodPotencyRequirement] of that card.
    `,
    disciplines: ["auspex"],
    illustrator: "Harvey Bunda",
    set: "Heart of Europe",
  },
  "hoe-rapid-reflexes": {
    stack: "library",
    name: "Rapid Reflexes",
    bloodPotencyRequirement: 1,
    types: ["attack"],
    attack: "mental",
    shield: 0,
    text: md`
Retarget this attack to any other character in the defending party.

    The new defender has +1 [shield] for each [celerity] they have.
    `,
    disciplines: ["celerity"],
    illustrator: "Joshua Esmeralda",
    set: "Heart of Europe",
  },
  "hoe-royal-bling": {
    stack: "library",
    name: "Royal Bling",
    clan: "lasombra",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - At the start of your turn, add 1 [agenda] from the general supply to each Titled character in your coterie.
    `,
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
  "hoe-spiders": {
    stack: "library",
    name: "Spiders",
    types: ["action", "trap"],
    text: md`
**Play this card face down and place 1 [prestige] on it.**

    Resolve at any time.

    [animalism] Put a Fear token on target foe's character that made an attack this turn.
    `,
    disciplines: ["animalism"],
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
  "hoe-title-fight": {
    stack: "library",
    name: "Title Fight",
    bloodPotencyRequirement: 3,
    types: ["attack"],
    attack: "physical",
    text: md`
**Superficial**

    +[damage] equal to the [bloodPotencyRequirement] of a Title attached to the attacker (Prince counts as 7). (This attack cannot reduce the target's [blood] below 1.)
    `,
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-voter-suppression": {
    stack: "library",
    name: "Voter Suppression",
    clan: "brujah",
    types: ["unhosted action", "ongoing"],
    text: md`
Ongoing - When a character exerts Influence against a Scheme you play, that character loses 1 [blood].

    **Exhaust:** Target character in your coterie has +1 Influence during this action or event.
    `,
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-wake-with-evenings-freshness": {
    stack: "library",
    name: "Wake With Evening's Freshness",
    types: ["2 actions", "ritual", "ongoing"],
    text: md`
[blood sorcery] **Place 1 to 3 [blood] of your color on this card.**

    Ongoing, **Relentless** - **Remove 1 [blood] from this:** Move a ready character in your coterie to The Streets to Block a non-[ranged] attack against any target.
    `,
    illustrator: "Mara Miranda Escota",
    set: "Heart of Europe",
  },
  "hoe-whip-of-the-primogen": {
    stack: "library",
    name: "Whip of the Primogen",
    bloodPotencyRequirement: 2,
    types: ["action", "title", "1 per player"],
    text: md`
**Exert 2 Influence to attach.**

    This character has +1 Influence for each [presence] they have. At the end of your turn, remove a 'No Influence' token from 1 character in your coterie that matches this character's clan.
    `,
    disciplines: ["presence"],
    illustrator: "Adelijah Ocampo",
    set: "Heart of Europe",
  },
  "hoe-wild-ranting": {
    stack: "library",
    name: "Wild Ranting",
    types: ["influence modifier"],
    text: md`
Gain 3 Influence during this action or event. If this is a Scheme and your side loses, target player draws 1 card.
    `,
    illustrator: "Marco Primo",
    set: "Heart of Europe",
  },
  "hoe-withering-spirit": {
    stack: "library",
    name: "Withering Spirit",
    clan: "hecata",
    bloodPotencyRequirement: 5,
    types: ["action"],
    text: md`
**Burn 1 wraith you control:** The [damage] from this card becomes **Aggravated**.

    [oblivion] Deal 1 [mental] [damage] to target character for each wraith in your coterie and each Curse attached to the target.
    `,
    disciplines: ["oblivion"],
    illustrator: "Irene Francisco",
    set: "Heart of Europe",
  },
};
