import { CardId, CardSet, Illustrator, md, Cardpool } from "./common.js";

export type Haven = {
  stack: "haven";
  name: string;
  text: string;
  illustrator: Illustrator;
  set: CardSet;
  cardpools: Cardpool[];
};

export const havens: Record<CardId, Haven> = {

// Core //

"core-artist-lofts": {
  stack: "haven",
  name: "Haven - Artist Lofts",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    At the end of your turn, if your Leader is exhausted, you may draw 1 card, the discard 1 card.
  `,
  illustrator: "Felipe Gaona",
  set: "Core",
  cardpools: ["Vampire"],
},

"core-dragons-roost": {
  stack: "haven",
  name: "Haven - Dragon's Roost",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    If ready, you may move your Leader to The Streets (if they are not already there) to Block a foe's attack (including [ranged]).
    If the attack targeted a character, gain 1 [prestige].
  `,
  illustrator: "Felipe Gaona",
  set: "Core",
  cardpools: ["Vampire"],
},

"core-house-of-pain": {
  stack: "haven",
  name: "Haven - House of Pain",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Attacker - Discard 1 card: Your Leader deals +1 Damage to the target.
  `,
  illustrator: "Felipe Gaona",
  set: "Core",
  cardpools: ["Vampire"],
},

"core-old-post-office": {
  stack: "haven",
  name: "Haven - Old Post Office",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Once during each player's turn, you may place a card fro your hand with 1-3 Blood Potence as an Influence Modifier.
    When revealed, gain Influence equal to the card's Blood Potence value.
  `,
  illustrator: "Cold Castle Studios",
  set: "Core",
  cardpools: ["Vampire"],
},

"core-royal-retreat": {
  stack: "haven",
  name: "Haven - Royal Retreat",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Characters with a Title in your coterie have +1 Influence.
    Discard an unattached City Deck Mortal in The Streets: Add a new card to The Streets.
  `,
  illustrator: "Cold Castle Studios",
  set: "Core",
  cardpools: ["Vampire"],
},

"core-the-dockyards": {
  stack: "haven",
  name: "Haven - The Dockyards",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Each time your Leader would take +1 Damage, you may discard 1 card to prevent 1 Damage.
  `,
  illustrator: "Felipe Gaona",
  set: "Core",
  cardpools: ["Vampire"],
},

"core-the-madhouse": {
  stack: "haven",
  name: "Haven - The Madhouse",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Discard 1 card: Add 1 [prestige] from the general supply to a face-down card you control.
  `,
  illustrator: "Cold Castle Studios",
  set: "Core",
  cardpools: ["Vampire"],
},

"core-the-penthouse": {
  stack: "haven",
  name: "Haven - The Penthouse",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When a character in your coterie attaches a Retainer, that character mends 1 Blood.
  `,
  illustrator: "The Creation Studio",
  set: "Core",
  cardpools: ["Vampire"],
},

// Blood and Alchemy //

"baa-the-chantry": {
  stack: "haven",
  name: "Haven - The Chantry",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When your Leader plays a Ritual, gain 1 Unhosted Action.
  `,
  illustrator: "Felipe Gaona",
  set: "Blood & Alchemy",
  cardpools: ["Vampire"],
},

"baa-the-pit": {
  stack: "haven",
  name: "Haven - The Pit",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    The first time you recruit a character during each of your turns, gain 1 Unhosted Action.
  `,
  illustrator: "Marco Primo",
  set: "Blood & Alchemy",
  cardpools: ["Vampire"],
},

"baa-thrift-store": {
  stack: "haven",
  name: "Haven - Thrift Store",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Your Library cards have -1 Blood Potence.
    When your Leader is defeated, put a '-1 Blood Potence' token on target character.
  `,
  illustrator: "Marco Primo",
  set: "Blood & Alchemy",
  cardpools: ["Vampire"],
},

"baa-university-library": {
  stack: "haven",
  name: "Haven - University Library",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    **Pay 1 or 2 [blood]:** Draw that many cards from your Library.
  `,
  illustrator: "Marco Primo",
  set: "Blood & Alchemy",
  cardpools: ["Vampire"],
},

// Wolf and Rat //

"war-city-park": {
  stack: "haven",
  name: "Haven - City Park",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When your Leader exhausts, reveal the top card of your Library.
    If it's an Animal, draw it.
    Otherwise, leave it or discard it.
  `,
  illustrator: "Harvey Bunda",
  set: "Wolf & Rat",
  cardpools: ["Vampire"],
},

"war-the-outskirts": {
  stack: "haven",
  name: "Haven - The Outskirts",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Once during each of your turns, you may Discard an Animal: Mend 2 [blood] on any character in your coterie or in torpor.
  `,
  illustrator: "Adelijah Ocampo",
  set: "Wolf & Rat",
  cardpools: ["Vampire"],
},

"war-the-sewers": {
  stack: "haven",
  name: "Haven - The Sewers",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Your Leader may attack City Deck Mortals in The Streets without leaving your Haven.
  `,
  illustrator: "Felipe Gaona",
  set: "Wolf & Rat",
  cardpools: ["Vampire"],
},

"war-the-shelter": {
  stack: "haven",
  name: "Haven - The Shelter",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Character in your coterie with 1+ Vagrants attached have +1 Secrecy in The Streets.
  `,
  illustrator: "Felipe Gaona",
  set: "Wolf & Rat",
  cardpools: ["Vampire"],
},

// Shadows and Shrouds //

"sas-eternal-life-mortuary": {
  stack: "haven",
  name: "Haven - Eternal Life Mortuary",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    **Remove 2 [blood] from a character in your coterie (this may reduce them to 0):** Burn target unattached City Deck Vagrant or Citizen in The Streets.
  `,
  illustrator: "Marco Primo",
  set: "Shadows & Shrouds",
  cardpools: ["Vampire"],
},

"sas-mission-cemetery": {
  stack: "haven",
  name: "Haven - Mission Cemetery",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    **Burn a Retainer in your coterie:** Create a wraith and attach it to a character in your coterie.
  `,
  illustrator: "Felipe Gaona",
  set: "Shadows & Shrouds",
  cardpools: ["Vampire"],
},

"sas-the-big-house": {
  stack: "haven",
  name: "Haven - The Big House",
  text: md`
    _Start of Game - Put 1 [prestige] from each foe's general supply on this._
    Characters in your Haven ha Secrecy.
    **Leader Ability**
    Character in your coterie ha [blood-potency].
    **Give a foe 1 [prestige] of their color from this:** Diablerize a vampire in that foe's coterie that your Leader just defeated.
  `,
  illustrator: "Felipe Gaona",
  set: "Shadows & Shrouds",
  cardpools: ["Vampire"],
},

"sas-the-tenderloin": {
  stack: "haven",
  name: "Haven - The Tenderloin",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    **Remove 1 [agenda] from X different sources you control:** You pay X less [prestige] to recruit your next character this turn.
    (Add the remaining [blood] from the general supply.)
  `,
  illustrator: "Marco Primo",
  set: "Shadows & Shrouds",
  cardpools: ["Vampire"],
},

// Heart of Europe //

"hoe-guard-tower": {
  stack: "haven",
  name: "Haven - The Guard Tower",
  text: md`
    Guards in your coterie have +1 [Shield] while Blocking.
    **Leader Ability**
    Guards in your coterie deal +1 [damage] to Blockers.
    At the end of your turn, ready 1 character in your coterie.
  `,
  illustrator: "Marco Primo",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
},

"hoe-old-rail-station": {
  stack: "haven",
  name: "Haven - Old Rail Station",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Characters attacking your coterie deal -1 [damage] for each '-1 [Blood Potency]' token on them.
  `,
  illustrator: "Marco Primo",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
},

// Dragon and Rogue //

"dar-campsite": {
  stack: "haven",
  name: "Haven - Campsite",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Your Leader has +1 Secrecy.
    **Exhaust a character in your coterie and pay 1 Action:** You may replace this Haven with one from your collection.
  `,
  illustrator: "Adelijah Ocampo",
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
},

"dar-converted-bus": {
  stack: "haven",
  name: "Haven - Converted Bus",
  text: md`
    Your characters in The Streets have +1 Secrecy.
    **Leader Ability**
    When your Leader moves to The Streets, you may move 1 of their [blood] to another card you control (flipped to either side).
  `,
  illustrator: "Adelijah Ocampo",
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
},

"dar-country-estate": {
  stack: "haven",
  name: "Haven - Country Estate",
  text: md`
    \***\*Start of Game:** Attach a Ghoul from your Library to this.\*\*
    Characters in your Haven have +1 Secrecy and Ghouls you control in The Streets have +1 [shield].
    **Leader Ability**
    When your Leader defeats a Citizen of _Vagrant_, you may play the Ghoul attached to this at no Action cost **OR** if you control a Ghoul, play a card at no Action cost.
  `,
  illustrator: "Irene Francisco",
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
},

"dar-social-housing": {
  stack: "haven",
  name: "Haven - Social Housing",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Your Leader has **+1 Attachment**.
    When your Leader defeats a City Deck Mortal, you may move a Retainer from a character you control to another character you control (does not trigger attach effects).
  `,
  illustrator: "Mara Miranda-Escota",
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
},

// Justice and Mercy //

"jam-the-hermitage": {
  stack: "haven",
  name: "Haven - The Hermitage",
  text: md`
    Characters in your Haven have +1 Secrecy.
    When you recruit a character, gain 1 [prestige].
    If they are Salubri, gain 2 [prestige] instead and draw 1 Faction card.
  `,
  illustrator: "Marco Primo",
  set: "Justice & Mercy",
  cardpools: ["Vampire"],
},

"jam-ritual-room": {
  stack: "haven",
  name: "Haven - Ritual Room",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When your Leader deals damage to a character, put that lost [blood] onto Rituals you control.
  `,
  illustrator: "Marco Primo",
  set: "Justice & Mercy",
  cardpools: ["Vampire"],
},

"jam-the-castle": {
  stack: "haven",
  name: "Haven - The Castle",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Discard 1 card:** Mend 1 [blood] on target character (including in torpor); mend 2 [blood] instead if they are in torpor.
    If the target is the only character in their coterie, draw 1 card.
  `,
  illustrator: "Marco Primo",
  set: "Justice & Mercy",
  cardpools: ["Vampire"],
},

"jam-the-high-horse": {
  stack: "haven",
  name: "Haven - The High Horse",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When you play a Tradition, draw 1 card.
    Reduce the [prestige] cost of Traditions you play by 1.
  `,
  illustrator: "Marco Primo",
  set: "Justice & Mercy",
  cardpools: ["Vampire"],
},

// Hunter and Hunted //

"hah-fellowship-hall": {
  stack: "haven",
  name: "Hideout - Fellowship Hall",
  text: md`
    Your characters have +1 Secrecy.
    **Leader Ability**
    The first time you recruit a character during each of your turns, gain 1 Unhosted Action.
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Hunter"],
},

"hah-back-alley-clinic": {
  stack: "haven",
  name: "Hideout - Back Alley Clinic",
  text: `md
    Your characters have +1 Secrecy.
    **Leader Ability**
    When a character you control is defeated by non-**Aggravated** [damage], if you control no characters in recovery, you may put the defeated character into recovery.
  `,
  illustrator: "Cold Castle Studios",
  set: "Hunters & Hunted",
  cardpools: ["Hunter"],
},

"hah-the-temple-of-set": {
  stack: "haven",
  name: "Haven - The Temple of Set",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When your Leader defeats a character, you may put 1 [prestige] from your general supply on each face-down card you control.
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Vampire"],
},

"hah-the-clubhouse": {
  stack: "haven",
  name: "Haven - The Clubhouse",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    At the start of your turn, draw 1 card for every 4 different Disciplines or Edges in your coterie, then discard 1 card.
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Hunter", "Vampire"],
},

"hah-the-bunker": {
  stack: "haven",
  name: "Hideout - The Bunker",
  text: md`
    Your characters have +1 Secrecy.
    **Leader Ability**
    **Pay X [prestige]:** Prevent X [damage] to target character you control.
  `,
  illustrator: "Cold Castle Studios",
  set: "Hunters & Hunted",
  cardpools: ["Hunter"],
},

"hah-the-feretory": {
  stack: "haven",
  name: "Hideout - The Feretory",
  text: md`
    Your characters have +1 Secrecy.
    **Leader Ability**
    When your Leader exhausts, reveal the top card of your Library.
    If it's a Relic, draw it. Otherwise, leave it or discard it.
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Hunter"],
},

"hah-the-orphanage": {
  stack: "haven",
  name: "Haven - The Orphanage",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    If your discard pile contains 5+ Library cards and none have a clan affiliation , **Exhaust The Orphanage:** Gain 1 Unhosted Action.
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Vampire"],
},

"hah-the-hidden-temple": {
  stack: "haven",
  name: "Haven - The Hidden Temple",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Your Leader has +1 Influence.
    **Exhaust The Hidden Temple:** Put a 'No Influence' token on target character.
  `,
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Vampire"],
},

// Martial Law //

"ml-ghoulish-favela": {
  stack: "haven",
  name: "Haven - Ghoulish Favela",
  text: md`
    Characters in your Haven have +1 Secrecy. Ghouls with no face-up attachments you control have +1 [shield].
    **Leader Ability**
    When your Leader exhausts, reveal the top card of your Library. If it's a Ghoul or has the word "Ghoul" in its game text, draw it. Otherwise, leave it or discard it.
  `,
  illustrator: "Adelijah Ocampo",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-hunters-blind": {
  stack: "haven",
  name: "Hideout - Hunter's Blind",
  text: md`
    Your characters have +1 Secrecy.
    **Leader Ability**
    Once during each player's turn, you may ready a character you control in The Streets to Block a foe's attack (including [ranged]) against a target in The Streets.
  `,
  illustrator: "Mara Miranda",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-the-ready-room": {
  stack: "haven",
  name: "Hideout - The Ready Room",
  text: md`
    Your characters have +1 Secrecy.
    **Leader Ability**
    You pay 1 less [prestige] to activate **Relentless** abilities.
  `,
  illustrator: "Mara Miranda",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

// Fang and Talon //

"fat-caern-garden-palace": {
  stack: "haven",
  name: "Caern: Garden Palace",
  text: md`
    Characters in your Caern have +1 Secrecy.
    **Leader Ability**
    Once during each of your Action Phases, you may move 1 Rage from a card you control to another card you control.
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-caern-desert-compound": {
  stack: "haven",
  name: "Caern: Desert Compound",
  text: md`
    Characters in your Caern have +1 [shield] against non-**Aggravated** [damage].
    **Leader Ability**
    At the start of your turn, you may attach a non-Crinos Form to a character in your pack at no Rage cost. If you do, that character mends 1 [blood].
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-caern-national-park": {
  stack: "haven",
  name: "Caern: National Park",
  text: md`
    Characters in your Caern have +1 Secrecy.
    **Leader Ability**
    When your Leader exhausts, you may attach a Gift to a character in your pack at no Action cost.
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-caern-the-observatory": {
  stack: "haven",
  name: "Caern: The Observatory",
  text: md`
    Characters in your Caern have +1 Secrecy.
    **Leader Ability**
    At the start of your turn, you may exert up to 4 Influence to gain 1 [prestige] per 2 Influence exerted OR your Leader may gain 1 Rage per 1 Influence exerted.
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-caern-the-stadium": {
  stack: "haven",
  name: "Caern: The Stadium",
  text: md`
    Characters in your Caern have +1 [shield] against non-**Aggravated** [damage].
    **Leader Ability**
    At the end of your turn, if your Leader is in the Streets and your Rival's Leader is not, gain 1 [prestige] OR draw 1 card.
  `,
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

// Prince Pack 2 //

"pp2-the-dojo": {
  stack: "haven",
  name: "Haven - The Dojo",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    At the end of the Blocking Step of each attack a character in your coterie makes targeting a character during your turn, draw 1 card. 
    Then, each player who controls 1+ characters in The Streets draws 1 card and discards 1 card.
  `,
  illustrator: "Elif Aydin",
  set: "Prince Pack 2",
  cardpools: ["Vampire", "Hunter"],
},

"pp2-atomic-empire": {
  stack: "haven",
  name: "Haven - Atomic Empire",
  text: md`
    Characters in your coterie have +1 Intel.
    **Leader Ability**
    Characters in your coterie have +1 Stealth. During your turn, when a player blocks an attack you make, draw 1 card.
  `,
  illustrator: "Anastasiia Horbunova",
  set: "Prince Pack 2",
  cardpools: ["Vampire", "Hunter"],
},

// Promo //

"xxx-apartment-111": {
  stack: "haven",
  name: "Haven - Apartment 111",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Solitary** characters in your coterie have +1 Secrecy in The Streets, +1 Intel, and +1 Influence.
    At the end of your Beginning Phase, ready each character in your coterie.
  `,
  illustrator: "Marco Primo",
  set: "Promo",
  cardpools: ["Vampire"],
},

"xxx-dancing-house": {
  stack: "haven",
  name: "Haven - Dancing House",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    **Discard 1 card:** Move a non-Title attachment from a card you control to another card you control (does not trigger attach effects).
  `,
  illustrator: "Felipe Gaona",
  set: "Promo",
  cardpools: ["Vampire"],
},

"xxx-old-police-station": {
  stack: "haven",
  name: "Haven - Old Police Station",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When your Leader defeats a character, you may use up to 3 [blood] of your color that was on that character to play a Ritual at no cost.
    (You may add [blood] from other sources as well.)
  `,
  illustrator: "Marco Primo",
  set: "Promo",
  cardpools: ["Vampire"],
},

"xxx-prague-national-bank": {
  stack: "haven",
  name: "Haven - Prague National Bank",
  text: md`
    You start the game with 25 [prestige].
    If this card leaves play, lose 3 [prestige].
  `,
  illustrator: "Marco Primo",
  set: "Promo",
  cardpools: ["Vampire"],
},

"xxx-tent-city": {
  stack: "haven",
  name: "Haven - Tent City",
  text: md`
  Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    While your coterie has characters from 3+ different clans, characters in your coterie have +1 Secrecy.
  `,
  illustrator: "Felipe Gaona",
  set: "Promo",
  cardpools: ["Vampire"],
},

"xxx-youth-hostel": {
  stack: "haven",
  name: "Haven - Youth Hostel",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    When a character in your coterie is attacked, they have +1 [shield] for each character in the attacking party with [blood-potency] higher than theirs.
  `,
  illustrator: "Mara Miranda-Escota",
  set: "Promo",
  cardpools: ["Vampire"],
},

"xxx-the-underpass": {
  stack: "haven",
  name: "Haven - The Underpass",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    **Pay 1 [prestige]:** Mend 1 [blood] on a character in your coterie or torpor for each Animal and/or _Vagrant_ you have attached to your Leader.
  `,
  illustrator: "Felipe Gaona",
  set: "Promo",
  cardpools: ["Vampire"],
},

"xxx-the-presidio": {
  stack: "haven",
  name: "Haven - The Presidio",
  text: md`
    Characters in your Haven have +1 Secrecy.
    **Leader Ability**
    Your Leader has +1 [shield] vs **Aggravated** [damage].
  `,
  illustrator: "Marco Primo",
  set: "Promo",
  cardpools: ["Vampire"],
},

};
