import {
  AttackType,
  CardId,
  CardSet,
  Clan,
  Discipline,
  Illustrator,
  LibraryCardType,
  Cardpool,
  md,
} from "./common.js";

export type Library = {
  stack: "library";
  name: string;
  types: LibraryCardType[];
  clan?: Clan;
  bloodPotencyRequirement?: number;
  bloodPotency?: number;
  physical?: number;
  social?: number;
  mental?: number;
  damage?: number;
  shield?: number;
  attack?: AttackType | AttackType[];
  reactions?: AttackType | AttackType[];
  text: string;
  disciplines?: Discipline[];
  illustrator: Illustrator;
  set: CardSet;
  cardpools: Cardpool[];
};

export const library: Record<CardId, Library> = {
// Core //

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
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"core-pr-firm": {
  stack: "library",
  name: "PR Firm",
  text: md`
    Ongoing - **Pay 1 [prestige]**: Gain 1 [agenda]. Use only if a Scheme you played has succeeded this turn. 
  `,
  illustrator: "Darko Stojanovic",
  types: ["unhosted action", "ongoing"],
  set: "Core",
  clan: "toreador",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"core-seduction": {
  stack: "library",
  name: "Seduction",
  text: md`
    Choose one: Steal 1 blood from the target OR this attack deals +1 Damage to a City Deck Mortal for each Presence in this party.
  `,
  illustrator: "The Creation Studio",
  types: ["attack"],
  set: "Core",
  bloodPotencyRequirement: 3,
  attack: "social",
  damage: 0,
  shield: 0,
  disciplines: ["presence"],
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"core-whispering-campaign": {
  stack: "library",
  name: "Whispering Campaign",
  text: md`
    Play this card face down and place 1 prestige on it. If this card has 4+ prestige on it, you may resolve it during your turn.
    Steal 2 prestige from target foe who did not contribute.
  `,
  illustrator: "Felipe Gaona",
  types: ["action", "conspiracy"],
  set: "Core",
  cardpools: ["Vampire"],
},

// Blood and Alchemy //

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
  cardpools: ["Vampire"],
},

"baa-all-the-angles": {
  stack: "library",
  name: "All the Angles",
  text: md`
    Superficial.
    +1 Damage for each different Discipline the attacker has.
    (This attack cannot reduce the target's Blood below 1.)
  `,
  illustrator: "Mara Miranda-Escota",
  types: ["attack"],
  set: "Blood & Alchemy",
  bloodPotencyRequirement: 6,
  attack: "mental",
  damage: 0,
  shield: 0,
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"baa-baals-caress": {
  stack: "library",
  name: "Baal's Caress",
  text: md`
    Play this card face up.
    B
    lood Sorcery Pay 1 blood: +1 **Aggravated** Damage.
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
  cardpools: ["Vampire"],
},

"baa-back-to-formula": {
  stack: "library",
  name: "Back to Formula",
  text: md`
    Thin-blood Alchemy Revel the top 4 cards of your Library.
    Draw each revealed Alchemy and discard the rest.
    If you draw none, put 1 Alchemy from your discard pile into your hand.
  `,
  illustrator: "Adelijah Ocampo",
  types: ["action"],
  set: "Blood & Alchemy",
  disciplines: ["thin-blood alchemy"],
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"baa-blood-makes-noise": {
  stack: "library",
  name: "Blood Makes Noise",
  text: md`
    Blood Sorcery Place 1 to 3 Blood of your color on this card.
    Ongoing, Relentless - **Remove 1 Blood from this:** Gain 1 Prestige or 4 Influence.
    When empty, burn this.
  `,
  illustrator: "Timothy Terrenal",
  types: ["action", "ritual", "ongoing"],
  set: "Blood & Alchemy",
  disciplines: ["blood sorcery"],
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"baa-crossbow": {
  stack: "library",
  name: "Crossbow",
  text: md`
    Discard 1 card: Attach Crossbow to the target if they have 2 or fewer attachment.
    This target cannot mend during their End phase.
  `,
  illustrator: "Harvey Bunda",
  types: ["attack"],
  set: "Blood & Alchemy",
  bloodPotencyRequirement: 3,
  attack: "ranged",
  damage: 1,
  shield: 0,
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Wolf and Rat //

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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Shadows and Shrouds //

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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"sas-the-gift-of-false-life": {
  stack: "library",
  name: "The Gift of False Life",
  text: md`
    [oblivion] For each burned Mortal, you may put 1 [blood] from the general supply on this card.
    Ongoing - **Remove 1 [blood] from this:** Place that [blood] on any character in torpor, then move that character to their owner's Haven and ready them.
    When empty, burn this.
  `,
  illustrator: "János Orbán",
  types: ["action", "ritual", "ongoing"],
  set: "Shadows & Shrouds",
  disciplines: ["oblivion"],
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Heart of Europe //

"hoe-bad-optics": {
  stack: "library",
  name: "Bad Optics",
  types: ["influence modifier"],
  text: md`
    Gain 2 Influence during this action or event.
    If this is a Scheme and your side loses, put a Fear token on a target character with a 'No Influence' token and exhaust them.
  `,
  illustrator: "Joshua Esmeralda",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
},

"hoe-bank-error-in-your-favor": {
  stack: "library",
  name: "Bank Error In Your Favor",
  clan: "malkavian",
  types: ["action", "conspiracy"],
  text: md`
    **Play this card face down and place 1 [prestige] on it.**
    If this card has 2+ [prestige] on it, you may resolve it during your turn.
    Target foe who did not contribute draws 3 cards.
  `,
  illustrator: "Marco Primo",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"hoe-fortify-the-inner-facade": {
  stack: "library",
  name: "Fortify the Inner Facade",
  bloodPotencyRequirement: 3,
  shield: 1,
  types: ["reaction"],
  attack: ["social", "mental"],
  reactions: ["social", "mental"],
  text: md`
    Play this card face up.
    If your foe's Attack would cause you to lose or spend [prestige], gain 3 [prestige] first.
    [fortitude] If not, +1 [shield].
  `,
  disciplines: ["fortitude"],
  illustrator: "Joyce Maureira",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
},

"hoe-fourth-tradition-the-accounting": {
  stack: "library",
  name: "Fourth Tradition: The Accounting",
  types: ["action"],
  text: md`
    Attach to target Leader with 2 or fewer attachments.
    When another character in this Leader's coterie makes an attack or uses an activated ability, this character loses 1 [blood].
  `,
  illustrator: "Mara Miranda-Escota",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"hoe-property-developer": {
  stack: "library",
  name: "Property Developer",
  clan: "ventrue",
  types: ["action"],
  text: md`
    **Pay 1 [prestige].**
    Attach 1 Haven from your collection to your Leader.
    They have the Leader Abilities of that Haven.
  `,
  illustrator: "Marco Primo",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"hoe-psychic-assault": {
  stack: "library",
  name: "Psychic Assault",
  bloodPotencyRequirement: 5,
  types: ["attack"],
  attack: "mental",
  text: md`
    Play this card face up.
    This attack cannot be Blocked.
    [auspex] **Reveal the top card of any player's Library:** +X [damage] equal to the [bloodPotencyRequirement] of that card.
  `,
  disciplines: ["auspex"],
  illustrator: "Harvey Bunda",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
},

"hoe-rapid-reflexes": {
  stack: "library",
  name: "Rapid Reflexes",
  bloodPotencyRequirement: 1,
  types: ["reaction"],
  attack:["ranged", "physical"],
  reactions: ["ranged", "physical"],
  shield: 0,
  text: md`
    Retarget this attack to any other character in the defending party.
    The new defender has +1 [shield] for each [celerity] they have.
  `,
  disciplines: ["celerity"],
  illustrator: "Joshua Esmeralda",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"hoe-title-fight": {
  stack: "library",
  name: "Title Fight",
  bloodPotencyRequirement: 3,
  types: ["attack"],
  attack: "physical",
  text: md`
    **Superficial**
    +[damage] equal to the [bloodPotencyRequirement] of a Title attached to the attacker (Prince counts as 7).
    (This attack cannot reduce the target's [blood] below 1.)
  `,
  illustrator: "Adelijah Ocampo",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"hoe-wake-with-evenings-freshness": {
  stack: "library",
  name: "Wake With Evening's Freshness",
  types: ["2 actions", "ritual", "ongoing", "action"],
  text: md`
    [blood sorcery] **Place 1 to 3 [blood] of your color on this card.**
    Ongoing, **Relentless, Remove 1 [blood] from this:** Move a ready character in your coterie to The Streets to Block a non-[ranged] attack against any target.
  `,
  illustrator: "Mara Miranda-Escota",
  disciplines: ["blood sorcery"],
  //reactions: ["physical", "social", "mental"],
  set: "Heart of Europe",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"hoe-wild-ranting": {
  stack: "library",
  name: "Wild Ranting",
  types: ["influence modifier"],
  text: md`
    Gain 3 Influence during this action or event.
    If this is a Scheme and your side loses, target player draws 1 card.
  `,
  illustrator: "Marco Primo",
  set: "Heart of Europe",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Dragon and Rogue //

"dar-backpacker": {
  stack: "library",
  name: "Backpacker",
  text: md`
    Attach your active Haven to a character in your coterie who doesn't have one attached and put another Haven from your collection into play as your active Haven.
  `,
  illustrator: "Irene Francisco",
  types: ["action"],
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"dar-change-of-plans": {
  stack: "library",
  name: "Change of Plans",
  text: md`
    **Play this card face down and place 1 [prestige] on it.**
    Resolve during your turn if an Ongoing Event is in play.
    For each [prestige] on this, you may discard 1 unattached City Deck card from The Streets, then put the top card of the City Deck into The Streets.
  `,
  illustrator: "Irene Francisco",
  types: ["action", "trap"],
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"dar-home-improvement": {
  stack: "library",
  name: "Home Improvement",
  text: md`
    Attach this card to your Haven.
    Ongoing - Your Leader has abilities based on # of attached _Home Improvements_. 1: At the start of your turn, mend 1 [blood] on your Leader.
    2: Also, at the start of your turn, draw 1 card. 3: Also, +2 [shield].
  `,
  illustrator: "Felipe Gaona",
  types: ["action", "ongoing"],
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
},

"dar-mask-of-a-thousand-faces": {
  stack: "library",
  name: "Mask of a Thousand Faces",
  text: md`
    [obfuscate] Add 3 [prestige] from the general supply to this card.
    Ongoing - **Relentless - Remove 1 [prestige] from this:** Swap 1 non-Leader character in your coterie with 1 in your hand, retaining state, tokens, and attachments.
    Pay any higher [blood-potency] difference in [prestige].
  `,
  disciplines: ["obfuscate"],
  illustrator: "Irene Francisco",
  types: ["unhosted action", "ongoing"],
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"dar-siege-engine": {
  stack: "library",
  name: "Siege Engine",
  bloodPotencyRequirement: 0,
  damage: 1,
  text: md`
    +1 [damage] for each Ghoul you control.
    For each Ghoul with 3+ attachments, +2 [damage] instead.
    **Burn 1 Retainer attached to the attacker:** Burn target Ongoing card the defending player controls.
  `,
  illustrator: "Felipe Gaona",
  types: ["attack"],
  attack: "physical",
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"dar-smoke-and-mirrors": {
  stack: "library",
  name: "Smoke and Mirrors",
  bloodPotencyRequirement: 3,
  shield: 1,
  text: md`
    Put a Fear token on target character in the attacking Party.
    [obfuscate] The attacker's [damage] becomes **Superficial**.
    (This attack cannot reduce the target's [blood] below 1.)
  `,
  disciplines: ["obfuscate"],
  illustrator: "Felipe Gaona",
  types: ["reaction"],
  attack:["physical", "mental"],
  reactions: ["physical", "mental"],
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"dar-the-long-con": {
  stack: "library",
  name: "The Long Con",
  text: md`
    **Play this card face down and place 1 [prestige] on it.**
    [presence] Resolve any time a fow puts a token on a card during their Action Phase.
    For each [prestige] on this card, steal 1 [prestige] or [blood] from a card you have not stolen from this turn.
    Place each token on a card you control.
  `,
  disciplines: ["presence"],
  illustrator: "Mara Miranda-Escota",
  types: ["action", "trap"],
  set: "Dragon & Rogue",
  cardpools: ["Vampire"],
},

// Justice and Mercy //

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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

"jam-kevlar-vest": {
  stack: "library",
  name: "Kevlar Vest",
  types: ["action"],
  //clan: "salubri",
  //bloodPotencyRequirement: ,
  //damage:,
  //shield:,
  //attack:[],
  //reactions: [],
  text: md`
    Attach to the acting character (max 1).
    This character has +1 [shield] vs **Aggravated** [damage].
    **Detach:** Prevent 2 [damage] to this character.
  `,
  //disciplines:["blood sorcery"],
  illustrator: "Irene Francisco",
  set: "Justice & Mercy",
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
},

// Hunter and Hunted //

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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
    Attacker - This character deals +1 [damage] to the target for every  2 of your burned characters.
  `,
  //disciplines:[],
  illustrator: "Darko Stojanovic",
  set: "Hunters & Hunted",
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Hunter"],
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
    [library] **Pay 2 [prestige]:** The attacker's [damage] becomes **Superficial.**
    (This damage cannot remove the last [blood] token from a character.)
`,
  disciplines:["library"],
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Hunter"],
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
    The attacker reveals their hand to the defender.
    The defender then discards 1 [social] or [mental] Attack card from the revealed cards.
`,
  ///disciplines:["library"],
  illustrator: "Cold Castle Studios",
  set: "Hunters & Hunted",
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter", "Vampire"],
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
  cardpools: ["Vampire"],
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
    **Pay 1 [prestige]:** +3 [damage].
    After this attack, burn this character.
    Use only if the target is a Monster.
`,
  disciplines:["thwart the unnatural"],
  illustrator: "Marco Primo",
  set: "Hunters & Hunted",
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  ///disciplines:["protean"],
  illustrator: "Cold Castle Studios",
  set: "Hunters & Hunted",
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Hunter"],
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
  cardpools: ["Vampire"],
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
  cardpools: ["Hunter"],
},

// Martial Law

"ml-anything-for-my-master": {
  stack: "library",
  name: "Anything For My Master",
  types: ["action"],
  clan: "tzimisce",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    **Burn a Ghoul you control:**
    Defeat target **Wounded** character.
`,
  //disciplines:["repel the unnatural"],
  illustrator: "Adelijah Ocampo",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-armored-suv": {
  stack: "library",
  name: "Armored SUV",
  types: ["vehicle", "action"],
  clan: "martial",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Attach this card to your Hideout.
    **Relentless - Exhaust, Pay 1 [prestige]:** Attach this card to target character in your cell. At the start of your next turn, attach it to your Hideout.
    This character has Guard and +1 [shield].
    [fleet] This character has +1 [shield] while Blocking.
`,
  disciplines:["fleet"],
  illustrator: "Mara Miranda",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-awaken-the-homuncular-servant": {
  stack: "library",
  name: "Awaken the Homuncular Servant",
  types: ["ritual", "2 actions", "ongoing", "action"],
  //clan: "inquisitive",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
  [oblivion] For each burned Mortal, you may put 1 [blood] from your general supply on this card.
  Ongoing - **Remove 2 [blood] from this:**
  Put 1 Library card from your discard pile face down into your Haven. Put the spent [blood] on that card, which is now a Ghoul.
`,
  disciplines:["oblivion"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-blinded": {
  stack: "library",
  name: "Blinded",
  types: ["reaction"],
  //clan: "inquisitive",
  bloodPotencyRequirement: 2,
  //damage: 1,
  shield: 1,
  //attack: ["mental"],
  reactions: ["social", "mental"],
  text: md`
    If this character is **Wounded**, +1 [shield].
    If there is only 1 character in your coterie, +1 [shield].
    After this attack, attach this card face down to the attacker.
`,
  //disciplines:["repel the unnatural"],
  illustrator: "Irene Francisco",
  set: "Martial Law",
  cardpools: ["Hunter", "Vampire"],
},

"ml-chimerstry": {
  stack: "library",
  name: "Chimerstry",
  types: ["reaction"],
  clan: "ravnos",
  bloodPotencyRequirement: 4,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  reactions: ["social", "physical"],
  text: md`
    **Pay 2 [prestige],** **[presence] Pay 1 [prestige] instead.**
    Play this card face up.
    [obfuscate] Choose any non-Monster character in The Streets other than the attacker. Redirect this attack to that character. The attack may be Blocked, and the defender may play a Reaction.
`,
  disciplines:["presence", "obfuscate"],
  illustrator: "Irene Francisco",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-claymore": {
  stack: "library",
  name: "Claymore",
  types: ["trap", "action"],
  clan: "martial",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    **Place this card face down and put 1 [prestige] on it.**
    Resolve during any Action Phase.
    Deal 1 [physical] [damage] to target attacker for each [prestige] on this.
    [ordnance] +1 [physical] [damage].
`,
  disciplines:["ordnance"],
  illustrator: "Mico Dimagiba",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-cover-fire": {
  stack: "library",
  name: "Cover Fire",
  types: ["action", "ongoing"],
  // clan: "martial",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
  [arsenal] Gain 1 Unhosted Action.
  Ongoing - **Pay 1 [prestige]:** Prevent 1 [damage] to each character in target party.
`,
  disciplines:["arsenal"],
  illustrator: "Adelijah Ocampo",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-cruisin-for-a-bruisin": {
  stack: "library",
  name: "Cruisin For a Bruisin",
  types: ["attack", "reaction"],
  //clan: "martial",
  bloodPotencyRequirement: 2,
  damage: 2,
  //shield: 1,
  attack: ["social"],
  reactions: ["social"],
  text: md`
    Reaction - +1 [shield].
    Reaction - [fleet] This deals [physical][damage] to the attacker instead of [social].
`,
  disciplines:["fleet"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-death-from-above": {
  stack: "library",
  name: "Death From Above",
  types: ["attack", "reaction"],
  //clan: "martial",
  bloodPotencyRequirement: 2,
  damage: 1,
  //shield: 1,
  attack: ["physical"],
  reactions: ["physical"],
  text: md`
    **Pay 1 [prestige]:** +1 [damage].
    Reaction - [drone jockey] +1 [damage].
`,
  disciplines:["drone jockey"],
  illustrator: "Adelijah Ocampo",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-drive-envy": {
  stack: "library",
  name: "Drive: Envy",
  types: ["unhosted action"],
  // clan: "martial",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Attach to a character in your cell (max 1).
    At the end of your turn, this character steals 1 [blood] from target Monster you have tagged. If this character is at maximum [blood], flip the stolen token and place it on a face-down card you control instead.
`,
  //disciplines:["ordnance"],
  illustrator: "Patsy Lascano",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-drive-pride": {
  stack: "library",
  name: "Drive: Pride",
  types: ["unhosted action"],
  //clan: "martial",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Attach to a character in your cell (max 1).
    **Relentless, Pay 1 [prestige]:** Gain 1 [agenda].
    Use only if this character Blocked an attack this turn.
`,
  //disciplines:["ordnance"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-eye-in-the-sky": {
  stack: "library",
  name: "Eye in the Sky",
  types: ["action", "ongoing"],
  //clan: "martial",
  //bloodPotencyRequirement: 2,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Ongoing - **Burn this card:** Burn target Ongoing card that has no tokens on it.
    **Relentless, Exhaust:** Target Blocker with [drone jockey] you control deals +1 [damage] to an attacker. Use only if they played a Reaction.
`,
  // disciplines:["drone jockey"],
  illustrator: "Mico Dimagiba",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-feint": {
  stack: "library",
  name: "Feint",
  types: ["attack"],
  //clan: "martial",
  bloodPotencyRequirement: 4,
  damage: 1,
  //shield: 1,
  attack: ["physical"],
  //reactions: ["social", "mental"],
  text: md`
    If this attack does not defeat the target and you control only 1 vampire, ready the attacker.
    **Solitary - Pay 1 [prestige]:** Gain 1 Action if played during your turn.
`,
  //disciplines:["ordnance"],
  illustrator: "Adelijah Ocampo",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-flamethrower": {
  stack: "library",
  name: "Flamethrower",
  types: ["attack"],
  clan: "martial",
  bloodPotencyRequirement: 4,
  damage: 2,
  //shield: 1,
  attack: ["ranged"],
  //reactions: ["social", "mental"],
  text: md`
    **Play this card face up and pay 2 [prestige].
    [arsenal] Pay 1[ prestige] instead if the target is a Monster.
    **Aggravated**
`,
  disciplines:["arsenal"],
  illustrator: "Patsy Lascano",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-ghoul-boy": {
  stack: "library",
  name: "Ghoul Boy",
  types: ["action", "ghoul"],
  //clan: "martial",
  bloodPotencyRequirement: 0,
  bloodPotency: 0,
  physical: 1,
  social: 0,
  mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    **Put 1 [blood] from the acting character on this.**
    **Exhaust:** Target attacker has +1 Intel.
`,
  //disciplines:["ordnance"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-librarian-ghoul": {
  stack: "library",
  name: "Librarian Ghoul",
  types: ["action", "ghoul"],
  //clan: "martial",
  bloodPotencyRequirement: 0,
  bloodPotency: 0,
  physical: 0,
  social: 0,
  mental: 1,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    **Put 2 [blood] from the acting character on this.**
    **Exhaust:** Draw 1 card. Then, if you have 5+ cards in hand, discard 1 card.
`,
  //disciplines:["ordnance"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-peace-among-rivals": {
  stack: "library",
  name: "Peace Among Rivals",
  types: ["action", "ongoing"],
  clan: "salubri",
  //bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    **Exhaust:** Gain 1 [agenda]. Use only if you control 4+ Ongoing cards with different clan affiliations.
`,
  //disciplines:["ordnance"],
  illustrator: "Mico Dimagiba",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-political-will": {
  stack: "library",
  name: "Political Will",
  types: ["action", "ongoing", "scheme"],
  clan: "ministry",
  //bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Influence Conflict - Should I put this card into play?
    Ongoing - **Exert 2 Influence:** Target character you control has +1 [shield] this turn.
`,
  //disciplines:["ordnance"],
  illustrator: "Adelijah Ocampo",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-sacrifice": {
  stack: "library",
  name: "Sacrifice",
  types: ["action"],
  clan: "banu haqim",
  //bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Remove all [blood] from a character you control and add it to cards you control with 1+ [blood] already on them.
`,
  //disciplines:["ordnance"],
  illustrator: "Mico Dimagiba",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-shine-a-light": {
  stack: "library",
  name: "Shine a Light",
  types: ["action", "scheme"],
  //clan: "salubri",
  //bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Influence Conflict - Should I remove up to 2 tokens from target Ongoing or unattached face-down card a player controls for every 5 Influence in favor of this Scheme, then burn it if there are no tokens on it?
`,
  //disciplines:["ordnance"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-silver-bullets": {
  stack: "library",
  name: "Silver Bullets",
  types: ["action", "ongoing"],
  clan: "martial",
  //bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
  [ordnance] Gain 1 Unhosted Action.
  Ongoing - **Relentless, Pay 1 [prestige]:** Target character you control deals +1 **Silver** [damage] with a [ranged] card to the opposing character. Use only if you have not activated a Silver Bullets this attack.
`,
  disciplines:["ordnance"],
  illustrator: "Irene Francisco",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-smoke-bomb": {
  stack: "library",
  name: "Smoke Bombs",
  types: ["reaction", "special"],
  //clan: "salubri",
  bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: [],
  text: md`
    Play only if a character in your cell would be defeated.
    **Pay 2 [prestige]:** Place 1 [blood] from your general supply on this character, and they are not defeated. If you have already played a Reaction this turn, pay 0 [prestige] instead.
`,
  //disciplines:["ordnance"],
  illustrator: "Irene Francisco",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-sniper-rifle": {
  stack: "library",
  name: "Sniper Rifle",
  types: ["attack"],
  //clan: "salubri",
  bloodPotencyRequirement: 3,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  damage: 3,
  //shield: 1,
  attack: ["ranged"],
  //reactions: ["social", "mental"],
  text: md`
    Play this card face up.
    **Pay 1 [prestige]:** This attack cannot be Blocked.
    [arsenal] The target does not get Preemptive Strike.
`,
  disciplines:["arsenal"],
  illustrator: "Mico Dimagiba",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-spying": {
  stack: "library",
  name: "Spying",
  types: ["attack", "reaction"],
  //clan: "salubri",
  bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  damage: 2,
  //shield: 1,
  attack: ["mental"],
  reactions: ["mental"],
  text: md`
    Reaction - +1 [shield].
    Reaction - [drone jockey] This deals [social][damage] to the attacker instead of [mental].
`,
  disciplines:["drone jockey"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

"ml-stand-and-deliver": {
  stack: "library",
  name: "Stand and Deliver",
  types: ["2 actions", "ritual", "ongoing", "action"],
  //clan: "salubri",
  //bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
  [blood potency] **Place 1 to 3 [blood] of your color on this card.**
  Ongoing - **Exhaust, Remove 2 [blood] from this:** Ready target character.
  **Relentless, Exhaust - Remove 2 [blood] from this during a foe's turn:** Ready up to 2 target characters.
`,
  disciplines:["blood sorcery"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-trash-to-treasure": {
  stack: "library",
  name: "Trash to Treasure",
  types: ["action"],
  clan: "caitiff",
  //bloodPotencyRequirement: 2,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  //shield: 1,
  //attack: ["mental"],
  //reactions: ["social", "mental"],
  text: md`
    Target a character, then reveal the top 3 cards of your Library.
    Deal 1 [physical][damage] to the target for each different Discipline icon that appears on those cards.
    Then discard those cards.
`,
  //disciplines:["ordnance"],
  illustrator: "Mico Dimagiba",
  set: "Martial Law",
  cardpools: ["Vampire"],
},

"ml-turnabout": {
  stack: "library",
  name: "Turnabout",
  types: ["reaction"],
  //clan: "salubri",
  bloodPotencyRequirement: 1,
  //bloodPotency: 0,
  //physical: 1,
  //social: 0,
  //mental: 0,
  //damage: 1,
  shield: 2,
  //attack: ["mental"],
  reactions: ["social", "mental"],
  text: md`
    Deal 1 [physical][damage] to the attacker.
    [ordnance] 2 [physical][damage] instead.
`,
  disciplines:["ordnance"],
  illustrator: "Felipe Gaona",
  set: "Martial Law",
  cardpools: ["Hunter"],
},

// Fang and Talon

"fat-anger-management": {
  stack: "library",
  name: "Anger Management",
  types: ["unhosted action"],
  clan: "red talons",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
    Move any number of Rage tokens from any number of characters in your pack to any other characters in your pack.
    If you remove the last Rage from 1+ characters this way, draw 1 card.
`,
  //disciplines:[],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-apeskin": {
  stack: "library",
  name: "Apeskin",
  types: ["action"],
  //clan: "red talons",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
    **Attach to the acting character.**

    +1 [shield]
    **Aggravated** attacks against this character are **Superficial**.
`,
  //disciplines:[],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-blood-of-the-pack": {
  stack: "library",
  name: "Blood of the Pack",
  types: ["unhosted action", "gift"],
  clan: "silverfangs",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
  [silverfangs] **Attach to a character in your pack.**

  **Exhaust this card:** Move 1 Rage or 1 [blood] from 1+ characters in this party to target character you control.
`,
  //disciplines:[],
  illustrator: "Elif Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-deer-in-the-headlights": {
  stack: "library",
  name: "Deer in the Headlights",
  types: ["attack"],
  //clan: "red talons",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 1,
  //shield: ,
  attack: ["mental"],
  //reactions: [],
  text: md`
    When you play this card face down, this attack deals +1 [damage] to the defender.
    OR
    **You may play this card face up and pay 1 Rage:**
    Defender cannot play a Reaction.
`,
  //disciplines:[],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-eyes-of-the-owl": {
  stack: "library",
  name: "Eyes of the Owl",
  types: ["unhosted action", "gift"],
  //clan: "red talons",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
    **Attach to a character in your pack.**
    **Exhaust this character:** The next attack this turn has +2 Intel and the defender's characters have -1 [shield].
`,
  //disciplines:[],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-fangs-of-judgment": {
  stack: "library",
  name: "Fangs of Judgment",
  types: ["action", "gift"],
  //clan: "red talons",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
    [philodox] **Attach to the acting character.**

    Party - **Detach this card:** This attack deals +2 [physical] [damage] for each character in this party.
`,
  disciplines:["philodox"],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-full-moon-rising": {
  stack: "library",
  name: "Full Moon Rising",
  types: ["unhosted action"],
  //clan: "red talons",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
    Each character in your pack gains 2 Rage.
`,
  //disciplines:["philodox"],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-harmony-flute": {
  stack: "library",
  name: "Harmony Flute",
  types: ["action", "ongoing"],
  //clan: "red talons",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
    Ongoing, Relentless - **Exhaust a ready character in your pack:** Remove 1 Rage from each character with 2+ Rage in target party.
    If the character you exhausted has [galliard], you may also burn this card to steal 1 [prestige] from target player.
`,
  disciplines:["galliard"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-hidden-killer": {
  stack: "library",
  name: "Hidden Killer",
  types: ["unhosted action", "gift"],
  clan: "red talons",
  //bloodPotencyRequirement: ,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: ,
  //shield: ,
  //attack: [],
  //reactions: [],
  text: md`
  **[red-talons] Attach to a character in your pack.**
  This character has **Reach** and **Prowl** _(may attack City Deck Mortals in The Streets from their Caern)_.
  Attacker - This attack deals +1 [damage] when using **Prowl**.
`,
  //disciplines:["galliard"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-hunting-party": {
  stack: "library",
  name: "Hunting Party",
  types: ["attack"],
  //clan: "red talons",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 0,
  //shield: ,
  attack: ["physical"],
  //reactions: [],
  text: md`
    +1 [damage] for each character in the attacking party.
`,
  //disciplines:["galliard"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-lead-by-example": {
  stack: "library",
  name: "Lead by Example",
  types: ["influence modifier", "unhosted action"],
  clan: "silverfangs",
  //bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 0,
  //shield: ,
  //attack: ["physical"],
  //reactions: [],
  text: md`
    If your Leader is exhausted, ready them and gain 1 action, then other characters in your pack gain 1 Rage each.
    OR Gain 2 Influence during this action or event.
`,
  //disciplines:["galliard"],
  illustrator: "Elif Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-leap-away": {
  stack: "library",
  name: "Leap Away",
  types: ["reaction"],
  //clan: "silverfangs",
  bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 0,
  shield: 2,
  attack: ["physical", "mental"],
  reactions: ["physical", "mental"],
  text: md`
    If this character is in The Streets in a party of 2+ characters, you may seperate them from this party. If you do, +1 [shield].
    **Pay 2 Rage:** +1 [shield].
`,
  //disciplines:["galliard"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-net-gun": {
  stack: "library",
  name: "Net Gun",
  types: ["attack"],
  //clan: "silverfangs",
  bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 2,
  //shield: ,
  attack: ["ranged"],
  //reactions: [],
  text: md`
    +1 [damage] against City Deck Mortals or characters with attachments.
    If this deals damage to the defending character, they must detach 1 attached non-Title card of attacker's choice.
`,
  //disciplines:["galliard"],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Hunter", "Werewolf"],
},

"fat-pack-protection": {
  stack: "library",
  name: "Pack Protection",
  types: ["reaction"],
  //clan: "silverfangs",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  shield: 0,
  attack: ["physical", "social"],
  reactions: ["physical", "social"],
  text: md`
    This character has +1 [shield] for each member of this party.
    **Pay 2 Rage:** Deal 1 [physical] [damage] to the attacker for each member of this party. If this party is in The Streets, the [damage] is **Aggravated**.
`,
  //disciplines:["galliard"],
  illustrator: "Elif Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-personal-bodyguard": {
  stack: "library",
  name: "Personal Bodyguard",
  types: ["reaction"],
  //clan: "silverfangs",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  shield: 0,
  attack: ["physical", "social", "mental", "ranged"],
  reactions: ["physical", "social", "mental", "ranged"],
  text: md`
    Redirect this attack to any character in this party. The new target has +2 [shield].
    If the new target is defeated, the original defender may gain 2 Rage.
`,
  //disciplines:["galliard"],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-poke-the-wolf": {
  stack: "library",
  name: "Poke the Wolf",
  types: ["unhosted action"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  //shield: 0,
  //attack: [],
  //reactions: ["physical", "social"],
  text: md`
    Put a Frenzy token on target werewolf with a Form OR a Fear token on target non-werewolf character.
    If you put the Frenzy token on a character in your pack, ready them.
`,
  //disciplines:["galliard"],
  illustrator: "Elif Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-pounce": {
  stack: "library",
  name: "Pounce",
  types: ["attack"],
  //clan: "silverfangs",
  bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 1,
  //shield: 0,
  attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    +1 [damage] for each Stealth this character has.
`,
  //disciplines:["galliard"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-pull-rank": {
  stack: "library",
  name: "Pull Rank",
  types: ["attack"],
  clan: "silverfangs",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 2,
  //shield: 0,
  attack: ["social", "mental"],
  //reactions: ["physical", "social"],
  text: md`
    When placed, announce one of the attack types.
    **Exert up to 2 Influence:** +1 [damage] for each Influence exerted this way.
    When your Leader is in the attacking party, you may **Pay 1 Rage:** Put a Fear token on the defender.
`,
  //disciplines:["galliard"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-pulse-of-the-prey": {
  stack: "library",
  name: "Pulse of the Prey",
  types: ["action", "gift"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    [ragabash] **Attach tyo the acting character.**
    **Exhaust this card: Target character in this party has +1 Stealth and +1 Intel this turn.
`,
  disciplines:["ragabash"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-raging-strike": {
  stack: "library",
  name: "Raging Strike",
  types: ["unhosted action", "gift"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    **Attach to a character in your pack.**
    Attacker - **Pay 2 Rage:** This attack deals +2 [damage] to the target. Use only in The Streets.
`,
  //disciplines:["ragabash"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-rapid-shift": {
  stack: "library",
  name: "Rapid Shift",
  types: ["action", "gift"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    **Attach to the acting character.**
    Form - **Exhaust this card:** Detach a Form from this character, then attach a different Form to this character at no Rage cost (may be used during an attack).
`,
  //disciplines:["ragabash"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-razor-claws": {
  stack: "library",
  name: "Razor Claws",
  types: ["action", "gift"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
  [ahroun] **Attach to the acting character.**
  Attacker - +1 [physical] [damage].
`,
  disciplines:["ahroun"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-rite-of-abjuration": {
  stack: "library",
  name: "Rite of Abjuration",
  types: ["action", "ongoing", "rite"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    **Put 1 to 3 Rage on this card.**
    Ongoing - **Remove up to 3 Rage from this:** For each Rage you remove, remove 1 token from target Ongoing or face-down card. If you remove 3 Rage, you may burn target Ongoing card instead.
`,
  //disciplines:["ragabash"],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-rite-of-celebration": {
  stack: "library",
  name: "Rite of Celebration",
  types: ["action", "rite", "ongoing"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    **Put 1 to 3 Rage on this card.**
    Ongoing, **Relentless - Remove 2 Rage from this:** Gain 1 [prestige].
`,
  //disciplines:["ragabash"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-rite-of-rage": {
  stack: "library",
  name: "Rite of Rage",
  types: ["action", "rite", "ongoing"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    **Put 1 to 3 Rage on this card.**
    Ongoing - **Remove 1 Rage from this:** Target werewolf in your pack gains 2 Rage OR target foe's werewolf gains 3 Rage. If this sends them into a Frenzy, burn this card.
`,
  //disciplines:["ragabash"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-rite-of-shame": {
  stack: "library",
  name: "Rite of Shame",
  types: ["action", "rite", "ongoing"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    **Put 1 to 3 Rage on this card.**
    Ongoing - **Remove 1 Rage from this:** Target foe loses 1 [prestige].
    **Remove 3 Rage from this:** Target foe with 9+ [agenda] loses 1 [agenda].
`,
  //disciplines:["ragabash"],
  illustrator: "Nevzat Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-shield-of-the-wyld": {
  stack: "library",
  name: "Shield of the Wyld",
  types: ["action", "gift"],
  clan: "red talons",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 1,
  //shield: 0,
  //attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    [red-talons] **Attach to the acting character.**
    +2 [shield] against [physical] and [ranged] attacks.
`,
  //disciplines:["ragabash"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-show-of-dominance": {
  stack: "library",
  name: "Show of Dominance",
  types: ["attack"],
  //clan: "red talons",
  bloodPotencyRequirement: 5,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 2,
  //shield: 0,
  attack: ["social"],
  //reactions: ["physical", "social"],
  text: md`
    [ahroun] If this attack deals 1+ [damage] to the defender, exhaust them and put a Fear token on them.
`,
  disciplines:["ahroun"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-silver-dagger": {
  stack: "library",
  name: "Silver Dagger",
  types: ["attack"],
  //clan: "red talons",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 2,
  //shield: 0,
  attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    This attack deals +1 **Silver** [damage] to werewolves.
    (Silver damage dealt to a werewolf is **Aggravated.**)
`,
  //disciplines:["ahroun"],
  illustrator: "Elif Aydin",
  set: "Fang & Talon",
  cardpools: ["Hunter", "Werewolf"],
},

"fat-sink-your-teeth": {
  stack: "library",
  name: "Sink Your Teeth",
  types: ["attack"],
  //clan: "red talons",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 1,
  //shield: 0,
  attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    **Pay 1 Rage:** +1 [damage].
    Form - +1 [damage].
`,
  //disciplines:["ahroun"],
  illustrator: "Elif Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-snap-back": {
  stack: "library",
  name: "Snap Back",
  types: ["reaction"],
  //clan: "red talons",
  bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  shield: 2,
  attack: ["social"],
  reactions: ["social"],
  text: md`
    [ahroun] Deal 2 [physical] [damage] to the attacker.
    **Pay 1 Rage:** Steal 1 [prestige] from the attacker.
`,
  disciplines:["ahroun"],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-social-justice": {
  stack: "library",
  name: "Social Justice",
  types: ["attack"],
  //clan: "red talons",
  bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 2,
  //shield: 0,
  attack: ["social"],
  //reactions: ["physical", "social"],
  text: md`
    If this attack deals 2+ [damage] to the defender, destroy target Ongoing card controlled by the defending player.
    [ragabash] Reduce the [damage] required to trigger this effect by 1.
`,
  disciplines:["ragabash"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-song-of-rage": {
  stack: "library",
  name: "Song of Rage",
  types: ["action", "gift"],
  //clan: "red talons",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  //shield: 0,
  //attack: ["social"],
  //reactions: ["physical", "social"],
  text: md`
    [galliard] **Attach to the acting character.**
    **Exhaust this character:** Werewolves in this party each gain 2 Rage.
`,
  disciplines:["galliard"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-the-culling": {
  stack: "library",
  name: "The Culling",
  types: ["attack"],
  clan: "red talons",
  bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 2,
  //shield: 0,
  attack: ["physical"],
  //reactions: ["physical", "social"],
  text: md`
    This attack deals +1 [physical] [damage] for each character in this party with a Form attached.
`,
  //disciplines:["galliard"],
  illustrator: "Marco Primo",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-the-howling": {
  stack: "library",
  name: "The Howling",
  types: ["attack"],
  //clan: "red talons",
  bloodPotencyRequirement: 4,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  damage: 1,
  //shield: 0,
  attack: ["mental"],
  //reactions: ["physical", "social"],
  text: md`
    +2 [damage] against City Deck Mortals.
    [theurge] +2 [damage] against non-werewolf characters.
`,
  disciplines:["theurge"],
  illustrator: "Felipe Gaona",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

"fat-unity-of-the-pack": {
  stack: "library",
  name: "Unity of the Pack",
  types: ["action", "gift"],
  clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  //shield: 0,
  //attack: ["social"],
  //reactions: ["physical", "social"],
  text: md`
    [silverfangs] **Attach to the acting character.**
    This character has +1 [shield] when in a party of 2+ characters.
    **Exhaust this card:** Target character in this party has +1 [mental] during this action for each other member with 1+ [mental].
`,
  //disciplines:["galliard"],
  illustrator: "Elif Aydin",
  set: "Fang & Talon",
  cardpools: ["Werewolf"],
},

// Prince Pack 2 //

"pp2-ecstatic-agony": {
  stack: "library",
  name: "Ecstatic Agony",
  types: ["action"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  //shield: 0,
  //attack: ["social"],
  //reactions: ["physical", "social"],
  text: md`
    Attach to the acting character.
    When [blood] is removed from this character, place 1 of it onto any face-down card you control, flipped to its [prestige] side.
`,
  //disciplines:["galliard"],
  illustrator: "Elif Aydin",
  set: "Prince Pack 2",
  cardpools: ["Vampire"],
},

"pp2-fetch": {
  stack: "library",
  name: "Fetch",
  types: ["action"],
  //clan: "silverfangs",
  //bloodPotencyRequirement: 3,
  //bloodPotency: ,
  //physical: ,
  //social: ,
  //mental: ,
  //damage: 2,
  //shield: 0,
  //attack: ["social"],
  //reactions: ["physical", "social"],
  text: md`
    Burn target non-Title, non-Wraith card attached to target character in The Streets. **Pay 2** [prestige]: If the targeted card can be legally attached to the acting character, do so.
    [animalism] Pay 1 [prestige] instead.
`,
  disciplines:["animalism"],
  illustrator: "Elif Aydin",
  set: "Prince Pack 2",
  cardpools: ["Vampire"],
},

// Promo //

}
