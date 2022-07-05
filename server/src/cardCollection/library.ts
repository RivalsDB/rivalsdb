import { CardId, CardSet, md, Clan, Discipline } from "./common.js";

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
  types: LibraryCardType[];
  clan?: Clan;
  bloodPotencyRequirement?: number;
  damage?: number;
  shield?: number;
  attack?: AttackType;
  reactions?: AttackType[];
  text: string;
  disciplines?: Discipline[];
  illustrator: string;
  set: CardSet;
};

export const library: Record<CardId, Library> = {
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
    types: ["reaction"],
    reactions: ["ranged", "physical"],
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
    types: ["2 actions", "ritual", "ongoing", "reaction"],
    text: md`
[blood sorcery] **Place 1 to 3 [blood] of your color on this card.**

    Ongoing, **Relentless** - **Remove 1 [blood] from this:** Move a ready character in your coterie to The Streets to Block a non-[ranged] attack against any target.
    `,
    illustrator: "Mara Miranda Escota",
    disciplines: ["blood sorcery"],
    reactions: ["physical", "social", "mental"],
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
  "sas-bind-the-spirit": {
    stack: "library",
    name: "Bind the Spirit",
    text: md`
[oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.

Ongoing - **Relentless, Remove 1 [blood] from this:** Attach a wraith in your coterie to any character. When empty, burn this.
    `,
    illustrator: "János Orbán",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
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
  },
  "sas-mental-block": {
    stack: "library",
    name: "Mental Block",
    text: md`
Ongoing - Your foes may not play cards with the same name as a card attached to this.

[auspex] **Exhaust:** Detach any card attached to this. Attach the top card of target foe's Library to this card.
    `,
    illustrator: "Harvey Bunda",
    types: ["unhosted action", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["auspex"],
  },
  "sas-arms-of-ahriman": {
    stack: "library",
    name: "Arms of Ahriman",
    text: md`
**Superficial**

Deal 1 [physical] [damage] to target character in The Streets for each [potence] in this party. (This attack cannot reduce the target's [blood] below 1 unless Superficial is removed.)

**[oblivion Pay 1 [agenda]:** This [damage] is not Superficial.
    `,
    illustrator: "Marco Primo",
    types: ["action"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 2,
    disciplines: ["potence", "oblivion"],
  },
  "sas-clairvoyance": {
    stack: "library",
    name: "Clairvoyance",
    text: md`
[auspex] Look at target foe's hand. Choose 1 Library card there and place it on top of their Library. Then gain 1 Unhosted Action.
    `,
    illustrator: "Mara Miranda Escota",
    types: ["action"],
    set: "Shadows & Shrouds",
    disciplines: ["auspex"],
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
  },
  "sas-grave-robbing": {
    stack: "library",
    name: "Grave Robbing",
    text: md`
Draw 1 card and choose 1 player. For each character that player has in torpor, either draw 1 card or gain 1 [prestige]. _(Choose for each.)_
    `,
    illustrator: "Marco Primo",
    types: ["action"],
    set: "Shadows & Shrouds",
    clan: "hecata",
  },
  "sas-graveyard-smash": {
    stack: "library",
    name: "Graveyard Smash",
    text: md`
**Superficial**

+1 [damage] for each burned Mortal. (This attack cannot reduce the target's [blood] below 1.)
    `,
    illustrator: "Marco Primo",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 0,
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
  },
  "sas-necromancy": {
    stack: "library",
    name: "Necromancy",
    text: md`
Discard cards from the City Deck until you discard a Mortal, then burn that Mortal. If you burned a Mortal this turn, the active character may play a Ritual at no Action cost. If they do, they lose 2 [blood].
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Shadows & Shrouds",
    clan: "hecata",
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
  },
  "sas-sixth-tradition-destruction": {
    stack: "library",
    name: "Sixth Tradition: Destruction",
    text: md`
Influence Conflict - Should I deal 1 **Aggravated** [damage] to target character and 1 additional **Aggravated** [damage] for every 5 Influence in favor of this Scheme?
    `,
    illustrator: "Mara Miranda Escota",
    types: ["action", "scheme"],
    set: "Shadows & Shrouds",
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
  },
  "sas-spectral-possession": {
    stack: "library",
    name: "Spectral Possession",
    text: md`
**Exhaust 1 wraith attached to the acting character:** Ready target character in The Streets. They become a separate party. Take 1 additional Action with that character.
    `,
    illustrator: "Harvey Bunda",
    types: ["action"],
    set: "Shadows & Shrouds",
    clan: "hecata",
  },
  "sas-spirits-touch": {
    stack: "library",
    name: "Spirit's Touch",
    text: md`
[auspex] Reveal the top card of target player's Library. Gain [prestige] equal to its [blood-potency-requirement]. If you gain no [prestige] this way, discard the revealed card and ready the acting character.
    `,
    illustrator: "Mira Miranda Escota",
    types: ["action"],
    set: "Shadows & Shrouds",
    disciplines: ["auspex"],
  },
  "sas-summon-spirit": {
    stack: "library",
    name: "Summon Spirit",
    text: md`
[oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.

Ongoing - **Remove 2 [blood] from this:** Create a wraith and attach it to a character in your coterie. When empty, burn this.
    `,
    illustrator: "Joyce Maureira",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
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
    reactions: ["ranged", "physical", "social", "mental"],
    shield: 1,
    disciplines: ["oblivion"],
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
  },
  "sas-the-scent-of-death": {
    stack: "library",
    name: "The Scent of Death",
    text: md`
[oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.

Ongoing - **Remove 1 [blood] from this:** Target **Wounded** character loses 1 [blood]. When empty, burn this.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "ritual", "ongoing"],
    set: "Shadows & Shrouds",
    disciplines: ["oblivion"],
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
  },
  "sas-utter-darkness": {
    stack: "library",
    name: "Utter Darkness",
    text: md`
[oblivion] Put a Fear token on the original target of this attack and the Blocker (if any).
    `,
    illustrator: "???",
    types: ["attack"],
    set: "Shadows & Shrouds",
    bloodPotencyRequirement: 5,
    attack: "mental",
    damage: 1,
    disciplines: ["oblivion"],
  },
  "sas-whats-yours-is-mine": {
    stack: "library",
    name: "What's Yours is Mine",
    text: md`
Influence Conflict - Should I steal 1 [agenda] from target foe with the most [agenda]? _(If there is a tie for most, choose only 1 of those foes.)_
    `,
    illustrator: "János Orbán",
    types: ["action", "scheme"],
    set: "Shadows & Shrouds",
    clan: "lasombra",
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
  },
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
  },
  "baa-absolution": {
    stack: "library",
    name: "Absolution",
    text: md`
If the target has 1+ Blood of your color, negate all Reactions.
    `,
    illustrator: "Timothy Terrenal",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 5,
    attack: "mental",
    damage: 2,
    shield: 0,
  },
  "baa-all-the-angles": {
    stack: "library",
    name: "All the Angles",
    text: md`
Superficial. +1 Damage for each different Discipline the attacker has. (This attack cannot reduce the target's Blood below 1.)
    `,
    illustrator: "Mara Miranda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 6,
    attack: "mental",
    damage: 0,
    shield: 0,
  },
  "core-all-tied-up": {
    stack: "library",
    name: "All Tied Up",
    text: md`
Play this card face down and place 1 prestige on it. If this card has 2+ prestige on it, you may resolve it during your turn. Target foe who did not contribute exhaust all of their characters.
    `,
    illustrator: "Marco Primo",
    types: ["action", "conspiracy"],
    set: "Core",
    clan: "malkavian",
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
  },
  "baa-athanor-corporis": {
    stack: "library",
    name: "Athanor Corporis",
    text: md`
Attach to the acting character. If they are a Thin-blood, gain 1 Action. This character gains +1 Physical Damage and Thin-blood Alchemy.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "alchemy"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
  },
  "baa-baals-caress": {
    stack: "library",
    name: "Baal's Caress",
    text: md`
Play this card face up. Blood Sorcery Pay 1 blood: +1 Aggravated Damage. You may activate this ability one for each Blood Sorcery this character has.
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 0,
    shield: 0,
    disciplines: ["blood sorcery"],
  },
  "baa-back-to-formula": {
    stack: "library",
    name: "Back to Formula",
    text: md`
Thin-blood Alchemy Revel the top 4 cards of your Library. Draw each revealed Alchemy and discard the rest. If you raw none, put 1 Alchemy from your discard pile into your hand.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action"],
    set: "Blood & Alchemy",
    disciplines: ["thin-blood alchemy"],
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
    attack: "physical",
    damage: 0,
    shield: 0,
  },
  "core-balance-of-power": {
    stack: "library",
    name: "Balance of Power",
    text: md`
Choose at least hald of the players (including yourseld). Influence Conflict - Should each chosen player steal 1 Prestige from an unchosen player?
    `,
    illustrator: "Felipe Gaona",
    types: ["action", "scheme"],
    set: "Core",
    clan: "toreador",
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
  },
  "baa-blood-makes-noise": {
    stack: "library",
    name: "Blood Makes Noise",
    text: md`
Blood Sorcery Place 1 to 3 Blood of your color on this card. Ongoing, Relentless - Remove 1 Blood from this: Gain 1 Prestige or 4 Influence. WHen empty, burn this.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
  },
  "baa-blood-of-potency": {
    stack: "library",
    name: "Blood of Potency",
    text: md`
Attach to the acting character. This character has +2 Blood Potence. When this attaches, this character mends 1 Blood for each Blood Sorcery they have.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
  },
  "baa-break-down": {
    stack: "library",
    name: "Break Down",
    text: md`
Blood-thin Alchemy Put a '-1 Blood Potence' token on the target.
    `,
    illustrator: "Mara Miranda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 3,
    attack: "mental",
    damage: 1,
    shield: 0,
    disciplines: ["thin-blood alchemy"],
  },
  "core-burning-down-the-house": {
    stack: "library",
    name: "Burning Down the House",
    text: md`
Play this card face down and place 1 prestige on it. If this card has 3+ prestige on it, you may resolve it during your turn. Burn target Ongoing card controlled by a foe who did not contribute.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "conspiracy"],
    set: "Core",
  },
  "baa-calcinatio": {
    stack: "library",
    name: "Calcinatio",
    text: md`
Attach to the acting character. If they are a Thin-blood, gain 1 Action. This character gains +1 Social Damage and Thin-blood Alchemy.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "alchemy"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
  },
  "core-cloak-of-shadows": {
    stack: "library",
    name: "Cloak of Shadows",
    text: md`
Each character in this party has +1 Defense for each Obfuscate in this party.
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack: "ranged",
    damage: 0,
    shield: 0,
    disciplines: ["obfuscate"],
  },
  "core-coup-de-grace": {
    stack: "library",
    name: "Coup de Grâce",
    text: md`
Use only in The Streets. Potence pay 2 blood: Defeat target wounded character not in their Haven.
    `,
    illustrator: "The Creation Studio",
    types: ["action"],
    set: "Core",
    disciplines: ["potence"],
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
  },
  "baa-dangerous-mixture": {
    stack: "library",
    name: "Dangerous Mixture",
    text: md`
+1 Damage for each different Alchemy in this party.
    `,
    illustrator: "Mara Miranda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 1,
    shield: 0,
  },
  "baa-defense-of-the-sacred-haven": {
    stack: "library",
    name: "Defense of the Sacred Haven",
    text: md`
Blood Sorcery Place 1 to 3 Blood of your color on this card. Ongoing - Characters in your Haven have +1 Secrecy. At the start of your turn, remove 1 Blood from this. When empty, burn this.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
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
  },
  "core-destroy-the-plans": {
    stack: "library",
    name: "Destroy the Plans",
    text: md`
Play this card face down and place 1 prestige on it. If this card has 3+ prestige on it, you may resolve it during your turn. Target foe who did not contribute discards 3 cards.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "conspiracy"],
    set: "Core",
  },
  "core-dignity-of-the-office": {
    stack: "library",
    name: "Dignity of the Office",
    text: md`
+2 Defense for each character with a Title in your coterie.
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    set: "Core",
    clan: "ventrue",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 0,
    shield: 0,
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
  },
  "core-drive-by": {
    stack: "library",
    name: "Drive-By",
    text: md`
Deal 2 Damage to an additional member of the opposing party for each character with Celerity in this party. (Can't target the same character twice).
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
  },
  "core-dumpster-dive": {
    stack: "library",
    name: "Dumpster Dive",
    text: md`
Put a card from your discard pile into your hand. If your coterie has 2+ Auspex, draw 1 card.
    `,
    illustrator: "Drew Tucker",
    types: ["action"],
    set: "Core",
    clan: "malkavian",
    disciplines: ["auspex"],
  },
  "core-emergency-bloodbag": {
    stack: "library",
    name: "Emergency Bloodbag",
    text: md`
Add 3 blood from the general supply to this card. Ongoing - At the start of your turn, you may place a token from this card onto a Wounded character in your coterie or in torpor. When empty, burn this card.
    `,
    illustrator: "Drew Tucker",
    types: ["unhosted action", "ongoing"],
    set: "Core",
  },
  "baa-enervate": {
    stack: "library",
    name: "Enervate",
    text: md`
Use only in the Streets. Steal 1 Prestige from target foe and put it on the acting character as Blood (this is a mend effect).
    `,
    illustrator: "Harvey Bunda",
    types: ["action"],
    set: "Blood & Alchemy",
    clan: "tremere",
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
  },
  "baa-far-reach": {
    stack: "library",
    name: "Far Reach",
    text: md`
Move target character into The Streets as a separate party. Detach an Alchemy from the acting character: The acting character starts an attack against the target, who cannot play a Reaction.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action"],
    set: "Blood & Alchemy",
  },
  "core-faulty-logic": {
    stack: "library",
    name: "Faulty Logic",
    text: md`
Your foe contributes 1 Prestige to a face-down card of your choosing. If you resolve that card this turn, you may target that foe.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    clan: "malkavian",
    bloodPotencyRequirement: 2,
    attack: "social",
    damage: 1,
    shield: 0,
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
  },
  "core-first-tradition-the-masquerade": {
    stack: "library",
    name: "First Tradition: The Masquerade",
    text: md`
Pay 2 prestige. Ongoing - Your vampires outside your Haven have +1 Secrecy. If you defeat 2 Mortals during a single turn, burn this card.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Core",
  },
  "baa-fixatio": {
    stack: "library",
    name: "Fixatio",
    text: md`
Attach to the acting character. If they are a Thin-blood, gain 1 Action. This character gains +1 Mental Damage and Thin-blood Alchemy.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "alchemy"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
  },
  "core-fleetness": {
    stack: "library",
    name: "Fleetness",
    text: md`
.+2 Shield for each Celerity this character has.
    `,
    illustrator: "Felipe Gaona",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 2,
    attack: "ranged",
    shield: 0,
    disciplines: ["celerity"],
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
  },
  "baa-haze": {
    stack: "library",
    name: "Haze",
    text: md`
Requires Alchemy in the party to play. Play this card face up. Negate a Ranged Attack or non-Attack effect targeting a character in this party.
    `,
    illustrator: "Irene Francisco",
    types: ["reaction", "special"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 1,
    damage: 0,
    shield: 0,
  },
  "core-hedge-your-bets": {
    stack: "library",
    name: "Hedge Your Bets",
    text: md`
Gain 2 Influence during this action or event. If this is a Scheme and it fails, gain 1 agenda.
    `,
    illustrator: "The Creation Studio",
    types: ["influence modifier"],
    set: "Core",
  },
  "baa-heightened-senses": {
    stack: "library",
    name: "Heightened Senses",
    text: md`
You may play this to aid any character in The Streets from any coterie. Target defending character in The Streets has +1 Resistene for ach Auspex your Leader has.
    `,
    illustrator: "Mara Miranda",
    types: ["reaction", "special"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 1,
    attack: "ranged",
    damage: 0,
    shield: 0,
    disciplines: ["auspex"],
  },
  "core-herald": {
    stack: "library",
    name: "Herald",
    text: md`
Exert 2 Influence: Attach to the acting character. You pay 1 less Prestige to recruit characters. (Add the last blood from the general supply).
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 2,
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
  },
  "core-incite-rebellion": {
    stack: "library",
    name: "Incite Rebellion",
    text: md`
Pay 1 blood: Burn 1 Retainer in the opposing party. Gain no rewards for this.
    `,
    illustrator: "Marco Primo",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    shield: 0,
  },
  "core-influencer": {
    stack: "library",
    name: "Influencer",
    text: md`
Pay 1 prestige. Ongoing - Each character with Presence in your coterie has +1 Influence.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    disciplines: ["presence"],
  },
  "core-insanity-defense": {
    stack: "library",
    name: "Insanity Defense",
    text: md`
Additional +1 Defense against Mental attacks.
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    set: "Core",
    clan: "malkavian",
    bloodPotencyRequirement: 0,
    attack: "physical",
    damage: 0,
    shield: 2,
  },
  "baa-intimidation": {
    stack: "library",
    name: "Intimidation",
    text: md`
+2 Damage to City Deck Mortals. If the attacker's Blood Potence is higher than the target's, exhaust the target and put a Fear token on them.
    `,
    illustrator: "Mara Miranda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 4,
    attack: "social",
    damage: 1,
    shield: 0,
  },
  "core-irresistible-voice": {
    stack: "library",
    name: "Irresistible Voice",
    text: md`
Presence pay 2 blood: Steal 1 Retainer from the target. If this party has Dominate, Pay 1 blood instead.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 4,
    attack: "mental",
    damage: 2,
    shield: 0,
    disciplines: ["dominate", "presence"],
  },
  "core-keeper-of-elysium": {
    stack: "library",
    name: "Keeper of Elysium",
    text: md`
Exert 4 Influence: Attach to the acting character. Characters in your Haven have +1 Secrecy.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 4,
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
  },
  "core-know-your-place": {
    stack: "library",
    name: "Know Your Place",
    text: md`
+1 Damage if the attacker has a Title. Id the attacker is Prince of the City, +2 Damage instead.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    shield: 0,
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
  },
  "core-long-term-investment": {
    stack: "library",
    name: "Long-Term Investment",
    text: md`
Pay 1 to 3 Prestige: Add double that amount of Prestige from the general supply to this card. Ongoing - At the start of your turn, gain 1 Prestige from this card. When empty, burn this card.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "ongoing"],
    set: "Core",
    clan: "ventrue",
  },
  "core-lost-glory": {
    stack: "library",
    name: "Lost Glory",
    text: md`
Play this card face down and place 1 prestige on it. If this card has 4+ prestige on it, you may resolve it during your turn. Target foe who did not contribute loses 1 agenda. If they have 9+ agenda, they lose 2 agenda instead.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "conspiracy"],
    set: "Core",
  },
  "core-marked-man": {
    stack: "library",
    name: "Marked Man",
    text: md`
Put 1 Agenda from the general supply onto any character. If a player defeats them, they gain that agenda.
    `,
    illustrator: "Marco Primo",
    types: ["unhosted action"],
    set: "Core",
    clan: "ventrue",
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
  },
  "baa-mesmerize": {
    stack: "library",
    name: "Mesmerize",
    text: md`
Dominate Put a Fear token on the target.
    `,
    illustrator: "Harvey Bunda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 2,
    attack: "mental",
    damage: 1,
    shield: 0,
    disciplines: ["dominate"],
  },
  "core-molotov-cocktail": {
    stack: "library",
    name: "Molotov Cocktail",
    text: md`
Aggravated - Discard 1 card: Deal 1 Aggravated Damage to each of the other characters in the opposing party.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "ranged",
    damage: 1,
    shield: 0,
  },
  "baa-out-of-time": {
    stack: "library",
    name: "Out of Time",
    text: md`
Play this card face down and place 1 Prestige on it. If this card has 3+ Prestige on it, you may resolve it during your turn. Target foe who did not contribute loses 1 Action during their next turn.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "conspiracy"],
    set: "Blood & Alchemy",
  },
  "baa-peer-pressure": {
    stack: "library",
    name: "Peer Pressure",
    text: md`
+1 Damage for every 2 characters in this party (including this character).
    `,
    illustrator: "Mara Miranda",
    types: ["attack"],
    set: "Blood & Alchemy",
    bloodPotencyRequirement: 0,
    attack: "social",
    damage: 0,
    shield: 0,
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
  },
  "baa-premonition": {
    stack: "library",
    name: "Premonition",
    text: md`
Attach to a character in your coterie and gain 1 Action. Auspex party - Characters attacking members of this party play their Attack cards face up.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["unhosted action"],
    set: "Blood & Alchemy",
    disciplines: ["auspex"],
  },
  "core-primogen": {
    stack: "library",
    name: "Primogen",
    text: md`
Exert 3 Influence: Attach to the acting character. This character has +1 Influence. This character deals +1 Damage to characters with a Title.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 3,
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
  },
  "core-scoped-30-06": {
    stack: "library",
    name: "Scoped .30-06",
    text: md`
Play this card face up to add +1 Intel to this attack.
    `,
    illustrator: "The Creation Studio",
    types: ["attack"],
    set: "Core",
    bloodPotencyRequirement: 3,
    attack: "ranged",
    damage: 2,
    shield: 0,
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
  },
  "core-search-engine": {
    stack: "library",
    name: "Search Engine",
    text: md`
Ongoing - Exhaust: If you have Auspex in your coterie, look at the top card of your Library or Faction Deck. Leave it or move it to the bottom of the deck.
    `,
    illustrator: "The Creation Studio",
    types: ["unhosted action", "ongoing"],
    set: "Core",
    disciplines: ["auspex"],
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
  },
  "baa-seek-knowledge": {
    stack: "library",
    name: "Seek Knowledge",
    text: md`
Blood Sorcery Place 1 to 3 Blood of your color on this card. Ongoing - Remove 1 Blood from this: Draw 2 cards, then discard 1 card. When empty, burn this.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    clan: "tremere",
    disciplines: ["blood sorcery"],
  },
  "core-seneschal": {
    stack: "library",
    name: "Seneschal",
    text: md`
Exert 5 Influence: Attach to the acting character. Action: Target foe loses 1 Prestige. If no one controls the Prince of the City, they lose 2 instead.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 5,
  },
  "core-sheriff": {
    stack: "library",
    name: "Sheriff",
    text: md`
Exert 4 Influence: Attach to the acting character. Exhaust this character: Burn target Ongoing card. Use this ability only in The Streets.
    `,
    illustrator: "The Creation Studio",
    types: ["action", "title"],
    set: "Core",
    bloodPotencyRequirement: 4,
  },
  "core-slap-in-the-face": {
    stack: "library",
    name: "Slap in the Face",
    text: md`
Deal physic to the attacker (add this character's physic to the damage).
    `,
    illustrator: "The Creation Studio",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack: "social",
    damage: 1,
    shield: 0,
  },
  "baa-sleep-of-the-damned": {
    stack: "library",
    name: "Sleep of the Damned",
    text: md`
Blood Sorcery Place 1 to 3 Blood of your color on this card. Ongoing - Foe's charcters in torpor have +2 Blood Potence. At the start of your turn, if 1+ foes have a charcter in torpor, remove 1 Blood from this. When empty, burn this.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
  },
  "core-smoke-em-out": {
    stack: "library",
    name: "Smoke 'Em Out",
    text: md`
Use only in The Streets. Move all characters from target Haven to The Streets. Deal 1 Aggravated Damage to each exhausted character moved this way.
    `,
    illustrator: "The Creation Studio",
    types: ["action"],
    set: "Core",
    clan: "brujah",
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
  },
  "baa-sunrise-surprise": {
    stack: "library",
    name: "Sunrise Surprise",
    text: md`
Cannot be played during the 1st or 2nd Action of your turn. Play only in The Streets. Deal 2 Aggravated Damage to the acting character and target character in The Streets.
    `,
    illustrator: "Dawn Nique",
    types: ["action"],
    set: "Blood & Alchemy",
    clan: "thin-blood",
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
  },
  "core-the-last-word": {
    stack: "library",
    name: "The Last Word",
    text: md`
Gain 5 Influence during this action or event. If this is a Scheme and your side wins, gain 1 prestige.
    `,
    illustrator: "The Creation Studio",
    types: ["influence modifier"],
    set: "Core",
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
  },
  "baa-theft-of-vitae": {
    stack: "library",
    name: "Theft of Vitae",
    text: md`
Blood Sorcery Burn target unattached City Deck Mortal in The Streets (this is not defeating them). If they have a Burn benefit, the acting character claims that reward.
    `,
    illustrator: "Harvey Bunda",
    types: ["action"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
  },
  "baa-third-tradition-the-progeny": {
    stack: "library",
    name: "Third Tradition: The Progeny",
    text: md`
Pay 1 Prestige. Ongoing . At the start of your turn, each player with 4+ vampires in their coterie chooses to either lose 1 Prestige or discard 1 card.
    `,
    illustrator: "Mara Miranda",
    types: ["unhosted action", "ongoing"],
    set: "Blood & Alchemy",
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
  },
  "baa-truth-of-blood": {
    stack: "library",
    name: "Truth of Blood",
    text: md`
Blood Sorcery Place 1 to 3 Blood of your color on this card. Ongoing - Pay 1 Prestige, Remove 1 Blood from this: Target foe loses 1 Agenda. When empty, burn this.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ritual", "ongoing"],
    set: "Blood & Alchemy",
    disciplines: ["blood sorcery"],
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
  },
  "core-unswayable-mind": {
    stack: "library",
    name: "Unswayable Mind",
    text: md`
If this party has 2+ Fortitude, negate the game text effects of the attacker's Attack card (but no the inherent damage or keywords).
    `,
    illustrator: "Felipe Gaona",
    types: ["reaction"],
    set: "Core",
    bloodPotencyRequirement: 1,
    attack: "social",
    damage: 0,
    shield: 1,
    disciplines: ["fortitude"],
  },
  "core-whispering-campaign": {
    stack: "library",
    name: "Whispering Campaign",
    text: md`
Play this card face down and place 1 prestige on it. If this card has 4+ prestige on it, you may resolve it during your turn. Steal 2 prestige from target foe who did not contribute.
    `,
    illustrator: "Felipe Gaona",
    types: ["action", "conspiracy"],
    set: "Core",
  },
  "war-alley-cat": {
    stack: "library",
    name: "Alley Cat",
    text: md`
[animalism] Pay 1 [blood]: Attach to the acting character. This character has +1 Secrecy in The Streets.

Detach: Burn target Animal or Retainer attached to a character in The Streets. Then burn this card.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
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
  },
  "war-apex-predator": {
    stack: "library",
    name: "Apex Predator",
    text: md`
Put a Fear token on the target. If the attacker is your Leader, exhaust the target and ready your Leader.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Wolf & Rat",
    clan: "gangrel",
    bloodPotencyRequirement: 4,
    attack: "social",
    damage: 2,
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
    attack: "physical",
  },
  "war-beasts-of-war": {
    stack: "library",
    name: "Beasts of War",
    text: md`
Superficial

+1 [damage] for each Animal in this party. (This attack cannot reduce the target's [blood] below 1.)
    `,
    illustrator: "Irene Francisco",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 5,
    attack: "physical",
    damage: 1,
  },
  "war-bond-famulus": {
    stack: "library",
    name: "Bond Famulus",
    text: md`
Exhaust: The next Animal you play this turn costs 1 less [blood] to attach. If a character spends an Action to play it, ready them.
    `,
    illustrator: "Joyce Maureira",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
  },
  "war-constant-surveillance": {
    stack: "library",
    name: "Constant Surveillance",
    text: md`
Pay 1 [prestige]: Cover target foe's Agenda or Haven with this card, or pay 1 additional [prestige] to cover both.

Ongoing - Covered cards have no text. At the start of your next turn, burn this card.
    `,
    illustrator: "Timothy Terrenal",
    types: ["action", "ongoing"],
    set: "Wolf & Rat",
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
    attack: "physical",
    reactions: ["physical", "mental"],
    damage: 0,
  },
  "war-cracking-the-case": {
    stack: "library",
    name: "Cracking the Case",
    text: md`
Add 4 [prestige] from the general supply to this card.

Remove X [prestige] from this card: Target attacker has +X Intel for this attack. When empty, burn this.
    `,
    illustrator: "Felipe Gaona",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
  },
  "war-disturbing-the-hive": {
    stack: "library",
    name: "Disturbing the Hive",
    text: md`
+1 [damage] for each The Swarm in this party and in your discard pile. If the attacker has [obfuscate], negate all Reaction.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotencyRequirement: 4,
    attack: "ranged",
    damage: 1,
    disciplines: ["obfuscate"],
  },
  "war-earth-meld": {
    stack: "library",
    name: "Earth Meld",
    text: md`
[protean] Attach to the acting character and they mend 2 [blood].

This character has +2 Secrecy. At the start of your next turn, discard this card.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action"],
    set: "Wolf & Rat",
    disciplines: ["protean"],
  },
  "war-feeding-frenzy": {
    stack: "library",
    name: "Feeding Frenzy",
    text: md`
+1 [damage] if the attacker is Wounded.

[fortitude] If this attack defeats the target, the attacker mends 2 [blood].
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 3,
    attack: "physical",
    damage: 1,
    disciplines: ["fortitude"],
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
  },
  "war-feral-claws": {
    stack: "library",
    name: "Feral Claws",
    text: md`
[protean] Aggravated
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 2,
    attack: "physical",
    damage: 0,
    disciplines: ["protean"],
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
  },
  "war-feral-whispers": {
    stack: "library",
    name: "Feral Whispers",
    text: md`
Add 3 [blood] from the general supply to this.

[animalism] At the start of your turn, you may Remove 1 [blood] from this: Put 1 Animal from your discard pile into your hand. When empty, burn this.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "ongoing"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
  },
  "war-fight-or-flight": {
    stack: "library",
    name: "Fight or Flight",
    text: md`
Attacker - If this attack is Blocked, negate the target's Reaction (if any).

Reaction - +1 [shield]. Additional +1 [shield] for each [fortitude] this character has. This deals no [damage] to the attacker.
    `,
    illustrator: "Timothy Terrenal",
    types: ["attack", "reaction"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 3,
    attack: "mental",
    reactions: ["mental"],
    damage: 1,
    disciplines: ["fortitude"],
  },
  "war-hardened-flesh": {
    stack: "library",
    name: "Hardened Flesh",
    text: md`
+1 [shield] for each [fortitude] this character has.
    `,
    illustrator: "Timothy Terrenal & Harvey Bunda",
    types: ["reaction"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 2,
    reactions: ["ranged", "physical"],
    shield: 1,
    disciplines: ["fortitude"],
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
  },
  "war-murder-of-crows": {
    stack: "library",
    name: "Murder of Crows",
    text: md`
[animalism] Pay 1 [blood]: Attach to the acting character.

Party - Attackers in this party have +1 Intel vs characters in The Streets.

Detach: Target character in The Streets loses 1 [blood]. If this defeats the target, burn this card.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
  },
  "war-protect-the-flock": {
    stack: "library",
    name: "Protect the Flock",
    text: md`
Ongoing - Exhaust: Put 1 [blood] of your color from the general supply on target Mortal. (Each [blood] added to a Mortal increases the [damage] needed to defeat them.)
    `,
    illustrator: "Timothy Terrenal",
    types: ["unhosted action", "ongoing"],
    set: "Wolf & Rat",
  },
  "war-second-tradition-the-domain": {
    stack: "library",
    name: "Second Tradition: The Domain",
    text: md`
Ongoing - Exhaust: Attach a City Deck Citizen or Vagrant in The Streets to this card (max 2). They are still in The Streets and may be attacked. Foes must pay you 1 [prestige] to attack Mortals attached to this.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action", "ongoing"],
    set: "Wolf & Rat",
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
  },
  "war-sewer-rat": {
    stack: "library",
    name: "Sewer Rat",
    text: md`
[animalism] Attach to the acting character.

Exhaust Sewer Rat: Mend 1 [blood] on a Wounded character in this party.

Detach: Steal 1 [blood] from target character in torpor and add it to any character.
    `,
    illustrator: "Irene Francisco",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
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
  },
  "war-spy-games": {
    stack: "library",
    name: "Spy Games",
    text: md`
Steal a Rival token from target foe. At the start of your next turn, return it.
    `,
    illustrator: "Mara Miranda-Escota",
    types: ["action"],
    set: "Wolf & Rat",
    clan: "nosferatu",
    bloodPotencyRequirement: 5,
  },
  "war-the-shakedown": {
    stack: "library",
    name: "The Shakedown",
    text: md`
Look at target foe's hand, then name an Attack type. The target discards all Attack cards of that type. If the acting character has the Sheriff Title, gain 1 [prestige] for each card discarded this way.
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Wolf & Rat",
  },
  "war-the-stampede": {
    stack: "library",
    name: "The Stampede",
    text: md`
The target has -1 [shield] for each character in this party. [potence] +1 [damage]
    `,
    illustrator: "Adelijah Ocampo",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 4,
    attack: "physical",
    damage: 1,
    disciplines: ["potence"],
  },
  "war-the-swarm": {
    stack: "library",
    name: "The Swarm",
    text: md`
[animalism] Attach to the acting character.

Party - This party has +1 [shield] during non-Aggravated [ranged] and [physical] attacks.

Detach: Prevent 1 Aggravated [damage] to this character.
    `,
    illustrator: "Adelijah Ocampo",
    types: ["action", "animal"],
    set: "Wolf & Rat",
    disciplines: ["animalism"],
  },
  "war-veiled-threat": {
    stack: "library",
    name: "Veiled Threat",
    text: md`
+1 [damage] for each [obfuscate] this character has. Attach Veiled Threat face down to the target if they have 2 or fewer attachments.
    `,
    illustrator: "Drew Tucker",
    types: ["attack"],
    set: "Wolf & Rat",
    bloodPotencyRequirement: 3,
    attack: "social",
    damage: 1,
    disciplines: ["obfuscate"],
  },
  "war-we-are-legend": {
    stack: "library",
    name: "We Are Legend",
    text: md`
Gain 1 [prestige]. Then draw 2 cards and discard 1 of them.
    `,
    illustrator: "Irene Francisco",
    types: ["action"],
    set: "Wolf & Rat",
    clan: "gangrel",
  },
};
